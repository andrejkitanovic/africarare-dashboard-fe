import { useState } from "react";

function useTableFields(defaultFields: string[] | undefined) {
  const [tableFields, setTableFields] = useState<string[] | undefined>(
    defaultFields
  );

  return {
    tableFields,
    setTableFields,
  };
}

export default useTableFields;
