import Swal from "sweetalert2";

export const swalError = (title?: string, text?: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "OKE",
  });
};
