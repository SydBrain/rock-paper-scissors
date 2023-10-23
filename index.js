document.addEventListener('DOMContentLoaded', () => {
  let playerScore;
  let computerScore;

  let playerSelection = "";
  let computerSelection = "";

  const selectionButtons = document.querySelectorAll('.selection-button');

  selectionButtons.forEach(button => {
    button.addEventListener('click', () => game(button.value));
  });

  const choices = ["rock", "paper", "scissors"];

  const outcomes = {
    rock: { win: "scissors", lose: "paper" },
    paper: { win: "rock", lose: "scissors" },
    scissors: { win: "paper", lose: "rock" },
  };

  function game(selectedOption) {
    playerScore = 0;
    computerScore = 0;

    playerSelection = selectedOption;
    computerSelection = getComputerChoice();

    playRound(playerSelection, computerSelection);

    console.log(`The player score is: ${playerScore}`);
    console.log(`The computer score is: ${computerScore}`);


    console.log(`Final player score: ${playerScore}`);
    console.log(`Final computer score: ${computerScore}`);

    if (playerScore > computerScore) {
      console.log(`Player wins!`);
    } else if (playerScore < computerScore) {
      console.log(`Computer wins!`);
    } else {
      console.log(`It's a draw`);
    }
  }

  function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
      console.log(`It's a draw!`);
      return;
    }

    if (outcomes[playerSelection].win === computerSelection) {
      console.log(`You won! ${playerSelection} beats ${computerSelection}`);
      playerScore += 1;
      return;
    }

    if (outcomes[playerSelection].lose === computerSelection) {
      console.log(`You lose! ${computerSelection} beats ${playerSelection}`);
      computerScore += 1;
      return;
    }
  }

  function getComputerChoice() {
    return choices[Math.floor(Math.random() * 3)];
  }

})

