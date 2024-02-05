import { lazy } from 'react'
const Dashboard = lazy(() => import('../../views/dashboard/Dashboard'))

const appName = "infiniti"
const Dashboard_Routes = [
  {
    path: '/merchant/dashboard/',
    element: <Dashboard />,
    app: appName,
    permissions: ['Infiniti']
  }
]

export default Dashboard_Routes