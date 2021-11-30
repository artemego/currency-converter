import {
  Box,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { ICurrencyProps } from "../types";
import useConverterService from "../hooks/useConverterService";

const regexp =
  /(^((\d+\.?\d*)\s)*(-?\d+\.?\d*))|([a-z]+(?=\s[in|to]))|((?<=\s)[a-z]+$)/gm;

const Home: NextPage = () => {
  const [pageInput, setPageInput] = useState<string>("");
  const [currencyProps, setCurrencyProps] = useState<ICurrencyProps>({
    base: "",
    convertTo: "",
    value: 0,
  });
  const { response, error, loading, setError } =
    useConverterService(currencyProps);

  // use regexp to get the values, then make an api request with them
  const handleConvert = (inputText: string) => {
    const result = inputText.match(regexp);
    // console.log(result);
    if (result !== null && result.length === 3 && result[1] && result[2]) {
      // console.log("setting state");
      setCurrencyProps({
        value: +result[0].replace(/\s/g, ""),
        base: result[1],
        convertTo: result[2],
      });
      return;
    }
    setError({
      name: "regexp",
      message: "Could not convert, wrong input structure",
    });
  };

  const debouncedCheck = useCallback(
    debounce((inputText: string) => handleConvert(inputText), 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setPageInput(e.target.value);
    debouncedCheck(e.target.value);
  };

  const selectErrorMessage = (err: Error) => {
    return err.name === "regexp"
      ? err.message
      : `Could not convert ${currencyProps.value} ${currencyProps.base} to ${currencyProps.convertTo}, ${err.message}`;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <Heading mt="30px">Currency Converter</Heading>
      <Text fontSize="24px">
        Use the input below to convert from one currency to another
      </Text>

      <FormControl
        isInvalid={!!error?.message && !!pageInput}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Input
          w="60%"
          placeholder="15 usd in rub"
          mt="15px"
          value={pageInput}
          onChange={handleInputChange}
        />
        {!!error?.message && !!pageInput && (
          <FormErrorMessage>{selectErrorMessage(error)}</FormErrorMessage>
        )}
      </FormControl>
      {response && (
        <ScaleFade initialScale={0.3} in={!!response && !loading}>
          <Box
            p="40px"
            color="white"
            mt="4"
            bg="teal.500"
            rounded="md"
            shadow="md"
          >
            {`${response?.baseValue} ${response?.base} = ${response?.convertedValue} ${response?.convertTo}`}
          </Box>
        </ScaleFade>
      )}
    </Box>
  );
};

export default Home;
