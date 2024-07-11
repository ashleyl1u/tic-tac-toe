

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


  const formElement = document.getElementById('form');

  let player1;
  let player2;
  let round;
  let gameOver;
  let game;

  const setupNewGame = (name1, name2) => {
    player1 = player('x', name1, '1');
    player2 = player('o', name2, '2');
    round =1;
    gameOver=false;
    game=1;
    gameBoard.resetBoard();

  }

  const renderNewGame = () => {
    displayController.updateBoard();

    displayController.displayPlayerName(player1);
    displayController.displayPlayerName(player2);

    displayController.updatePlayerScore(player1);
    displayController.updatePlayerScore(player2);

    displayController.updateGameMessage(`${getCurrentPlayer().getName()} turn`);


    formElement.reset();
    displayController.closeOverlay();
  }




  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const name1 = document.getElementById('player-1-input').value;
    const name2 = document.getElementById('player-2-input').value;


    if(name1 !== '' && name2 !== ''){
      
      setupNewGame(name1, name2);
      renderNewGame();
      
      
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
    gameOver = false;
    round = 1;
    gameBoard.resetBoard();
    displayController.updateBoard();
    displayController.updateGameMessage(`${getCurrentPlayer().getName()} turn`);
    
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

        gameOver=true;

        displayController.updateGameMessage(`${getCurrentPlayer().getName()} Wins!` );
      
        getCurrentPlayer().updateScore();
        displayController.updatePlayerScore(getCurrentPlayer());
  
      }
      else if (checkDraw()){
        gameOver=true;

        displayController.updateGameMessage(`Draw!`);
        
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


  return {playRound};

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


  //display board
  const updateBoard = () => {
    for(let i =0; i<gameBoard.board.length ; i++){
      document.getElementById(`${i}`).textContent = gameBoard.getField(i);
    }
  }

  //display game message
  const updateGameMessage = (message) => {
    document.getElementById('game-messages').textContent = message;
  }

  //display player name
  const displayPlayerName = (player) => {
    document.getElementById(`player-${player.getId()}-name`).textContent = player.getName();
  }

  //display player score
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


  //overlay
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




