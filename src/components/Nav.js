import { Nav, Navbar, NavbarBrand, Image , Container} from "react-bootstrap";
import { Link , withRouter} from "react-router-dom";
import {connect} from "react-redux";
import React, { Component, Fragment } from "react";
import { unsetAuthedUser } from '../actions/authedUser'

class Navigation extends Component {

    logout = (e) => {
        e.preventDefault()
        this.props.dispatch(unsetAuthedUser())
    }

    render() {
        const { userIsAuthed,username, avatar} = this.props
        return (
            <Container>
                <Navbar bg="primary" variant="dark" light="true" expand="md" style={{marginBottom: '30px'}}>
                    <Link to='/'>
                        <NavbarBrand>Would You Rather</NavbarBrand>
                    </Link>
                    {userIsAuthed &&
                    <Fragment>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto" navbar>
                                <Link to='/add' className={'nav-link'}>
                                   New Question
                                </Link>
                                <Link to='/leaderboard' className={'nav-link'}>
                                    LeaderBoard
                                </Link>
                                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                                <Nav.Link>{username} <Image roundedCircle className="avatar" src={avatar} style={{width:'25px'}}/></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Fragment>
                    }
                </Navbar>
            </Container>
        );
    }
}

function mapStateToProps ({ authedUser,users }) {
    return {
        userIsAuthed: authedUser !== null,
        username: users[authedUser] ? users[authedUser].name : null,
        avatar: users[authedUser] ? users[authedUser].avatarURL : null
    }
}

export default withRouter(connect(mapStateToProps)(Navigation))