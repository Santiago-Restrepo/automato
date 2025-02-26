import { StepFunction } from 'src/modules/function/domain/entities/step-function.entity';

export interface UpdateArrayElementParams {
  newElement: Record<string, any>;
  currentElements: Record<string, any>[];
  id_key: string;
}

const updateArrayElement: StepFunction<UpdateArrayElementParams> = async ({
  input,
}) => {
  const { newElement, currentElements, id_key } = input;

  if (!newElement.hasOwnProperty(id_key)) {
    throw new Error(`newElement must have the key '${id_key}'`);
  }

  return currentElements.map((item) =>
    item[id_key] === newElement[id_key] ? { ...item, ...newElement } : item,
  );
};

export default updateArrayElement;
