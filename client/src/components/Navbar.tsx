import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import '../css/Navbar.scss';

interface NavbarItemProps {
    title: string;
    link: string;
    img: string | undefined;
}

function Navbar(): JSX.Element {

    const location: any = useLocation();

    function Title(): JSX.Element {
        return (
            <div id="title">
                <Link to={"/"}>{"Data Structures"}</Link>
            </div>
        )
    }

    const items: NavbarItemProps[] = [
        {title: "Node", link: "/node", img: undefined},
        {title: "Stack", link: "/stack", img: undefined},
        {title: "Queue", link: "/queue", img: undefined},
        {title: "Linked List", link: "/linkedlist", img: undefined}
    ];

    function Items(props: {arr: NavbarItemProps[]}): JSX.Element {
        return (
            <ul id={"navbar-items"}>
                {props.arr.map((item, index) => (
                    <li className={
                        location.pathname === item.link ? "navbar-item-active" : "navbar-item"
                    } key={index}>
                        <Link to={item.link}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        );
    }

    return(
        <div id="navbar">
            <Title/>
            <Items arr={items}/>
        </div>
    );
}

export default Navbar;