/**
 * @param {number[][]} state
 * @param {number} color
 * @returns {number[][]} state
 */
export function fillColor(state, color) {
  const curColor = state[0][0];

  const queue = [[0, 0]];
  const itemsToFill = [[0, 0]];

  const used = new Set();

  while (queue.length) {
    const [x, y] = queue.shift();
    if (used.has(`${x}-${y}`)) {
      continue;
    }
    used.add(`${x}-${y}`);
    if (state[y + 1] !== undefined) {
      const botNeighbourColor = state[y + 1][x];
      if (botNeighbourColor === curColor) {
        queue.push([x, y + 1]);
        itemsToFill.push([x, y + 1]);
      }
    }

    if (state[y - 1] !== undefined) {
      const topNeighbourColor = state[y - 1][x];
      if (topNeighbourColor === curColor) {
        queue.push([x, y - 1]);
        itemsToFill.push([x, y - 1]);
      }
    }

    const rightNeighbourColor = state[y][x + 1];
    if (rightNeighbourColor === curColor) {
      queue.push([x + 1, y]);
      itemsToFill.push([x + 1, y]);
    }

    const leftNeighbourColor = state[y][x - 1];
    if (leftNeighbourColor === curColor) {
      queue.push([x - 1, y]);
      itemsToFill.push([x - 1, y]);
    }
  }

  const stateClone = state.map(x => x.slice(0));

  itemsToFill.forEach(([x, y]) => {
    stateClone[y][x] = color;
  });

  return stateClone;
}

/**
 * @param {number} size
 * @param {number} colors
 * @returns {number[][]} state
 */
export function getRandomState(size, colors) {
  return Array.from({ length: size }, (_, y) =>
    Array.from({ length: size }, (_, x) => Math.floor(Math.random() * colors))
  );
}
