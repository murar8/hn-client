import { Button, ChakraProps, HStack, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { MouseEventHandler, useMemo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export type ErrorBannerProps = ChakraProps & {
  error: any;
  onRetry?: MouseEventHandler;
};

export function ErrorBanner({ error, onRetry, ...props }: ErrorBannerProps) {
  const message = useMemo(() => (error instanceof Error ? error.message : String(error)), [error]);
  const buttonBorderColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      spacing={8}
      alignItems="center"
      justifyContent="center"
      p={4}
      {...props}
    >
      <HStack spacing={4} justifyContent="flex-start" alignItems="center">
        <Icon as={FaExclamationTriangle} boxSize={10} />
        <Text fontSize="md" overflowWrap="anywhere">
          An error occured: {message}
        </Text>
      </HStack>
      {onRetry !== undefined && (
        <Button variant="outline" borderColor={buttonBorderColor} minW="fit-content" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Stack>
  );
}
