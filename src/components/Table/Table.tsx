import { FC } from "react";
import style from "./style.module.scss";

type TableProps = {
  x: number;
  y: number;
};

const Table: FC<TableProps> = ({ x, y }) => {
  return <div style={{ top: x * 10, left: y * 10 }} className={style.table} />;
};

export default Table;
