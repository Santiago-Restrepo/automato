import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
export class FetchCharacterDataParams {
  @IsInt()
  @IsNotEmpty()
  characters: string;

  @IsString()
  @IsEmpty()
  locations: string;

  @IsString()
  @IsNotEmpty()
  episodes: string;
}

export class FetchCharacterDataParamsWrapper {
  @ValidateNested()
  @Type(() => FetchCharacterDataParams)
  @IsNotEmpty()
  data: FetchCharacterDataParams;
}

const fetchCharacterData = async (params: FetchCharacterDataParamsWrapper) => {
  const {
    data: { characters },
  } = params;
  const data = await fetch(characters);
  return data.json();
};

export default fetchCharacterData;
