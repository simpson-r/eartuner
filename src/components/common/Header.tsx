"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import React from "react";
import { HiLogout } from "react-icons/hi";

import { Button, HStack, Heading, IconButton, Link } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";

/**
 * This component renders the global navigation bar for both logged-out/logged in users.
 */
export const Header = ({ session }: { session: Session | null }) => {
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid"
      borderColor="border"
      minH={16}
      px={6}
    >
      {/* left-aligned nav */}
      <Heading size="sm">
        <Link href="/dashboard">EarTrainer+</Link>
      </Heading>
      {/* right-aligned nav */}
      <HStack gap={1}>
        {session ? (
          <>
            {/* "exercises" button */}
            <Button size="sm" variant="ghost" asChild>
              <Link href="/exercises"> Exercises</Link>
            </Button>
            {/* "profile" button */}
            <Tooltip showArrow content="Your profile">
              <Button colorScheme="beige" variant="ghost" size="sm" asChild>
                <Link href={`/profile/${session.userId}`}>Profile</Link>
                Profile
              </Button>
            </Tooltip>
            {/* "logout" button */}
            <Tooltip showArrow content="Logout">
              <IconButton
                aria-label="logout"
                size="sm"
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <HiLogout />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Button size="sm" asChild>
            <Link href="/login"> Login</Link>
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
