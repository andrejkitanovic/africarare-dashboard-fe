const experiencesKeys = {
  all: ["experiences"] as const,
  list: () => [...experiencesKeys.all, "list"],
  listFiltered: (filters: Record<string, unknown>) => [
    ...experiencesKeys.list(),
    filters,
  ],
  details: (id: string) => [...experiencesKeys.all, "detail", id] as const,
};

export { experiencesKeys };
