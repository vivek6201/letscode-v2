import React from "react";
import { ClipLoader } from "react-spinners";

export default function TutorialsLoading() {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <ClipLoader className="dark:text-white text-black"/>
    </div>
  );
}
