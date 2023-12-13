import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { assignTable, generateTables, getTables } from "../redux/slices/tables";
import {
  getClients,
  moveClientsToTable,
  spawnClient,
  assignClient,
  clientLeave,
} from "../redux/slices/clients";
import {
  getWaiters,
  moveWaiters,
  spawnWaiter,
  assignWaiter,
} from "../redux/slices/waiters";

export default () => {
  const dispatch = useAppDispatch();

  const { tables } = useAppSelector(getTables);
  const { clients } = useAppSelector(getClients);
  const { waiters } = useAppSelector(getWaiters);

  useEffect(() => {
    dispatch(generateTables({ count: 8, tableSize: 4 }));

    for (let i = 0; i < 3; ++i) {
      dispatch(spawnWaiter());
    }
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(spawnClient());
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(moveClientsToTable());
      dispatch(moveWaiters());
    });

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

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
      let freeWaiter: any = null;

      Object.entries(waiters).forEach(([id, waiter]: any) => {
        if (!waiter.isServing) {
          freeWaiter = { ...waiter, id };
        }
      });

      let unservedClient: any = null;

      Object.entries(clients).forEach(([id, client]: any) => {
        if (!client.isServed && client.isSet) {
          unservedClient = { ...client, id };
        }
      });

      if (unservedClient && freeWaiter) {
        dispatch(assignWaiter({ table: unservedClient.table, freeWaiter }));

        return;
      }
    });

    return () => {
      clearInterval(timeInterval);
    };
  }, [tables, clients, waiters]);
};
