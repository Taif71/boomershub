import React, { useEffect, useRef, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import FileFormModal from '../FormModal/FileFormModal';
import FolderFormModal from '../FormModal/FolderFormModal';

const CreateOptionsComponent = (props: any) => {
  const [showFolderModal, updateShowFolderModal] = useState(false);
  const [showFileModal, updateShowFileModal] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    // Initialize the dropdown
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    if (dropdownTrigger) {
      M.Dropdown.init(dropdownTrigger, { coverTrigger: false });
    }    

    const modalElement = modalRef.current;
    M.Modal.init(modalElement, { coverTrigger: false });
  }, []);

  const onFolderClick = async (values: any) => {
    updateShowFolderModal(!showFolderModal);
  };

  const onFileClick = async (values: any) => {
    updateShowFileModal(!showFileModal);
  };

  return (
    <div className="nav-wrapper nav-2">
      <a
        className="dropdown-trigger btn waves-effect waves-light btn btn-flat white-text"
        data-target="btn-dropdown"
        style={{ marginLeft: 14}}
      >
        New
      </a>

      <ul id='btn-dropdown' className='dropdown-content'>
        <li>
          <a href="#modal1" className="modal-trigger" >
            <i className="material-icons">view_module</i>Create a folder
          </a>
        </li>
        <li onClick={onFileClick}>
          <a href="#modal2"
             className="modal-trigger" 
          >
            <i className="material-icons">cloud</i>Upload a file
          </a>
        </li>
      </ul>

      {/* Conditionally render the modal based on showOptions */}
      { <FolderFormModal selectedFolder={props.selectedFolder}/>} 
      { <FileFormModal selectedFolder={props.selectedFolder}/>}    
     
      {/* <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4 >Create a new folder</h4>
          <form >
            <div className="input-field">
              <input
                type="text"
                id="name"
                name="name"
                // value=
                // onChange={handleChange}
              />
              <label htmlFor="name">Folder name</label>
            </div>            
            <button type="submit" className="btn waves-effect waves-light">
              Submit
            </button>
          </form>
        </div> */}
      {/* </div> */}

    </div>
  );
};

export default CreateOptionsComponent;
