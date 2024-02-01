import { folderTreeView } from "@/dummy/dummy";

const findFolder = (root: any, id: string) => {
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
    const selectedFolder = props.selectedFolder;
    const folders = (selectedFolder == '-1' ? folderTreeView : findFolder({contents: folderTreeView},selectedFolder));
    
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
                        key={e.id}  
                        onClick={() => { props.setSelectedFolder(e.id)}}
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