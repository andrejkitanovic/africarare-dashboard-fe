import { ChangeEvent, useState } from "react";

import { useDebounce } from "utils/hooks/useDebounce";

function useSearchFilter() {
  const [search, setSearch] = useState("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setSearch(e.target.value);

  return {
    searchField: { value: search, onChange },
    debouncedSearch: useDebounce(search, 500),
  };
}

export { useSearchFilter };
