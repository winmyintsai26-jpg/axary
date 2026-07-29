import { createBrowserRouter } from 'react-router-dom'

import { ExperienceLayout } from './layouts/ExperienceLayout'
import { LandingScene } from './scenes/Landing'

export const router = createBrowserRouter([
  {
    element: <ExperienceLayout />,
    children: [
      {
        path: '/',
        element: <LandingScene />,
      },
    ],
  },
])
