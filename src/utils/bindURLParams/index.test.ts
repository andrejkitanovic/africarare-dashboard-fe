import { Breadcrumb } from "../../components/stores/BreadcrumbStore";

import { bindURLParams } from "./index";

const breadcrumbs: Breadcrumb[] = [
  {
    title: "Edit Project",
    pathname: "/projects/:projectId/edit",
  },
  {
    translationId: "BREADCRUMB.TITLE",
    pathname: "/projects/:projectId/edit",
  },
  {
    title: "Edit Project",
    translationId: "BREADCRUMB.TITLE",
    pathname: "/projects/:projectId/edit",
  },
];

const URLParams = { projectId: "123" };

const expectedBreadcrumbs = [
  {
    title: "Edit Project",
    pathname: "/projects/123/edit",
  },
  {
    translationId: "BREADCRUMB.TITLE",
    pathname: "/projects/123/edit",
  },
  {
    title: "Edit Project",
    translationId: "BREADCRUMB.TITLE",
    pathname: "/projects/123/edit",
  },
];

test("should bind URL params in breadcrumb pathname to value from URLParams", () => {
  expect(bindURLParams(breadcrumbs, URLParams)).toStrictEqual(
    expectedBreadcrumbs
  );
});
