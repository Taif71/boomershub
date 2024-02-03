import { useGetFilesQuery } from "@/redux/features/apis/filesapi";
import { getFileName } from "@/utils/helper";



const Files = (props: any) => {
    const { data: files }: any =
        useGetFilesQuery(
            {
                limit: 100,
                skip: 0,
                filter: JSON.stringify({
                    folder: props.selectedFolder || null                   
                }),
            }
        ) || {};

        const handleDownload = (url: string) => {
            const newTab = window.open(url, '_blank');
            if (newTab) {
                newTab.focus();
              } else {
                // Handle the case where pop-ups are blocked or the new tab couldn't be opened
                console.error('Failed to open a new tab. Ensure pop-up blockers are disabled.');
                // Optionally, provide a user-friendly message or an alternative download method
              }
          };
    
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
                                <a href={e.url} download={`${getFileName(e.url)}`}>
                                    <i className="material-icons left">description</i>{`${getFileName(e.url)}`}
                                </a>
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