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
  const [selectionsContainer, scoreboardsContainer, feedbackContainer, resultContainer,
    startGameContainer] =
    selectElements(['.selections-container', '.scoreboards-container', '.feedback-container', '.result-container',
      '.start-game-container']);
  const [startGameButton, resetGameButton, displayedPlayerScore, displayedComputerScore,
    playerIcon, computerIcon, roundOutcome, endingModal,
    endgameMessage, overlay] =
    selectElements(['.start-button', '.reset-button', '.player-score', '.computer-score',
      '.player-icon', '.computer-icon', '.round-outcome', '#ending_modal',
      '#endgame_message', '#overlay']);

  // Utility Functions
  const toggleClass = (element, className, action) => element.classList[action](className);
  const updateText = (element, text) => element.innerText = text;
  const updateImageSource = (element, src) => element.src = src;
  const toggleGameVisibility = (isHidden) => {
    const action = isHidden ? 'add' : 'remove';
    toggleClass(selectionsContainer, 'hidden', action);
    toggleClass(scoreboardsContainer, 'hidden', action);
    toggleClass(feedbackContainer, 'hidden', action);
    toggleClass(startGameContainer, 'hidden', isHidden ? 'remove' : 'add');
  };

  // Event Listeners
  startGameButton.addEventListener('click', initializeGame);
  resetGameButton.addEventListener('click', resetGame);
  selectionButtons.forEach(button => button.addEventListener('click', handlePlayerChoice));

  // Game
  function initializeGame() {
    resetScores();
    toggleGameVisibility(false);
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
    updateText(displayedPlayerScore, playerScore);
    updateText(displayedComputerScore, computerScore);
  }

  function checkWinner() {
    if (playerScore === 5 || computerScore === 5) {
      toggleClass(resetGameButton, 'hidden', 'remove');
      toggleClass(resultContainer, 'hidden', 'remove');

      if (playerScore > computerScore) {
        updateText(resultContainer, playerWins);
        gameResult = playerWins;
      } else if (playerScore < computerScore) {
        updateText(resultContainer, computerWins);
        gameResult = computerWins;
      } else {
        updateText(resultContainer, itsADraw);
        gameResult = itsADraw;
      }

      openEndingModal(gameResult);
    }
  }

  function playRound(playerSelection, computerSelection) {
    updateText(roundOutcome, "");

    updateImageSource(playerIcon, `./assets/images/${playerSelection}.png`);
    updateImageSource(computerIcon, `./assets/images/${computerSelection}.png`);

    if (playerSelection === computerSelection) {
      updateText(roundOutcome, `It's a draw!`);
      return;
    }

    if (outcomes[playerSelection].win === computerSelection) {
      updateText(roundOutcome, `You won! ${playerSelection} beats ${computerSelection}`);
      playerScore += 1;
      return;
    }

    if (outcomes[playerSelection].lose === computerSelection) {
      updateText(roundOutcome, `You lose! ${computerSelection} beats ${playerSelection}`);
      computerScore += 1;
      return;
    }

  }

  function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
  }

  // Resets
  function resetGame() {
    resetScores();
    updateScoreboard();
    updateImageSource(playerIcon, "");
    updateImageSource(computerIcon, "");
    updateText(resultContainer, "");
    updateText(roundOutcome, "");
    toggleGameVisibility(true);
    toggleClass(resetGameButton, 'hidden', 'add');
    closeEndingModal();
  }

  function resetScores() {
    playerScore = 0;
    computerScore = 0;
  }

  // Modal
  function openEndingModal(gameResult) {
    toggleClass(endingModal, 'active', 'add');
    toggleClass(overlay, 'active', 'add');
    updateText(endgameMessage, gameResult);
  }

  function closeEndingModal() {
    toggleClass(endingModal, 'active', 'remove');
    toggleClass(overlay, 'active', 'remove');
    updateText(endgameMessage, "");
  }

})

