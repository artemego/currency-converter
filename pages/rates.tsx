import { Box, Divider, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import useRatesService from "../hooks/useRatesService";
import axios from "axios";
import { Spinner } from "@chakra-ui/spinner";

const Rates: NextPage = () => {
  const [baseCurrency, setBaseCurrency] = useState("rub");
  const [currencyList, setcurrencyList] = useState<any>(null);
  // const [selectedOption, setSelectedOption] = useState<string>("");
  const { response, error, loading } = useRatesService(baseCurrency);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setBaseCurrency(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
      )
      .then((res) => {
        console.log(res);
        setcurrencyList(res.data);
      });
  }, []);

  return (
    <Box>
      <Box position="sticky" top="0px" backgroundColor="white">
        <Heading mb="15px" mt="15px" fontSize="26px">
          Currency rates for {baseCurrency}
        </Heading>
        <Select
          mb="15px"
          placeholder="Change base currency"
          onChange={handleSelectChange}
        >
          {!!currencyList &&
            Object.keys(currencyList).map((key, index) => (
              <option key={currencyList[key] + index} value={key}>
                {currencyList[key]}
              </option>
            ))}
        </Select>
        <Divider />
      </Box>

      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {response ? (
          Object.keys(response).map((key, index) => (
            <Box
              flexBasis={["100%", "50%", "33%"]}
              textAlign="center"
              key={key}
            >{`${key}: ${response[key as keyof typeof response]}`}</Box>
          ))
        ) : (
          <Spinner />
        )}
      </Box>
    </Box>
  );
};

export default Rates;
