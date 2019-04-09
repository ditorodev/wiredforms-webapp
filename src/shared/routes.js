import Home from './home';
import Auth from './auth';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    }, {
        path: '/authenticated',
        exact: true,
        component: Auth
    }
];
export default routes;