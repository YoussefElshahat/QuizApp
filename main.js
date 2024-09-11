// IIFE to avoid polluting the global namespace
(() => {
  // Select Elements
  const countSpan = document.querySelector(".questions-count span");
  const bullets = document.querySelector(".bullets");
  const bulletsSpanContainer = document.querySelector(".bullets .spans");
  const quizArea = document.querySelector(".quiz-area");
  const answersArea = document.querySelector(".answers-area");
  const submitButton = document.querySelector(".submit-btn");
  const resultsContainer = document.querySelector(".results");
  const countDownElement = document.querySelector(".count-down");

  // Global Variables
  let currentIndex = 0;
  let rightAnswers = 0;
  let countDownInterval;

  function fetchQuestions() {
    const myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const questions = JSON.parse(this.responseText);
        const questionsCount = questions.length;

        createBullets(questionsCount);
        loadQuestion(questions[currentIndex], questionsCount);
        startCountDown(5, questionsCount);

        submitButton.addEventListener("click", () => {
          processAnswer(questions[currentIndex].right_answer, questionsCount);
          currentIndex++;
          if (currentIndex < questionsCount) {
            loadQuestion(questions[currentIndex], questionsCount);
            handleBullets();
            resetCountDown(5, questionsCount);
          } else {
            displayResults(questionsCount);
          }
        });
      }
    };

    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
  }

  function createBullets(count) {
    countSpan.innerHTML = count;
    for (let i = 0; i < count; i++) {
      const bullet = document.createElement("span");
      if (i === 0) bullet.className = "active";
      bulletsSpanContainer.appendChild(bullet);
    }
  }

  function loadQuestion(question, total) {
    quizArea.innerHTML = "";
    answersArea.innerHTML = "";

    const questionTitle = document.createElement("h2");
    questionTitle.textContent = question.title;
    quizArea.appendChild(questionTitle);

    for (let i = 1; i <= 4; i++) {
      const mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = "question";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = question[`answer_${i}`];
      if (i === 1) radioInput.checked = true;

      const label = document.createElement("label");
      label.htmlFor = radioInput.id;
      label.textContent = question[`answer_${i}`];

      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(label);
      answersArea.appendChild(mainDiv);
    }
  }

  function processAnswer(correctAnswer, totalQuestions) {
    const chosenAnswer = document.querySelector(
      'input[name="question"]:checked'
    ).dataset.answer;
    if (correctAnswer === chosenAnswer) rightAnswers++;
  }

  function handleBullets() {
    const bulletsSpans = Array.from(
      document.querySelectorAll(".bullets .spans span")
    );
    bulletsSpans[currentIndex].classList.add("active");
  }

  function displayResults(totalQuestions) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    let resultMessage;
    if (rightAnswers === totalQuestions) {
      resultMessage = `<span class="perfect">Perfect</span>, All Answers Are Correct.`;
    } else if (rightAnswers > totalQuestions / 2) {
      resultMessage = `<span class="good">Good</span>, ${rightAnswers} Out of ${totalQuestions}.`;
    } else {
      resultMessage = `<span class="bad">Bad</span>, ${rightAnswers} Out of ${totalQuestions}.`;
    }

    resultsContainer.innerHTML = resultMessage;
  }

  function startCountDown(duration, totalQuestions) {
    countDown(duration, totalQuestions);
  }

  function resetCountDown(duration, totalQuestions) {
    clearInterval(countDownInterval);
    countDown(duration, totalQuestions);
  }

  function countDown(duration, totalQuestions) {
    if (currentIndex < totalQuestions) {
      countDownInterval = setInterval(() => {
        const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
        const seconds = String(duration % 60).padStart(2, "0");

        countDownElement.textContent = `${minutes}:${seconds}`;

        if (--duration < 0) {
          clearInterval(countDownInterval);
          submitButton.click();
        }
      }, 1000);
    }
  }

  fetchQuestions();
})();
