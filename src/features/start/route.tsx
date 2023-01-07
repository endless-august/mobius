import { MobRoute } from '@/common/routes';
import { Start } from './Start';

const route: MobRoute[] = [
    {
        key: 'menu/start',
        path: 'start',
        name: 'menu.start',
        icon: 'home',
        element: <Start />,
    },
];
export default route;
