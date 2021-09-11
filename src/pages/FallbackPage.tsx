import { Heading } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/react";

export default function FallbackPage() {
  return (
    <Center p={4}>
      <Heading size="2xl">404 - Page not found.</Heading>
    </Center>
  );
}
