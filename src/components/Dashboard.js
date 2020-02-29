import React, { Component } from 'react';
import { Tabs, Tab, Container, Col} from 'react-bootstrap'
import Question from './Question';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render(){
        const { unansweredQuestions, answeredQuestions } = this.props;
        return(
            <Container>
                <Col xs={{ span: 8, offset: 2 }}>
                    <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
                        <Tab eventKey="unanswered" title="Unanswered">
                            {unansweredQuestions.map(qid =>
                                <Col xs={{ span: 8, offset: 2 }} key={qid}>
                                    <Question id={qid} answered={false}/>
                                </Col>
                            )}
                        </Tab>
                        <Tab eventKey="answered" title="Answered">
                            {answeredQuestions.map(qid =>
                                <Col xs={{ span: 8, offset: 2 }} key={qid}>
                                    <Question id={qid} answered={true}/>
                                </Col>
                            )}
                        </Tab>
                    </Tabs>
                </Col>
            </Container>
        )
    }
}

function mapStateToProps ({authedUser, users, questions }) {
    const user = users[authedUser];
      const answeredQuestions = Object.keys(user.answers)
          .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
      return {
          unansweredQuestions : Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
              .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
          answeredQuestions
      }
}

export default connect(mapStateToProps)(Dashboard)
