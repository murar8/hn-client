import { Box, Heading, Link, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { IconTag } from "src/components/IconTag";

export function Footer() {
  const borderColor = useColorModeValue("gray.200", "gray.500");

  return (
    <Stack
      p={4}
      alignItems={{ base: "flex-start", md: "flex-end" }}
      justifyContent="space-between"
      spacing={8}
      borderTop="1px"
      borderColor={borderColor}
      as="footer"
      role="contentinfo"
      direction={{ base: "column", md: "row" }}
    >
      <VStack spacing={2} alignItems="flex-start">
        <Heading size="sm">Contact info</Heading>
        <IconTag
          as={(props) => <Link href="mailto:lnzmrr@gmail.com" {...props} />}
          variant="ghost"
          size="md"
          Icon={FaEnvelope}
          label="lnzmrr@gmail.com"
        />
        <Box pt={2} />
        <Heading size="sm">Support</Heading>
        <IconTag
          as={(props) => <Link href="https://github.com/murar8/hn-client/issues" {...props} />}
          variant="ghost"
          size="md"
          Icon={FaGithub}
          label="Open an issue"
        />
      </VStack>
      <Text fontSize="sm">Copyright © {new Date().getFullYear()} Lorenzo Murarotto. All Rights Reserved</Text>
    </Stack>
  );
}
