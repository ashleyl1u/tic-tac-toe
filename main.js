

function player (sign, name, id)  {

  let score =0;

  const updateScore = () => {
    score++;
  }

  const getScore = () => {
    return score;
  }

  const getSign = () => {
    return sign;
  }

  const getName = () => {
    return name;
  }

  const getId = () => {
    return id;
  }
  return {getSign, getName, getId, updateScore, getScore}
}


const gameBoard = (() =>  {
  const board = ['','','','','','','','',''];


  const setField = (index, playerSign) => {
    board[index]=playerSign;
  }

  const getField = (index) => {
    return board[index];
  }

  const resetBoard = () => {
    for(let i =0; i<board.length; i++){
      board[i] = '';
    }
  }

  return {board, setField , getField, resetBoard};

})();




const gameController = (() => {

  let player1;
  let player2;
  let round;;
  let gameOver;
  let game;


  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name1 = document.getElementById('player-1-input').value;
    const name2 = document.getElementById('player-2-input').value;

    if(name1 !== '' && name2 !== ''){
      player1 = player('x', name1, '1');
      player2 = player('o', name2, '2');
      round =1;
      gameOver=false;
      game=1;

      gameBoard.resetBoard();
      displayController.updateBoard();

      displayController.displayPlayerName(player1);
      displayController.displayPlayerName(player2);

      displayController.updatePlayerScore(player1);
      displayController.updatePlayerScore(player2);


      document.getElementById('form').reset();
      displayController.closeOverlay();
      displayController.updateGameMessage(`${getCurrentPlayer().getName()} turn`);
      
    }
    else{
      if(name1 === ''){
        displayController.updateErrorMessage(document.getElementById('error-msg-player-1-input'));
      }
      if(name2 === ''){
        displayController.updateErrorMessage(document.getElementById('error-msg-player-2-input'));
      }
    }
  });


  document.getElementById('new-round').addEventListener('click', () => {
    newRound();
  })

  const newRound = () => {
    game++;
    gameBoard.resetBoard();
    displayController.updateBoard();
    displayController.updateGameMessage(`${getCurrentPlayer().getName()} turn`);
    gameOver = false;
    round = 1;
  }


  document.getElementById('new-game').addEventListener('click', () => {
    displayController.openOverlay();
  });
  



  
  const getCurrentPlayer = () => {
    if(game %2 !== 0){
      return round%2===0 ? player2 : player1;
    }
    else{
      return round%2===0 ? player1 : player2;
    }
    
  } 

  const playRound = (moveIndex) => {
    if(!isGameOver()){
      gameBoard.setField(moveIndex, getCurrentPlayer().getSign());
      displayController.updateBoard();
      
  
      if(checkWin(moveIndex)){
        displayController.updateGameMessage(`${getCurrentPlayer().getName()} Wins!` );
        gameOver=true;
        getCurrentPlayer().updateScore();
        displayController.updatePlayerScore(getCurrentPlayer());
  
      }
      else if (checkDraw()){
        displayController.updateGameMessage(`Draw!`);
        gameOver=true;
      }
      else{
        round++;
        displayController.updateGameMessage(`${getCurrentPlayer().getName()} turn`);
      }
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
      document.getElementById(`${i}`).textContent = gameBoard.getField(i);
    }
  }

  const updateGameMessage = (message) => {
    document.getElementById('game-messages').textContent = message;
  }

  const displayPlayerName = (player) => {
    document.getElementById(`player-${player.getId()}-name`).textContent = player.getName();
  }
  const updatePlayerScore = (player) => {
    document.getElementById(`player-${player.getId()}-score`).textContent = player.getScore();
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

  const openOverlay = () => {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('form-container').style.display = 'flex';
  }
  
  return {updateBoard, updateGameMessage, updateErrorMessage, closeOverlay, openOverlay, displayPlayerName, updatePlayerScore};

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