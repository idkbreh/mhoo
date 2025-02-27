import {createBrowserRouter} from "react-router-dom"
import IndexPage from "../pages/IndexPage"
import HomePage from "../pages/HomePage"
import ErrorPage from "../pages/ErrorPage"
import MemoriesPage from "../pages/MemoriesPage"
import RandomRestaurantPage from "../pages/RandomRestaurantPage"
import AddMemoryPage from "../pages/AddMemoryPage"
import TravelPlanPage from "../pages/TravelPlanPage"
import AddTravelPlanPage from "../pages/AddTravelPlanPage"

export const PageRoutes = createBrowserRouter([
    {
        path:'/',
        element:<IndexPage/>
    },
    {
        path:'/home',
        element:<HomePage/>
    },
    {
        path:'*',
        element:<ErrorPage/>
    },
    {
        path:'/memories',
        element:<MemoriesPage/>
    },
    {
        path:'/random',
        element:<RandomRestaurantPage/>
    },
    {
        path:'/memories/add',
        element:<AddMemoryPage/>
    },
    {
        path: '/travels',
        element: <TravelPlanPage />
    },
    {
        path: '/travels/add',
        element: <AddTravelPlanPage />
    },
])