import '../css/Queue.scss';
import Functions from "./Functions";
import Information from "./Information";
import Title from "./Title";
import PageProps from "./PageProps";

function Queue(props: {data: PageProps}): JSX.Element {

    const [info] = props.data.info || [];

    return(
        <div id="queue">
            <Information data={info}/>
            <Title data={{title: "Queue Functions"}}/>
            <Functions arr={props.data.functions && props.data.functions}/>
        </div>
    );
}

export default Queue;