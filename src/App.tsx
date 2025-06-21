import React, { useState, useEffect } from 'react';
import { RotateCcw, Star, Heart, Sparkles } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  const checkWinner = (board: Board): Player | 'draw' | null => {
    // Check for winning combinations
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    
    // Check for draw
    if (board.every(cell => cell !== null)) {
      return 'draw';
    }
    
    return null;
  };

  useEffect(() => {
    const gameResult = checkWinner(board);
    setWinner(gameResult);
  }, [board]);

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const getStatusMessage = () => {
    if (winner === 'draw') {
      return "It's a tie! Great game! 🎮";
    }
    if (winner) {
      return `🎉 Player ${winner} wins! Amazing! 🎉`;
    }
    return `Player ${isXNext ? 'X' : 'O'}'s turn`;
  };

  const getStatusColor = () => {
    if (winner === 'draw') return 'text-yellow-600';
    if (winner) return 'text-green-600';
    return isXNext ? 'text-purple-600' : 'text-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Tic-Tac-Toe
            </h1>
            <Heart className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          
          {/* Game Status */}
          <div className={`text-xl font-semibold ${getStatusColor()} mb-4`}>
            {getStatusMessage()}
          </div>

          {/* Player Indicators */}
          <div className="flex justify-center gap-8 mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isXNext && !winner ? 'bg-purple-100 ring-2 ring-purple-300 scale-105' : 'bg-gray-100'
            }`}>
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <span className="font-medium text-purple-700">Player X</span>
            </div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              !isXNext && !winner ? 'bg-pink-100 ring-2 ring-pink-300 scale-105' : 'bg-gray-100'
            }`}>
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="font-medium text-pink-700">Player O</span>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`
                aspect-square rounded-2xl border-4 transition-all duration-300 transform
                ${cell ? 'cursor-default' : 'cursor-pointer hover:scale-105 hover:shadow-lg'}
                ${cell === 'X' 
                  ? 'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-300 text-white' 
                  : cell === 'O' 
                  ? 'bg-gradient-to-br from-pink-400 to-pink-600 border-pink-300 text-white'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300 hover:from-gray-100 hover:to-gray-200'
                }
              `}
              disabled={!!cell || !!winner}
            >
              {cell && (
                <span className="text-4xl font-bold animate-in zoom-in-75 duration-300">
                  {cell}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Winner Celebration */}
        {winner && winner !== 'draw' && (
          <div className="text-center mb-6">
            <div className="flex justify-center gap-2 animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <Sparkles className="w-6 h-6 text-pink-500" />
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            New Game
          </button>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Have fun playing! 🎈</p>
        </div>
      </div>
    </div>
  );
}

export default App;