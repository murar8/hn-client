import { Grid, Icon, Text } from "@chakra-ui/react";
import { Fragment, useMemo } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { fetchItems } from "src/api";
import { Loader } from "src/components/Loader";
import { numberToUnitString, rainbow } from "src/util";
import useSWR from "swr";

type PollOptsProps = {
  ids: number[];
};

export function PollOpts({ ids }: PollOptsProps) {
  let { data, error } = useSWR(ids, () => fetchItems(ids));

  let filtered = useMemo(
    () =>
      data
        ?.filter((item) => item.text && item.score !== undefined)
        .sort((a, b) => b.score! - a.score!)
        .map(({ score, ...item }) => ({ score: numberToUnitString(score!), ...item })),
    [data]
  );

  if (error) return <Icon as={FaExclamationTriangle} boxSize={8} />;
  if (!data) return <Loader size="lg" />;

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
            borderColor={rainbow(filtered!.length, i)}
          >
            {score}
          </Text>
          {text && <Text fontSize="lg">{text}</Text>}
        </Fragment>
      ))}
    </Grid>
  );
}
