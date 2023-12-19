import { getClients } from "../../redux/slices/clients";
import { getConfig } from "../../redux/slices/config";
import { getWaiter } from "../../redux/slices/waiter";
import { useAppSelector } from "../../redux/store";
import style from "./style.module.scss";

const Stats = () => {
  const { clients } = useAppSelector(getClients);
  const waiter = useAppSelector(getWaiter);
  const {
    params: { overallHappiness },
  } = useAppSelector(getConfig);

  const actualClientsCount = Math.min(12, Object.keys(clients).length);

  const happy =
    Math.round(Math.max(0, overallHappiness[overallHappiness.length - 1])) *
    0.35;

  const happyClients = Math.round((actualClientsCount / 12) * 8 * happy);

  const sadClients = Math.round((actualClientsCount - happyClients) / 5);

  return (
    <div className={style.wrapper}>
      <p>Количество клиентов: {actualClientsCount}</p>
      <br />
      <p>Параметры официанта: </p>
      <p>{JSON.stringify(waiter)}</p>
      <br />
      <p>Количество клиентов, довольных обслуживанием: {happyClients}</p>
      <br />
      <p>Количество клиентов, недовольных обслуживанием: {sadClients}</p>
      <br />
      <p>
        Количество клиентов, нейтрально относящихся к обслуживанию:{" "}
        {actualClientsCount - sadClients - happyClients}
      </p>
    </div>
  );
};

export default Stats;
