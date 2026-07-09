'use client';

import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { HiOutlineCog, HiOutlineLogout, HiOutlineMenu } from 'react-icons/hi';

import {
  Button,
  createListCollection,
  HStack,
  Heading,
  IconButton,
  Link,
  useDisclosure,
} from '@chakra-ui/react';

import { Menu } from '@/components/ui/menu';
import { ColorModeIcon, useColorMode } from '@/theme/color-mode';

const PROFILE_MENU_ITEMS = createListCollection({
  items: [
    { label: 'Settings', value: 'settings', icon: HiOutlineCog, divider: true },
    {
      label: 'Theme',
      value: 'color-mode',
      icon: ColorModeIcon,
      divider: true,
    },
    { label: 'Sign out', value: 'logout', icon: HiOutlineLogout },
  ],
});
/**
 * This component renders the global navigation bar for both logged-out/logged in users.
 */
export const Header = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const router = useRouter();

  const {
    open: isMenuOpen,
    onClose: onMenuClose,
    onOpen: onMenuOpen,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();

  /** CALLBACK */
  const handleMenuSelect = (value: string) => {
    switch (value) {
      case 'logout':
        signOut({ callbackUrl: '/' });
        break;
      case 'color-mode':
        toggleColorMode();
        break;
      case 'settings':
        if (pathname !== '/settings') router.push('/settings');
        break;
    }
    onMenuClose();
  };

  return (
    <HStack
      w="full"
      mx="auto"
      justify="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor="border"
      minH="70px"
      px={{ base: 10, md: 24 }}
      gap={8}
    >
      {/* left-aligned nav */}
      <Link href="/" textDecoration="none">
        <Heading size={{ base: '2xl', md: '3xl' }} cursor="pointer">
          EarTuner
        </Heading>
      </Link>

      {/* right-aligned nav */}
      {session?.user.id ? (
        <Menu
          items={PROFILE_MENU_ITEMS}
          open={isMenuOpen}
          positioning={{ placement: 'top-end' }}
          onPointerDownOutside={onMenuClose}
          onMenuSelect={handleMenuSelect}
        >
          <IconButton
            aria-label="menu"
            variant="ghost"
            boxSize={8}
            onClick={onMenuOpen}
            asChild
          >
            <HiOutlineMenu />
          </IconButton>
        </Menu>
      ) : (
        pathname !== '/login' && (
          <Button
            size="md"
            color="fg"
            rounded="4xl"
            variant="outline"
            border="1.5px solid"
            borderColor="border"
            asChild
          >
            <Link href="/login" textDecorationLine="none">
              Sign in
            </Link>
          </Button>
        )
      )}
    </HStack>
  );
};

export default Header;
