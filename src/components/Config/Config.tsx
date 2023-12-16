import { Slider } from "@mui/material";
import style from "./style.module.scss";
import { useAppDispatch } from "../../redux/store";
import { setSpawnRate } from "../../redux/slices/config";

const Config = () => {
  const dispatch = useAppDispatch();

  const handleSetSpawnRate = (_: any, value: number | number[]) => {
    dispatch(setSpawnRate(value));
  };

  return (
    <div className={style.wrapper}>
      <div>
        <p>Частота прихода клиентов</p>
        <Slider min={0} max={10} onChange={handleSetSpawnRate} />
      </div>
    </div>
  );
};

export default Config;
