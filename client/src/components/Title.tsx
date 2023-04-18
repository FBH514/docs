import '../css/Title.scss';

function Title(props: {title: string}): JSX.Element {

    const icon: string = "https://img.icons8.com/windows/32/2D728F/lambda.png";

    return(
        <div className={"titles"}>
            <h3 className={"title-h3"}>{props.title}</h3>
            <img className={"title-img"} src={icon} alt={"lambda"}/>
        </div>
    )
}

export default Title;