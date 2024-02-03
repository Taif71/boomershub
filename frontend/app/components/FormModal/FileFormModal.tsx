import React, { useState, useRef, useEffect } from 'react';
// import M from 'materialize-css/dist/js/materialize.min.js';
import { useCreateFolderMutation } from '@/redux/features/apis/foldersapi';
import { useCreateFileMutation, useUpdateFileMutation } from '@/redux/features/apis/filesapi';

const FileFormModal = (props: any) => {
  const [reloadCounter, setReloadCounter] = useState(0);

  const [createFile] = useCreateFileMutation();
  const [updateFile] = useUpdateFileMutation()

  const modalRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the modal
    // const modalElement = modalRef.current;
    // M.Modal.init(modalElement);
    const mFunc = async () => {
      const M: any = await import("materialize-css/dist/js/materialize.min.js");
        const modalElement = modalRef.current;
        M.Modal.init(modalElement);      
    }
    mFunc()
  }, []);

  // const handleChange = (e:any) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Add your form submission logic here
    // console.log('Form submitted:', formData);
    // if((props.selectedFolder || null) && '' ) {

    // }
    const formData = new FormData();
    console.log(e.target[0].files);
    const file = e.target[0].files[0];
    formData.append("file", file);
    const response: any = await createFile(formData);
    if(response?.data?.id) {
      const updateStatus = await updateFile({id: response.data.id, data: { folder: props.selectedFolder}});
      console.log(updateStatus)
    }
    // Close the modal
    const modalInstance = M.Modal.getInstance(modalRef.current);
    modalInstance.close();    
    setReloadCounter(0); // to refresh and rerender the component so that created folder is shown
  };

  // const handleFileUpload = (e: any) => {
  //   console.log(e)
  // }

  return (
    <div>
      {/* <a href="#modal1" className="modal-trigger btn">Open Form Modal</a> */}

      <div id="modal2" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4 style={{ color: "black"}}>Upload your file</h4>
          <form onSubmit={handleSubmit} >           
            {/* <label htmlFor="name">Folder name</label> */}
              <input
                type="file"
                id="name"
                name="name"          
                // onChange={handleFileUpload}
              />               
            <br></br>
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
