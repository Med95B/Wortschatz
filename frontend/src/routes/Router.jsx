import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Activation from "../pages/Activation";


export const router=createBrowserRouter([{
    element:<App/>,
    children:[
        {
            path:'/',
            element:<PrivateRoute><Home/></PrivateRoute>
        },
         {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        },
         {
            path:'/activation/:token',
            element:<Activation/>
        }
    ]
}])