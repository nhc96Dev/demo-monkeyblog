import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const PostItemSmallGridSkeleton = () => {
  return (
    <div className="grid-layout">
      <LoadingSkeleton className="relative w-full rounded-2xl h-[169px] lg:h-[272px]"></LoadingSkeleton>
      <LoadingSkeleton className="relative w-full rounded-2xl h-[169px] lg:h-[272px]"></LoadingSkeleton>
      <LoadingSkeleton className="relative w-full rounded-2xl h-[169px] lg:h-[272px]"></LoadingSkeleton>
    </div>
  );
};

export default PostItemSmallGridSkeleton;
