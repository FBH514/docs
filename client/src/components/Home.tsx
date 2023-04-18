import '../css/Home.scss';
import Information, {InformationProps} from "./Information";

function Home(): JSX.Element {

    const welcome: InformationProps = {
        title: "Welcome",
        description: [
            "This website has for objective of providing comprehensive documentation relevant to open source data structures in Python.",
            "I am working hard to create an intuitive and user-friendly platform that will help you learn and leverage data structures with ease. It is currently in development and maintained by myself François, with plans for additional languages down the road."
        ]
    }

    const repos: InformationProps = {
        title: "Download + Repos",
        description: [
            "Build versatile and stronger applications by downloading the package at PyPi. Find the source code for all data structures at https://github.com/fbh514."
        ]
    }

    return(
        <div id="home">
            <Information data={welcome}/>
            <Information data={repos}/>
        </div>
    );
}

export default Home;