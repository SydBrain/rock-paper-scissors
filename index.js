document.addEventListener('DOMContentLoaded', () => {
  let playerScore;
  let computerScore;

  let playerSelection = "";
  let computerSelection = "";

  const playerWins = "Player Wins!";
  const computerWins = "Computer Wins!";
  const itsADraw = "It's a Draw!";

  const selectionButtons = document.querySelectorAll('.selection-button');


  const selectionsContainer = document.querySelector('.selections-container');
  const scoreboardsContainer = document.querySelector('.scoreboards-container');
  const feedbackContainer = document.querySelector('.feedback-container');
  const resultContainer = document.querySelector('.result-container');
  const startGameContainer = document.querySelector('.start-game-container');

  const startGameButton = document.querySelector('.start-button');
  const resetGameButton = document.querySelector('.reset-button');

  const displayedPlayerScore = document.querySelector('.player-score');
  const displayedComputerScore = document.querySelector('.computer-score');

  const playerIcon = document.querySelector('.player-icon');
  const computerIcon = document.querySelector('.computer-icon');

  const roundOutcome = document.querySelector('.round-outcome')

  const choices = ["rock", "paper", "scissors"];

  const outcomes = {
    rock: { win: "scissors", lose: "paper" },
    paper: { win: "rock", lose: "scissors" },
    scissors: { win: "paper", lose: "rock" },
  };

  startGameButton.addEventListener('click', () => {
    startGameContainer.classList.add('hidden');
    selectionsContainer.classList.remove('hidden');
    scoreboardsContainer.classList.remove('hidden');
    startGame();
  });

  resetGameButton.addEventListener('click', () => {
    resetGame();
  });

  selectionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      playerSelection = e.target.parentNode.value;
      computerSelection = getComputerChoice();

      if (playerSelection && computerSelection) {
        playRound(playerSelection, computerSelection);
      }

      displayedPlayerScore.innerText = playerScore;
      displayedComputerScore.innerText = computerScore;
      checkWinner();
    });
  });

  function startGame() {
    playerScore = 0;
    computerScore = 0;

    feedbackContainer.classList.remove('hidden');

    displayedPlayerScore.innerText = playerScore;
    displayedComputerScore.innerText = computerScore;

  }

  function checkWinner() {
    if (playerScore === 5 || computerScore === 5) {
      resetGameButton.classList.remove('hidden');
      resultContainer.classList.remove('hidden');

      if (playerScore > computerScore) {
        resultContainer.innerText = playerWins;
      } else if (playerScore < computerScore) {
        resultContainer.innerText = computerWins;
      } else {
        resultContainer.innerText = itsADraw;
      }
    }
  }

  function playRound(playerSelection, computerSelection) {
    roundOutcome.innerText = "";

    playerIcon.src = `./assets/images/${playerSelection}.png`;
    computerIcon.src = `./assets/images/${computerSelection}.png`;

    if (playerSelection === computerSelection) {
      roundOutcome.innerText = `It's a draw!`;
      return;
    }

    if (outcomes[playerSelection].win === computerSelection) {
      roundOutcome.innerText = `You won! ${playerSelection} beats ${computerSelection}`;
      playerScore += 1;
      return;
    }

    if (outcomes[playerSelection].lose === computerSelection) {
      roundOutcome.innerText = `You lose! ${computerSelection} beats ${playerSelection}`;
      computerScore += 1;
      return;
    }

  }

  function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    displayedPlayerScore.innerText = playerScore;
    displayedComputerScore.innerText = computerScore;
    playerIcon.src = "";
    computerIcon.src = "";
    resultContainer.innerText = "";
    roundOutcome.innerText = "";
    selectionsContainer.classList.add('hidden');
    scoreboardsContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    startGameContainer.classList.remove('hidden');
    resetGameButton.classList.add('hidden');
  }

})

