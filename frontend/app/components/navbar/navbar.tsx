import CreateOptionsComponent from "../createoptions/CreateOptionsComponent";
import { useLogoutMutation } from "@/redux/features/apis/auth-api";

const NavBar = (props: any) => {
    const [logout] = useLogoutMutation()

    return (

        <div className="navbar-fixed">
            
            <nav className="nav-extended white">
                <div className="white" style={{ display: "flex", justifyContent: "space-between", margin: "0px 10px"}}>
                    <ul>
                        <li>
                            <a href="#!" className="title grey-text text-darken-1">
                                Google Drive
                            </a>
                        </li>
                    </ul>

                    {/* <div className="search-wrapper">
                        <i className="material-icons">search</i>
                        <input type="search" name="Search" placeholder="Search-Drive" />
                    </div> */}
                    <ul>
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
                        <li onClick={() => logout()}>
                            <a style={{ color: "grey"}}>logout</a>
                        </li>
                    </ul>

                </div>
                <CreateOptionsComponent selectedFolder={props.selectedFolder} setSelectedFolder={props.setSelectedFolder} />
            </nav>
        </div>
        
    );
}

export default NavBar;