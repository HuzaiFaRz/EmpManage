import { toast } from "react-toastify";

const MessageStyle = {
  style: { width: "100%", lineHeight: "20px" },
  autoClose: 2000,
  theme: "dark",
  position: "top-center",
  draggablePercent: 100,
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
export { rejectMessage, resolveMessage, ThemeLightToDark, ThemeDarkToLight };
