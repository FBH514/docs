import Functions from "./Functions";
import {useQuery} from "react-query";
import {FunctionProps} from "./Functions";
import '../css/LinkedList.scss';
import Information, {InformationProps} from "./Information";
import Title from "./Title";

function LinkedList(): JSX.Element {

    const ENDPOINT: string = "http://localhost:8000/v1/dsa/linkedlist";

    async function getFunctions(): Promise<FunctionProps[] | undefined> {
        const response = await fetch(ENDPOINT);
        return await response.json();
    }

    const {data} = useQuery('linkedlist', getFunctions);

    const info: InformationProps = {
        title: "What is a Linked List?",
        description: [
            "In computer science, a linked list is a linear data structure used to store a collection of elements. A linked list consists of nodes, where each node contains a data element and a reference (pointer) to the next node in the sequence. The first node is called the head, and the last node is called the tail.",
            "Linked lists are used to implement various abstract data types such as stacks, queues, and associative arrays. They are particularly useful in situations where the size of the data set is not known in advance, or when fast insertions and deletions are required."
        ]
    }

    return(
        <div id="linkedlist">
            <Information data={info}/>
            <Title title={"Linked List Functions"}/>
            <Functions arr={data && data}/>
        </div>
    );
}

export default LinkedList;