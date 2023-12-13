import RestaurantModel from "./components/Restaurant/Restaurant";
import style from "./app.module.scss";
import useAppManager from "./hooks/useAppManager";

const App = () => {
  useAppManager();

  return (
    <div className={style.wrapper}>
      <RestaurantModel />
    </div>
  );
};

export default App;
