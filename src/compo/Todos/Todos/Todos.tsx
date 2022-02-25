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
    // State Type
    interface TodoType {
        id: number,
        text: string
    };
    // Action Type
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
            // localStorage.setItem('todo', todos);
        }
    };

    // console.log(todos.length)
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

            {/* Display Todos */}
            {
                todos.length > 0 && <Box sx={{ background: '#fff', width: '33%', p: 3, my: 3, mx: 'auto', borderRadius: 1 }}>
                    {
                        todos.map(todo => <Box>
                            <Typography
                                variant="h5"
                                sx={{ borderBottom: 1, borderColor: '#D5D5D6', color: '#2174D3', fontSize: '1rem', fontWeight: 600, py: 1 }}
                            >
                                {todo.text}
                                <Button
                                    sx={{ color: '#F74539' }}
                                    onClick={() => dispatch({ type: 'REMOVE', id: todo.id })}
                                >X</Button>
                            </Typography>

                        </Box>)
                    }
                </Box>
            }
        </Box>
    );
};

export default Todos;