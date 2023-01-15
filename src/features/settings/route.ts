import { MobRoute } from '@/common/routes';
import { createContentWrapper } from '@/features/home/ContentWrapper';
import { Settings } from './Settings';

const route: MobRoute[] = [
    {
        key: 'menu/settings/dir',
        name: 'menu.settings.dir',
        icon: 'fa-gear',
        isDir: true,
        submenus: [
            {
                key: 'menu/settings/basic',
                path: 'settings/basic',
                name: 'menu.settings.basic',
                element: createContentWrapper(Settings),
                component: Settings,
            },
        ],
    },
];
export default route;
