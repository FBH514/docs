import '../css/Functions.scss';

export interface FunctionProps {
    title: string | null;
    params: string[] | null;
    returns: string | null;
    description: string[] | null;
}

function Functions(props: { arr: FunctionProps[] | undefined}): JSX.Element {

    function Header(props: {title: string, returns: string}): JSX.Element {
        return(
            <div className="function-header">
                <pre className={"function-header-pre"}>{props.title}</pre>
                <h6 className={"function-header-h6"}>{props.returns}</h6>
            </div>
        );
    }

    function Body(props: {desc: string[] | null}): JSX.Element {
        return(
            <div className="function-body">
                {props.desc && props.desc.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        );
    }

    return (
        <div className="functions">
            {props.arr && props.arr.map((item, index) => (
                <div className={"function"} key={index}>
                    <Header title={item.title ?? "Loading"} returns={item.returns ?? ""}/>
                    <Body desc={item.description}/>
                </div>
            ))}
        </div>
    )
}

export default Functions;