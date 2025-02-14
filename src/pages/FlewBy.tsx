
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserPlusIcon } from "lucide-react";

interface User {
  id: number;
  name: string;
  bio: string;
  timestamp: string;
}

const FlewBy = () => {
  const { toast } = useToast();
  const [flewByUsers] = useState<User[]>([
    {
      id: 1,
      name: "Alex Chen",
      bio: "Adventure seeker & tech enthusiast",
      timestamp: "2 minutes ago",
    },
    {
      id: 2,
      name: "Sarah Miller",
      bio: "Coffee lover, bookworm",
      timestamp: "5 minutes ago",
    },
  ]);

  const handleConnect = (user: User) => {
    toast({
      title: "Connection Request Sent",
      description: `Request sent to ${user.name}`,
    });
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-6">
        <h1 className="text-2xl font-semibold mb-6">Recent Flew-Bys</h1>
        
        <div className="space-y-4">
          {flewByUsers.map((user) => (
            <div
              key={user.id}
              className="feed-item p-6 rounded-lg border bg-card space-y-4"
            >
              <div>
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-muted-foreground">{user.bio}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {user.timestamp}
                </p>
              </div>
              <Button
                onClick={() => handleConnect(user)}
                variant="outline"
                className="w-full"
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </div>
          ))}
        </div>

        {flewByUsers.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No recent flew-bys yet. Start scanning to discover people!
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FlewBy;
