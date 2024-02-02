import { useGetFoldersQuery } from "@/redux/features/apis/foldersapi";


const Folders = (props: any) => {
    const { data: folders }:any =
        useGetFoldersQuery(
            {
                limit: 100,
                skip: 0,
                filter: JSON.stringify({
                    isActive: true,
                    isDeleted: false
                }),
            }
        ) || {};
    return (
        <div className="main">
            <div className="container-fluid">
                <p className="subheader">Folders</p>
                {
                   
                    folders?.map((e: any) => (
                        <div
                            key={e.id}
                            onClick={() => { props.setSelectedFolder(e.id) }}
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