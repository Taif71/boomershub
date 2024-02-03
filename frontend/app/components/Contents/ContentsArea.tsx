import { folderTreeView } from "@/dummy/dummy";
import Folders from "../Folders/Folders";
import { useGetFoldersQuery } from "@/redux/features/apis/foldersapi";
import Files from "../Files/Files";

const ContentsArea = (props: any) => {
    const selectedFolder = props.selectedFolder;

    return (
        <div className="">
            <div className="row">
            <div>
                <div className="col s6">
                    <Folders selectedFolder={selectedFolder} setSelectedFolder={props.setSelectedFolder} />
                </div>
            </div>      
            <div>
                <div className="col s6">
                    <Files selectedFolder={selectedFolder} setSelectedFolder={props.setSelectedFolder} />
                </div>
            </div>      
            </div>
        </div>
    );
}

export default ContentsArea;
