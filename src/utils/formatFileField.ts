export const formatFileField = (field: File | string | null) => {
  if (!Boolean(field)) return null;

  if (typeof field === "string") {
    return field;
  }

  return URL.createObjectURL(field as Blob);
};
