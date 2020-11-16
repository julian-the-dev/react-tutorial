import Board from "../board/board";
import React from "react";
import calculateWinner from "../services/winner";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: null,
          mark: "X",
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(index, position) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const mark = this.state.xIsNext ? "X" : "O";
    squares[index] = mark;
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position,
          mark,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  getMovesRender() {
    return this.state.history.map((currentHistory, index) => {
      const currentPos = currentHistory.position;
      const description = index
        ? "Revenir au tour n°" + index
        : "Revenir au début de la partie";
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{description}</button>
          {currentPos ? (
            <span>
              {currentHistory.mark} : line {currentPos.line + 1}, col:{" "}
              {currentPos.col + 1}
            </span>
          ) : null}
        </li>
      );
    });
  }

  getStatusRender() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = winner + " a gagné";
    } else {
      status =
        this.state.stepNumber === 9
          ? "Match null "
          : "Prochain joueur : " + (this.state.xIsNext ? "X" : "O");
    }
    return status;
  }

  getCurrentSquare() {
    return this.state.history[this.state.stepNumber].squares;
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.getCurrentSquare()}
            onClick={(index, position) => this.handleClick(index, position)}
          />
        </div>
        <div className="game-info">
          <div>{this.getStatusRender()}</div>
          <ol>{this.getMovesRender()}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
