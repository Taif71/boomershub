"use client"
import Folders from "@/app/components/folders/folders";
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
  const [selectedFolder, setSelectedFolder] = useState('-1');

  // const { data: folders } =
  //   useGetFoldersQuery(
  //     {
  //       limit: 20,
  //       skip: 0,
  //       filter: JSON.stringify({
  //         isActive: true,
  //         isDeleted: false,
          
  //       }),
  //     },
  //     // { skip: !school }
  //   ) || {};
  // console.log("1" + folders)
  return (
    <div>
      <NavBar></NavBar>
      <SideBarLayout selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></SideBarLayout>
      <Folders selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></Folders>
    </div>
  );
};

export default DrivePage;
