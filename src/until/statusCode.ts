export const getStatusCode = (stausCode: string) => {
  switch (stausCode) {
    case "P2009":
      return "Điền thiếu thông tin";
    case "P2002":
      return "Email đã tồn tại";
  }
};
