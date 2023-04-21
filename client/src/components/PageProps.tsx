import {FunctionProps} from "./Functions";
import {InformationProps} from "./Information";

interface PageProps {
    info: InformationProps[] | undefined;
    functions: FunctionProps[];
}

export default PageProps;