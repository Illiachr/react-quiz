import Layout from './hoc/Layout/Layout'
import { Route, Switch} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/auth" component={Auth} />
        <Route path="/quiz" component={QuizList} />
      </Switch>
    </Layout>
  );
}

export default App;
