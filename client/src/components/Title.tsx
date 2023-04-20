import '../css/Title.scss';

function Title(props: {title: string}): JSX.Element {

    const icon: string = "https://img.icons8.com/windows/32/2D728F/lambda.png";
    // <img className={"title-img"} src={icon} alt={"lambda"}/>

    return(
        <div className={"titles"}>
            <hr className={"title-hr"}/>
            <h3 className={"title-h3"}>{props.title}</h3>
            <hr className={"title-hr"}/>
        </div>
    )
}

export default Title;