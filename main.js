

function player (sign)  {
  const getSign = () => {
    return sign;
  }
  return {sign, getSign}
}


const gameBoard = (() =>  {
  const board = ['-','-','-','-','-','-','-','-','-'];


  const setField = (index, playerSign) => {
    board[index]=playerSign;
  }

  const getField = (index) => {
    return board[index];
  }

  return {board, setField , getField};

})();




const gameController = (() => {
  const player1 = player('x');
  const player2 = player('o');
  let round = 1;
  let gameOver = false;

  
  const getCurrentPlayer = () => {
    return round%2===0 ? player2.getSign() : player1.getSign();
  } 

  const playRound = (moveIndex) => {
    gameBoard.setField(moveIndex, getCurrentPlayer());
    console.log(checkWin(moveIndex) , checkDraw());
    if(checkWin(moveIndex) || checkDraw()){
      gameOver = true;
    }
    else{
      round++;
    }
    
  }

  const checkWin = (moveIndex) => {
    const winPossibilities = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ]
    
    //filter --> returns possible wins related to the players recent move
    //some --> returns true if at least one of the possible wins are true
    //every iterates through a win possibility and checks if the related fields are selected by the player

    console.log(moveIndex);
    console.log(typeof(moveIndex))
    console.log(winPossibilities
      .filter(possibilities => possibilities.includes(moveIndex)));
    return winPossibilities
    .filter(possibilities => possibilities.includes(moveIndex))
    .some(possibilities => possibilities.every(index => 
      gameBoard.getField(index) === getCurrentPlayer()
    ));
  }


  const checkDraw = () => {
    return round ===9 ? true : false;
  }

  const isGameOver = () => {
    return gameOver ? true : false;
  }


  return {playRound, isGameOver};

})();


const displayController = (() =>{
  /*
  const displayBoard = () =>{
    let row = '';
    for(let i =0; i<gameBoard.board.length ; i++){
      row += gameBoard.board[i]+ ' ';
      if(i ===2 || i===5 || i===8){
        console.log(row);
        row='';
      }
      
    }
    
  }

  return {displayBoard};

  */
})();





/*

while(gameController.isGameOver() === false){
  displayController.displayBoard();
  gameController.playRound(Number(prompt("Enter your move")));
  //console.log(gameController.isGameOver());
}

console.log('game over');

displayController.displayBoard();
gameController.playRound(0);
displayController.displayBoard();
gameController.playRound(2);
displayController.displayBoard();
gameController.playRound(3);
displayController.displayBoard();
gameController.playRound(4);
displayController.displayBoard();
gameController.playRound(6);
displayController.displayBoard();
*/