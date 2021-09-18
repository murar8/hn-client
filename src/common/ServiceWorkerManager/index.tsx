import {
  Button,
  ButtonGroup,
  Collapse,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaSyncAlt, FaTimes } from "react-icons/fa";
import * as serviceWorkerRegistration from "src/serviceWorkerRegistration";

export function ServiceWorkerManager() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const bgColor = useColorModeValue("gray.800", "gray.600");

  const onUpdate = (registration: ServiceWorkerRegistration) => {
    setWaitingWorker(registration.waiting);
  };

  const onReload = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  };

  const onHide = () => {
    setWaitingWorker(null);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onUpdate });
  }, []);

  return (
    <Collapse in={waitingWorker !== null}>
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={8}
        alignItems="center"
        justifyContent="space-between"
        p={4}
        bgColor={bgColor}
      >
        <HStack spacing={4} justifyContent="flex-start" alignItems="center">
          <Text fontSize="md" overflowWrap="anywhere">
            An updated version of the website is available.
          </Text>
        </HStack>
        <ButtonGroup variant="outline" isAttached>
          <Button leftIcon={<Icon as={FaSyncAlt} />} minW="fit-content" onClick={onReload}>
            Reload Now
          </Button>
          <IconButton icon={<Icon as={FaTimes} />} aria-label="Close" onClick={onHide} />
        </ButtonGroup>
      </Stack>
    </Collapse>
  );
}
