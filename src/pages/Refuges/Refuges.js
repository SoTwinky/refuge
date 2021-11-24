import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import Refuges_List from "../../components/Refuges_List";
import Header from "../../core/Header";

const Pets = () => {
    return (
        <div id="document" className="interne">
            <Header/>
            <div className="innerCenter">
                <Refuges_List/>
            </div>
        </div>
    )
}

export default Pets;