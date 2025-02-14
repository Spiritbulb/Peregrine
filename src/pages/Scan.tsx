
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { UserScanIcon } from "lucide-react";

const Scan = () => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    // Here we would implement the actual device scanning logic
    setTimeout(() => setIsScanning(false), 5000);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div
            className={`w-32 h-32 rounded-full border-4 flex items-center justify-center ${
              isScanning
                ? "animate-pulse-slow border-primary"
                : "border-muted-foreground"
            }`}
          >
            <UserScanIcon
              className={`h-16 w-16 ${
                isScanning ? "text-primary" : "text-muted-foreground"
              }`}
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Scan for Nearby Users</h1>
            <p className="text-muted-foreground">
              {isScanning
                ? "Scanning for nearby users..."
                : "Start scanning to discover people around you"}
            </p>
          </div>
          <Button
            onClick={startScan}
            disabled={isScanning}
            className="w-full animate-fade-in"
          >
            {isScanning ? "Scanning..." : "Start Scanning"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Scan;
