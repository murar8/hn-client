import { Heading, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";

export type ErrorBannerProps = {
  error: string;
};

export function ErrorBanner({ error }: ErrorBannerProps) {
  return (
    <Stack direction={{ base: "column", sm: "row" }} spacing={{ base: 4, sm: 8 }} alignItems="center" p={4}>
      <Icon as={FaExclamationTriangle} boxSize={12} />
      <VStack spacing={{ base: 2, sm: 4 }} alignItems="flex-start">
        <Heading size="md">An error occured</Heading>
        <Text fontSize="md" p={2} ps={0} textAlign="center">
          {error}
        </Text>
      </VStack>
    </Stack>
  );
}
