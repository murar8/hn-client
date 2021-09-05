import { Center, Spinner, SystemProps, ThemingProps } from "@chakra-ui/react";

export type LoaderProps = SystemProps & { size?: ThemingProps<"spinner">["size"] };

export function Loader({ size, ...props }: LoaderProps) {
  return (
    <Center {...props}>
      <Spinner size={size} />
    </Center>
  );
}
