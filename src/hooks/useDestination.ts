type TPoint = Record<string, number>;

const directions = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

export default (start: TPoint, end: TPoint, grid: number[][]) => {
  const visited = JSON.parse(JSON.stringify(grid));
  visited[start.x][start.y] = 1;

  const queue = [{ x: start.x, y: start.y }];

  while (queue.length) {
    const currentNode = queue[0];
    queue.shift();

    for (let i = 0; i < directions.length; ++i) {
      const x = currentNode.x + directions[i][0];
      const y = currentNode.x + directions[i][1];

      if (!visited[x][y]) {
        continue;
      }

      queue.push({ x, y });
      visited[x][y] = 1;
    }
  }
};
