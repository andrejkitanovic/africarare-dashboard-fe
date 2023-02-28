import create, { State } from "zustand";

import { CurrentUserType, UserOrgTypeRoleType } from "api/user/types";

import { PermissionsType } from "./permissions";

export interface UserStore extends State {
  token: string | null;
  setToken: (token: string | null) => void;
  user: CurrentUserType | null;
  setUser: (user: CurrentUserType) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  token: null,
  setToken: (val) => set({ token: val }),
  user: null,
  setUser: (val) => set({ user: val }),
}));

// for debugging
// useUserStore.subscribe(console.log);

const hasPermissions = (
  requiredPermissions: PermissionsType | PermissionsType[] | undefined
) => {
  // when there are requiredPermission
  if (requiredPermissions !== undefined) {
    // get userPermissions
    const userPermissions = useUserStore.getState().user?.permissions;
    // if user has permissions available, check requirements
    if (userPermissions) {
      if (Array.isArray(requiredPermissions)) {
        return requiredPermissions.every((rp) => userPermissions.includes(rp));
      }
      return userPermissions.includes(requiredPermissions);
    }
    return false;
  }
  // when requiredPermissions are undefined, just return true
  return true;
};

const hasRole = (
  orgTypeRoles: UserOrgTypeRoleType | UserOrgTypeRoleType[] | undefined
) => {
  // when there are requiredPermission
  if (orgTypeRoles !== undefined) {
    const userRole = useUserStore.getState().user?.role;

    if (userRole) {
      if (Array.isArray(orgTypeRoles)) {
        if (!orgTypeRoles.length) {
          return true;
        }
        return orgTypeRoles.some((otr) => otr === userRole);
      }
      return orgTypeRoles === userRole;
    }
    return false;
  }
  return true;
};

export { useUserStore, hasRole, hasPermissions };
