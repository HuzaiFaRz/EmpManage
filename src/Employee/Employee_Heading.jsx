// eslint-disable-next-line react/prop-types
const Employee_Heading = ({ HeadingText }) => {
  return (
    <h1 className="font-semibold tracking-tighter text-4xl w-[100%]  py-2 text-center">
      {HeadingText}
    </h1>
  );
};

export default Employee_Heading;
