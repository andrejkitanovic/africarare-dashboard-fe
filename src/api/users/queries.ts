const usersKeys = {
  all: ["users"] as const,
  list: () => [...usersKeys.all, "list"],
  statistics: () => [...usersKeys.all, "statistics"],
  history: (id: string) => [...usersKeys.all, id, "history"],
};

export { usersKeys };
