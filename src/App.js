import React from 'react';
import './App.css';
import axios from 'axios';
import ProgressBar from './components/ProgressBar';
import { API_URL } from './apiConfig';
import CreateQuestion from './components/CreateQuestion';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 1,
      questions: [],
      answer: "",
      responses: [],
      preAnswerIsCorrect: false,
      prescore: 0,
      score: 0,
      percentage: 0,
      fieldQuestions: []
    }

    this.onChangeAnswer = this.onChangeAnswer.bind(this)
    this.isInResponses = this.isInResponses.bind(this)
    this.updateResponse = this.updateResponse.bind(this)
    this.addQues = this.addQues.bind(this)
  }

  async componentDidMount(){
    try {
      const res = await axios.get(`${API_URL}/questions`)
      console.log('res', res)
      if (res.data.length > 0){
        this.setState({
            questions: res.data
        })
      }
    } catch (err){
      console.error(err)
    }
  }

  isInResponses(questionId){
    for (let i = 0; i < this.state.responses.length; i++){
      if (this.state.responses[i].questionID === questionId){
        return  [true,i]
      }
    }
    return [false,null]
  }

  updateResponse(response){
    if (this.isInResponses(response.questionID)[0]){
      let curResponses = this.state.responses
      const foundID = this.isInResponses(response.questionID)[1]
      curResponses[foundID].answerID = response.answerID
      this.setState({responses: curResponses})

      if (response.isAnswer){
        this.setState({score: this.state.score + 20})
        this.setState({preAnswerIsCorrect: true})
      } else {
        if (this.state.preAnswerIsCorrect){
          this.setState({score: this.state.score - 20})
        }
      }
    } else {
      this.setState({
        responses: [
          ...this.state.responses,
          response
        ],
        percentage: this.state.percentage + 1/(this.state.questions.length)*100
      })

      if (response.isAnswer){
        this.setState({score: this.state.score + 10})
        this.setState({preAnswerIsCorrect: true})
      } else {
        this.setState({score: this.state.score - 10})
      }

    }
  }

  onChangeAnswer(e, questionId, answerId, isAnswer){
    this.setState({answer: e.target.value})
    this.updateResponse({
      userID: this.state.userId,
      questionID: questionId,
      answerID: answerId,
      isAnswer: isAnswer
    })
  }

  addQues(){
    this.setState({fieldQuestions: [
      ...this.state.fieldQuestions,
      0
    ]})
  }

  render(){
    const { questions } = this.state

    console.log('questions', questions)

    console.log('answer', this.state.answer)

    console.log('responses', this.state.responses)

    console.log('score', this.state.score)

    return (
      <div className="App">
        <h1>Quiz</h1>
        {/* <button onClick={this.addQues}>+ Question</button>
        {this.state.fieldQuestions.length > 0 
        ? this.state.fieldQuestions.map((ques, i) => <CreateQuestion key={i} />)
        : null} */}
        <div className="progress-bar">
              <ProgressBar percentage={this.state.percentage}/>
        </div>
        {questions.length > 0
        ? questions.map(each => <div key={each.questionID} className="each-question">
          <span className="question">{each.question}</span>
          <ul>
            {each.answers
            ? each.answers.map((answer, ansInd) => <li key={ansInd}>
                <input 
                  type="radio"
                  value={answer.answer} 
                  name={each.questionID}
                  // checked={this.state.answer === answer.answer} 
                  onChange={e => this.onChangeAnswer(e, each.questionID, answer.answerID, answer.isAnswer)}
                />
                <span>{answer.answer}</span>
            </li>)
            : null}
          </ul>
        </div>)
        : null}
        
        <h4>
          Your score is
          <span className="score"> {this.state.score}</span>
        </h4>
      </div>
    );
  }
}

