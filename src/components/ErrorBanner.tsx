import { ChakraProps, Heading, Icon, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

export type ErrorBannerProps = ChakraProps & {
  error: any;
};

export function ErrorBanner({ error, ...props }: ErrorBannerProps) {
  const message = useMemo(() => (error instanceof Error ? error.message : String(error)), [error]);
  const bgColor = useColorModeValue("red.500", "red.300");

  return (
    <Stack
      bgColor={bgColor}
      direction={{ base: "column", sm: "row" }}
      spacing={4}
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Icon as={FaExclamationTriangle} boxSize={12} />
      <VStack spacing={2} alignItems="center">
        <Heading size="md" textAlign="center">
          An error occured
        </Heading>
        <Text fontSize="md" textAlign="center">
          {message}
        </Text>
      </VStack>
    </Stack>
  );
}
