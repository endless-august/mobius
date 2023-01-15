import { find, findIndex, last } from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/common/store';
import { getSessionValue, setSessionValue } from '@/common/utils';
import { getPageByKey, getPageByPath } from '@/features/menu/menus';
import { MobRoute } from '@/common/routes';
import { startPagePath } from '@/features/start/route';

export interface NaviItem {
    key: string;
    name: string;
    path: string;
    icon?: string;
    parentKey?: string;
}

export interface NaviState {
    list: NaviItem[];
    active: NaviItem | undefined;
    collapsed: boolean;
}

const pageToItem = (page: MobRoute): NaviItem => {
    const { key, name, path, icon, parent } = page;
    return { key, name: name ?? '', path: path ?? '', icon, parentKey: parent?.key };
};

const defaultPage = pageToItem(getPageByPath(startPagePath));
const initialState: NaviState = {
    list: getSessionValue('navi', 'list', [defaultPage]),
    active: undefined,
    collapsed: getSessionValue('navi', 'collapsed', true),
};

const saveNavi = (navi: NaviState) => {
    setSessionValue('navi', 'list', navi.list);
    setSessionValue('navi', 'collapsed', navi.collapsed);
};

export const naviSlice = createSlice({
    name: 'navi',
    initialState,
    reducers: {
        navigateTo: (state, action: PayloadAction<string>) => {
            const page = getPageByKey(action.payload);
            if (!page) return;
            if (state.active && state.active.key === page.key) return;

            const item = pageToItem(page);
            const exists = find(state.list, o => o.key === page.key);
            if (!exists) {
                state.list.push(item);
                state.active = item;
            } else {
                state.active = exists;
            }
            saveNavi(state);
        },
        closeTab: state => {
            if (!state.active || state.list.length < 1) return;
            state.list = state.list.filter(o => o.key !== state.active?.key);
            state.active = undefined;
        },
        collapseSider: state => {
            state.collapsed = !state.collapsed;
            saveNavi(state);
        },
    },
});

export const { navigateTo, closeTab, collapseSider } = naviSlice.actions;
export const selectNavi = (state: RootState) => state.navi;
export const selectActive = (state: RootState) => state.navi.active;
export const selectNaviList = (state: RootState) => state.navi.list;
export const selectCollapsed = (state: RootState) => state.navi.collapsed;
export const selectNextTab = (state: RootState) => {
    const { list, active } = state.navi;
    if (!active) return last(list);
    const index = findIndex(list, o => o.key === active.key);
    if (index < 0) return last(list);
    if (index === list.length - 1) {
        if (list.length > 1) return list[index - 1];
        else return defaultPage;
    }
    return list[index + 1];
};

export default naviSlice.reducer;
