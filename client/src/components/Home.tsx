import '../css/Home.scss';
import Information, {InformationProps} from "./Information";


function Home(props: {info: InformationProps[] | undefined}): JSX.Element {
    const [welcome, about] = props.info || [];

    return (
        <div id="home">
            {welcome && <Information data={welcome}/>}
            {about && <Information data={about}/>}
        </div>
    );
}

export default Home;