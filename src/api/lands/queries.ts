const landsKeys = {
  all: ["lands"] as const,
  list: () => [...landsKeys.all, "list"],
  listFiltered: (filters: Record<string, unknown>) => [
    ...landsKeys.list(),
    filters,
  ],
  details: (id: string) => [...landsKeys.all, "detail", id] as const,
};

export { landsKeys };
