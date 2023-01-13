import { MobRoute } from '@/common/routes';
import { Start } from './Start';

export const startPagePath = 'start';
const route: MobRoute[] = [
    {
        key: 'menu/start',
        path: startPagePath,
        name: 'menu.start',
        icon: 'home',
        element: <Start />,
    },
];
export default route;
