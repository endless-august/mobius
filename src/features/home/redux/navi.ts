import { find } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/common/store';

export interface NaviItem {
    key: string;
    name: string;
    path: string;
}

export interface NaviState {
    list: NaviItem[];
    active: NaviItem | undefined;
    collapsed: boolean;
}

const initialState: NaviState = {
    list: [],
    active: undefined,
    collapsed: false,
};

export const naviSlice = createSlice({
    name: 'navi',
    initialState,
    reducers: {
        initNaviList: (state, action: PayloadAction<NaviItem>) => {},
        navigateTo: (state, action: PayloadAction<NaviItem>) => {
            if (state.active && state.active.key === action.payload.key) return;
            const page = find(state.list, o => o.key === action.payload.key);
            if (!page) state.list.push(action.payload);
            state.active = action.payload;
        },
        collapseSider: state => {
            state.collapsed = !state.collapsed;
        },
    },
});

export const { navigateTo, collapseSider } = naviSlice.actions;
export const selectNavi = (state: RootState) => state.navi;
export const selectActive = (state: RootState) => state.navi.active;
export const selectNaviList = (state: RootState) => state.navi.list;
export const selectCollapsed = (state: RootState) => state.navi.collapsed;

export default naviSlice.reducer;
