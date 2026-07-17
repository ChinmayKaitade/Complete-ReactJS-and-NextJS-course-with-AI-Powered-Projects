// "use client";
import LogoutButton from "@/components/logout-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

async function Home() {
  // const { data } = authClient.useSession();
  // console.log(data);

  const session = await requireAuth();

  const { user } = session;

  const dbUser = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    select: {
      plan: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-zinc-900 text-white space-y-5">
      <Image
        src={user.image!}
        alt="User Image"
        className="object-contain rounded-full"
        height={90}
        width={90}
      />
      <h2 className="text-3xl font-bold mt-5">{user.name}</h2>
      <p className="text-xl font-semibold text-zinc-200">{user.email}</p>

      <LogoutButton />

      <div className="flex flex-col items-center justify-center gap-10 space-y-2">
        <Badge variant={dbUser?.plan === "FREE" ? "default" : "destructive"}>
          {dbUser?.plan}
        </Badge>

        {dbUser?.plan === "FREE" && (
          <Link href={"/pricing"} className={buttonVariants()}>
            Go To Pricing
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
