import React from 'react';
import './App.css';
import axios from 'axios';
import { API_URL } from './apiConfig';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      questions: [],
      answer: ""
    }

    this.onChangeAnswer = this.onChangeAnswer.bind(this)
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

  onChangeAnswer(e){
    this.setState({answer: e.target.value})
  }

  render(){
    const { questions } = this.state

    console.log('questions', questions)

    return (
      <div className="App">
        <h1>Quiz</h1>
        {questions.length > 0
        ? questions.map(each => <div>
          <span>{each.question}</span>
          <ul>
            {each.answers
            ? each.answers.map(answer => <li>
                <input 
                  type="radio"
                  value={answer} 
                  checked={this.state.answer === answer} 
                  onChange={this.onChangeAnswer}
                />
                <span>{answer}</span>
            </li>)
            : null}
          </ul>
        </div>)
        : null}
      </div>
    );
  }
}

