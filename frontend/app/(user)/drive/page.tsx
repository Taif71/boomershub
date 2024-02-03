"use client"
import ContentsArea from "@/app/components/Contents/ContentsArea";
import NavBar from "@/app/components/navbar/navbar";
import SideBar from "@/app/components/sidebar/sidebar";
import React, { useState } from "react";

const DrivePage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  return (
    <div>
      <NavBar selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></NavBar>
      <div className="row ">
        <div className="col s2">
            <SideBar selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></SideBar>
          </div>
          <div className="col s10 mt-12">
            <ContentsArea selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></ContentsArea>
          </div>
      </div>

    </div>
  );
};

export default DrivePage;
