import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errMsg: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errMsg: 'Введите верный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLenght: 6
                }
            }
        }
    }

    signInHandler = () => {
        this.props.auth ( 
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    } // end signInHandler

    signUpHandler = async () => {
        this.props.auth ( 
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )        
    } // end signUpHandler

    submitHandler = e =>  e.preventDefault()

    validateControl(value, validation) { // значение и объект
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLenght) {
            isValid = value.length >= validation.minLenght && isValid
        }

        return isValid
    } // end validateControl

    onChangeHandler = (e, controlName) => {
        const formControls = {...this.state.formControls}
        const ctrl = {...formControls[controlName]}

        ctrl.value = e.target.value
        ctrl.touched = true
        ctrl.valid = this.validateControl(ctrl.value, ctrl.validation) // значение и объект
        
        formControls[controlName] = ctrl

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            // true - если поле валидное и isFormValid до этого также был true
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    } // end onChangeHandler
    
    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + i}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errMsg={control.errMsg}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                    
                    { this.renderInputs() }
                    
                    <Button
                        type="success"
                        onClick={this.signInHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        onClick={this.signUpHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Зарегистрироваться
                    </Button>
                </form>

                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);