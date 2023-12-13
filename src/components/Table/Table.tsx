import { FC } from "react";
import style from "./style.module.scss";

type TableProps = {
  x: number;
  y: number;
};

const Table: FC<TableProps> = ({ x, y }) => {
  return <div style={{ top: y, left: x }} className={style.table} />;
};

export default Table;
