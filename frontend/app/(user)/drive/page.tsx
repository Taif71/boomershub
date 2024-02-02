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
      <ContentsArea selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}></ContentsArea>
    </div>
  );
};

export default DrivePage;
