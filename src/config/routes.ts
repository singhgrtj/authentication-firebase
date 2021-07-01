import IRoute from '../interfaces/route';
import Home from '../pages/Home';

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home',
        protected: true
    }
]

export default routes;