import { Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouteMatch } from "react-router-dom";
import { ErrorBanner } from "src/components/ErrorBanner";
import { ItemData } from "src/components/ItemData";
import { Loader } from "src/components/Loader";
import { ShortLink } from "src/components/ShortLink";
import { useItem } from "src/hooks/queries";
import { CommentTree } from "./CommentTree";
import { PollOpts } from "./PollOpts";

export default function PostPage() {
  let { id } = useRouteMatch<{ id: string }>("/post/:id")!.params;
  let { data, error, isLoading, isError, refetch } = useItem(parseInt(id));

  if (isError) return <ErrorBanner error={error} onRetry={() => refetch()} />;
  if (isLoading) return <Loader size="lg" />;

  const { title, url, text, parts, kids, ...item } = data!;

  return (
    <VStack spacing={8} my={4} p={4} alignItems="flex-start">
      {title && <Heading size="md">{title}</Heading>}
      {url && <ShortLink href={url} />}
      {text && <Text fontSize="lg" dangerouslySetInnerHTML={{ __html: text }} />}
      {parts && <PollOpts ids={parts} />}
      <ItemData variant="outline" {...item} />
      <Divider />
      {kids && <CommentTree ids={kids} />}
    </VStack>
  );
}
