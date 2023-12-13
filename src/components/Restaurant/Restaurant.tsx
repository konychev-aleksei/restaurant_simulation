import style from "./style.module.scss";
import { useAppSelector } from "../../redux/store";
import { getTables } from "../../redux/slices/tables";
import Table from "../Table/Table";
import Client from "../Client/Client";
import Waiter from "../Waiter/Waiter";
import { getClients } from "../../redux/slices/clients";
import { getWaiters } from "../../redux/slices/waiters";

const RestaurantModel = () => {
  const { tables } = useAppSelector(getTables);
  const { clients } = useAppSelector(getClients);
  const { waiters } = useAppSelector(getWaiters);

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
      {Object.entries(waiters).map(([id, waiter]: any) => (
        <Waiter key={id} x={waiter.x} y={waiter.y} />
      ))}
    </div>
  );
};

export default RestaurantModel;
