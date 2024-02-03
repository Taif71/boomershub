import { useDeleteFolderMutation, useGetFoldersQuery } from "@/redux/features/apis/foldersapi";
import { useState } from "react";


const Folders = (props: any) => {
    const [reloadCounter, setReloadCounter] = useState(0);

    const [ deleteFolder ] = useDeleteFolderMutation();
    const { data: folders }: any =
        useGetFoldersQuery(
            {
                // limit: 100,
                // skip: 0,
                filter: JSON.stringify({
                    isActive: true,
                    isDeleted: false,
                    parent: props.selectedFolder && encodeURIComponent(props.selectedFolder) || null
                }),
            }
        ) || {};

    const handleDeleteClick = (event: React.MouseEvent, folderId: string) => {
        event.stopPropagation(); // Prevent the click event from triggering the folder selection
        deleteFolder(folderId)   
        setReloadCounter(0);
    };

    console.log({ folders })

    return (
        <div className="">
            <div className="container-fluid" >
                <p className="subheader">Folders</p>
                <div style={{ display: "flex"}}>
                {
                    folders?.map((e: any) => (
                        <div
                            key={e.id}
                            onClick={() => { props.setSelectedFolder(e.id) }}
                            className="card-panel folder"
                            style={{ margin: 3, display: "flex", justifyContent: "space-between"}}
                        >
                           <div style={{ display: "flex"}}>
                                <i className="material-icons">folder</i>
                                <p style={{ margin: 0, padding: 0, marginLeft: 5}}>{e.name}</p>
                           </div>

                            <div className="delete-icon" onClick={(event) => handleDeleteClick(event, e.id)}>
                                <a
                                    className="dropdown-trigger delete-drop-down"
                                    data-target="delete-folder-dropdown"
                                >
                                    <i className="material-icons">delete</i>
                                </a>
                            </div>
                        </div>

                     
                    //          <div
                    //     key={e.id}
                    //     onClick={() => { props.setSelectedFolder(e.id) }}
                    //     className="card-panel folder row"
                    //     // style={{ margin: 3, display: "flex", justifyContent: "space-between"}}
                    // >
                    //     <i className="material-icons col s2">folder</i>
                    //     <p className="col s7" style={{ margin: 0, padding: 0}}>{e.name}</p>

                    //     <div className="delete-icon col s3" onClick={(event) => handleDeleteClick(event, e.id)}>
                    //         <a
                    //             className="dropdown-trigger delete-drop-down"
                    //             data-target="delete-folder-dropdown"
                    //         >
                    //             <i className="material-icons">delete</i>
                    //         </a>
                    //     </div>
                    //     </div>
                    


                    ))
                }
                </div>                
            </div>
        </div>
    );
}
export default Folders;