const questions = [
  {
    question: "Apa yang dimaksud dengan lagu populer?",
    options: [
      "Lagu yang hanya dinyanyikan di TV",
      "Lagu yang mudah diingat dan banyak disukai",
      "Lagu yang hanya dinyanyikan oleh penyanyi terkenal",
      "Lagu yang memiliki nada sulit",
    ],
    answer: "Lagu yang mudah diingat dan banyak disukai",
  },
  {
    question: "Jenis musik apa yang termasuk dalam kategori lagu populer?",
    options: ["Jazz", "Keroncong", "Seriosa", "Gambus"],
    answer: "Jazz",
  },
  {
    question: "Siapa penyanyi yang dikenal sebagai Raja Dangdut Indonesia?",
    options: ["Ariel Noah", "Iwan Fals", "Rhoma Irama", "Didi Kempot"],
    answer: "Rhoma Irama",
  },
  {
    question: "Apa karakteristik utama dari lagu pop?",
    options: [
      "Melodi sederhana dan mudah diingat",
      "Hanya menggunakan instrumen klasik",
      "Tempo selalu cepat",
      "Lirik harus menggunakan bahasa Inggris",
    ],
    answer: "Melodi sederhana dan mudah diingat",
  },
  {
    question: "Siapa penyanyi lagu ‘Hati-Hati di Jalan’ yang terkenal?",
    options: ["Afgan", "Tulus", "Raisa", "Fiersa Besari"],
    answer: "Tulus",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timerDuration = 10; // 10 detik per soal

function startQuiz() {
  document.getElementById("start-quiz-btn").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  clearTimeout(timer); // Hapus timer sebelumnya
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");

  nextBtn.classList.add("hidden");
  answersEl.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.className =
      "bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition w-full";
    button.onclick = () => checkAnswer(option, button);
    answersEl.appendChild(button);
  });

  startTimer();
}

function checkAnswer(selectedOption, button) {
  const currentQuestion = questions[currentQuestionIndex];
  clearTimeout(timer); // Hentikan timer saat user menjawab

  if (selectedOption === currentQuestion.answer) {
    score++;
    button.classList.add("bg-green-500", "text-white");
    playSound("correct");
  } else {
    button.classList.add("bg-red-500", "text-white");
    playSound("wrong");
  }

  document
    .querySelectorAll("#answers button")
    .forEach((btn) => (btn.disabled = true));
  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function startTimer() {
  let timeLeft = timerDuration;
  document.getElementById("question").textContent += ` (⏳ ${timeLeft}s)`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById(
      "question"
    ).textContent = `${questions[currentQuestionIndex].question} (⏳ ${timeLeft}s)`;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showScore() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("score-container").classList.remove("hidden");
  document.getElementById(
    "final-score"
  ).textContent = `Kamu mendapatkan skor ${score} dari ${questions.length}!`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score-container").classList.add("hidden");
  document.getElementById("start-quiz-btn").classList.remove("hidden");
}

function playSound(type) {
  const audio = new Audio(
    type === "correct"
      ? "assets/audio/correct.mp3"
      : "assets/audio/wrong.mp3.mp3"
  );
  audio.play();
}

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const scrollIndicator = document.createElement("div");

  scrollIndicator.id = "scroll-indicator";
  document.body.appendChild(scrollIndicator);

  // Buat titik indikator berdasarkan jumlah section
  sections.forEach((_, index) => {
    let dot = document.createElement("div");
    dot.classList.add("scroll-dot");
    scrollIndicator.appendChild(dot);
  });

  const dots = document.querySelectorAll(".scroll-dot");

  window.addEventListener("scroll", function () {
    let scrollY = window.scrollY;

    // Efek navbar saat scroll
    if (scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Efek animasi fade-in saat scroll
    sections.forEach((section, index) => {
      let sectionTop = section.offsetTop - window.innerHeight * 0.75;
      if (scrollY > sectionTop) {
        section.classList.add("visible");
        dots[index].classList.add("active");
      } else {
        dots[index].classList.remove("active");
      }
    });
  });
});
