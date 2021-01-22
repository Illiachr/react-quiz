import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './QuizList.module.css'
import axios from 'axios'

class QuizList extends Component {

    renderQuizes() {
        return [1, 2, 3].map((quiz, i) => {
            return (
                <li
                    key={i}
                >
                    <NavLink to={'/quiz/' + quiz}>
                        Тест {quiz}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        axios
            .get('https://react-quiz-35ef7-default-rtdb.firebaseio.com/quiz.json')
            .then(res => { console.log(res) })

    }
    

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    <ul>
                        { this.renderQuizes() }
                    </ul>
                </div>
            </div>
        );
    }
}

export default QuizList;