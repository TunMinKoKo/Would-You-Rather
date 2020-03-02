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
import NoMatchPage from "./404";

class App extends Component {

  componentDidMount() {
      this.props.getData(handleInitialData())
  }

  guestRoutes = (currentLocation) => (
      <Switch>
        <Route exact path='/' component={Login} />
          <Redirect
              to={{
                  pathname: "/",
                  state: { referrer: currentLocation }
              }}
          />
      </Switch>
  )

   authedRoutes = () => (
       <Switch>
         <Route exact path='/' component={Dashboard} />
           <Route path="/questions/bad_id" component={NoMatchPage} />
         <Route path="/questions/:id" component={QuestionDetails} />
         <Route path="/add" component={newQuestion} />
         <Route path="/leaderboard" component={Leaderboard} />
         <Route component={NoMatchPage} />
       </Switch>
   )

  render() {
    const currentLocation = window.location.pathname
    return (
        <BrowserRouter>
            <Fragment>
                <div>
                    <Navigation/>
                    {
                        this.props.notLoggedIn
                        ? this.guestRoutes(currentLocation)
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
      notLoggedIn: authedUser === null,
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getData: () => dispatch(handleInitialData()),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App)
