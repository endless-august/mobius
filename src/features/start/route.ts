import { MobRoute } from '@/common/routes';
import { createContentWrapper } from '@/features/home/ContentWrapper';
import { Start } from './Start';

export const startPagePath = 'start';
const route: MobRoute[] = [
    {
        key: 'menu/start',
        path: startPagePath,
        name: 'menu.start',
        icon: 'home',
        element: createContentWrapper(Start),
        component: Start,
    },
];
export default route;
