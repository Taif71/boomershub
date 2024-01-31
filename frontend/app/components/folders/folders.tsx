import { rootFolders } from "@/dummy/dummy";
// import { useState } from "react";

const Folders = () => {
    // const [isHovered, setHovered] = useState(false);
  
    const handleDeleteClick = () => {
      // Handle the delete action
      console.log('Delete clicked!');
    };
    return (
        <div className="main">
            <div className="container-fluid">
            <p className="subheader">Folders</p>
            {
                rootFolders.map(e => (
                    <div 
                        className="card-panel folder"
                       >                           
                        <i className="material-icons left">folder</i>{e.name}
                    </div>
                ))
            }
            </div>
        </div>
    );
}
export default Folders;