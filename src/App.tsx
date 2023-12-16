import RestaurantModel from "./components/Restaurant/Restaurant";
import style from "./app.module.scss";
import useAppManager from "./hooks/useAppManager";
import Config from "./components/Config/Config";

const App = () => {
  useAppManager();

  return (
    <div className={style.wrapper}>
      <RestaurantModel />
      <Config />
    </div>
  );
};

export default App;
