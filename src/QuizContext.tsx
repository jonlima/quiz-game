import { createContext, useContext, useReducer } from 'react';

export interface Question {
    category: string,
    type: "multiple" | "boolean",
    difficulty: "easy" | "medium" | "hard",
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export interface QuestionsResponse {
    response_code: number,
    results: Question[]
}


type Status = "idle" | "fetching" | "ready" | "error";

interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}

interface QuizState {
    gameStatus: Status,
    question: Question | null
}

type QuizAction =
    { type: 'setStatus', payload: Status }
    | { type: 'setQuestion', payload: Question }

const initialState: QuizState = {
    gameStatus: "idle",
    question: null
}

const QuizContext = createContext<QuizContext>({
    state: initialState,
    dispatch: () => null
});

export function QuizProvider({children} : {children: React.ReactElement}) {
    const [state, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <QuizContext.Provider value={{state, dispatch}}>
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz () {
    return useContext(QuizContext);
}

function QuizReducer(state: QuizState, action: QuizAction) : QuizState {
    switch(action.type) {
        case 'setStatus':
            return {...state, gameStatus: action.payload};
        case 'setQuestion':
            return {...state, question: action.payload};
        default:
           throw new Error("Unknown action") ;
    }
}