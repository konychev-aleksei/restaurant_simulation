import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { assignTable, generateTables, getTables } from "../redux/slices/tables";
import {
  getClients,
  moveClientsToTable,
  moveClientsToExit,
  spawnClient,
  assignClient,
  clientLeave,
} from "../redux/slices/clients";
import { getWaiter, moveWaiter, assignWaiter } from "../redux/slices/waiter";
import { getConfig, setParams } from "../redux/slices/config";

export default () => {
  const dispatch = useAppDispatch();

  const { tables } = useAppSelector(getTables);
  const { clients } = useAppSelector(getClients);
  const waiter = useAppSelector(getWaiter);
  const { isSimulating } = useAppSelector(getConfig);

  const { spawnRate, waiterSpeed, leaveRate1, leaveRate2, clientSpeed } =
    useAppSelector(getConfig);

  useEffect(() => {
    if (isSimulating) {
      dispatch(generateTables({ count: 8, tableSize: 4 }));
    }
  }, [isSimulating]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(spawnClient());
    }, spawnRate);

    return () => {
      clearInterval(timeInterval);
    };
  }, [spawnRate]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(clientLeave());
    }, (leaveRate1 + leaveRate2) / 2);

    return () => {
      clearInterval(timeInterval);
    };
  }, [leaveRate1, leaveRate2]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(moveClientsToTable(clientSpeed));
      dispatch(moveClientsToExit(clientSpeed));
      dispatch(moveWaiter(waiterSpeed));
    });

    return () => {
      clearInterval(timeInterval);
    };
  }, [waiterSpeed, clientSpeed]);

  // доводит клиента до стола
  useEffect(() => {
    const timeInterval = setInterval(() => {
      let freeTable: any = null;

      Object.entries(tables).forEach(([id, table]: any) => {
        if (!table.clientId) {
          freeTable = { ...table, id };
        }
      });

      let freeClient: any = null;

      Object.entries(clients).forEach(([id, client]: any) => {
        if (!client.table.id) {
          freeClient = { ...client, id };
        }
      });

      if (freeClient && freeTable) {
        dispatch(assignTable({ freeClient, freeTable }));
        dispatch(assignClient({ freeClient, freeTable }));

        return;
      }

      if (freeClient) {
        dispatch(clientLeave(freeClient.id));
      }
    });

    return () => {
      clearInterval(timeInterval);
    };
  }, [tables, clients]);

  // доводит официанта до необслуженного клиента
  useEffect(() => {
    const timeInterval = setInterval(() => {
      let unservedClient: any = null;

      const clientsEntries = Object.entries(clients);

      for (let i = 0; i < clientsEntries.length; ++i) {
        const [id, client]: any = clientsEntries[i];

        if (
          client.isSet &&
          waiter.target !== id &&
          !waiter.served.includes(id)
        ) {
          unservedClient = { ...client, id };
          break;
        }
      }

      if (unservedClient && !waiter.target) {
        dispatch(
          assignWaiter({
            table: unservedClient.table,
            clientId: unservedClient.id,
          })
        );

        return;
      }
    });

    return () => {
      clearInterval(timeInterval);
    };
  }, [tables, clients, waiter]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(setParams());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);
};
