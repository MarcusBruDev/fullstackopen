import noteReducer from "./noteReducer";
import deepFreeze from "deep-freeze";

describe('noteReducer', () => {
    test('returns new state with action NEW_NOTE',()=>{
        const state=[]
        const action ={
            type:'notes/createNote',
            data: 'the app state is in redux store',
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)
        expect(newState).toHaveLength(1)
        expect(newState.map(e => e.content)).toContainEqual(action.data)
    })


    test('Change importance',()=>{
         const state=[
                {
                content: 'the app state is in redux store',
                important: true,
                id: 1
                },
                {
                content: 'state changes are made with actions',
                important: false,
                id: 2
                }]


        const action ={
            type:'notes/toggleImportanceOf',
            data: {
                id: 1
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)
        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual({
            content: 'the app state is in redux store',
            important: false,
            id: 1
        })

    })
})