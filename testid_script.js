document.addEventListener("DOMContentLoaded", () => {
  const quizContainer = document.getElementById("quiz-container");

  // Defineerime testid
  const quizzes = [
    {
      title: "HTML põhialused",
      questions: [
        {
          question: "Mis on HTML?",
          options: ["Programmeerimiskeel", "Märgistuskeel", "Andmebaas"],
          correct: 1,
        },
        {
          question: "Milline tag lisab pildi?",
          options: ["<img>", "<a>", "<div>"],
          correct: 0,
        },
        {
          question: "Mis tähistab HTML-i täispikka nime?",
          options: [
            "HyperText Markup Language",
            "HyperText Markdown Language",
            "HighText Markup Language",
          ],
          correct: 0,
        },
        {
          question: "Milline element on HTML-i alus?",
          options: ["<head>", "<body>", "<html>"],
          correct: 2,
        },
        {
          question: "Milline atribuut määrab pildi allika?",
          options: ["src", "alt", "href"],
          correct: 0,
        },
      ],
    },
    {
      title: "CSS põhitõed",
      questions: [
        {
          question: "Mis on CSS-i eesmärk?",
          options: [
            "Veebilehe struktuur",
            "Stiilide ja kujunduse lisamine",
            "Andmete töötlemine",
          ],
          correct: 1,
        },
        {
          question: "Milline omadus määrab teksti värvi?",
          options: ["color", "background", "font"],
          correct: 0,
        },
        {
          question: "Kuidas keskendatakse elementi horisontaalselt?",
          options: ["margin-left", "text-align: center", "float"],
          correct: 1,
        },
        {
          question: "Milline CSS-i faililaiend on õige?",
          options: [".html", ".css", ".scss"],
          correct: 1,
        },
        {
          question: "Kuidas CSS-is elemente grupeeritakse?",
          options: ["Klasside abil", "Kuvamise abil", "Üksikute failidega"],
          correct: 0,
        },
      ],
    },
    {
      title: "JavaScripti algtõed",
      questions: [
        {
          question: "Mis on JavaScript?",
          options: [
            "Staatiline keel",
            "Serveripoolne keel",
            "Veebiprogrammeerimise keel",
          ],
          correct: 2,
        },
        {
          question: "Kuidas kirjutatakse konsoolile sõnum?",
          options: ["console.log()", "log.console()", "console.write()"],
          correct: 0,
        },
        {
          question: "Milline on õige süntaks muutuja loomiseks?",
          options: ["var x = 5;", "variable x = 5;", "x := 5;"],
          correct: 0,
        },
        {
          question: "Kuidas JavaScripti koodi käivitatakse?",
          options: ["HTML-i sees", "CSS-i sees", "SQL-i sees"],
          correct: 0,
        },
        {
          question: "Mis tähendab DOM?",
          options: [
            "Data Object Model",
            "Document Object Model",
            "Document Oriented Mode",
          ],
          correct: 1,
        },
      ],
    },
  ];

  // Testide loomine
  quizzes.forEach((quiz, quizIndex) => {
    const quizElement = document.createElement("div");
    quizElement.className = "quiz";

    const quizTitle = document.createElement("h3");
    quizTitle.textContent = quiz.title;
    quizTitle.className = "quiz-title";
    quizTitle.style.cursor = "pointer";

    const questionsContainer = document.createElement("div");
    questionsContainer.className = "questions-container";
    questionsContainer.style.display = "none"; // Küsimused on peidetud algselt

    quizTitle.addEventListener("click", () => {
      const isVisible = questionsContainer.style.display === "block";
      questionsContainer.style.display = isVisible ? "none" : "block";
    });

    quiz.questions.forEach((q, qIndex) => {
      const questionElement = document.createElement("div");
      questionElement.className = "question";

      const questionText = document.createElement("p");
      questionText.textContent = `${qIndex + 1}. ${q.question}`;
      questionElement.appendChild(questionText);

      q.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `quiz${quizIndex}q${qIndex}`;
        input.value = optionIndex;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        questionElement.appendChild(label);
      });

      questionsContainer.appendChild(questionElement);
    });

    const checkButton = document.createElement("button");
    checkButton.textContent = "Kontrolli testi";
    checkButton.className = "check-button";

    checkButton.addEventListener("click", () => {
      const existingFeedback = questionsContainer.querySelector(".feedback");
      if (existingFeedback) {
        existingFeedback.remove();
      }

      let correctCount = 0;

      quiz.questions.forEach((q, qIndex) => {
        const selected = document.querySelector(
          `input[name="quiz${quizIndex}q${qIndex}"]:checked`
        );
        if (selected && parseInt(selected.value) === q.correct) {
          correctCount++;
        }
      });

      const feedback = document.createElement("div");
      feedback.className = "feedback";
      feedback.textContent = `Õigeid vastuseid: ${correctCount} / ${quiz.questions.length}`;
      feedback.className +=
        correctCount === quiz.questions.length
          ? " green"
          : correctCount > quiz.questions.length / 2
          ? " orange"
          : " red";

      questionsContainer.appendChild(feedback);
    });

    questionsContainer.appendChild(checkButton);
    quizElement.appendChild(quizTitle);
    quizElement.appendChild(questionsContainer);
    quizContainer.appendChild(quizElement);
  });
});
