import React, {ChangeEvent, FC, useState} from "react"
import TodoList from "./components/TodoList";
import {useDispatch} from "react-redux";
import {addTodoAsync} from "./redux/slice";
import {Typography, makeStyles, ThemeProvider, createTheme} from "@material-ui/core";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    textField: {
        minWidth: '80%',
    }
})

const theme = createTheme({
    palette:{
        primary: {
            main: orange[200]
        },
        secondary:{
            main: '#00bcd4',

        }
    }
})



export const App: FC = () =>{

    const classes = useStyles();

    const [title, setTitle] = useState<string>('')


    const dispatch = useDispatch();

    const handleInput = (event: ChangeEvent<HTMLInputElement>): void =>{
        setTitle(event.target.value)

    }

    const addTask = ()  =>{
        dispatch(addTodoAsync({title: title}))
        setTitle('')
    }




    return(
        <div>
            <ThemeProvider theme={theme} >
                <Container maxWidth='lg'>
                    <Typography color='primary' variant='h3' align='center'>Todo-list Typescript</Typography>
                    <Grid container justifyContent='center' spacing={10}>
                        <Grid item xs={6}>
                            <TextField className={classes.textField} label='Stuff todo' type='text'  onChange={handleInput} value={title}/>
                            <Button color='secondary' variant='contained' size='large' onClick={addTask}>Add<AddIcon/> </Button>
                        </Grid>
                    </Grid>
                </Container>
                <TodoList  />
            </ThemeProvider>
        </div>
    )
}