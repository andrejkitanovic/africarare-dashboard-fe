const featuresKeys = {
  all: ["features"] as const,
  details: (id: string) => [...featuresKeys.all, "detail", id] as const,
};

export { featuresKeys };
