enum Permissions {
  USERS_READ = "read:users",
  USERS_WRITE = "write:users",
  USERS_UPDATE = "update:users",
  USERS_DELETE = "delete:users",

  LANDS_READ = "read:lands",
  LANDS_WRITE = "write:lands",
  LANDS_UPDATE = "update:lands",
  LANDS_DELETE = "delete:lands",

  ORGANISATIONS_READ = "read:organisations",
  ORGANISATIONS_WRITE = "write:organisations",
  ORGANISATIONS_UPDATE = "update:organisations",
  ORGANISATIONS_DELETE = "delete:organisations",

  EXPERIENCES_READ = "read:experiences",
  EXPERIENCES_WRITE = "write:experiences",
  EXPERIENCES_UPDATE = "update:experiences",
  EXPERIENCES_DELETE = "delete:experiences",
}

export type PermissionsType = `${Permissions}`;

export { Permissions };
