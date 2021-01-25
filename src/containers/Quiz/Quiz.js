import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerQClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {
    // onAnswerClickHandler = answerId => {
    //     if (this.state.answerState) {
    //         const key = Object.keys(this.state.answerState)[0]
    //         if (this.state.answerState[key] === 'success') {
    //             return;
    //         }
    //     }

    //     const question = this.state.quiz[this.state.activeQuestion]
    //     const results =this.state.results;

    //     if (question.rightAnswerId === answerId) {
    //         if (!results[question.id]) {
    //             results[question.id] = 'success'
    //         }

    //         this.setState({
    //             answerState: {[answerId]: 'success'},
    //             results
    //         })
            
    //     } else {
    //         results[question.id] = 'err'
    //         this.setState({
    //             answerState: {[answerId]: 'err'},
    //             results
    //         })
    //     } // end if question
    //     const timeout = setTimeout(() => {
    //         if (this.isQuizFinished()) {
    //             this.setState({
    //                 isFinished: true
    //             })
    //         } else {
    //             this.setState({
    //                 activeQuestion: this.state.activeQuestion + 1,
    //                 answerState: null
    //             })
    //         } // end if isQuizFinished

    //         clearTimeout(timeout)
    //     }, 1000)
    // } // end onAnswerClickHandler

    // isQuizFinished() {
    //     return this.state.activeQuestion + 1 === this.state.quiz.length
    // } // end isQuizFinished

    // retryHandler = () => {
    //     this.setState({
    //         results: {},
    //         isFinished: false,
    //         activeQuestion: 0,
    //         answerState: null
    //     })
    // } // end retryHandler

    async componentDidMount() {
        console.log('Quiz ID = ', this.props.match.params.id);
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }
    
    
    render() {
        return (
            <div className={ classes.Quiz }>       
                <div className={classes.QuizWrapper}>
                <h1>Ответьте на вопросы</h1>
                
                {
                    this.props.loading || !this.props.quiz
                    ? <Loader/>
                    : this.props.isFinished
                        ? <FinishedQuiz
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                        : <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick={this.props.quizAnswerQClick}
                            quizLength={this.props.quiz.length}
                            answerNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerQClick: answerId => dispatch(quizAnswerQClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
