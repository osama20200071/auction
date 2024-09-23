"use client";

import Protected from "@/components/Protected-Client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Notification from "./Notification";

export function Header() {
  const session = useSession();

  return (
    <div className="bg-gray-100 py-2">
      <div className="container flex justify-between items-center mx-auto">
        <div className="flex items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            BidBuddy.com
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All Auctions
            </Link>

            <Protected>
              <Link
                href="/auctions"
                className="hover:underline flex items-center gap-1"
              >
                My Auctions
              </Link>
              <Link
                href="/items/create"
                className="hover:underline flex items-center gap-1"
              >
                Create Auction
              </Link>
            </Protected>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Protected>
            <Notification />
          </Protected>

          {session?.data?.user?.image && (
            <Image
              src={session.data.user.image}
              width="40"
              height="40"
              alt="user avatar"
              className="rounded-full"
            />
          )}
          <div>{session?.data?.user?.name}</div>
          <div>
            <Protected
              fallback={
                <Button type="submit" onClick={() => signIn()}>
                  Sign In
                </Button>
              }
            >
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Sign Out
              </Button>
            </Protected>
          </div>
        </div>
      </div>
    </div>
  );
}
