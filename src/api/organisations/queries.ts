const organisationsKeys = {
  all: ["organisations"] as const,
  list: () => [...organisationsKeys.all, "list"],
  listFiltered: (filters: Record<string, unknown>) => [
    ...organisationsKeys.list(),
    filters,
  ],
  details: (id: string) => [...organisationsKeys.all, "detail", id] as const,
  mine: () => [...organisationsKeys.all, "mine"],
};

export { organisationsKeys };
