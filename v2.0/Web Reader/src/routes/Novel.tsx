import DisplayBooks from "../components/DisplayBooks"
import Navbar from '../components/Navbar'
import { useParams } from "react-router-dom";

const Novel = () => {

    const { type } = useParams<"type">();
    let headline
    if (type == "novel") {
        headline = "Welcome to the Insiread Novel Page!"
    } else {
        headline = "Welcome to the Insiread Manga Page!"
    }

    const headlineStyle: React.CSSProperties = {
        textAlign: "center"
    }

    return (
        <>
        <Navbar/>
        <h1 style={headlineStyle}>{headline}</h1>
        <DisplayBooks/>
        </>
    );
}
 
export default Novel;