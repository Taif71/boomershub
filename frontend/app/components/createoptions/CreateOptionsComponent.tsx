"use client"
import React, { useEffect, useRef } from 'react';
// import 'materialize-css/dist/css/materialize.min.css';
// import M from 'materialize-css/dist/js/materialize.min.js';
import FileFormModal from '../FormModal/FileFormModal';
import FolderFormModal from '../FormModal/FolderFormModal';


const CreateOptionsComponent = (props: any) => {
  const modalRef = useRef<any>(null);
  useEffect(() => {
    // Initialize the dropdown
    const mFunc = async () => {
      const M: any = await import("materialize-css/dist/js/materialize.min.js");
      const dropdownTrigger = document.querySelector('.dropdown-trigger');
      if (dropdownTrigger) {
        M.Dropdown.init(dropdownTrigger, { coverTrigger: false });
      }    
  
      const modalElement = modalRef.current;
      M.Modal.init(modalElement);     
    }
    mFunc()
  }, []);

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
        <li>
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
    </div>
  );
};

export default CreateOptionsComponent;
