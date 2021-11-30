import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";

function useRatesService<T>(baseCurrency: string): {
  response: object | null;
  error: Error | null;
  loading: boolean;
  setError: Dispatch<SetStateAction<Error | null>>;
} {
  const baseUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
  const [response, setResponse] = React.useState<object | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoading(true);
    const fetchData = async (): Promise<void> => {
      try {
        const res = await axios.get<any>(`${baseUrl}/${baseCurrency}.json`);
        // console.log(res);
        setResponse(res.data[baseCurrency]);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        // console.log(err);
        setError(err as Error);
      }
    };
    fetchData();
  }, [baseCurrency]);

  return { response, error, loading, setError };
}

export default useRatesService;
