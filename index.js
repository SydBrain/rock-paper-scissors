document.addEventListener('DOMContentLoaded', () => {

  // Game Variables
  let playerScore, computerScore, playerSelection, computerSelection, gameResult;

  // Game Constants
  const playerWins = "Player Wins!";
  const computerWins = "Computer Wins!";
  const itsADraw = "It's a Draw!";
  const choices = ["rock", "paper", "scissors"];
  const outcomes = {
    rock: { win: "scissors", lose: "paper" },
    paper: { win: "rock", lose: "scissors" },
    scissors: { win: "paper", lose: "rock" },
  };

  // DOM Elements
  const selectElements = selectors => selectors.map(selector => document.querySelector(selector));

  const selectionButtons = document.querySelectorAll('.selection-button');
  const [selectionsContainer, scoreboardsContainer, feedbackContainer, resultContainer, startGameContainer] =
    selectElements(['.selections-container', '.scoreboards-container', '.feedback-container', '.result-container', '.start-game-container']);
  const [startGameButton, resetGameButton, displayedPlayerScore, displayedComputerScore, playerIcon, computerIcon,
    roundOutcome, endingModal, endgameMessage, overlay] =
    selectElements(['.start-button', '.reset-button', '.player-score', '.computer-score', '.player-icon', '.computer-icon', '.round-outcome', '#ending_modal', '#endgame_message', '#overlay']);

  // Event Listeners
  startGameButton.addEventListener('click', initializeGame);
  resetGameButton.addEventListener('click', resetGame);
  selectionButtons.forEach(button => button.addEventListener('click', handlePlayerChoice));

  // Game
  function initializeGame() {
    playerScore = 0;
    computerScore = 0;
    startGameContainer.classList.add('hidden');
    selectionsContainer.classList.remove('hidden');
    scoreboardsContainer.classList.remove('hidden');
    feedbackContainer.classList.remove('hidden');
    updateScoreboard();
  }

  function handlePlayerChoice(e) {
    playerSelection = e.target.parentNode.value;
    computerSelection = getComputerChoice();
    if (playerSelection && computerSelection) {
      playRound(playerSelection, computerSelection);
      updateScoreboard();
      checkWinner();
    }
  }

  function updateScoreboard() {
    displayedPlayerScore.innerText = playerScore;
    displayedComputerScore.innerText = computerScore;
  }

  function checkWinner() {
    if (playerScore === 5 || computerScore === 5) {
      resetGameButton.classList.remove('hidden');
      resultContainer.classList.remove('hidden');

      if (playerScore > computerScore) {
        resultContainer.innerText = playerWins;
        gameResult = playerWins;
      } else if (playerScore < computerScore) {
        resultContainer.innerText = computerWins;
        gameResult = computerWins;
      } else {
        resultContainer.innerText = itsADraw;
        gameResult = itsADraw;
      }

      openEndingModal(gameResult);
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
    closeEndingModal();
  }

  function openEndingModal(gameResult) {
    endingModal.classList.add('active');
    overlay.classList.add('active');
    endgameMessage.innerText = gameResult;
  }

  function closeEndingModal() {
    endingModal.classList.remove('active');
    overlay.classList.remove('active');
    endgameMessage.innerText = "";
  }

})

