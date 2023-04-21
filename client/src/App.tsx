import './css/App.scss'
import './css/Reset.css'
import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Stack from "./components/Stack";
import Queue from "./components/Queue";
import LinkedList from "./components/LinkedList";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const client = new QueryClient();

function App(): JSX.Element {

    return (
        <div className="App">
            <QueryClientProvider client={client}>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/stack" element={<Stack/>}/>
                    <Route path="/queue" element={<Queue/>}/>
                    <Route path="/linkedlist" element={<LinkedList/>}/>
                </Routes>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </div>
    )
}

export default App
