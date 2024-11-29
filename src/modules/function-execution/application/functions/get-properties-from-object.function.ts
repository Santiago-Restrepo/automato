interface GetPropertiesFromObjectParams {
  propertiesMap: Record<string, string>;
  object: Record<string, any>;
}

export function getPropertiesFromObject(params: GetPropertiesFromObjectParams) {
  const { propertiesMap, object } = params;
  const result = Object.entries(propertiesMap)
    .map(([key, value]) => {
      const newKey = value;
      const newValue = object[key];
      return { key: newKey, value: newValue };
    })
    .reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
  console.log(propertiesMap);
  console.log(object);
  console.log(result);
  return result;
}
