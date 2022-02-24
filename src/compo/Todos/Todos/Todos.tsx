import { makeStyles } from '@material-ui/styles';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
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

                />

                <Button
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