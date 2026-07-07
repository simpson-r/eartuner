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
      size={{ base: 10, md: '56px' }}
      border="2px solid"
      borderColor={active ? 'purple.300' : 'border'}
    >
      <Icon
        as={active ? HiMusicNote : HiOutlineMusicNote}
        position="relative"
        size="lg"
        color={active ? 'fg' : 'border'}
        css={active ? ICON_SHIMMER_SX : undefined}
      />
    </CircleChakra>
  );
};

export const Streak = { Circle };
