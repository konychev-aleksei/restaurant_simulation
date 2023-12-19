import RestaurantModel from "./components/Restaurant/Restaurant";
import style from "./app.module.scss";
import Config from "./components/Config/Config";
import ChartsList from "./components/Chart/ChartsList";
import Stats from "./components/Stats/Stats";
import { useAppSelector } from "./redux/store";
import { getConfig } from "./redux/slices/config";

const App = () => {
  const { isSimulating } = useAppSelector(getConfig);

  return (
    <div className={style.wrapper}>
      {isSimulating && (
        <>
          <RestaurantModel />
          <ChartsList />
          <Stats />
        </>
      )}
      <Config />
    </div>
  );
};

export default App;
