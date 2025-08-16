import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import * as React from "react";

const AuthButton = ({}) => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button className="cursor-pointer">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default AuthButton;
