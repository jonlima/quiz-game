
import { useEffect } from 'react';
import './App.scss'
import FullPageLoader from './components/FullPageLoader.tsx';
import Score from './components/Score.tsx';
import Game from './components/Game.tsx';
import { useQuiz, Question, QuestionsResponse } from './QuizContext.tsx';

function App() {
  const {state, dispatch} = useQuiz();
  const API_URL = "https://opentdb.com/api.php?amount=1&category=18";

  async function fetchQuestion() {
    try {
      dispatch({ type: 'setStatus', payload: "fetching" });
      const response = await fetch(API_URL);
      let data: QuestionsResponse = await (response.json());

      if (data.response_code === 0) {
        let question : Question = data.results[0];
        dispatch({ type: 'setStatus', payload: "ready" });
      } else {
        dispatch({ type: 'setStatus', payload: "error" });
      }
    } catch (error) {
      console.error("error: ", error);
      dispatch({ type: 'setStatus', payload: "error" });
    }
  }

  useEffect(() => {
    if (state.gameStatus == 'idle') {
      fetchQuestion()
    }
  })

  return (
    <>
      {
        state.gameStatus == 'fetching' ?
          <FullPageLoader /> : state.gameStatus == 'error' ?
          <p>Error....</p> : state.gameStatus == 'ready' ?
          <>
            <Score />
            <Game /> 
          </> :
          ''
      }
    </>
  )
}

export default App
