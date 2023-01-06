import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const PostItemStyleListSkeleton = () => {
  return (
    <div>
      <PostItem></PostItem>
      <PostItem></PostItem>
      <PostItem></PostItem>
    </div>
  );
};

export default PostItemStyleListSkeleton;

const PostItem = () => {
  return (
    <div className="flex items-center gap-5 mb-10 mobile:mb-[14px]">
      <LoadingSkeleton className="flex-shrink-0 mobile:w-[140px] mobile:h-[100px] rounded-xl w-[220px] h-[160px] lg:w-[280px] lg:h-[200px]"></LoadingSkeleton>
      <div className="flex flex-col">
        <span>
          <LoadingSkeleton className="h-8 w-[350px] mobile:w-[170px] md:w-[250px] lg:w-[400px] rounded-md mb-4 mobile:h-7"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton className="h-5 w-20 rounded-md mb-4 mobile:h-5"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton className="h-4 w-36 rounded-md mb-5 mobile:mb-0 mobile:h-4"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton className="h-10 w-[400px] lg:h-16 lg:w-[600px] rounded-md mobile:hidden"></LoadingSkeleton>
        </span>
      </div>
    </div>
  );
};
