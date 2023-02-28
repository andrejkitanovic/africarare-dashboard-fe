export const objectToFormData = (
  object: any,
  formData?: FormData,
  prepend?: string
): FormData => {
  let formDataUsed = formData ? formData : new FormData();
  for (let key in object) {
    let keyText = prepend ? `${prepend}[${key}]` : key;

    if (Array.isArray(object[key])) {
      object[key].forEach((item: any, index: number) => {
        objectToFormData(item, formDataUsed, `${keyText}[${index}]`);
      });
    } else if (
      typeof object[key] === "object" &&
      !(object[key] instanceof File)
    ) {
      objectToFormData(object[key], formDataUsed, `${keyText}`);
    } else {
      formDataUsed.append(`${keyText}`, object[key]);
    }
  }

  return formDataUsed;
};
