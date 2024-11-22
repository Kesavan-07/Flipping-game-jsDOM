document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const restartButton = document.getElementById("restart-btn");
  const timerElement = document.getElementById("timer");
  const flipCounterElement = document.getElementById("flip-counter");

  const cardImages = [
    "iron man 1.jpg",
    "avengers-2.jpg",
    "avengers-3.jpg",
    "captian america-4.jpg",
    "spider-man-5.jpg",
    "deadpool-6.jpg",
    "black-panther-7.jpg",
    "ant-man-8.jpg",
    "captian-marvel-9.jpg",
    "args-10.jpg",
    "logan-11.jpg",
    "unknown-12.jpg",
    "iron man 1.jpg",
    "avengers-2.jpg",
    "avengers-3.jpg",
    "captian america-4.jpg",
    "spider-man-5.jpg",
    "deadpool-6.jpg",
    "black-panther-7.jpg",
    "ant-man-8.jpg",
    "captian-marvel-9.jpg",
    "args-10.jpg",
    "logan-11.jpg",
    "unknown-12.jpg",
  ];

  let cards = [];
  let flippedCards = [];
  let matchedCards = 0;
  let timer = 0;
  let flips = 0;
  let timerInterval = null;
  let gameStarted = false;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createCards() {
    shuffle(cardImages);
    gameBoard.innerHTML = "";
    cards = cardImages.map((image, index) => {
      const card = document.createElement("div");
      card.classList.add(
        "card",
        "w-32", 
        "h-44", 
        "bg-sky-300",
        "border-2",
        "border-sky-600",
        "rounded-xl", 
        "flex",
        "justify-center",
        "items-center",
        "cursor-pointer",
        "transform",
        "transition-transform",
        "duration-500",
        "relative",
        "shadow-card", 
        "hover:scale-105" 
      );
      const backFace = document.createElement("div");
      backFace.classList.add(
        "absolute",
        "w-full",
        "h-full",
        "bg-sky-300",
        "rounded-xl"
      );
      const frontFace = document.createElement("img");
      frontFace.src = image;
      frontFace.alt = "Card";
      frontFace.classList.add(
        "absolute",
        "w-full",
        "h-full",
        "rounded-xl",
        "hidden"
      );

      card.appendChild(backFace);
      card.appendChild(frontFace);
      card.dataset.index = index;

      card.addEventListener("click", handleCardFlip);
      gameBoard.appendChild(card);
      return card;
    });
  }

  function handleCardFlip(e) {
    const card = e.target.closest(".card");
    if (
      card.classList.contains("flipped") ||
      card.classList.contains("matched") ||
      flippedCards.length === 2
    ) {
      return;
    }

    if (!gameStarted) {
      startTimer();
      gameStarted = true;
    }

    flips++;
    flipCounterElement.textContent = flips;

    card.querySelector("div").classList.add("hidden");
    card.querySelector("img").classList.remove("hidden");
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }

  function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.querySelector("img").src === card2.querySelector("img").src) {
      card1.classList.add("matched", "bg-sky-400");
      card2.classList.add("matched", "bg-sky-400");
      matchedCards += 2;

      if (matchedCards === cards.length) {
        clearInterval(timerInterval);
        setTimeout(
          () => alert(`You win! 🎉 Time: ${timer}s, Flips: ${flips}`),
          100
        );
      }
    } else {
      setTimeout(() => {
        card1.querySelector("div").classList.remove("hidden");
        card1.querySelector("img").classList.add("hidden");
        card1.classList.remove("flipped");

        card2.querySelector("div").classList.remove("hidden");
        card2.querySelector("img").classList.add("hidden");
        card2.classList.remove("flipped");
      }, 1000);
    }

    flippedCards = [];
  }

  function startTimer() {
    timer = 0;
    timerElement.textContent = timer;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timer++;
      timerElement.textContent = timer;
    }, 1000);
  }

  function restartGame() {
    matchedCards = 0;
    flips = 0;
    flippedCards = [];
    flipCounterElement.textContent = flips;
    clearInterval(timerInterval);
    timerElement.textContent = 0;
    gameStarted = false;
    createCards();
  }

  restartButton.addEventListener("click", restartGame);
  restartGame();
});
