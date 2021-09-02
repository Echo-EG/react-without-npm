import TodoItem from "./TodoItem";
import {ITask} from "../interface";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {getTodoAsync} from "../redux/slice";
import {useEffect} from "react";


const TodoList = () =>{


    const todos: ITask[] = useSelector((state:RootState) =>{

        return state.todos
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodoAsync());
    }, []);



    return(
        <div>
            {todos.map((newTodo: ITask, key:number) =>{
               return <TodoItem key={newTodo.id} title={newTodo.title} id={newTodo.id} checked={newTodo.checked}  />;
            })}
        </div>

    )

}

export default TodoList;