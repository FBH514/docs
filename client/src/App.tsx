import './css/App.scss'
import './css/Reset.css'
import {Routes, Route} from "react-router-dom";
import {useQuery} from "react-query";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Node from "./components/Node";
import Stack from "./components/Stack";
import Queue from "./components/Queue";
import LinkedList from "./components/LinkedList";
import {InformationProps} from "./components/Information";
import {FunctionProps} from "./components/Functions";


const HOME_INFO_ENDPOINT: string = "http://localhost:8000/v1/dsa/home/info";
const NODE_INFO_ENDPOINT: string = "http://localhost:8000/v1/dsa/node/info";
const STACK_INFO_ENDPOINT: string = "http://localhost:8000/v1/dsa/stack/info";
const QUEUE_INFO_ENDPOINT: string = "http://localhost:8000/v1/dsa/queue/info";
const LINKED_LIST_INFO_ENDPOINT: string = "http://localhost:8000/v1/dsa/linkedlist/info";

const HOME_INFO_QUERY_KEY: string = "home-info";
const NODE_INFO_QUERY_KEY: string = "node-info";
const STACK_INFO_QUERY_KEY: string = "stack-info";
const QUEUE_INFO_QUERY_KEY: string = "queue-info";
const LINKED_LIST_INFO_QUERY_KEY: string = "linkedlist-info";

const NODE_QUERY_KEY: string = "node";
const STACK_QUERY_KEY: string = "stack";
const QUEUE_QUERY_KEY: string = "queue";
const LINKED_LIST_QUERY_KEY: string = "linkedlist";

const NODE_FUNCTIONS_ENDPOINT: string = "http://localhost:8000/v1/dsa/node/functions";
const STACK_FUNCTIONS_ENDPOINT: string = "http://localhost:8000/v1/dsa/stack/functions";
const QUEUE_FUNCTIONS_ENDPOINT: string = "http://localhost:8000/v1/dsa/queue/functions";
const LINKED_LIST_FUNCTIONS_ENDPOINT: string = "http://localhost:8000/v1/dsa/linkedlist/functions";

function App(): JSX.Element {

    async function getInformation(endpoint: string): Promise<InformationProps[]> {
        const response = await fetch(endpoint);
        return await response.json();
    }

    async function getFunctions(endpoint: string): Promise<FunctionProps[]> {
        const response = await fetch(endpoint);
        return await response.json();
    }

    const {data: node} = useQuery<FunctionProps[]>(NODE_QUERY_KEY, () => getFunctions(NODE_FUNCTIONS_ENDPOINT));
    const {data: stack} = useQuery<FunctionProps[]>(STACK_QUERY_KEY, () => getFunctions(STACK_FUNCTIONS_ENDPOINT));
    const {data: queue} = useQuery<FunctionProps[]>(QUEUE_QUERY_KEY, () => getFunctions(QUEUE_FUNCTIONS_ENDPOINT));
    const {data: linkedlist} = useQuery<FunctionProps[]>(LINKED_LIST_QUERY_KEY, () => getFunctions(LINKED_LIST_FUNCTIONS_ENDPOINT));

    const {data: homeInfo} = useQuery<InformationProps[]>(HOME_INFO_QUERY_KEY, () => getInformation(HOME_INFO_ENDPOINT));
    const {data: nodeInfo} = useQuery<InformationProps[]>(NODE_INFO_QUERY_KEY, () => getInformation(NODE_INFO_ENDPOINT));
    const {data: stackInfo} = useQuery<InformationProps[]>(STACK_INFO_QUERY_KEY, () => getInformation(STACK_INFO_ENDPOINT));
    const {data: queueInfo} = useQuery<InformationProps[]>(QUEUE_INFO_QUERY_KEY, () => getInformation(QUEUE_INFO_ENDPOINT));
    const {data: linkedListInfo} = useQuery<InformationProps[]>(LINKED_LIST_INFO_QUERY_KEY, () => getInformation(LINKED_LIST_INFO_ENDPOINT));

    const nodeProps = {
        info: nodeInfo && nodeInfo,
        functions: node ?? []
    };

    const stackProps = {
        info: stackInfo && stackInfo,
        functions: stack ?? []
    };

    const queueProps = {
        info: queueInfo && queueInfo,
        functions: queue ?? []
    };

    const linkedListProps = {
        info: linkedListInfo && linkedListInfo,
        functions: linkedlist ?? []
    };

    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={
                    <Home info={homeInfo}/>
                }/>
                <Route path="/node" element={
                    <Node data={nodeProps}/>
                }/>
                <Route path="/stack" element={
                    <Stack data={stackProps}/>
                }/>
                <Route path="/queue" element={
                    <Queue data={queueProps}/>
                }/>
                <Route path="/linkedlist" element={
                    <LinkedList data={linkedListProps}/>
                }/>
            </Routes>
        </div>
    )
}

export default App