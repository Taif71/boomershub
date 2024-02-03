import { useGetFilesQuery } from "@/redux/features/apis/filesapi";
import { downloadFile, getFileName } from "@/utils/helper";



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
            const fileName = getFileName(url);
            downloadFile (url, fileName);
          };
    
        const handleDeleteClick = (event: React.MouseEvent, folderId: string) => {
            event.stopPropagation(); // Prevent the click event from triggering the folder selection
            // deleteFolder(folderId)     
        };

    return (
        <div className="">
            <div className="container-fluid">
                <p className="subheader">Files</p>
                {
                    files?.map((e: any) => (

                            <div
                                key={e.id}
                                onClick={() => { props.setSelectedFolder(e.name) }}
                                className="card-panel folder"
                            >
                                <a href={e.url} onClick={() => handleDownload(e.url)} download={`${getFileName(e.url)}`} style={{ display: "flex"}}>
                                    <i className="material-icons">description</i>
                                    <p style={{ margin: 0, padding: 0, marginLeft: 5 }}>{`${getFileName(e.url)}`}</p>
                                </a>
                            </div>                                              
                    ))
                }
            </div>
        </div>
    );
}
export default Files;