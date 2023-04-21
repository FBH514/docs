import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {HashRouter as Router} from "react-router-dom";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <Router>
                <App/>
            </Router>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>,
)
