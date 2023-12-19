import { Slider, Button } from "@mui/material";
import style from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  getConfig,
  setClientSpeed,
  setFoodQuality,
  setLeaveRate1,
  setLeaveRate2,
  setSpawnRate,
  setToggleSimulation,
  setWaiterSpeed,
} from "../../redux/slices/config";
import { clearWaiter } from "../../redux/slices/waiter";
import { clearTables } from "../../redux/slices/tables";
import { clearClients } from "../../redux/slices/clients";

const Config = () => {
  const {
    spawnRate,
    waiterSpeed,
    leaveRate1,
    leaveRate2,
    clientSpeed,
    foodQuality,
    isSimulating,
  } = useAppSelector(getConfig);

  const dispatch = useAppDispatch();

  const handleSetSpawnRate = (_: any, value: number | number[]) => {
    dispatch(setSpawnRate(value));
  };

  const handleSetWaiterSpeed = (_: any, value: number | number[]) => {
    dispatch(setWaiterSpeed(value));
  };

  const handleChangeQuality1 = (_: any, value: number | number[]) => {
    dispatch(setLeaveRate1(value));
  };

  const handleChangeQuality2 = (_: any, value: number | number[]) => {
    dispatch(setLeaveRate2(value));
  };

  const handleChangeClientSpeed = (_: any, value: number | number[]) => {
    dispatch(setClientSpeed(value));
  };

  const handleChangeFoodQuality = (_: any, value: number | number[]) => {
    dispatch(setFoodQuality(value));
  };

  const handleToggleSimulation = () => {
    if (isSimulating) {
      dispatch(clearWaiter());
      dispatch(clearTables());
      dispatch(clearClients());
    }

    dispatch(setToggleSimulation());
  };

  return (
    <div className={style.wrapper}>
      <div>
        <p>Частота прихода клиентов - {((1 / spawnRate) * 500).toFixed(2)}</p>
        <Slider min={0} max={10} onChange={handleSetSpawnRate} />
      </div>
      <div>
        <p>Скорость официанта - {((1 / waiterSpeed) * 500).toFixed(2)}</p>
        <Slider min={0} max={10} onChange={handleSetWaiterSpeed} />
      </div>
      <div>
        <p>Вежливость персонала - {(leaveRate1 / 5000).toFixed(2)}</p>
        <Slider min={0} max={10} onChange={handleChangeQuality1} />
      </div>
      <div>
        <p>Чистота помещения - {(leaveRate2 / 5000).toFixed(2)}</p>
        <Slider min={0} max={10} onChange={handleChangeQuality2} />
      </div>
      <div>
        <p>Суетливость клиентов - {(clientSpeed).toFixed(2)}</p>
        <Slider min={0} max={10} onChange={handleChangeClientSpeed} />
      </div>
      <div>
        <p>Качество еды - {((1 / foodQuality) * 500).toFixed(2)}</p>
        <Slider min={0} max={10} onChange={handleChangeFoodQuality} />
      </div>
      <Button
        onClick={handleToggleSimulation}
        className={style.button}
        variant="contained"
      >
        {isSimulating ? <>Завершить симуляцию</> : <>Провести симуляцию</>}
      </Button>
    </div>
  );
};

export default Config;
