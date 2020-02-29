import React from "react"
import { connect } from "react-redux"
import { Container, Table ,Image } from 'react-bootstrap'

function Leaderboard(props) {
    const { users } = props;
    return (
        <Container>
        <Table>
            <thead>
            <tr>
                <th>Rank</th>
                <th>Profile</th>
                <th>User</th>
                <th>Questions Asked</th>
                <th>Questions Answered</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td><Image src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`} style={{width:'50px'}}/></td>
                    <td>{user.name}</td>
                    <td>{user.questions.length}</td>
                    <td>{Object.keys(user.answers).length}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        </Container>
    )
}

const mapStateToProps = ({ users }) => {
    const userScore = user =>
        Object.keys(user.answers).length + user.questions.length;
    return {
        users: Object.values(users).sort((a, b) => userScore(b) - userScore(a))
    }
};

export default connect(mapStateToProps)(Leaderboard)
