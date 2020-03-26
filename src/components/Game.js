import React, { Component, useState } from 'react'
import axios from 'axios'


const Game = () => {
 const [name, setName] = useState(null)

}


class QuizGame extends Component {
    state = {
      name: "",
      questions: [],
      score: 0,
      correctAnswers: 0,
      timer: 30,
      userResults: [],
      questionCounter: 0,
      answerIndex: 0,
      result: false,
      highScores: false,
      highScoreArray: [],
      error: "",
    }
    componentDidMount() {
      axios
        .get("https://opentdb.com/api.php?amount=10&encode=url3986")
        .then(response => {
          for (let key in this.state) {
            if (localStorage.hasOwnProperty(key)) {
              let value = localStorage.getItem(key)
              try {
                value = JSON.parse(value)
                this.setState({ [key]: value })
              } catch (e) {
                this.setState({ [key]: value })
              }
            }
          }
          this.setState({
            questions: response.data.results,
            name: this.props.location.state.name,
          })
          this.shuffleCorrectAnswer()
          this.startTimer()
        })
        .catch(error => {
          console.log(error)
          this.setState({ error: error })
        })
    }
    handleClickAnswer = e => {
      let newScore = this.state.score
      let newCorrectAnswers = this.state.correctAnswers
      if (
        e.target.value === this.state.answerIndex ||
        e.target.parentElement.parentElement.value === this.state.answerIndex ||
        e.target.parentElement.value === this.state.answerIndex
      ) {
        newScore += 50 + this.state.timer
        newCorrectAnswers += 1
      }
      if (this.state.questionCounter < 9) {
        let newQuestionCounter = this.state.questionCounter + 1
        this.setState(
          {
            score: newScore,
            correctAnswers: newCorrectAnswers,
            questionCounter: newQuestionCounter,
            timer: 30,
          },
          () => this.shuffleCorrectAnswer()
        )
      } else {
        const userResult = {
          name: this.state.name,
          score: newScore,
          correctAnswers: this.state.correctAnswers,
        }
        let newUserResults = [...this.state.userResults, { ...userResult }]
        this.setState({
          score: newScore,
          result: true,
          userResults: newUserResults,
        })
        localStorage.setItem("userResults", JSON.stringify(newUserResults))
        clearInterval(this.intervalRef)
      }
    }
    nextQuestion = () => {
      if (this.state.questionCounter < 9) {
        let newQuestionCounter = this.state.questionCounter + 1
        this.setState(
          {
            questionCounter: newQuestionCounter,
            timer: 30,
          },
          () => this.shuffleCorrectAnswer()
        )
      } else {
        const userResult = {
          name: "",
          score: this.state.score,
          correctAnswers: this.state.correctAnswers,
        }
        let newUserResults = [...this.state.userResults, { ...userResult }]
        this.setState({
          result: true,
          userResults: newUserResults,
        })
        localStorage.setItem("userResults", JSON.stringify(newUserResults))
        clearInterval(this.intervalRef)
      }
    }
    startTimer = () => {
      this.intervalRef = setInterval(() => {
        let newTime = this.state.timer - 1
        if (newTime < 1) {
          newTime = 30
          this.nextQuestion()
        }
        this.setState({ timer: newTime })
      }, 1000)
    }
    shuffleCorrectAnswer = () => {
      let currentAnswers = [
        ...this.state.questions[this.state.questionCounter]["incorrect_answers"],
      ]
      let answerIndex = Math.round(Math.random() * currentAnswers.length)
      currentAnswers.splice(
        answerIndex,
        0,
        this.state.questions[this.state.questionCounter]["correct_answer"]
      )
      this.setState({ currentAnswers, answerIndex })
    }
    handleClickNavigate = e => {
      if (e.target.innerText === "New Game") {
        this.props.navigate(withPrefix("/"))
      } else if (e.target.innerText === "High Scores") {
        let newResult = false
        let newHighScores = true
        let highScoreArray = this.state.userResults.sort(
          (a, b) => b.score - a.score
        )
        highScoreArray.splice(10, highScoreArray.length)
        this.setState({
          result: newResult,
          highScores: newHighScores,
          highScoreArray: highScoreArray,
        })
      }
    }
    render() {
      return (
        <>
          <div className="container">
            {this.state.error ? (
              <div id="home" className="flex-center flex-column">
                <h1>
                  <span role="img" aria-label="beer-emoji">
                    🍺
                  </span>{" "}
                  Pub Quiz{" "}
                  <span role="img" aria-label="beer-emoji">
                    🍺
                  </span>
                </h1>
                <h1>
                  <span role="img" aria-label="beer-emoji">
                    🐒
                  </span>
                  API on break
                </h1>
                <Link type="submit" className="btn" to="/">
                  Back
                </Link>
              </div>
            ) : (
              ""
            )}
  
            {this.state.questions[this.state.questionCounter] && (
              <div id="game" className="flex-center flex-column">
                {this.state.result && this.state.result === true ? (
                  <UserResult
                    userResults={this.state.userResults}
                    handleClickNavigate={this.handleClickNavigate}
                  />
                ) : (
                  <>
                    {this.state.highScores && this.state.highScores === true ? (
                      <HighScores highScoreArray={this.state.highScoreArray} />
                    ) : (
                      <GameQuestions
                        timer={this.state.timer}
                        questions={this.state.questions}
                        questionCounter={this.state.questionCounter}
                        currentAnswers={this.state.currentAnswers}
                        handleClickAnswer={this.handleClickAnswer}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )
    }
  }
  
  export default QuizGame