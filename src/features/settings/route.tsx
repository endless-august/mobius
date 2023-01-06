import { MobRoute } from '@/common/routes';
import { Settings } from './Settings';

const route: MobRoute[] = [
    {
        name: 'menu.settings.dir',
        icon: 'fa-gear',
        isDir: true,
        submenus: [
            {
                path: 'settings',
                name: 'menu.settings.basic',
                element: <Settings />,
            },
        ],
    },
];
export default route;
