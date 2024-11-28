import { toast } from "react-toastify";

const MessageStyle = {
  style: { width: "100%", lineHeight: "20px" },
  autoClose: 2000,
  theme: "dark",
  position: "top-center",
  draggablePercent: 100,
};

const rejectMessage = (message) => {
  toast.error(message, MessageStyle);
};
const resolveMessage = (message) => {
  toast.success(message, MessageStyle);
};
export { rejectMessage, resolveMessage };
