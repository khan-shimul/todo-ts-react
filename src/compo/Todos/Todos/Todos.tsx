import { makeStyles } from '@material-ui/styles';
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useCallback, useReducer, useRef, useState } from 'react';
import Todo from '../Todo/Todo';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// Custom Style
const useStyle = makeStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                border: '1px solid #FF8787',
            }
        }
    },
});

const Todos = () => {
    const classes = useStyle();
    // Type
    interface TodoType {
        id: number,
        text: string
    };
    type ActionType = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number };
    // Todo Reducer
    const reducer = (state: TodoType[], action: ActionType) => {
        switch (action.type) {
            case 'ADD':
                return [
                    ...state,
                    {
                        id: state.length,
                        text: action.text
                    }
                ];
            case 'REMOVE':
                return state.filter(({ id }) => id !== action.id);
        }
    };
    const [todos, dispatch] = useReducer(reducer, []);


    const newTodoRef = useRef<HTMLInputElement>(null);
    // Handle Add Todo
    const handleAddTodo = () => {
        if (newTodoRef.current) {
            dispatch({
                type: 'ADD',
                text: newTodoRef.current.value
            });
            localStorage.setItem('todos', newTodoRef.current.value)
        }
    };

    console.log(todos)

    return (
        <Box component="section" sx={{ py: 8 }}>
            <Typography
                variant="h5"
                sx={{ textAlign: 'center', color: '#B9D1DB', letterSpacing: 6, fontSize: '2.5rem', mb: 1.5 }}>
                TODO LIST
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                    placeholder="Enter Your Next Task"
                    className={classes.root}
                    sx={{ background: '#fff', borderRadius: '5px', width: '30%' }}
                    inputRef={newTodoRef}

                />

                <Button
                    onClick={handleAddTodo}
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{ background: '#B289FF' }}
                >Add</Button>
            </Box>

            <Todo />
        </Box>
    );
};

export default Todos;