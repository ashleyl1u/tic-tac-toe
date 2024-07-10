

function player (sign, name)  {
  const getSign = () => {
    return sign;
  }

  const getName = () => {
    return name;
  }
  return {getSign, getName}
}


const gameBoard = (() =>  {
  const board = ['','','','','','','','',''];


  const setField = (index, playerSign) => {
    board[index]=playerSign;
  }

  const getField = (index) => {
    return board[index];
  }

  return {board, setField , getField};

})();




const gameController = (() => {

  let player1;
  let player2;
  let round = 1;
  let gameOver = false;

  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name1 = document.getElementById('player-1').value;
    const name2 = document.getElementById('player-2').value;

    if(name1 !== '' && name2 !== ''){
      player1 = player('x', name1);
      player2 = player('o', name2);
      document.getElementById('form').reset();
      displayController.closeOverlay();
    }
    else{
      if(name1 === ''){
        displayController.updateErrorMessage(document.getElementById('error-msg-player-1'));
      }
      if(name2 === ''){
        displayController.updateErrorMessage(document.getElementById('error-msg-player-2'));
      }
    }
  });


  



  
  const getCurrentPlayer = () => {
    return round%2===0 ? player2 : player1;
  } 

  const playRound = (moveIndex) => {
    console.log(getCurrentPlayer());
    gameBoard.setField(moveIndex, getCurrentPlayer().getSign());
    displayController.updateBoard();
    

    if(checkWin(moveIndex) || checkDraw()){
      gameOver = true;
    }
    else{
      round++;
      displayController.updateGameMessage(`${getCurrentPlayer().getName()} turn`);
    }
    
    isGameOver()
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

    return winPossibilities
    .filter(possibilities => possibilities.includes(moveIndex))
    .some(possibilities => possibilities.every(index => 
      gameBoard.getField(index) === getCurrentPlayer().getSign()
    ));
  }


  const checkDraw = () => {
    return round ===9 ? true : false;
  }

  const isGameOver = () => {
    return gameOver ? true : false;
  }


  return {playRound, getCurrentPlayer};

})();


const displayController = (() =>{
  

  document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', () => {
      if(cell.textContent === ''){
        const index = cell.getAttribute('id');
        gameController.playRound(Number(index));
      }
    });
  });


  const updateBoard = () => {
    for(let i =0; i<gameBoard.board.length ; i++){
      if(gameBoard.getField(i) !== ''){
        document.getElementById(`${i}`).textContent = gameBoard.getField(i);
      }
    }
  }

  const updateGameMessage = (message) => {
    document.getElementById('game-messages').textContent = message;
  }


  //error handling
  const updateErrorMessage = (element) => {
    element.textContent = '*Field Required';
  }

  document.querySelectorAll('.input').forEach((input) => {
    input.addEventListener('focus', () => {
      document.getElementById(`error-msg-${input.getAttribute('id')}`).textContent = '';
    })
  })

  const closeOverlay = () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('form-container').style.display = 'none';
  }
  
  return {updateBoard, updateGameMessage, updateErrorMessage, closeOverlay};

})();







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