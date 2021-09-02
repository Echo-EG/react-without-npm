import {useDispatch} from "react-redux";
import {ITask} from "../interface";
import {deleteTodoAsync, editTodoAsync, toggleCompleteAsync} from "../redux/slice";
import {Button, Checkbox, Container, Grid, TextField, makeStyles} from "@material-ui/core";
import {Typography,} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {ChangeEvent, useState} from "react";
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles({
    editField: {
        minWidth: '88%',
    }
})


const TodoItem = ({title, id, checked}: ITask) => {


    const classes = useStyles();

    const [edit, setEdit] = useState<string>(title)

    const handleEditInput = (event: ChangeEvent<HTMLInputElement>): void => {
        // setTitle(event.target.value)
        setEdit(event.target.value)
        console.log(edit)

    }


    const dispatch = useDispatch();

    const handleDeleteClick = () => {
        dispatch(deleteTodoAsync({id}))
    }

    const handleCompleteClick = () => {
        dispatch(toggleCompleteAsync({id, checked: !checked, title}))
    }

    const handleEditClick = () => {
        dispatch(editTodoAsync({id, title: edit, checked}))
    }

    return (
        <div>
            <Container maxWidth='lg'>
                <Grid container justifyContent='center' spacing={4}>
                    <Grid item xs={4}>
                        <Checkbox onChange={handleCompleteClick} checked={checked}/>
                        <TextField className={classes.editField} type='text' onChange={handleEditInput}
    value={edit}/>
                    </Grid>
                    <Grid item>
                        <Button color='primary' variant='contained' size='large'
                                onClick={handleDeleteClick}>Delete<DeleteIcon/></Button>
                        <Button onClick={handleEditClick} color='secondary' variant='contained'
                                size='large'>Edit<EditIcon/></Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default TodoItem;