export const BUTTON_SHIMMER_SX = {
  _after: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'currentColor',
    opacity: 0.15,
    pointerEvents: 'none',
    mask: 'linear-gradient(-60deg, #000 40%, rgba(0,0,0,0.4) 50%, #000 60%) right/350% 100%',
    WebkitMask:
      'linear-gradient(-60deg, #000 40%, rgba(0,0,0,0.4) 50%, #000 60%) right/350% 100%',
    animation: 'textShimmer 5s infinite cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '3xl',
  },
};

export const ICON_SHIMMER_SX = {
  display: 'inline-block',
  mask: 'linear-gradient(-60deg, #000 40%, rgba(0,0,0,0.4) 50%, #000 60%) right/350% 100%',
  WebkitMask:
    'linear-gradient(-60deg, #000 40%, rgba(0,0,0,0.4) 50%, #000 60%) right/350% 100%',
  animation: 'textShimmer 5s infinite cubic-bezier(0.4, 0, 0.2, 1)',
};
