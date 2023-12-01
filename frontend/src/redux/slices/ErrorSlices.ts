import {PayloadAction, createSlice}  from '@reduxjs/toolkit';

interface ErrorState {
    errors: string[];
}

const initialState: ErrorState = {
    errors: [],
};

export const errorSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        setErrors: (state, action: PayloadAction<string[]>) => {
            state.errors = action.payload
        },
    },
});


export const {setErrors} = errorSlice.actions;
export default errorSlice.reducer;
