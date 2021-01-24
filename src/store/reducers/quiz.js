import { FETCH_QUIZES_ERORR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from "../actions/actionTypes"

const initialState = {
    quizDb: [],
    loading: false,
    error: null
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
        case FETCH_QUIZES_ERORR:
            return {
                ...state, 
                loading: false,
                error: action.erorr
            }
        
        default:
            return state
    }
}