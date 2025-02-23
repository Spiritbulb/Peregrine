
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, ScanIcon, UsersIcon, UserIcon } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-foreground" : "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-4">
            <Link
              to="/"
              className={`flex flex-col items-center text-sm ${isActive("/")} hover:text-foreground transition-colors`}
            >
              <HomeIcon className="h-6 w-6" />
              <span className="mt-1">Feed</span>
            </Link>
            <Link
              to="/scan"
              className={`flex flex-col items-center text-sm ${isActive("/scan")} hover:text-foreground transition-colors`}
            >
              <ScanIcon className="h-6 w-6" />
              <span className="mt-1">Scan</span>
            </Link>
            <Link
              to="/flew-by"
              className={`flex flex-col items-center text-sm ${isActive("/flew-by")} hover:text-foreground transition-colors`}
            >
              <UsersIcon className="h-6 w-6" />
              <span className="mt-1">Flew By</span>
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center text-sm ${isActive("/profile")} hover:text-foreground transition-colors`}
            >
              <UserIcon className="h-6 w-6" />
              <span className="mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 pb-24">{children}</main>
    </div>
  );
};

export default Layout;
