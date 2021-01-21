import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results)
                        .reduce((total, key) => {
                            if (props.results[key] === 'success') {
                                total += 1
                            }

                            return total
                        }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, i) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'err' 
                        ? `fas fa-times`
                        : `fas fa-check`,
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li key={i}>
                        <strong>{i + 1}.</strong>&nbsp;
                            {quizItem.question}
                        <i className={cls.join(' ')}></i>
                        </li>
                    )
                }) }
            </ul>
            <p>Верно {successCount} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Попробовать снова</Button>
                <Button type="success">Перейти в список тестов</Button>
            </div>
        </div>
    )

} // end FinishedQuiz

export default FinishedQuiz