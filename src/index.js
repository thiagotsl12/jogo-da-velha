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
        };
    }
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }
    
    
    
    // Instruir cada quadrado qual é o valor correto ('X', 'O' ou null)
    renderSquare(i) {
        return <Square value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const status = 'Next player: X';

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

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
