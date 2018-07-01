import { fillColor } from "./index";

test("fillColor", () => {
  const initialState = [[0, 0, 1, 1], [0, 1, 1, 0], [0, 0, 0, 0], [1, 0, 1, 1]];

  const expectedState = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
  ];

  expect(fillColor(initialState, 1)).toEqual(expectedState);
});
