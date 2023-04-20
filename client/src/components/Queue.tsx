import Functions from "./Functions";
import {useQuery} from "react-query";
import Information, {InformationProps} from "./Information";
import Title from "./Title";
import {FunctionProps} from "./Functions";
import '../css/Queue.scss';

function Queue(): JSX.Element {

    const ENDPOINT: string = "http://localhost:8000/v1/dsa/queue";

    async function getFunctions(): Promise<FunctionProps[] | undefined> {
        const response = await fetch(ENDPOINT);
        return await response.json();
    }

    const {data} = useQuery('queue', getFunctions);

    const info: InformationProps = {
        title: "What is a Queue?",
        description: [
            "In computer science, a queue is an abstract data type that represents a collection of elements, where the addition of elements happens at one end (rear) and the removal of elements happens at the other end (front).",
            "Queues are commonly used in programming languages and computer systems for managing resources, scheduling tasks, and handling data packets in networking applications. They are also used in real-world scenarios such as waiting in line for a ticket or boarding a plane."
        ]
    }

    return(
        <div id="queue">
            <Information data={info}/>
            <Title title={"Queue Functions"}/>
            <Functions arr={data && data}/>
        </div>
    );
}

export default Queue;