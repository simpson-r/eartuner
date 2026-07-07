const intentMap = {
  success: 'green',
  error: 'red',
} as const;

type Intent = keyof typeof intentMap;

const createResponseSx = (intent: Intent) => {
  const color = intentMap[intent];
  const isSuccess = intent === 'success';

  return {
    text: { color: `fg.${intent}` },
    bg: { color: `${color}.muted` },
    button: {
      selected: {
        borderColor: `${color}.solid`,
      },
      solid: {
        bgColor: `border.${intent}`,
        borderColor: `${color}.solid`,
      },
      outline: {
        variant: 'outline',
        borderColor: `border.${intent}`,
        ...(!isSuccess && { colorScheme: 'red.fg' }),
      },
    },
  };
};

export const responseSx = {
  success: createResponseSx('success'),
  error: createResponseSx('error'),
} as const;
