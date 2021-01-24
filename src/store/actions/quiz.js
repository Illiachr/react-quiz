import axios from "../../axios/axios-quiz"
import { FETCH_QUIZES_ERORR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from "./actionTypes"

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

export function fetchQuizesErr(e) {
    return {
        type: FETCH_QUIZES_ERORR,
        error: e
    }
}