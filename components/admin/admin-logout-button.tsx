// Example: AdminLogoutButton.tsx
"use client"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const { session, signOut } = useAuth();
  const router = useRouter();

  if (!session) return null;

  return (
    <Button
      variant="outline"
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
    >
      Logout
    </Button>
  );
}
