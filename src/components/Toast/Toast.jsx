import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
  });
};

export const showInfoToast = (message) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
  });
};
