import React from 'react';
import styled from 'styled-components';

const Tracker = styled.div`
    width: 50%;
    height: 20px;
    margin: 15px auto;
    background: rgb(34,34,34);
    border-radius: 10px;
    box-shadow: inset 0 0 5px #000;
`

const ProgressInTracker = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #6bccf9;
    border-radius: 8px;
    transition: width 0.3s ease-in-out;
`

export default class ProgressBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <Tracker>
                <ProgressInTracker percentage={this.props.percentage}/>
            </Tracker>
        )
    }
}