
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Layout from "@/components/Layout";

const Index = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Just flew by someone interesting!",
      timestamp: "2m ago",
      user: {
        username: "Alex",
        avatar: "/placeholder.svg"
      }
    },
    {
      id: 2,
      text: "Looking forward to meeting new people today.",
      timestamp: "5m ago",
      user: {
        username: "Sarah",
        avatar: "/placeholder.svg"
      }
    },
    {
      id: 3,
      text: "Great conversation with someone I flew by yesterday!",
      timestamp: "15m ago",
      user: {
        username: "Mike",
        avatar: "/placeholder.svg"
      }
    },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: Date.now(),
          text: newPost,
          timestamp: "Just now",
          user: {
            username: "User123",
            avatar: "/placeholder.svg"
          }
        },
        ...posts,
      ]);
      setNewPost("");
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
          <Button onClick={handlePost} className="w-full">
            <SendIcon className="h-4 w-4 mr-2" />
            Post
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
                  <AvatarImage src={post.user.avatar} alt={post.user.username} />
                  <AvatarFallback>{post.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.user.username}</p>
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
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
