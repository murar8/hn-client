import { Center, ChakraProps, Spinner, SpinnerProps } from "@chakra-ui/react";

export type LoaderProps = ChakraProps & { size: SpinnerProps["size"] };

export function Loader({ size, ...props }: LoaderProps) {
  return (
    <Center p={4} {...props}>
      <Spinner size={size} />
    </Center>
  );
}
