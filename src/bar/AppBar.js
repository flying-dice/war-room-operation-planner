import { Stack, Text, useTheme } from "@fluentui/react";

export const AppBar = ({ className }) => {
  const { palette } = useTheme();

  return (
    <Stack
      className={className}
      styles={{
        root: { backgroundColor: palette.themePrimary },
      }}
      verticalAlign="center"
    >
      <Text
        styles={{ root: { color: palette.white, marginLeft: "1em" } }}
        variant="large"
      >
        Operation Editor
      </Text>
    </Stack>
  );
};
