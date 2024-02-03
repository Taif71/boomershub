import React, { useState, useRef, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useCreateFolderMutation } from '@/redux/features/apis/foldersapi';

const FileFormModal = (props: any) => {
  const [reloadCounter, setReloadCounter] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    parent: undefined
  });

  const [createFolder] = useCreateFolderMutation();

  const modalRef = useRef(null);

  useEffect(() => {
    // Initialize the modal
    const modalElement = modalRef.current;
    M.Modal.init(modalElement, { coverTrigger: false });
  }, []);

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add your form submission logic here
    // console.log('Form submitted:', formData);
    if((props.selectedFolder || null) && '' ) {}
    
    // Close the modal
    const modalInstance = M.Modal.getInstance(modalRef.current);
    modalInstance.close();    
    setReloadCounter(0); // to refresh and rerender the component so that created folder is shown
  };

  const handleFileUpload = (e: any) => {

  }

  return (
    <div>
      <a href="#modal1" className="modal-trigger btn">Open Form Modal</a>

      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>Upload a file for your current directory</h4>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
            {/* <label htmlFor="name">Folder name</label> */}
              <input
                type="file"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFileUpload}
              />
            </div>            
            <button type="submit" className="btn waves-effect waves-light">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileFormModal;
