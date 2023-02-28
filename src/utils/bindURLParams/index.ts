import { Breadcrumb } from "../../components/stores/BreadcrumbStore";

/*
 * Function for binding URL params key to value in breadcrumbs
 * example:
 * input: [{ title: "Organization", pathname: "organization/:organizationId" }]
 * output: [{ title: "Organization", pathname: "organization/346a28c7-229a-45c3-9e57-06054409c67d" }]
 */
const bindURLParams = (
  breadcrumbs: Breadcrumb[],
  URLParams: { [key: string]: any }
) =>
  breadcrumbs &&
  breadcrumbs.reduce((acc: Breadcrumb[], curr) => {
    const bindedPath = curr.pathname
      .split("/")
      .map((part) => {
        if (part.startsWith(":")) {
          return URLParams[part.substr(1)];
        }
        return part;
      })
      .join("/");
    return [...acc, { ...curr, pathname: bindedPath }];
  }, []);

export { bindURLParams };
