import Functions from "./Functions";
import {useQuery} from "react-query";
import Information, {InformationProps} from "./Information";
import Title from "./Title";
import {FunctionProps} from "./Functions";
import '../css/Stack.scss';

function Stack(): JSX.Element {

    const ENDPOINT: string = "http://localhost:8000/v1/dsa/stack";

    async function getFunctions(): Promise<FunctionProps[] | undefined> {
        const response = await fetch(ENDPOINT);
        return await response.json();
    }
    const {data} = useQuery('stack', getFunctions);

    const info: InformationProps = {
        title: "What is a Stack?",
        description: [
            "In computer science, a stack is an abstract data type that represents a collection of elements, where the addition or removal of elements follows a last-in-first-out (LIFO) principle.",
            "Stacks are commonly used in programming languages and computer systems for managing memory, handling function calls, parsing expressions, and other applications where the last-in-first-out order of elements is useful."
        ]
    }

    return(
        <div id="stack">
            <Information data={info}/>
            <Title data={{title: "Stack Functions"}}/>
            <Functions arr={data && data}/>
        </div>
    );
}

export default Stack;