import { Home } from '@/features/home/Home';
import { Contract } from '@/features/home/Contract';

const routes = [
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: 'contacts/:contactId',
                element: <Contract />,
            },
        ],
    },
];
export default routes;
