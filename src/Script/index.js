import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const MessageStyle = {
  style: { width: "100%", lineHeight: "20px" },
  autoClose: 2000,
  theme: "dark",
  position: "top-center",
  draggablePercent: 60,
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

let loadingToastId;

const loadingMessage = (message) => {
  loadingToastId = toast.loading(message, MessageStyle);
};

const dismissLoadingMessage = () => {
  if (loadingToastId) {
    toast.dismiss(loadingToastId);
    loadingToastId = null;
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
