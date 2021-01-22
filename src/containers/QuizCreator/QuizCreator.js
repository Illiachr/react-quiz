import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { createControl } from '../../form/FormFramework';
import classes from './QuizCreator.module.css'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errMsg: 'Значение не может быть пустым',
        id: number
    }, {required: true})
} // end createOptionControl

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errMsg: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }

} // end createFormControls

class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = e => {
        e.preventDefault()
    } // end submitHandler

    addQuestionHandler = e => {

    } // end addQuestionHandler

    createQuizHandler = e => {

    } // end createQuizHandler

    changeHandler = (value, controlName) => {

    } // end changeHandler

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errMsg={control.errMsg}
                    onChange={e => this.changeHandler(e.target.value, controlName)}
                />
                // { i === 0 ? <hr/> : null}
            )
        })
    } // end renderControls

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                <h1>Создание теста</h1>
                <form
                    onSubmit={this.submitHandler}
                >
                    { this.renderControls() }

                    <select></select>
                    
                    <Button
                        type="primary"
                        onClick={this.addQuestionHandler}
                    >
                        Добавить вопрос</Button>
                    <Button
                        type="success"
                        onClick={this.createQuizHandler}
                    >
                        Создать тест</Button>
                </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;