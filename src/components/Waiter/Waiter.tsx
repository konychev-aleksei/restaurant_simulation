import { FC } from "react";
import style from "./style.module.scss";

type WaiterProps = { x: number; y: number };

const Waiter: FC<WaiterProps> = ({ x, y }) => {
  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      className={style.dot}
    />
  );
};

export default Waiter;
