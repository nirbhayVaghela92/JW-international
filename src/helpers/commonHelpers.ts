export function formatPrice(price) {
  if (typeof price !== "number" || isNaN(price)) return "";

  return price.toLocaleString("en-IN");
}

export const getLabelFromKey = (key:any, list: any[]) => {
  return list.find((item) => item.key === key)?.label ?? "";
}