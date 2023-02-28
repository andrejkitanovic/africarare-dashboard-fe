export const downloadFile = (
  file: BlobPart,
  name: string,
  extension: "csv"
) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${name}-${Date.now()}.${extension}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
