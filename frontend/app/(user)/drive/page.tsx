"use client"
import ContentsArea from "@/app/components/Contents/ContentsArea";
import NavBar from "@/app/components/navbar/navbar";
import { useGetFoldersQuery } from "@/redux/features/apis/foldersapi";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const SideBarLayout = dynamic(
  () => import("../../components/sidebar/sidebar"),
  {
    ssr: false,
  }
);

const DrivePage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  return (
    <div>
      <NavBar selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></NavBar>
      <SideBarLayout selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></SideBarLayout>
      <ContentsArea selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></ContentsArea>
    </div>
  );
};

export default DrivePage;
