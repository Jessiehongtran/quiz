import React from 'react';
import '../styles/CreateQuestion.scss'

export default class CreateQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answers: []
        }

        this.addAns = this.addAns.bind(this)
    }

    addAns(){
        //post question and return id

        this.setState({answers: [
            ...this.state.answers,
            0
        ]})
    }

    render(){
        return (
            <div className="questions">
                <input
                    placeholder="Question"
                />
                <button onClick={this.addAns}>+ Answer</button>
                {this.state.answers.length > 0
                ? this.state.answers.map((answer,i) => <input key={i} placeholder={"Answer " + (i+1).toString()}/>)
                : null}
            </div>
        )
    }
}