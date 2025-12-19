const enumToOptions = (values: readonly string[]) =>
  values.map((v) => ({
    label: v.replaceAll("_", " "),
    value: v,
  }));

export default enumToOptions;
