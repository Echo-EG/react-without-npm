import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITask} from "../interface";




export const getTodoAsync = createAsyncThunk<ITask[]>(
    'todos/getTodosAsync',
    async (): Promise<any> => {
        const response = await fetch('http://localhost:8080/todo')
        
        if (response.ok){

            const todos = await response.json();
            return {todos}
        }
    }
)
export const addTodoAsync = createAsyncThunk<ITask, { title:string} >(
    'todos/addTodoAsync',
    async (payload): Promise <any> =>{
        const response = await fetch('http://localhost:8080/post', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: payload.title})
        });

        if (response.ok) {

            return await response.json()
        }
    }
)

export const toggleCompleteAsync = createAsyncThunk<ITask, ITask>(
    'todos/completeTodoAsync',
    async (payload): Promise <any> => {
        const response = await fetch(`http://localhost:8080/${payload.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload),
        });
            if (response.ok){
                return await response.json()
            }

    }
)

export const deleteTodoAsync = createAsyncThunk<ITask, {id: number}>(
    'todos/deleteTodoAsync',
    async (payload): Promise <any> =>{
        const response = await fetch(`http://localhost:8080/delete/${payload.id}`, {
            method: 'DELETE',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*'
            }
        });
        if(response.ok){
            return{id: payload.id}
        }
    }
)

export const editTodoAsync = createAsyncThunk<ITask, ITask>(
    'todos/editTodoAsync',
    async (payload): Promise <any> =>{
        const response = await fetch(`http://localhost:8080/${payload.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(payload),
        });
        if(response.ok){
            return await response.json()
        }
    }
)



const todoSlice = createSlice({
    name: 'todos',
    initialState: [] as ITask[],
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getTodoAsync.fulfilled, (state: ITask[], action:PayloadAction<any>) => {
            return action.payload.todos
        })
        builder.addCase(addTodoAsync.fulfilled, (state: ITask[], action: PayloadAction<any>) => {
            return [...state, action.payload]
        })
        builder.addCase(toggleCompleteAsync.fulfilled, (state: ITask[], action: PayloadAction<any>) =>{
            const index = state.findIndex((todos) => todos.id === action.payload.id)
            state[index].checked = action.payload.checked;
        })
        builder.addCase(deleteTodoAsync.fulfilled, (state: ITask[], action: PayloadAction<any>) =>{
            const newState = state.filter((todo) => todo.id !== action.payload.id)
            return newState
        })
        builder.addCase(editTodoAsync.fulfilled, (state:ITask[], action: PayloadAction<any>) =>{
            const index = state.findIndex((todos) => todos.id === action.payload.id)
            state[index].title = action.payload.title;
        })

    }

})

export default todoSlice.reducer;