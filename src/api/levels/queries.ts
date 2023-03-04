const levelsKeys = {
  all: ["levels"] as const,
  details: (id: string) => [...levelsKeys.all, "detail", id] as const,
};

export { levelsKeys };
