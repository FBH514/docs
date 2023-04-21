import '../css/Title.scss';

interface TitleProps {
    title: string;
}

function Title(props: {data: TitleProps}): JSX.Element {

    return(
        <div className={"titles"}>
            <hr className={"title-hr"}/>
            <div className="title-inner">
                <h3 className={"title-h3"}>{props.data.title}</h3>
            </div>
            <hr className={"title-hr"}/>
        </div>
    )
}

export default Title;