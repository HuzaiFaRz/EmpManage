const ThemeChangerButton = () => {
  const themeChangerHandler = () => {
    console.log(this);
  };
  return <button onClick={themeChangerHandler}>Dark</button>;
};

export default ThemeChangerButton;
