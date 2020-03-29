export const modifyResponseData = ({ results }) =>
  results.map(({ question, correct_answer, incorrect_answers: answers }) => {
    const correctAnswerIndex = Math.round(Math.random() * answers.length);
    answers.splice(correctAnswerIndex, 0, correct_answer);
    return {
      question: unescape(question),
      correctAnswerIndex,
      answers: answers.map(unescape)
    };
  });

export const questionAmount = 10;

export const colors = ["cyan", "orange", "pink", "teal", "yellow"];
