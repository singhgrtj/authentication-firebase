import IRoute from '../interfaces/route';
import Home from '../pages/Home';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';

const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home',
        protected: true
    },
    {
        path: '/signup',
        exact: true,
        component: Signup,
        name: 'Signup',
        protected: true
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        name: 'Login',
        protected: true
    }
]

export default routes;