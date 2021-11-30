import React from "react";
import { Link as ChakraLink } from "@chakra-ui/layout";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: React.ReactChildren | React.ReactElement | string;
}

export const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  return (
    <ChakraLink color="teal.500" fontWeight="700" as={Link} href={href}>
      {children}
    </ChakraLink>
  );
};
