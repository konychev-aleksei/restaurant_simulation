import Table from "../Table/Table";
import Client from "../Client/Client";
import style from "./style.module.scss";

export const TABLE_SIZE = 8;

export const GRID_SIZE = 72;

export const grid = ((size: number) => {
  const grid = new Array(size);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(size).fill(0);
  }

  return grid;
})(GRID_SIZE);

const closeSpaceByTable = (x: number, y: number) => {
  for (let i = x; i < x + TABLE_SIZE; i++) {
    for (let j = y; j < y + TABLE_SIZE; j++) {
      console.log(i, j);
      grid[i][j] = 1;
    }
  }
};

const generateTables = (size: number) => {
  const tables = new Array(size);

  for (let i = 0; i < tables.length; i++) {
    tables[i] = Array.from(new Array(4)).map((_, j) => {
      const tableExists = Math.round(Math.random());

      if (tableExists) {
        const x = 8 * (j * 2 + 1);
        const y = 8 * (i * 2 + 1);

        closeSpaceByTable(x, y);

        return {
          x,
          y,
          top: {
            x: x + TABLE_SIZE / 2,
            y,
          },
          bottom: {
            x: x + TABLE_SIZE / 2,
            y: y + TABLE_SIZE,
          },
        };
      }

      return null;
    });
  }

  return [].concat.apply([], tables);
};

type TTable = Record<string, number> | null;

const RestaurantModel = () => {
  const tables = generateTables(4);

  return (
    <div className={style.wrapper}>
      <Client />
      {tables.map((table: TTable, i: number) => {
        if (!table) {
          return null;
        }

        return <Table key={i} x={table.x} y={table.y} />;
      })}
    </div>
  );
};

export default RestaurantModel;
