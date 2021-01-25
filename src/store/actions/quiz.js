import axios from "../../axios/axios-quiz"
import { 
            FETCH_QUIZES_ERORR,
            FETCH_QUIZES_START,
            FETCH_QUIZES_SUCCESS,
            FETCH_QUIZ_SUCCESS,
            FINISH_QUIZ,
            QUIZ_SET_STATE,
            QUIZ_NEXT_QUESTION,
            QUIZ_RETRY,
        } from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
                const response = await axios.get('/quizDb.json')
                const quizDb = []
                Object.keys(response.data).forEach((key, i) => {
                    quizDb.push({
                        id: key,
                        name: `Тест№ ${i + 1}`
                    })
                })
                console.log(quizDb);
                dispatch(fetchQuizesSuccess(quizDb))
                // this.setState({ quizDb, loading: false });
        } catch (e) { 
            dispatch(fetchQuizesErr(e))
            // console.warn(e);
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizDb/${quizId}.json`)
            const quiz = response.data
            
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) { dispatch(fetchQuizesErr(e)) }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizDb: quizes
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesErr(e) {
    return {
        type: FETCH_QUIZES_ERORR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(num) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion: num
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerQClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return;
            }
        }
        const question = state.quiz[state.activeQuestion]
        const results = state.results;

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            
        } else {
            results[question.id] = 'err'
            dispatch(quizSetState({[answerId]: 'err'}, results))
        } // end if question
        const timeout = setTimeout(() => {
            if (isQuizFinished(state)) {
                dispatch(finishQuiz())
            } else {
                dispatch(quizNextQuestion(state.activeQuestion + 1))
            } // end if isQuizFinished

            clearTimeout(timeout)
        }, 1000)
    } // end return
} // end onAnswerClickHandler

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}