import axios from "axios";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { ICurrencyProps } from "../types";

interface IResponse {
  baseValue: number;
  convertedValue: number;
  base: string;
  convertTo: string;
}

function useConverterService<T>(props: ICurrencyProps): {
  response: IResponse | null;
  error: Error | null;
  loading: boolean;
  setError: Dispatch<SetStateAction<Error | null>>;
} {
  const baseUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
  const [response, setResponse] = React.useState<IResponse | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setIsLoading] = React.useState<boolean>(true);
  const isFirstRender = useRef<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = async (): Promise<void> => {
      try {
        const res = await axios.get<any>(
          `${baseUrl}/${props.base}/${props.convertTo}.json`
        );
        console.log(res);
        setResponse({
          baseValue: props.value,
          convertedValue: res.data[props.convertTo] * props.value,
          convertTo: props.convertTo,
          base: props.base,
        });
        setError(null);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setError(err as Error);
      }
    };
    if (!isFirstRender.current) fetchData();
    isFirstRender.current = false;
  }, [props]);

  return { response, error, loading, setError };
}

export default useConverterService;
