import React from 'react'
import classes from './AnswersItem.module.css'

const AnswersItem = props => (
    <li className={classes.AnswersItem}>
        { props.answer.text }
    </li>
)

export default AnswersItem