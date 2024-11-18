import { z } from 'zod';

const FetchCharacterDataParamsSchema = z.object({
  characters: z.string().min(1, 'What the fuck?'),
});

const FetchCharacterDataParamsWrapperSchema = z.object({
  data: FetchCharacterDataParamsSchema,
});

const fetchCharacterData = async (params: unknown) => {
  const parsedParams = FetchCharacterDataParamsWrapperSchema.parse(params);

  const {
    data: { characters },
  } = parsedParams;

  const data = await fetch(characters);
  return data.json();
};

export default fetchCharacterData;
