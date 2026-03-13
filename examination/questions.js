const QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correctAnswer: "William Shakespeare"
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Pb"],
    correctAnswer: "Au"
  },
  {
    id: 6,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Oxygen", "Hydrogen", "Nitrogen"],
    correctAnswer: "Hydrogen"
  },
  {
    id: 7,
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    id: 8,
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: "1945"
  },
  {
    id: 9,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    id: 10,
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Gazelle", "Leopard"],
    correctAnswer: "Cheetah"
  }
];


function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
