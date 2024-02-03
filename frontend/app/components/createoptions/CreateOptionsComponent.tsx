import React, { useEffect, useRef, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import FormModal from '../FormModal/FormModal';

const CreateOptionsComponent = (props: any) => {
  const [showOptions, updateShowOptions] = useState(false);
  
  useEffect(() => {
    // Initialize the dropdown
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    if (dropdownTrigger) {
      M.Dropdown.init(dropdownTrigger, { coverTrigger: false });
    }    
  }, []);

  // const [createFolder] = useCreateFolderMutation();

  const onFolderClick = async (values: any) => {
    updateShowOptions(!showOptions);
  };

  return (
    <div className="nav-wrapper nav-2">
      <a
        className="dropdown-trigger btn waves-effect waves-light btn btn-flat white-text"
        data-target="btn-dropdown"
      >
        New
      </a>

      <ul id='btn-dropdown' className='dropdown-content'>
        <li onClick={onFolderClick}>
          <a href="#modal1" className="modal-trigger" >
            <i className="material-icons">view_module</i>Create a folder
          </a>
        </li>
        <li>
          <a href="#!"
             className="modal-trigger" 
          >
            <i className="material-icons">cloud</i>Upload a file
          </a>
        </li>
      </ul>

      {/* Conditionally render the modal based on showOptions */}
      { showOptions && <FormModal selectedFolder={props.selectedFolder}/>}      
    </div>
  );
};

export default CreateOptionsComponent;
