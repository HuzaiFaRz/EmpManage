import { ClipLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[80px] h-[80px] flex justify-center items-center">
      <ClipLoader size={50} color="red" />
    </div>
  );
};

export default LoadingSpinner;
