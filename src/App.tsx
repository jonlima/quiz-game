
import { useEffect } from 'react';
import './App.scss'
import Score from './components/Score.tsx';
import Game from './components/Game.tsx';
import { useQuiz } from './QuizContext.tsx';

function App() {
  const {state, dispatch} = useQuiz();
  const API_URL = "https://opentdb.com/api.php?amount=1&category=18";

  async function fetchQuestion() {
    const response = await fetch(API_URL);
    let data = await (response.json());
    let question = data.results[0];
  }

  useEffect(() => {
    if (state.gameStatus == 'idle') {
      fetchQuestion()
    }
  })

  return (
    <>
      <Score />
      <Game /> 
    </>
  )
}

export default App
