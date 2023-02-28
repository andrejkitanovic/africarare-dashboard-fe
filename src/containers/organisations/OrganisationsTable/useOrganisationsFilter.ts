import { useMemo, useState } from "react";

import { QueryParamsType } from "api/utils";
import { useDebounce } from "utils/hooks/useDebounce";

function useOrganisationsFilter(initialFilters?: QueryParamsType) {
  const [search, setSearch] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setSearch(e.target.value);

  const debouncedSearch = useDebounce(search, 500);

  const filters = useMemo(
    () => ({ ...initialFilters, q: debouncedSearch }),
    [initialFilters, debouncedSearch]
  );

  return { filters, searchField: { value: search, onChange } };
}

export { useOrganisationsFilter };
