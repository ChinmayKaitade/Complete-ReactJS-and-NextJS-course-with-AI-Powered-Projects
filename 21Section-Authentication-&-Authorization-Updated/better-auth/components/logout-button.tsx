"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();

  const onlogout = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logout Successfully✅");
          router.push("/login");
        },
      },
    });

  return (
    <Button variant={"destructive"} size={"lg"} onClick={onlogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
