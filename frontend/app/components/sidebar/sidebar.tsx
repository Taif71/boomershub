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
        isCollapse ? null : <FolderTreeView parent={null} status={true}></FolderTreeView>
      }
    </div>

  );
}

const FolderTreeView = (props: any) => {
  const [isOpen, setIsOpen] = createSignal(true);
  // const [localSelectedFolder, setLocalSelectedFolder] = useState(props.selectedFolder || null);
  const { data: folders }: any =
    useGetFoldersQuery(
      {
        limit: 100,
        skip: 0,
        filter: JSON.stringify({
          isActive: true,
          isDeleted: false,
          parent: props.parent || null
        }),
      }, {
        skip: !props.status
      }
    ) || {};

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const folderStatus = useRef(folders?.map((f: any) => false));
  useEffect(() => {
    folderStatus.current = folders?.map((f: any) => false);
    if(selectedIndex!= -1) {
      folderStatus.current[selectedIndex] = !folderStatus.current[selectedIndex];
    }
  }, [selectedIndex])

  return (
    <div>
      {isOpen() && (
        <ul style={{ listStyleType: 'none', marginLeft: '20px' }}>
          {folders?.map((item: any, index: number) => (
            <li key={item.id}
            >
              <div>
                <div onClick={() => { 
                  // const tempFolderStatus = [...folderStatus];
                  // tempFolderStatus[index] = !tempFolderStatus[index];
                  // folderStatus.current[index] = !folderStatus.current[index]
                  setSelectedIndex(index);
                }}>
                  <i className="material-icons blue-text text-darken-1">folder</i>  {item.name}
                </div>
                <FolderTreeView 
                    status={index >= folderStatus.current?.length ? false : folderStatus.current[index]} 
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
        <TreeviewTraversal />
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





