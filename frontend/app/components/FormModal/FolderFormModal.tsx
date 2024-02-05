"use client"
import React, { useState, useRef, useEffect } from 'react';
// import M from 'materialize-css/dist/js/materialize.min.js';
import { useCreateFolderMutation } from '@/redux/features/apis/foldersapi';


// const M: any = dynamic(
//   () => import("materialize-css/dist/js/materialize.min.js"),
//   {
//     ssr: false,
//   }
//   );
let M:any;
const FolderFormModal = (props: any) => {
  const [reloadCounter, setReloadCounter] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    parent: undefined
  });

  const [createFolder] = useCreateFolderMutation();

  const modalRef = useRef<any>(null);
 

  useEffect(() => {
    // Initialize the modal
    const mFunc = async () => {
       M = await import("materialize-css/dist/js/materialize.min.js");
        const modalElement = modalRef.current;
        M.Modal.init(modalElement);      
    }
    mFunc()
   
  }, []);

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createFolder({ data: 
      {...formData, folder: props.selectedFolder  || null } // folder here is acting as a parent
    });
    // Close the modal
    const modalInstance = M.Modal.getInstance(modalRef.current);
    modalInstance.close();    
    setReloadCounter(0); // to refresh and rerender the component so that created folder is shown
  };

  return (
    <div>
      {/* <a href="#modal1" className="modal-trigger btn">Open Form Modal</a> */}

      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4 style={{ color: "black"}}>Create a new folder</h4>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Folder name</label>
            </div>            
            <button type="submit" className="btn waves-effect waves-light">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FolderFormModal;
