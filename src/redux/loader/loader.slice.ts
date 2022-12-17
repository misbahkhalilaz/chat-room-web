import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: LoaderState = {
    visible: false,
    tasks: [],
};

const slice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        show: (state) => {
            state.visible = true;
        },
        hide: (state) => {
            state.visible = false;
        },
        addTask: (state, action: PayloadAction<{id: string}>) => {
            state.tasks.push(action.payload.id);
        },
        removeTask: (state, action: PayloadAction<{id: string}>) => {
            state.tasks = state.tasks.filter((task) => task !== action.payload.id);
        },
    },
});

export const loaderActions = slice.actions;

export const loaderReducer = slice.reducer;

export const loader = (state: RootState) => state.loader;
