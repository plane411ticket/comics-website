import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import HomePage from './screens/Home/HomePage'
import Profiles from './screens/User/UserProfiles'
import Error from './screens/Error'
import UserProfilePage from './screens/User/UserProfilePage'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error/>
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
  

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
