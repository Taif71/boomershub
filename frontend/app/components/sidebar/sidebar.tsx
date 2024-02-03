"use client"
import { folderTreeView } from "@/dummy/dummy";
import { useGetFoldersQuery } from "@/redux/features/apis/foldersapi";
import { useEffect, useRef, useState } from "react";
import { createSignal, onCleanup } from 'solid-js';


const TreeviewTraversal = (props: any) => {
  const [isCollapse, setCollapse] = useState(true);

  const handleOnClick = () => {
    setCollapse(!isCollapse);
  }

  return (
    <div>
      <div onClick={handleOnClick} style={{ cursor: 'pointer' }}>
        <i className="material-icons blue-text text-darken-1">dashboard</i>MyDrive
      </div>
      {
        isCollapse ? null : <FolderTreeView parent={null} status={true} setSelectedFolder={props.setSelectedFolder}></FolderTreeView>
      }
    </div>

  );
}

const FolderTreeView = (props: any) => {
  const [isOpen, setIsOpen] = createSignal(true);
  const { data: folders }: any =
    useGetFoldersQuery(
      {
        // limit: 100,
        // skip: 0,
        filter: JSON.stringify({
          isActive: true,
          isDeleted: false,
          parent: props.parent && encodeURIComponent(props.parent) || null
        }),
      }, {
        skip: !props.status
      }
    ) || {};

  const [folderStatus, setFolderStatus] = useState<any>({ });
  return (
    <div>
      {isOpen() && (
        <ul style={{ listStyleType: 'none', marginLeft: '20px' }}>
          {folders?.map((item: any, index: number) => (
            <li key={item.id}
            >
              <div>
                <div onClick={() => { 
                  
                  const status = folderStatus[item.id] || false
                  const tempFolderStatus = {...folderStatus }
                  tempFolderStatus[item.id] = !status;
                  props.setSelectedFolder(item.id)
                  setFolderStatus({ ...tempFolderStatus });
                }}>
                  <i className="material-icons blue-text text-darken-1">folder</i>  {item.name}
                </div>
                
                <FolderTreeView 
                    status={folderStatus[item.id] || false} 
                    parent={item.id} 
                    setSelectedFolder={props.setSelectedFolder} 
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SideBar = ({ children, setSelectedFolder }: any) => {

  const { data: folders }: any =
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
    <ul className="side-nav fixed floating transparent z-depth-0">
      <li className="active">
        <TreeviewTraversal setSelectedFolder={setSelectedFolder}/>
      </li>
      <li>
        <a href="#">
          <i className="material-icons">devices</i>Computers
        </a>
      </li>
      <li>
        <a href="#">
          <i className="material-icons">people</i>Shared with me
        </a>
      </li>
    </ul>
  );
}

export default SideBar;





