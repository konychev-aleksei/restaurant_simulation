import { FC } from "react";
import style from "./style.module.scss";

type ClientProps = { x: number; y: number };

const Client: FC<ClientProps> = ({ x, y }) => {
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

export default Client;
