import create, { State } from "zustand";

import { bindURLParams } from "../../utils/bindURLParams";
import { isEmptyObject } from "../../utils/isEmptyObject";

export type Breadcrumb = {
  title?: string;
  translationId?: string;
  pathname: string;
};

interface BreadcrumbStore extends State {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (
    breadcrumbs: Breadcrumb[],
    URLParams?: { [param: string]: string }
  ) => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (
    breadcrumbs: Breadcrumb[],
    URLParams: { [param: string]: string } = {}
  ) =>
    set({
      breadcrumbs: isEmptyObject(URLParams)
        ? breadcrumbs
        : bindURLParams(breadcrumbs, URLParams),
    }),
}));

// for debugging
// useBreadcrumbStore.subscribe(console.log)

export default useBreadcrumbStore;
