import { useMemo, useState } from "react";

import { ExperiencesType } from "api/experiences/types";
import { QueryParamsType } from "api/utils";
import { useDebounce } from "utils/hooks/useDebounce";

function useExperiencesFilter(
  initialFilters?: QueryParamsType<ExperiencesType>
) {
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

export { useExperiencesFilter };
