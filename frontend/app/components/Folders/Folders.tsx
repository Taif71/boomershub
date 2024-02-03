import { useDeleteFolderMutation, useGetFoldersQuery } from "@/redux/features/apis/foldersapi";
import { useState } from "react";


const Folders = (props: any) => {
    const [reloadCounter, setReloadCounter] = useState(0);

    const [ deleteFolder ] = useDeleteFolderMutation();
    const { data: folders }: any =
        useGetFoldersQuery(
            {
                limit: 100,
                skip: 0,
                filter: JSON.stringify({
                    isActive: true,
                    isDeleted: false,
                    parent: props.selectedFolder && encodeURIComponent(props.selectedFolder) || undefined
                }),
            }
        ) || {};

    const handleDeleteClick = (event: React.MouseEvent, folderId: string) => {
        event.stopPropagation(); // Prevent the click event from triggering the folder selection
        deleteFolder(folderId)   
        setReloadCounter((prevCounter) => prevCounter + 1);
        setReloadCounter(0);
    };

    return (
        <div className="main">
            <div className="container-fluid">
                <p className="subheader">Folders</p>
                {
                    folders?.map((e: any) => (
                        <div
                            key={e.id}
                            onClick={() => { props.setSelectedFolder(e.name) }}
                            className="card-panel folder"
                        >
                            <i className="material-icons left">folder</i>{e.name}

                            <div className="delete-icon" onClick={(event) => handleDeleteClick(event, e.id)}>
                                <a
                                    className="dropdown-trigger delete-drop-down"
                                    data-target="delete-folder-dropdown"
                                >
                                    <i className="material-icons right ">delete</i>
                                </a>
                            </div>
                        </div>


                    ))
                }
            </div>
        </div>
    );
}
export default Folders;