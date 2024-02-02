import React, { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useCreateFolderMutation } from '@/redux/features/apis/foldersapi';
import NewBtnFolderModal from '../newBtnFolderModal.ts/NewBtnFolderModal';

const CreateOptionsComponent = ({ }: any) => {
  const [showOptions, updateShowOptions ] = useState(false);
  useEffect(() => {
    // Initialize the dropdown
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    if (dropdownTrigger) {
      M.Dropdown.init(dropdownTrigger, { coverTrigger: false });
    }
  }, []);

  const [createFolder] = useCreateFolderMutation();

  const onFolderClick = async (values: any) => {
    // Perform any logic related to creating a folder here
    // For example, you might want to call the mutation function here
    // const result = await createFolder({ data: {... values}})
    
    // Now, show the modal
    updateShowOptions(true);
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
          <a href="#modal1"><i className="material-icons modal-trigger">view_module</i>Create a folder</a>
        </li>
        <li><a href="#!"><i className="material-icons">cloud</i>Upload a file</a></li>
      </ul>

      {/* Conditionally render the modal based on showOptions */}
      { <NewBtnFolderModal />}
    </div>
  );
};

export default CreateOptionsComponent;
