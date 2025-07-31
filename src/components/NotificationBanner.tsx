import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NotificationBanner = () => {
  return (
    <Alert className="bg-blue-100 border-blue-200 rounded-none border-l-0 border-r-0">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>PLANNED UPGRADES</strong> - We're spending this weekend upgrading the technology that powers The National Lottery. Following Saturday's draws, some services won't be available until Monday.{" "}
        <a href="#" className="underline hover:no-underline">Find out more</a>
      </AlertDescription>
    </Alert>
  );
};

export default NotificationBanner;