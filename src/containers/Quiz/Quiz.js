import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
    state = {
        results: {}, // { id: 'success' or 'error'} for All questions
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // { id: 'success' or 'error'}
        quiz: [],
        loading: true
    } // end state

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return;
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results =this.state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            
        } else {
            results[question.id] = 'err'
            this.setState({
                answerState: {[answerId]: 'err'},
                results
            })
        } // end if question
        const timeout = setTimeout(() => {
            if (this.isQuizFinished()) {
                this.setState({
                    isFinished: true
                })
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            } // end if isQuizFinished

            clearTimeout(timeout)
        }, 1000)
    } // end onAnswerClickHandler

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    } // end isQuizFinished

    retryHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null
        })
    } // end retryHandler

    async componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id);
        try {
            const response = await axios.get(`/quizDb/${this.props.match.params.id}.json`)
            const quiz = response.data
            
            this.setState({ quiz, loading: false });
            console.log(this.state.loading)
            console.log(this.state)
    } catch (e) { console.warn(e); }
    }
    
    render() {
        return (
            <div className={ classes.Quiz }>       
                <div className={classes.QuizWrapper}>
                <h1>Ответьте на вопросы</h1>
                
                {
                    this.state.loading
                    ? <Loader/>
                    : this.state.isFinished
                        ? <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <ActiveQuiz 
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                }

                {/* {
                    this.state.isFinished
                    ? <FinishedQuiz
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                    />
                    : <ActiveQuiz 
                    question={this.state.quiz[this.state.activeQuestion].question}
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQuestion + 1}
                    state={this.state.answerState}
                    />
                } */}
                </div>
            </div>
        )
    }
}

export default Quiz