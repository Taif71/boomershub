import Folders from "@/app/components/folders/folders";
import NavBar from "@/app/components/navbar/navbar";
import dynamic from "next/dynamic";
import React from "react";
// import UserSearchComponent from "./components/userSearchComponent";

const SideBarLayout = dynamic(
  () => import("../../components/sidebar/sidebar"),
  {
    ssr: false,
  }
);

const DrivePage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <SideBarLayout></SideBarLayout>
      <Folders></Folders>
    </div>
  );
};

export default DrivePage;
