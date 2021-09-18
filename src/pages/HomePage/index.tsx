import { Button, Heading, HStack, Icon, Spacer, Text, VStack } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Logo } from "src/components/Logo";

export default function HomePage() {
  return (
    <VStack py={12} px={4} h="100%">
      <HStack spacing={8} alignItems="center">
        <Logo boxSize={16} />
        <Heading as="h1" size="3xl">
          HN Client
        </Heading>
      </HStack>
      <Text fontSize="lg" py={8}>
        Alternative client for browsing the Hacker News website.
      </Text>
      <Spacer />
      <Button as={Link} to="/top" colorScheme="green" size="lg" rightIcon={<Icon as={FaArrowRight} />}>
        Get Started
      </Button>
    </VStack>
  );
}
