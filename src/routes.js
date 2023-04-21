import React from 'react'

const ToeicFullTest = React.lazy(() => import('./views/tests/ToeicFullTest'))
const CreateToeicFullTest = React.lazy(() => import('./views/tests/CreateToeicFullTest'))
const UpdateToeicFullTest = React.lazy(() => import('./views/tests/UpdateToeicFullTest'))

const toeicRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/test-manager/tests', element: ToeicFullTest },
  { path: '/test-manager/tests/create', element: CreateToeicFullTest },
  { path: '/test-manager/tests/update/:toeicFullTestId', element: UpdateToeicFullTest }
]

export default toeicRoutes
