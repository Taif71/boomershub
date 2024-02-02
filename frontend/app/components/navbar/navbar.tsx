import { useState } from "react";
import CreateOptionsComponent from "../createoptions/CreateOptionsComponent";

const NavBar = ({ children, title}: any) => {
    const [isNewBtnClicked, setIsNewBtnClicked] = useState(false);
    const [showOptions, updateShowOptions] = useState(false);

    const handleNewBtnClick = () => {
        setIsNewBtnClicked(true);
        if(isNewBtnClicked) {
            updateShowOptions(true);
            <CreateOptionsComponent showOptions={showOptions} updateShowOptions={updateShowOptions}/>            
        } else {
            setIsNewBtnClicked(false);
        }
        
    }

    return (
        <div className="navbar-fixed">
            <nav className="nav-extended white">
                <div className="nav-wrapper white">                   
                        <ul>
                            <li>
                                <a href="#!" className="title grey-text text-darken-1">
                                    Google Drive
                                </a>
                            </li>
                        </ul>
                    
                    <div className="search-wrapper">
                        <i className="material-icons">search</i>
                        <input type="search" name="Search" placeholder="Search-Drive" />
                    </div>
                    <ul className="right">
                        <li>
                            <a href="#!">
                                <i className="material-icons grey-text text-darken-1">apps</i>
                            </a>
                        </li>
                        <li>
                            <a href="#!">
                                <i className="material-icons grey-text text-darken-1">notifications</i>
                            </a>
                        </li>
                        <li>
                            <a href="#!">
                                <img src="./Profile.jpg" alt="profile pic" className="circle" />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="nav-wrapper nav-2" onClick={handleNewBtnClick}>
                    {/* <ul>
                        <li>
                            <a
                                href="#!"
                                className="waves-effect waves-light btn btn-flat white-text"
                            >New</a>
                        </li>
                    </ul>                     */}
                </div>
                <CreateOptionsComponent />
            </nav>
        </div>
    );
}

export default NavBar;