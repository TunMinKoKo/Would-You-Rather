import React, { Component } from 'react';
import { Row, Card, Button, Col, Form, ProgressBar,Container, ListGroup, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleAnswer } from '../actions/shared';
import { Redirect } from 'react-router-dom'

class QuestionDetails extends Component {
    state = {
        selectedOption: ''
    };

    radioSelected = (e) => {
        this.setState({
            selectedOption: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.saveQuestionAnswer(this.state.selectedOption);
    };

    render() {
        const { question, questionAuthor, answer, total, percOne, percTwo, badPath} = this.props;
        const { selectedOption } = this.state;
        if(badPath === true){
            return <Redirect to="/questions/bad_id" />;
        }
        return (
            <Container>
                <Row>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <Card style={{marginBottom: '15px', marginTop:'15px'}}>
                            <Card.Body>
                                <Card.Title>Question by {questionAuthor.name}</Card.Title>
                                <Card.Title>Would You Rather</Card.Title>
                                {answer ?
                                    <ListGroup>
                                        <ListGroup.Item variant={answer === 'optionOne' ? 'info' : null}>
                                            {answer === 'optionOne' ? <Badge> You Voted</Badge> : null}
                                            <p>Would you rather {question.optionOne.text}</p>
                                            <ProgressBar now={percOne}  label={`${percOne}%`} variant={percOne > percTwo ? 'success' : 'info'}/>

                                        </ListGroup.Item>
                                        <ListGroup.Item variant={answer === 'optionTwo' ? 'info' : null}>
                                            {answer === 'optionTwo' ? <Badge> You Voted</Badge> : null}
                                            <p>Would you rather {question.optionTwo.text}</p>
                                            <ProgressBar now={percTwo}  label={`${percTwo}%`} variant={percTwo > percOne ? 'success' : 'info'} />
                                        </ListGroup.Item>
                                        <div className="total">
                                            Total number of votes: {total}
                                        </div>
                                    </ListGroup>
 :
                                     <Form onSubmit={this.handleSubmit}>
                                         <Form.Check
                                             onChange={this.radioSelected}
                                             name='question'
                                             type='radio'
                                             id='optionOne'
                                             label={question.optionOne.text}
                                             value='optionOne'
                                         />
                                         <Form.Check
                                             onChange={this.radioSelected}
                                             name='question'
                                             type='radio'
                                             id='optionTwo'
                                             label={question.optionTwo.text}
                                             value='optionTwo'
                                         /><Button disabled={selectedOption === ''} type="submit" style={{marginBottom: '15px', marginTop:'15px'}}>Submit</Button>
                                     </Form>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function percentage(x) {
    return Number.parseFloat(x).toFixed(2);
}

function mapStateToProps ({ questions, users, authedUser }, { match }) {
    const answers = users[authedUser].answers;
    let questionAuthor,answer, percOne, percTwo, total, badPath = false;
    const { id } = match.params;
    const question = questions[id];
    if (question === undefined){
        badPath = true
    }else{
        if (answers.hasOwnProperty(question.id)) {
            answer = answers[question.id]
        }
        questionAuthor = users[question.author];
        total = question.optionOne.votes.length + question.optionTwo.votes.length;
        percOne = percentage((question.optionOne.votes.length / total) * 100);
        percTwo = percentage((question.optionTwo.votes.length / total) * 100);
    }
    return {
        question,
        questionAuthor,
        answer,
        total,
        percOne,
        percTwo,
        badPath
    }
}

function mapDispatchToProps(dispatch, props) {
    const { id } = props.match.params;

    return {
        saveQuestionAnswer: (answer) => {
            dispatch(handleAnswer(id, answer))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)
