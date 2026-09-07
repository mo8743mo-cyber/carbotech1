import { ShieldCheck } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

export default function OAuthConsent() {
  return (
    <AuthLayout
      icon={ShieldCheck}
      title="Offline mode"
      subtitle="Online authorization is not available in the standalone app"
    >
      <p className="text-sm text-muted-foreground text-center">
        This local build has no connection to an OAuth provider or remote service.
      </p>
    </AuthLayout>
  );
}
