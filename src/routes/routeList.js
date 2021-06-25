import Home from '../pages/home'
import Protected from '../pages/protected'

export default [
    {
        id: 1,
        path: '/',
        component: Home,
        protected: false,
        role:[],
        permissions: []
    },
    {
        id: 2,
        path: '/protected',
        component: Protected,
        protected: true,
        role: ['student','admin'],
        permissions: ['VisitHomepage']
    },
]