import React from "react";
import ReactDOM from "react-dom";

import { getRandomState, fillColor } from "./api";

function rnd(max) {
  return Math.floor(Math.random() * max);
}

function getColorSelector(colors) {
  const hash = {};

  for (let i = 0; i < colors; i++) {
    hash[i] = `rgb(${[rnd(256), rnd(256), rnd(256)]})`;
  }
  return color => hash[color];
}

const GAME_SIZE = 21;

class App extends React.Component {
  state = {
    size: GAME_SIZE,
    colors: 5,
    board: getRandomState(GAME_SIZE, 5),
    colorSelector: getColorSelector(5),
    score: 0
  };

  changeLevel = level => {
    this.setState({
      colors: level,
      board: getRandomState(GAME_SIZE, level),
      colorSelector: getColorSelector(level),
      score: 0
    });
  };

  render() {
    return (
      <div>
        Score: {this.state.score}
        <button onClick={() => this.changeLevel(this.state.colors - 1)}>
          -
        </button>
        <span>Level {this.state.colors}</span>
        <button onClick={() => this.changeLevel(this.state.colors + 1)}>
          +
        </button>
        <hr />
        <table>
          <tbody>
            {this.state.board.map((row, y) => (
              <tr key={y}>
                {row.map((color, x) => (
                  <td
                    style={{
                      background: this.state.colorSelector(color),
                      width: 20,
                      height: 20,
                      transition: "all 0.2s ease-in",
                      transitionDelay: `${(x + y) * 100}ms`
                    }}
                    key={`${x}-${y}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        {Array.from({ length: this.state.colors }, (_, color) => (
          <button
            onClick={() =>
              this.setState(state => ({
                board: fillColor(state.board, color),
                score: state.score + 1
              }))
            }
            key={color}
            style={{
              background: this.state.colorSelector(color),
              width: 40,
              height: 40
            }}
          />
        ))}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

function render() {
  ReactDOM.render(<App />, rootElement);
}

render();
