import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Componente Quadrado do jogo
// Esse componente renderiza o botão
class Square extends React.Component {
    // Exibir o valor de estado atual quando clicado
    render() {
        return (
            <button className="square"
                // setState faz com que renderize o quadrado que teve um clique e apareça um X 
                onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

// Componente Tabuleiro do jogo, esse componente renderiza os 9 quadrados do jogo
class Board extends React.Component {
    // Esse construtor define que seu estado inicial será um array de 9 posições
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    // Sempre que um jogador fizer uma jogada, xIsNext (um boolean) será trocado para 
    // determinar qual jogador será o próximo e o state do jogo será salvo
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
      }


    // Instruir cada quadrado qual é o valor correto ('X', 'O' ou null)
    renderSquare(i) {
        return <Square value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }
    // Definir quem irá jogar o proximo turno
    // Checar se um jogador venceu. Caso tenha vencido, podemos mostrar um texto como “Winner: X” ou “Winner: O”
    render() {
        const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// Componente Jogo
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
// Dado um array de 9 quadrados, esta função irá verificar se há um vencedor e retornará 'X', 'O' ou null 
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
