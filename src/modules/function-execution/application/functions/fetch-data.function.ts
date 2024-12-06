import { StepFunction } from '.';

export interface FetchDataParams {
  url: string;
}
const fetchData: StepFunction<FetchDataParams> = async ({ input: params }) => {
  const { url } = params;
  const data = await fetch(url);
  return data.json();
};

export default fetchData;
