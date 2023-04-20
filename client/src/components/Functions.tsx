import '../css/Functions.scss';
import {useState} from "react";

export interface FunctionProps {
    title: string | null;
    params: string[] | null;
    returns: string | null;
    overview: string;
    description: string[] | null;
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

    function Dropdown(props: { arr: string[] | null }): JSX.Element {
        return (
            <div className={"dropdown"}>
                {props?.arr && props.arr.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
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
                        <DropdownButton child={index}/>
                    </div>
                    <Dropdown arr={item.description && item.description}/>
                </div>
            ))}
        </div>
    )
}

export default Functions;