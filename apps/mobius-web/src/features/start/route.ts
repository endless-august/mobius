import { MobRoute } from '@/web/common/routes';
import { createContentWrapper } from '@/web/features/home/ContentWrapper';
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
