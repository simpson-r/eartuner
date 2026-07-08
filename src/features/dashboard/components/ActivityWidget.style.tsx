import { HiOutlineMusicNote, HiMusicNote } from 'react-icons/hi';

import { Circle as CircleChakra, Icon } from '@chakra-ui/react';
import { ICON_SHIMMER_SX } from '@/components/style';

/**
 * This component renders a circular status indicator
 *  - When active  it transitions to a filled background and triggers a text-masked shimmer animation on its inner music note icon.
 *  - When inactive it falls back to a bordered container.
 */
export const Circle = ({ active = false }: { active?: boolean }) => {
  return (
    <CircleChakra
      size={{ base: '40px', md: '56px' }}
      border="2px solid"
      borderColor={active ? 'cobalt.500' : 'border'}
      bgColor={active ? 'cobalt.400' : undefined}
    >
      <Icon
        as={active ? HiMusicNote : HiOutlineMusicNote}
        position="relative"
        size="lg"
        color={active ? 'gold.500' : 'border'}
        css={active ? ICON_SHIMMER_SX : undefined}
      />
    </CircleChakra>
  );
};

export const Streak = { Circle };
