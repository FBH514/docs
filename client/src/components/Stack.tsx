import '../css/Stack.scss';
import Functions from "./Functions";
import Information from "./Information";
import Title from "./Title";
import PageProps from "./PageProps";

function Stack(props: {data: PageProps}): JSX.Element {

    const [info] = props.data.info || [];

    return(
        <div id="stack">
            <Information data={info}/>
            <Title data={{title: "Stack Functions"}}/>
            <Functions arr={props.data.functions && props.data.functions}/>
        </div>
    );
}

export default Stack;