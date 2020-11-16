import Square from "../square/square";
import React from "react";
import calculateWinner from "../services/winner";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      lines: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
    };
  }

  renderSquare(index, position) {
    return (
      <Square
        value={this.props.squares[index]}
        onClick={() => this.props.onClick(index, position)}
      />
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const lines = this.state.lines.map((line, indexLine) => {
      const colones = line.map((index, indexCol) => {
        return (
          <span>
            {this.renderSquare(index, {line: indexLine, col: indexCol})}
          </span>
        );
      });
      return <div className="board-row">{colones}</div>;
    });

    return <div>{lines}</div>;
  }
}

export default Board;
