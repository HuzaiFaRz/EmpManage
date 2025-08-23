import { toast } from "react-toastify";

const MessageStyle = {
  style: { width: "100%", lineHeight: "20px" },
  autoClose: 1000,
  theme: "dark",
  position: "top-center",
};

const ThemeLightToDark =
  "bg-colorOne dark:bg-colorTwo text-colorTwo dark:text-colorOne";

const ThemeDarkToLight =
  "bg-colorTwo text-colorOne dark:bg-colorOne dark:text-colorTwo";

const rejectMessage = (message) => {
  toast.error(message, MessageStyle);
};
const resolveMessage = (message) => {
  toast.success(message, MessageStyle);
};

let toastId = null;
const loadingMessage = (msg) => {
  toastId = toast.loading(msg);
};

const dismissLoadingMessage = () => {
  if (toastId) {
    toast.dismiss(toastId);
    toastId = null; // reset
  }
};

export {
  rejectMessage,
  resolveMessage,
  loadingMessage,
  dismissLoadingMessage,
  ThemeLightToDark,
  ThemeDarkToLight,
  MessageStyle,
};
