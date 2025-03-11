import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import HomePage from './screens/Home/HomePage'
import Profiles from './screens/Auth/ListProfiles.tsx'
import Error from './screens/Error'
import UserProfilePage from './screens/Auth/ProfileScreen.tsx'
import MangaList from './screens/Manga/MangaList'
import AuthRoutes from './router/AuthRoutes.tsx'
//import { navbarItems } from "./components/Navbarapi";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/profiles',
    element: <Profiles/>,
    children:[
      {
          path: '/profiles/:userId',
          element: <UserProfilePage/>,
      }
    ]
  },
  { 
    path: '/manga',
    element: <MangaList />,
  },
  {
    path: '/auth/*',
    element:<AuthRoutes/>
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
