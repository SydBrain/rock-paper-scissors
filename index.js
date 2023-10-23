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
  const startGameButton = document.querySelector('.start-button');
  const displayedPlayerScore = document.querySelector('.player-score');
  const displayedComputerScore = document.querySelector('.computer-score');
  const displayedResult = document.querySelector('.result');
  const roundOutcome = document.querySelector('.round-outcome')

  const choices = ["rock", "paper", "scissors"];

  const outcomes = {
    rock: { win: "scissors", lose: "paper" },
    paper: { win: "rock", lose: "scissors" },
    scissors: { win: "paper", lose: "rock" },
  };

  startGameButton.addEventListener('click', () => {
    startGameButton.classList.add('hidden');
    selectionsContainer.classList.remove('hidden');
    startGame();
  });

  function startGame() {

    playerScore = 0;
    computerScore = 0;

    displayedPlayerScore.innerText = playerScore;
    displayedComputerScore.innerText = computerScore;

    selectionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        playerSelection = e.target.parentNode.value;
        computerSelection = getComputerChoice();

        playRound(playerSelection, computerSelection);

        displayedPlayerScore.innerText = playerScore;
        displayedComputerScore.innerText = computerScore;
        checkWinner();
      });
    });
  }

  function checkWinner() {
    if (playerScore === 5 || computerScore === 5) {
      if (playerScore > computerScore) {
        displayedResult.innerText = playerWins;
      } else if (playerScore < computerScore) {
        displayedResult.innerText = computerWins;
      } else {
        displayedResult.innerText = itsADraw;
      }
    }
  }

  function playRound(playerSelection, computerSelection) {
    roundOutcome.innerText = "";
    playerSelection.charAt(0).toUpperCase();
    computerSelection.charAt(0).toUpperCase();

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

})

