
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { formatDistanceToNow } from "date-fns";

type Post = {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
  profiles: {
    email: string;
  } | null;
};

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    
    // Subscribe to new posts
    const channel = supabase
      .channel('posts_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          // When a new post is added, fetch all posts to get the associated profile data
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data as Post[] || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePost = async () => {
    if (!newPost.trim() || !user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            text: newPost,
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      setNewPost("");
      toast({
        title: "Success",
        description: "Post created successfully!"
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-6">
        <h1 className="text-2xl font-semibold mb-6">Feed</h1>
        
        <div className="space-y-4 mb-8">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="resize-none"
          />
          <Button 
            onClick={handlePost} 
            className="w-full"
            disabled={isLoading}
          >
            <SendIcon className="h-4 w-4 mr-2" />
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="feed-item p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Avatar>
                  <AvatarFallback>
                    {post.profiles?.email.slice(0, 2).toUpperCase() || 'UN'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.profiles?.email || 'Unknown User'}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <p className="text-card-foreground">{post.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
