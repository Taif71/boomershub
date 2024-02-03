import { useGetFilesQuery } from "@/redux/features/apis/filesapi";
import { getFileName } from "@/utils/helper";



const Files = (props: any) => {
    const { data: files }: any =
        useGetFilesQuery(
            {
                limit: 100,
                skip: 0,
                filter: JSON.stringify({
                    folder: props.selectedFolder || undefined
                    // folder: null 
                }),
            }
        ) || {};
    
        const handleDeleteClick = (event: React.MouseEvent, folderId: string) => {
            event.stopPropagation(); // Prevent the click event from triggering the folder selection
            // deleteFolder(folderId)     
        };

    return (
        <div className="main">
            <div className="container-fluid">
                <p className="subheader">Files</p>
                {
                    files?.map((e: any) => (
                        <div>
                            <div
                                key={e.id}
                                onClick={() => { props.setSelectedFolder(e.name) }}
                                className="card-panel folder"
                            >
                                <i className="material-icons left">folder</i>{`${getFileName(e.url)}`}
                            </div>
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
export default Files;