import { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';


const CreateOptionsComponent = ({ showOptions, updateShowOptions }: any) => {
    useEffect(() => {
        // Initialize the dropdown
        const dropdownTrigger = document.querySelector('.dropdown-trigger');
        if (dropdownTrigger) {
            M.Dropdown.init(dropdownTrigger, { coverTrigger: false });
        }
    }, []);

    return (
        <div className="nav-wrapper nav-2">
            <a
                className="dropdown-trigger btn waves-effect waves-light btn btn-flat white-text"
                data-target="btn-dropdown"
            >New
            </a>

            <ul id='btn-dropdown' className='dropdown-content'>
                <li><a href="#!"><i className="material-icons">view_module</i>Create a folder</a></li>
                <li><a href="#!"><i className="material-icons">cloud</i>Upload a file</a></li>
            </ul>
        </div>
    );
}
export default CreateOptionsComponent;