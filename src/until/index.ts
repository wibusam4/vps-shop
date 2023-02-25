export const formatPrices = (price: number) => {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const formatNumber = (value: number) => {
  return value.toLocaleString("en-IN", {
    maximumSignificantDigits: 3,
  });
};

export const getColorStatus = (status: string) => {
  return status === "ACTIVE" ? "" : "text-error";
};

export const getBageStatus = (status: string)=>{
  return status ==="ACTIVE" ? "badge badge-primary" : "badge badge-accent"
}

export const getStatus = (status: string) => {
  return status === "ACTIVE" ? "Còn hàng" : "Hết Hàng";
};

export const menuProduct = () => {
  return [
    "STT",
    "Name",
    "Danh Mục",
    "Giá",
    "Cpu",
    "Ram",
    "OS",
    "Băng Thông",
    "Slug",
    "Status",
    "Ngày Tạo",
    "Ngày Sửa",
    "Thao Tác"
  ];
};

export const setLocal = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocal = (key: string) => {
  return localStorage.getItem(key) || 'emerald';
};

export const dataTheme = [
  "dracula",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
