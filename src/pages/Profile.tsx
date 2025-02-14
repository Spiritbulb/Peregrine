
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenIcon } from "lucide-react";
import Layout from "@/components/Layout";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "User123",
    bio: "Hey there! I'm using Flewby to meet new people.",
    avatar: "/placeholder.svg",
    connections: 12,
    posts: 5
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-6">
        <div className="space-y-8">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={profile.avatar} alt={profile.username} />
              <AvatarFallback>{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-semibold mt-4">{profile.username}</h1>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setIsEditing(true)}
              >
                <PenIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Username</label>
                <Input
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="h-24"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="w-full">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-muted-foreground text-center">{profile.bio}</p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-card">
                  <p className="text-2xl font-semibold">{profile.connections}</p>
                  <p className="text-sm text-muted-foreground">Connections</p>
                </div>
                <div className="p-4 rounded-lg bg-card">
                  <p className="text-2xl font-semibold">{profile.posts}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
