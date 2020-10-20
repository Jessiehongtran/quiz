import React from 'react';
import './App.css';
import axios from 'axios';
import { API_URL } from './apiConfig';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 1,
      questions: [],
      answer: "",
      responses: []
    }

    this.onChangeAnswer = this.onChangeAnswer.bind(this)
    this.isInResponses = this.isInResponses.bind(this)
    this.updateResponse = this.updateResponse.bind(this)
  }

  async componentDidMount(){
    try {
      const res = await axios.get(`${API_URL}/questions`)
      console.log('res', res)
      this.setState({questions: res.data})
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
    } else {
      this.setState({
        responses: [
          ...this.state.responses,
          response
        ]
      })
    }
  }

  onChangeAnswer(e, questionId, answerId){
    this.setState({answer: e.target.value})
    this.updateResponse({
      userID: this.state.userId,
      questionID: questionId,
      answerID: answerId
    })
  }

  render(){
    const { questions } = this.state

    console.log('questions', questions)

    console.log('answer', this.state.answer)

    console.log('responses', this.state.responses)

    return (
      <div className="App">
        <h1>Quiz</h1>
        {questions.length > 0
        ? questions.map(each => <div className="each-question">
          <span>{each.question}</span>
          <ul>
            {each.answers
            ? each.answers.map((answer, ansInd) => <li>
                <input 
                  type="radio"
                  value={answer.answer} 
                  checked={this.state.answer === answer.answer} 
                  onChange={e => this.onChangeAnswer(e, each.questionID, answer.answerID)}
                />
                <span>{answer.answer}</span>
            </li>)
            : null}
          </ul>
        </div>)
        : null}
      </div>
    );
  }
}

