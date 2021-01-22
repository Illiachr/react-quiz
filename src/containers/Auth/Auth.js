import React, { Component } from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'

class Auth extends Component {

    signInHandler = () => {

    } // end signInHandler

    signUpHandler = () => {

    } // end signUpHandler

    onSubmitHandler = e =>  e.preventDefault() 

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>

                <form onSubmit={this.onSubmitHandler} className={classes.AuthForm}>
                    <input type="text" />
                    <input type="text" />
                    
                    <Button
                        type="success"
                        onClick={this.signInHandler}
                    >
                        Войти
                    </Button>
                    <Button
                        type="primary"
                        onClick={this.signUpHandler}
                    >
                        Зарегистрироваться
                    </Button>
                </form>

                </div>
            </div>
        );
    }
}

export default Auth;