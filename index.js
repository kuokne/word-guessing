<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Guessing Game</title>
<style>
    body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

    h1 {
    margin-top: 20px;
}

    .game-container {
    display: grid;
    grid-template-rows: repeat(6, 50px);
    grid-template-columns: repeat(5, 50px);
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
}

    .tile {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    background-color: white;
    text-transform: uppercase;
}

    .tile.correct {
    background-color: #6aaa64; /* Green */
    color: white;
}

    .tile.present {
    background-color: #c9b458; /* Yellow */
    color: white;
}

    .tile.absent {
    background-color: #787c7e; /* Gray */
    color: white;
}

    .input-container {
    margin-top: 20px;
}

    input[type="text"] {
    width: 200px;
    padding: 10px;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
}

    button {
    padding: 10px 20px;
    font-size: 16px;
    margin: 10px;
    cursor: pointer;
}

    button:hover {
    background-color: #6aaa64;
    color: white;
}

    .message {
    margin-top: 20px;
    font-size: 18px;
    color: #333;
}
</style>
</head>
<body>
<h1>Word Guessing Game</h1>
<div class="game-container" id="gameBoard"></div>
<div class="input-container">
    <input type="text" id="guessInput" maxlength="5" placeholder="Enter your guess" />
    <button id="submitGuess">Submit</button>
    <button id="playAgain" style="display: none;">Play Again</button>
</div>
<p class="message" id="message"></p>

<script>
    // Danh sách từ ngẫu nhiên
    const wordList = ["APPLE", "BERRY", "CHERRY", "GRAPE", "LEMON", "MANGO", "PEACH", "PEAR", "PLUM", "BANANA"];

    let secretWord = ""; // Từ bí mật
    const maxGuesses = 6; // Số lượt đoán tối đa
    let currentGuess = "";
    let attempts = 0;

    const gameBoard = document.getElementById("gameBoard");
    const guessInput = document.getElementById("guessInput");
    const submitButton = document.getElementById("submitGuess");
    const playAgainButton = document.getElementById("playAgain");
    const message = document.getElementById("message");

    // Khởi tạo trò chơi
    function initGame() {
    // Reset trạng thái
    secretWord = wordList[Math.floor(Math.random() * wordList.length)]; // Chọn từ ngẫu nhiên
    attempts = 0;
    message.textContent = "";
    guessInput.value = "";
    submitButton.disabled = false;
    playAgainButton.style.display = "none";

    // Xóa toàn bộ các ô
    gameBoard.innerHTML = "";
    for (let i = 0; i < maxGuesses * 5; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    gameBoard.appendChild(tile);
}
}

    // Kiểm tra từ đoán
    function checkGuess(guess) {
    const tiles = document.querySelectorAll(".tile");
    const startIndex = attempts * 5;

    for (let i = 0; i < 5; i++) {
    const tile = tiles[startIndex + i];
    tile.textContent = guess[i];

    if (guess[i] === secretWord[i]) {
    tile.classList.add("correct");
} else if (secretWord.includes(guess[i])) {
    tile.classList.add("present");
} else {
    tile.classList.add("absent");
}
}
}

    // Xử lý khi người chơi nhấn Submit
    function handleGuess() {
    const guess = guessInput.value.toUpperCase();

    if (guess.length !== 5) {
    message.textContent = "Guess must be 5 letters!";
    return;
}

    if (attempts >= maxGuesses) {
    message.textContent = "No more guesses left!";
    return;
}

    // Kiểm tra đoán
    checkGuess(guess);
    guessInput.value = "";
    attempts++;

    if (guess === secretWord) {
    message.textContent = "Congratulations! You guessed it!";
    submitButton.disabled = true;
    playAgainButton.style.display = "inline";
    return;
}

    if (attempts === maxGuesses) {
    message.textContent = `Game over! The word was: ${secretWord}`;
    submitButton.disabled = true;
    playAgainButton.style.display = "inline";
}
}

    // Sự kiện nhấn nút Submit
    submitButton.addEventListener("click", handleGuess);

    // Sự kiện nhấn nút Play Again
    playAgainButton.addEventListener("click", initGame);

    // Khởi tạo trò chơi khi tải trang
    initGame();
</script>
</body>
</html>