import { MobRoute } from '@/common/routes';
import { createContentWrapper } from '@/features/home/ContentWrapper';
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
