// import { useState } from "react";

import { folderTreeView } from "@/dummy/dummy";

const findFolder = (root: any, id: string) => {
    // if(!root) {
    //     return [];
    // }
    if(root.id === id) {
        return root.contents;
    }
    
    for(let i=0; i<root.contents.length; i++) {
        const folders:any = findFolder(root.contents[i], id);
        if(folders.length > 0) return folders;
    }
    return [];
}

const Folders = (props: any) => {
    // folderTreeView
    // const [isHovered, setHovered] = useState(false);
    const selectedFolder = props.selectedFolder;
    const folders = (selectedFolder == '-1' ? folderTreeView : findFolder({contents: folderTreeView},selectedFolder));
    console.log({folders, selectedFolder})
    
    const handleDeleteClick = () => {
      // Handle the delete action
      console.log('Delete clicked!');
    };
    return (
        <div className="main">
            <div className="container-fluid">
            <p className="subheader">Folders</p>
            {
                folders.map((e: any) => (
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