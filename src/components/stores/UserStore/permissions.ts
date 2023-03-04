enum Permissions {
  USERS_READ = "read:users",
  USERS_WRITE = "write:users",
  USERS_UPDATE = "update:users",
  USERS_DELETE = "delete:users",

  ORGANISATIONS_READ = "read:organisations",
  ORGANISATIONS_WRITE = "write:organisations",
  ORGANISATIONS_UPDATE = "update:organisations",
  ORGANISATIONS_DELETE = "delete:organisations",

  LAND_READ = "read:lands",
  LAND_WRITE = "write:lands",
  LAND_UPDATE = "update:lands",
  LAND_DELETE = "delete:lands",

  EXPERIENCE_READ = "read:experiences",
  EXPERIENCE_WRITE = "write:experiences",
  EXPERIENCE_UPDATE = "update:experiences",
  EXPERIENCE_DELETE = "delete:experiences",

  LEVEL_READ = "read:levels",
  LEVEL_WRITE = "write:levels",
  LEVEL_UPDATE = "update:levels",
  LEVEL_DELETE = "delete:levels",

  FEATURE_READ = "read:features",
  FEATURE_WRITE = "write:features",
  FEATURE_UPDATE = "update:features",
  FEATURE_DELETE = "delete:features",
}

export type PermissionsType = `${Permissions}`;

export { Permissions };
