import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import naviReducer from '@/web/features/home/redux/navi';

export const store = configureStore({
    reducer: {
        navi: naviReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
