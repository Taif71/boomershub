"use client"
import Folders from "@/app/components/folders/folders";
import NavBar from "@/app/components/navbar/navbar";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const SideBarLayout = dynamic(
  () => import("../../components/sidebar/sidebar"),
  {
    ssr: false,
  }
);

const DrivePage = () => {
  const [selectedFolder, setSelectedFolder] = useState('-1');
  return (
    <div>
      <NavBar></NavBar>
      <SideBarLayout selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></SideBarLayout>
      <Folders selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></Folders>
    </div>
  );
};

export default DrivePage;
