import { MobRoute } from '@/web/common/routes';
import { createContentWrapper } from '@/web/features/home/ContentWrapper';
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
