
import { Navigate } from "react-router-dom";
import WheatherApp from "../components/WheatherApp";
import SignInModel from "../components/Auth/Singin";
import SignUpModel from "../components/Auth/Signup";


const privateRoutes = [
    {
        type: "other",
        name: 'ROOT',
        key: 'ROOT',
        component: <Navigate to="/home" />,
        route: "/",
    },
    {
        type: 'page',
        name: 'home',
        key: 'HOME',
        component: <WheatherApp />,
        route: '/home',
    },
]

const publicRoutes = [
    {
        type: 'other',
        name: 'ROOT',
        key: 'ROOT',
        component: <Navigate to="/sign-in" />,
        route: "/",
    },
    {
        type: 'page',
        name: 'Sign In',
        key: 'SIGN_IN',
        component: <SignInModel />,
        route: '/sign-in',
    },
    {
        type: 'page',
        name: 'Sign Up',
        key: 'SIGN_UP',
        component: <SignUpModel />,
        route: '/sign-up',
    },
]

export { privateRoutes, publicRoutes };