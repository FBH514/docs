import '../css/Information.scss';

export interface InformationProps {
    title?: string;
    description?: string[];
}

function Information(props: { data: InformationProps | undefined }): JSX.Element {

    function Header(props: { title: string }): JSX.Element {

        function Button(): JSX.Element {
            return (
                <div className={"information-button"}>
                    <button disabled={true}>
                        {"Choose Language"}
                    </button>
                </div>
            )
        }

        return (
            <div className="information-header">
                {props.title ?? "Loading"}
                {/*<Button/>*/}
            </div>
        );
    }

    function Body(props: { desc: string[] | undefined }): JSX.Element {
        return (
            <div className="information-body">
                {props.desc ? props.desc.map((item, index) => (
                    <p key={index}>{item}</p>
                )) : "Loading"}
            </div>
        );
    }

    return (
        <div className="information">
            <Header title={props.data?.title ?? "Loading"}/>
            <Body desc={props.data?.description && props.data.description}/>
        </div>
    );
}

export default Information;