import { useEffect, useState } from 'react';


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
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                {/* tabIndex="-1" */}
                <li className="divider" ></li>
                <li><a href="#!">three</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
            </ul>
        </div>
    );
}
export default CreateOptionsComponent;