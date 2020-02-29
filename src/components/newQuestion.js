import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared.js'
import { Container, Card, Form, Button } from 'react-bootstrap'

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        disabled:true,
        redirect: false
    };

    handleChange = (e) => {
        const optionText = e.target.id
        const text = e.target.value
        this.setState({
            [optionText]: text
        }, () => {
            this.state.optionOne && this.state.optionTwo
                ? this.setState({ disabled: false })
                : this.setState({ disabled: true })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { state: { optionOne, optionTwo}, props: { dispatch} } = this
        dispatch(handleAddQuestion( optionOne, optionTwo))
        this.setState({ redirect: true })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return(
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Would you rather...</Card.Title>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    id="optionOne"
                                    type="text"
                                    placeholder="Enter First Option"
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <p className="small">OR</p>
                            <Form.Group>
                                <Form.Control
                                    id="optionTwo"
                                    type="text"
                                    placeholder="Enter Second Option"
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <Button disabled={this.state.disabled} type="submit">
                                <span> Submit</span>
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return { authedUser }
}

export default connect(mapStateToProps)(NewQuestion)
