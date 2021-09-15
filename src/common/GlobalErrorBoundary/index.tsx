import { HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { FaExclamationTriangle } from "react-icons/fa";

export function Fallback({ error }: FallbackProps) {
  const bgColor = useColorModeValue("red.500", "red.300");
  const message = useMemo(() => (error instanceof Error ? error.message : String(error)), [error]);

  return (
    <HStack spacing={4} p={4} justifyContent="flex-start" alignItems="center" bgColor={bgColor}>
      <Icon as={FaExclamationTriangle} boxSize={10} />
      <Text fontSize="md" overflowWrap="anywhere">
        An error occured: {message}
      </Text>
    </HStack>
  );
}

export type GlobalErrorBoundaryProps = {
  children?: ReactNode;
};

export function GlobalErrorBoundary(props: GlobalErrorBoundaryProps) {
  return <ErrorBoundary FallbackComponent={Fallback} {...props} />;
}
