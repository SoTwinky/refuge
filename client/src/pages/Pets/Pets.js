import Navigation from "../../components/Navigation";
import Logo from "../../components/Logo";
import Pets_List from "../../components/Pets_List";
import Header from "../../core/Header";

const Pets = () => {
    return (
        <div id="document" className="interne">
            <Header/>
            <div className="innerCenter">
                <Pets_List/>
            </div>
        </div>
    )
}

export default Pets;