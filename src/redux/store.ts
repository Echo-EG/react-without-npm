import {configureStore} from "@reduxjs/toolkit";
import todoReducer from './slice';
import {ITask} from "../interface";

export interface RootState {
    todos: ITask[],
}


export default configureStore({
    reducer:{
        todos: todoReducer
    },
})