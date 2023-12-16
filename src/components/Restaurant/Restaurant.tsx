import style from "./style.module.scss";
import { useAppSelector } from "../../redux/store";
import { getTables } from "../../redux/slices/tables";
import Table from "../Table/Table";
import Client from "../Client/Client";
import Waiter from "../Waiter/Waiter";
import { getClients } from "../../redux/slices/clients";
import { getWaiter } from "../../redux/slices/waiter";
import useAppManager from "../../hooks/useAppManager";

const RestaurantModel = () => {
  const { tables } = useAppSelector(getTables);
  const { clients } = useAppSelector(getClients);
  const waiter = useAppSelector(getWaiter);

  useAppManager();

  return (
    <div className={style.wrapper}>
      {Object.entries(tables).map(([id, table]: any) => {
        if (!table) {
          return null;
        }

        return <Table key={id} x={table.x as number} y={table.y as number} />;
      })}
      {Object.entries(clients).map(([id, client]: any) => (
        <Client key={id} x={client.x} y={client.y} />
      ))}
      <Waiter x={waiter.x} y={waiter.y} />
    </div>
  );
};

export default RestaurantModel;
