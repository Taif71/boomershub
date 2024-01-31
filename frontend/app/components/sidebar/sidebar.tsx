"use client"
import { folderTreeView } from "@/dummy/dummy";
import { useState } from "react";
import { createSignal, onCleanup } from 'solid-js';


const TreeviewTraversal = (props : any) => {
    const [isCollapse, setCollapse] = useState(true);

    const handleOnClick = () => {
        props.setSelectedFolder("-1");
        setCollapse(!isCollapse);
    }

    return (
        <div>        
            <div  onClick={handleOnClick} style={{ cursor: 'pointer' }}>
                <i className="material-icons blue-text text-darken-1">dashboard</i>MyDrive
            </div>          
            {
                isCollapse ? null : <FolderTreeView data={props.data} setSelectedFolder={props.setSelectedFolder}></FolderTreeView>
            }
        </div>

    );
}

const FolderTreeView = ( props : any) => {
    const [isOpen, setIsOpen] = createSignal(true);
    return (     
    <div>  
        {isOpen() && (
          <ul style={{ listStyleType: 'none', marginLeft: '20px' }}>
            {props.data.map((item: any) => (
              <li key={item.id} onClick={() => {props.setSelectedFolder(item.id)
                console.log(item.id)
              }}>
                {item.type === 'folder' ? (
                  <div>
                    <i className="material-icons blue-text text-darken-1">folder</i>  {item.name}                 
                    <FolderTreeView data={item.contents} setSelectedFolder={props.setSelectedFolder} />
                  </div>
                ) : (
                  <div><i className="material-icons blue-text text-darken-1">description</i>  {item.name}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
};

const SideBar = ({ children, setSelectedFolder }: any) => {
    return (
        <ul className="side-nav fixed floating transparent z-depth-0">
            <li className="active">
                <TreeviewTraversal data={folderTreeView} setSelectedFolder={setSelectedFolder}/>
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





