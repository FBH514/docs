import '../css/Home.scss';
import Information, {InformationProps} from "./Information";
import {useQuery} from "react-query";

const HOME_ENDPOINT: string = "http://localhost:8000/v1/dsa/home";
const HOME_QUERY_KEY: string = "home";

function Home(): JSX.Element {

    async function getHome(endpoint: string): Promise<InformationProps[]> {
        return fetch(endpoint).then(response => response.json());
    }

    const {data} = useQuery<InformationProps[]>(HOME_QUERY_KEY, () => getHome(HOME_ENDPOINT))
    const [welcome, about] = data || [];

    return (
        <div id="home">
            {welcome && <Information data={welcome}/>}
            {about && <Information data={about}/>}
        </div>
    );
}

export default Home;