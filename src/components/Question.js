import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Card} from 'react-bootstrap'
import {  withRouter, Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const {question, auth , answered} = this.props;
        const   questionLink = `/questions/${question.id}`
        return (
                <Card style={{marginBottom: '15px', marginTop:'15px'}}>
                    <Card.Body>
                        <Card.Title>Would You Rather</Card.Title>
                        <ul>
                            <li className={question.optionOne.votes.includes(auth) ? "optionSelected" : ""}>{question.optionOne.text}</li>
                            <li className={question.optionTwo.votes.includes(auth) ? "optionSelected" : ""}>{question.optionTwo.text}</li>
                        </ul>
                        <Link to={questionLink}>
                            {answered ?
                                <Button type="submit">View Result</Button>
                            :
                                <Button type="submit">Answer Question</Button>
                            }
                        </Link>
                    </Card.Body>
                </Card>
        );
    }
}

function mapStateToProps (state, { id }) {
    return {
        question : state.questions[id],
        auth: state.authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Question))