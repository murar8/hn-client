import { Grid, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { Fragment, useMemo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Loader } from "src/components/Loader";
import { useItems } from "src/hooks/queries";
import { numberToUnitString } from "src/util";

type PollOptsProps = {
  ids: number[];
};

export function PollOpts({ ids }: PollOptsProps) {
  const { data, isLoading, isError } = useItems(ids);
  const saturation = useColorModeValue("50%", "40%");

  const filtered = useMemo(
    () =>
      data
        ?.filter((item) => item.text && item.score !== undefined)
        .sort((a, b) => b.score! - a.score!)
        .map(({ score, ...item }) => ({ score: numberToUnitString(score!), ...item })),
    [data]
  );

  if (isError) return <Icon as={FaExclamationTriangle} boxSize={8} />;
  if (isLoading) return <Loader size="lg" />;

  return (
    <Grid gap={2} templateColumns="auto auto" alignItems="baseline">
      {filtered!.map(({ id, score, text }, i) => (
        <Fragment key={id}>
          <Text
            p={1}
            fontSize="2xl"
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
            borderColor={`hsl(${(120 * (filtered!.length - i)) / filtered!.length},100%,${saturation})`}
          >
            {score}
          </Text>
          {text && <Text fontSize="lg">{text}</Text>}
        </Fragment>
      ))}
    </Grid>
  );
}
