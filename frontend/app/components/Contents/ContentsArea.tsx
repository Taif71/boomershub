import { folderTreeView } from "@/dummy/dummy";
import Folders from "../Folders/Folders";
import { useGetFoldersQuery } from "@/redux/features/apis/foldersapi";
import Files from "../Files/Files";

const ContentsArea = (props: any) => {
    const selectedFolder = props.selectedFolder;

    return (
        <div className="container-fluid" style={{ marginTop: "50px"}}>
             <Folders selectedFolder={selectedFolder} setSelectedFolder={props.setSelectedFolder} />
             <Files selectedFolder={selectedFolder} setSelectedFolder={props.setSelectedFolder} />
        </div>
    );
}

export default ContentsArea;
