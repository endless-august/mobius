import { MobRoute } from '@/common/routes';
import { Search } from './Search';

const route: MobRoute[] = [
    {
        path: 'search',
        name: 'menu.search',
        icon: 'search',
        element: <Search />,
    },
];
export default route;
