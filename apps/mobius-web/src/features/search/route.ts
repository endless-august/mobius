import { MobRoute } from '@/web/common/routes';
import { createContentWrapper } from '@/web/features/home/ContentWrapper';
import { Search } from './Search';

const route: MobRoute[] = [
    {
        key: 'menu/search',
        path: 'search',
        name: 'menu.search',
        icon: 'search',
        element: createContentWrapper(Search),
        component: Search,
    },
];
export default route;
