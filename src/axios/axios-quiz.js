import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-35ef7-default-rtdb.firebaseio.com'
})