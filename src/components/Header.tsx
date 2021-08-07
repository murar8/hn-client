import {
  Box,
  Divider,
  Flex,
  Image,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const routes = [
  { name: "Best", path: "/best" },
  { name: "Top", path: "/top" },
  { name: "New", path: "/new" },
];

export function Header() {
  const { pathname } = useLocation();

  const index = useMemo(
    () => routes.findIndex(({ path }) => !!matchPath(pathname, { path })),
    [pathname]
  );

  return (
    <Box>
      <Flex align="center">
        <Image src={logo} boxSize="16" p="4" />
        <Tabs isFitted flex="1" p="4" index={index}>
          <TabList>
            {routes.map(({ name, path }) => (
              <Tab key={path} as={Link} to={path}>
                {name}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Flex>
      <Divider orientation="horizontal" />
    </Box>
  );
}
