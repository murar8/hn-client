import { Box, Heading, HStack, Link, LinkProps, Stack, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaEnvelope, FaGithub } from "react-icons/fa";
import { IconTag, IconTagProps } from "src/components/IconTag";
import { Logo } from "src/components/Logo";

type InfoLinkProps = Pick<IconTagProps, "Icon" | "label"> & Pick<LinkProps, "href">;

function InfoLink({ Icon, label, href }: InfoLinkProps) {
  return (
    <IconTag
      as={(props) => <Link href={href} target="_blank" {...props} />}
      variant="ghost"
      size="md"
      Icon={Icon}
      label={label}
    />
  );
}

type InfoContainerProps = { children?: ReactNode };

function InfoContainer(props: InfoContainerProps) {
  return <VStack spacing={2} alignItems="flex-start" {...props} />;
}

function ContactInfo() {
  return (
    <InfoContainer>
      <Heading size="md">Contact</Heading>
      <InfoLink Icon={FaEnvelope} href="mailto:lnzmrr@gmail.com" label="lnzmrr@gmail.com" />
    </InfoContainer>
  );
}

function SupportInfo() {
  return (
    <InfoContainer>
      <Heading size="md">Support</Heading>
      <InfoLink href="https://github.com/murar8/hn-client/issues/new" Icon={FaGithub} label="Open an issue" />
    </InfoContainer>
  );
}

function ProductName() {
  return (
    <HStack alignItems="center" spacing={4}>
      <Logo boxSize={8} />
      <Heading size="lg">HN Client</Heading>
    </HStack>
  );
}

function Copyright() {
  return (
    <Text fontSize="md" pt={8}>
      © {new Date().getFullYear()} Lorenzo Murarotto. All Rights Reserved.
    </Text>
  );
}

export function Footer() {
  const borderColor = useColorModeValue("gray.200", "gray.500");

  return (
    <Box as="footer" role="contentinfo" p={4} borderTop="1px" borderColor={borderColor}>
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={{ base: 8, sm: 2 }}
        alignItems={{ base: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <ProductName />
        <ContactInfo />
        <SupportInfo />
      </Stack>
      <Copyright />
    </Box>
  );
}
