import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Container, Row, Col, Card, Button, Form} from 'react-bootstrap'

class Login extends Component {

    state = {
        imgSrc: 'https://i.ibb.co/Jvyrfcz/user-2.png',
        userToSignIn: null,
        disabled: true
    }

    handleChange = (e) => {
        const { [e.target.value]: selectedUser } = this.props.users
        this.setState({
            imgSrc: selectedUser.avatarURL,
            userToSignIn: selectedUser.id
        }, () => {
            if (this.state.userToSignIn) {
                this.setState({
                    disabled: false
                })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(setAuthedUser(this.state.userToSignIn))
        if(this.props.location.state !== undefined){
            const referrer = this.props.location.state.referrer
            this.props.history.push(referrer);
        }else{
            const referrer = '/'
            this.props.history.push(referrer);
        }
    }

    renderForm = () => (
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formControlsSelect">
                <Form.Label>Select User</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} >
                    <option value="">Please select</option>
                       {(Object.values(this.props.users)).map((user) => (
                             <option key={user.id} value={user.id}>
                                {user.name}
                             </option>
                         ))}
                </Form.Control>
            </Form.Group>
            <Button
                 disabled={this.state.disabled}
                 type="submit">
                 Sign In
            </Button>
        </Form>
    )
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Body className="text-center">
                                <Card.Title>Sign In</Card.Title>
                                    <Card.Img src={this.state.imgSrc} style={{ width: '150px' }} />
                                {this.renderForm()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps ({ users ,questions }) {
    return { users , questions}
}

export default connect(mapStateToProps)(Login)
