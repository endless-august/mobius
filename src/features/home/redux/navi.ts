import { find } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/common/store';

export interface NaviItem {
    key: string;
    name: string;
    path: string;
}

export interface NaviState {
    stack: NaviItem[];
    active: NaviItem | undefined;
}

const initialState: NaviState = {
    stack: [],
    active: undefined,
};

export const naviSlice = createSlice({
    name: 'navi',
    initialState,
    reducers: {
        navigateTo: (state, action: PayloadAction<NaviItem>) => {
            if (state.active && state.active.key === action.payload.key) return;
            const page = find(state.stack, o => o.key === action.payload.key);
            if (!page) state.stack.push(action.payload);
            state.active = action.payload;
        },
    },
});

export const { navigateTo } = naviSlice.actions;
export const selectNavi = (state: RootState) => state.navi;

export default naviSlice.reducer;
