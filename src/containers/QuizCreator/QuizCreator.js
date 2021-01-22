import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, validate, validateForm } from '../../form/FormFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './QuizCreator.module.css'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errMsg: 'Значение не может быть пустым',
        id: number,
        validation: {
            required: true,
        }
    })
} // end createOptionControl

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errMsg: 'Вопрос не может быть пустым',
            validation: {
                required: true,
            }
        }),
        rightAnswerId: 1,
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }

} // end createFormControls

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = e => {
        e.preventDefault()
    } // end submitHandler

    addQuestionHandler = e => {

    } // end addQuestionHandler

    createQuizHandler = e => {
        e.preventDefault()
    } // end createQuizHandler

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.required)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(this.formControls)
        });
    } // end changeHandler

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]
            console.log(control);
            return (
                <Auxiliary key={controlName + i}>
                    <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errMsg={control.errMsg}
                    onChange={e => this.changeHandler(e.target.value, controlName)}
                />
                { i === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    } // end renderControls

    selectChangeHandler = e => {
        console.log(e.target.value);
        this.setState({
            rightAnswerId: +e.target.value
        });
    } // end selectChangeHandler

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text:1, value:1},
                {text:2, value:2},
                {text:3, value:3},
                {text:4, value:4},
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                <h1>Создание теста</h1>
                <form
                    onSubmit={this.submitHandler}
                >
                    { this.renderControls() }
                    { select }
                    
                    <Button
                        type="primary"
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Добавить вопрос</Button>
                    <Button
                        type="success"
                        onClick={this.createQuizHandler}
                        disabled={this.state.quiz.length === 0}
                    >
                        Создать тест</Button>
                </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;