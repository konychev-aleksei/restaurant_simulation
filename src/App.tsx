import RestaurantModel from "./components/Restaurant/Restaurant";
import style from "./app.module.scss";

const App = () => {
  return (
    <div className={style.wrapper}>
      <RestaurantModel />
    </div>
  );
};

export default App;
