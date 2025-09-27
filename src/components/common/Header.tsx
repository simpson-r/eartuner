"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCircle } from "react-icons/fa";
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

import {
  Button,
  createListCollection,
  HStack,
  Heading,
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";

import { Menu } from "@/components/ui/menu";

const PROFILE_MENU_ITEMS = createListCollection({
  items: [
    { label: "Settings", value: "settings", icon: HiOutlineCog },
    { label: "Sign out", value: "logout", icon: HiOutlineLogout },
  ],
});
/**
 * This component renders the global navigation bar for both logged-out/logged in users.
 */
export const Header = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const { open: isOpen, onClose, onOpen } = useDisclosure();

  const handleMenuSelect = (value: string) => {
    switch (value) {
      case "logout":
        signOut({ callbackUrl: "/" });
        break;
    }
    onClose();
  };

  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor="border"
      minH={20}
      px={6}
    >
      {/* left-aligned nav */}
      <Heading size="lg">
        <Link href="/dashboard" textDecorationLine="none">
          EarTrainer+
        </Link>
      </Heading>
      {/* right-aligned nav */}
      <HStack gap={1}>
        {session ? (
          <>
            {/* "exercises" button */}
            <Button size="sm" variant="ghost" asChild>
              <Link href="/exercises" textDecorationLine="none">
                Exercises
              </Link>
            </Button>
            {/* "profile" button, menu trigger */}
            <Menu
              isOpen={isOpen}
              items={PROFILE_MENU_ITEMS}
              onPointerDownOutside={onClose}
              onSelect={handleMenuSelect}
            >
              <IconButton
                aria-label="profile"
                boxSize={8}
                color="orange.500"
                variant="ghost"
                onClick={onOpen}
                asChild
              >
                <FaCircle />
              </IconButton>
            </Menu>
          </>
        ) : (
          pathname !== "/login" && (
            <Button
              bgColor="cobalt.500"
              _hover={{ bgColor: "cobalt.600" }}
              rounded="md"
              size="sm"
              asChild
            >
              <Link href="/login" textDecorationLine="none">
                Login
              </Link>
            </Button>
          )
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
