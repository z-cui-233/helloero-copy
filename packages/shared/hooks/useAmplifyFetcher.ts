import { API, graphqlOperation } from 'aws-amplify';
import { useCallback, useState } from 'react';
import { GraphQLResultEx } from 'u-next/amplify';

const useAmplifyFetcher = <TData, TVariables>(): {
  loading: boolean;
  data: GraphQLResultEx<TData> | null;
  fetcher: (
    query: string,
    variables: TVariables
  ) => Promise<GraphQLResultEx<TData>>;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<GraphQLResultEx<TData> | null>(null);

  const fetcher = useCallback(
    (query: string, variables: TVariables): Promise<GraphQLResultEx<TData>> => {
      setLoading(true);

      return (
        API.graphql(graphqlOperation(query, variables)) as Promise<
          GraphQLResultEx<object>
        >
      )
        .then((result: GraphQLResultEx<object>): GraphQLResultEx<object> => {
          setData(result as unknown as GraphQLResultEx<TData>);
          return result;
        })
        .catch((error) => {
          setData(error as GraphQLResultEx<TData>);
          return error;
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  return {
    fetcher,
    data,
    loading,
  };
};

export default useAmplifyFetcher;
