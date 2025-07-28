import {createBrowserRouter} from 'react-router-dom'
import App from '../App'

import AgentDetails from './AgentDetails'
import AgentSummary from './AgentSummary'
import EditAgent from './EditAgent'
import CreateAgent from './CreateAgent'

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            {path: '/', element:<AgentSummary/>},
            {path: '/new', element:<CreateAgent/>},
            {path: '/:id', element:<AgentDetails/>},
            {path: '/:id/edit', element:<EditAgent/>}
        ]
    }
])