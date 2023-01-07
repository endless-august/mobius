import { MobRoute } from '@/common/routes';
import { Search } from './Search';

const route: MobRoute[] = [
    {
        key: 'menu/search',
        path: 'search',
        name: 'menu.search',
        icon: 'search',
        element: <Search />,
    },
];
export default route;
