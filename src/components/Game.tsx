import './Game.scss';
import AnswerOption from './AnswerOption.tsx';
import Result from './Result.tsx';
import { useQuiz } from '../QuizContext.tsx';
import { decode } from 'html-entities';


function Game() {

    const { state, dispatch } = useQuiz();

    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{decode(state.question?.question)}</h4>
                <div className="options">
                    {state.question?.incorrect_answers.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>
               {
                    state.userAnswer && state.gameStatus != "answered" &&
                    <button onClick={() => { dispatch({type: 'setStatus', payload: "answered"}) }}>
                        Submit
                    </button>
               }

                {
                    state.gameStatus == "answered" &&
                    <Result />
               }
            </div>
            
        </>
    )
}

export default Game
