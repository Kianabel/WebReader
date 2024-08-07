import Navbar from "../components/Navbar";
import Reader from "../components/Reader";

const overflow : React.CSSProperties = {
    overflowX: "hidden"
}

const ReadChapter = () => {
    return (

        <div style={overflow}>
        <Navbar/>
        <Reader/>
        </div>
    );
}
 
export default ReadChapter;