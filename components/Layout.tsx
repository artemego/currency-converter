import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import React from "react";

interface LayoutProps {
  children: React.ReactChildren | React.ReactElement;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Currency converter</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      {/* wrapper box */}
      <Box w="80%" m="0 auto">
        <header>
          {/* nav */}
          <Flex
            alignItems="center"
            backgroundColor="cyan.100"
            p="20px 10px"
            color="black"
            flexWrap="wrap"
          >
            <Heading fontSize="32px">Currency Test App</Heading>
            <Box ml={["0", "0", "auto"]} mt={["10px", "10px", "0"]}>
              <Link href={"/"} passHref>
                <Button mr="10px" isActive={router.pathname === "/"}>
                  Currency Converter
                </Button>
              </Link>
              <Link href={"/rates"} passHref>
                <Button isActive={router.pathname === "/rates"}>
                  Check rates
                </Button>
              </Link>
            </Box>
          </Flex>
        </header>
        {/* main content */}
        <main>{children}</main>
      </Box>
    </>
  );
};
