import { 
            FETCH_QUIZES_ERORR,
            FETCH_QUIZES_START,
            FETCH_QUIZES_SUCCESS,
            FETCH_QUIZ_SUCCESS,
            FINISH_QUIZ,
            QUIZ_NEXT_QUESTION,
            QUIZ_RETRY,
            QUIZ_SET_STATE,
        } from "../actions/actionTypes"

const initialState = {
    quizDb: [],
    loading: false,
    error: null,
    results: {}, // { id: 'success' or 'error'} for All questions
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { id: 'success' or 'error'}
    quiz: null,
}

export default function quizReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, 
                loading: false,
                quizDb: action.quizDb
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, 
                loading: false,
                quiz: action.quiz
            }
        case FETCH_QUIZES_ERORR:
            return {
                ...state, 
                loading: false,
                error: action.erorr
            }        
        case QUIZ_SET_STATE:
            return {
                ...state, 
                answerState: action.answerState,
                results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: null
            }
        case QUIZ_RETRY:
            return {
                ...state,
                results: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null
            }
        default:
            return state
    }
}