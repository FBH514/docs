import '../css/Functions.scss';
import {useState} from "react";

export interface FunctionProps {
    title: string | null;
    params: ParamsProps[] | undefined;
    returns: string | null;
    overview: string;
    description: string[] | undefined;
}

interface ParamsProps {
    param: string;
    type: string;
    optional: boolean;
}

interface DropdownProps {
    params: ParamsProps[] | undefined;
    description: string[] | undefined;
}

function Functions(props: { arr: FunctionProps[] | undefined }): JSX.Element {

    function Header(props: { title: string, returns: string }): JSX.Element {
        return (
            <div className="function-header">
                <pre className={"function-header-pre"}>{props.title}</pre>
                <h6 className={"function-header-h6"}>{props.returns}</h6>
            </div>
        );
    }

    function Body(props: { overview: string | null }): JSX.Element {

        return (
            <div className="function-body">
                <p>{props.overview}</p>
            </div>
        );
    }

    function DropdownButton(props: { child: number }): JSX.Element {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const COLOR: string = "2D728F";
        const SIZE: number = 24;
        const ICON: string = `https://img.icons8.com/material-rounded/${SIZE}/${COLOR}/chevron-down.png`;

        const toggleDropdown = () => {
            setIsOpen(!isOpen);
            const dropdown = document.getElementsByClassName("dropdown")[props.child] as HTMLDivElement;
            const active: string = "dropdown-open";
            if (dropdown.classList.contains(active)) {
                dropdown.classList.remove(active);
            } else {
                dropdown.classList.add(active);
            }
        };

        return (
            <button className={"dropdown-button"} onClick={toggleDropdown}>
                <img src={ICON} alt={"chevron-down"}/>
            </button>
        );
    }

    function Dropdown(props: { data: DropdownProps | undefined }): JSX.Element {

        function Params(props: { params: ParamsProps[] | undefined}): JSX.Element {
            return(
                <div className={"dropdown-params"}>
                    {props.params && props.params?.map((item, index) => (
                        <>
                            <h3>Params</h3>
                            <div className={"dropdown-params-item"} key={index}>
                                <p className={"param-item"}>name: {item.param}</p>
                                <p className={"param-item-type"}>type: {item.type}</p>
                                <p className={"param-item-optional"}>optional: {item.optional ? "True" : "False"}</p>
                            </div>
                        </>
                    ))}
                </div>
            );
        }

        function Description(props: { description: string[] | undefined}): JSX.Element {
            return (
                <div className={"dropdown-description"}>
                    {props.description && props.description.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            );
        }

        return (
            <div className={"dropdown"}>
                <Params params={props.data?.params && props.data?.params}/>
                <Description description={props.data?.description && props.data?.description}/>
            </div>
        );
    }

    return (
        <div className="functions">
            {props.arr && props.arr.map((item, index) => (
                <div className={"function-container"}>
                    <div className={"function"} key={index}>
                        <Header title={item.title ?? "Loading"} returns={item.returns ?? ""}/>
                        <Body overview={item.overview && item.overview}/>
                        {item.description!.length > 0 || item.params!.length !== 0 ?
                            <DropdownButton child={index}/> : null}
                    </div>
                    <Dropdown data={{params: item?.params, description: item?.description}
                    }/>
                </div>
            ))}
        </div>
    )
}

export default Functions;