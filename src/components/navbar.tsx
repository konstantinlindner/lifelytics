import { Box, ButtonGroup, Button, Flex, Spacer } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";
import AppLogo from "./AppLogo";
import NextLink from "next/link";

function NavBar() {
  return (
    <Box py="7">
      <Flex alignItems="center">
        <AppLogo />

        <Spacer />

        <ColorModeSwitcher size="sm" fontSize="xl" variant="outline" />

        <ButtonGroup pl="4" spacing="2" size="sm">
          <Button
            variant="outline"
            colorScheme="green"
            as={NextLink}
            href={"/sign-in"}
          >
            Sign in
          </Button>

          <Button
            variant="solid"
            colorScheme="green"
            as={NextLink}
            href={"/sign-up"}
          >
            Sign up
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default NavBar;
