import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login'
import Dashboard from "./Dashboard"
import QuestionDetails from "./QuestionDetails"
import Navigation from "./Nav"
import newQuestion from "./newQuestion";
import { handleInitialData } from '../actions/shared'
import Leaderboard from "./Leaderboard";

class App extends Component {

  componentDidMount() {
      this.props.dispatch(handleInitialData())
  }

  guestRoutes = () => (
      <Switch>
        <Route exact path='/' component={Login} />
        <Redirect from='*' to='/' />
      </Switch>
  )

   authedRoutes = () => (
       <Switch>
         <Route exact path='/' component={Dashboard} />
         <Route path="/questions/:id" component={QuestionDetails} />
         <Route path="/add" component={newQuestion} />
         <Route path="/leaderboard" component={Leaderboard} />
         <Redirect from='*' to='/' />
       </Switch>
   )

  render() {
    return (
        <BrowserRouter>
            <Fragment>
                <div>
                    <Navigation/>
                    {this.props.notLoggedIn
                        ? this.guestRoutes()
                        : this.authedRoutes()
                    }
                </div>
            </Fragment>
        </BrowserRouter>
    )
  }
}

function mapStateToProps ({ authedUser}) {
  return {
      notLoggedIn: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
