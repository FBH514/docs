import '../css/LinkedList.scss';
import Functions from "./Functions";
import Information from "./Information";
import Title from "./Title";
import PageProps from "./PageProps";

function LinkedList(props: {data: PageProps}): JSX.Element {

    const [info] = props.data.info || [];

    return(
        <div id="linkedlist">
            <Information data={info}/>
            <Title data={{title: "Linked List Functions"}}/>
            <Functions arr={props.data.functions && props.data.functions}/>
        </div>
    );
}

export default LinkedList;