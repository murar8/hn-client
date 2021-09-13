import { Center, ChakraProps, Spinner, ThemingProps } from "@chakra-ui/react";

export type LoaderProps = ChakraProps & { size?: ThemingProps<"spinner">["size"] };

export function Loader({ size, ...props }: LoaderProps) {
  return (
    <Center p={4} {...props}>
      <Spinner size={size} />
    </Center>
  );
}
