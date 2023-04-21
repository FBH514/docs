import '../css/node.scss';
import Information from "./Information";
import Title from "./Title";
import Functions from "./Functions";
import PageProps from "./PageProps";

function Node(props: {data: PageProps}): JSX.Element {

    const [info] = props.data.info || [];

    return(
        <div id="node">
            <Information data={info}/>
            <Title data={{title: "Node Functions"}}/>
            <Functions arr={props.data.functions && props.data.functions}/>
        </div>
    );
}

export default Node;