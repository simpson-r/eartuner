import { Button, ButtonProps } from '@chakra-ui/react';
import { BUTTON_SHIMMER_SX } from './style';
import { system } from '@/theme';

interface ElevatedButtonProps extends ButtonProps {
  icon?: React.ReactElement;
  surfaceColor?: string;
  shadowColor?: string;
  showShimmer?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export const ElevatedButton = ({
  icon,
  surfaceColor = 'bg.subtle',
  shadowColor = 'border',
  showShimmer,
  children,
  ref,
  ...props
}: React.PropsWithChildren<ElevatedButtonProps>) => {
  const { disabled } = props;
  const iconOnly = !children;

  const shadow = system.token.var(`colors.${shadowColor}`); // get token var for shadow tokens

  return (
    <Button
      ref={ref}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      bg={surfaceColor}
      color={surfaceColor === 'bg.subtle' ? 'fg' : 'white'}
      border={surfaceColor === 'bg.subtle' ? '2px solid' : 'none'}
      borderColor="border"
      borderRadius="3xl"
      // 3d button transition props
      transform={disabled ? 'translateY(4px)' : 'translateY(0)'}
      transition="transform 0.2s ease-in out"
      boxShadow={`0 ${disabled ? '0px' : iconOnly ? '8px' : '6px'} 0 ${shadow}`}
      _hover={{
        bg: disabled
          ? undefined
          : surfaceColor === 'bg.subtle'
            ? 'bg.muted'
            : surfaceColor,
        transform: disabled ? undefined : 'translateY(-1px)',
        boxShadow: disabled
          ? undefined
          : `0 ${iconOnly ? '10px' : '8px'} 0 ${shadow}`,
        _active: {
          transform: disabled ? undefined : 'translateY(6px)',
          boxShadow: `0 0px 0 ${shadow}`,
        },
      }}
      // shimmmer animation (optional)
      css={showShimmer ? BUTTON_SHIMMER_SX : undefined}
      {...props}
    >
      {iconOnly ? icon : children}
    </Button>
  );
};
