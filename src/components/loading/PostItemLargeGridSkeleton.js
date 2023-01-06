import React from "react";
import styled from "styled-components";
import LoadingSkeleton from "./LoadingSkeleton";

const BlogPostFeatureSkeletonStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 40px;
  align-items: start;

  @media screen and (max-width: 1023px) {
    grid-template-columns: 100%;
  }
`;

const PostItemLargeGridSkeleton = () => {
  return (
    <BlogPostFeatureSkeletonStyles>
      <div className="mb-5 mobile:mb-0">
        <LoadingSkeleton className="w-full h-[350px] lg:h-[400px] rounded-2xl mb-4 mobile:h-[250px]"></LoadingSkeleton>
        <span>
          <LoadingSkeleton className="h-5 w-20 rounded-md mb-4"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton className="h-8 w-[400px] mobile:w-[300px] rounded-md mb-4"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton className="h-4  w-40 rounded-md"></LoadingSkeleton>
        </span>
      </div>
      <div className="">
        <PostItem></PostItem>
        <PostItem></PostItem>
        <PostItem></PostItem>
      </div>
    </BlogPostFeatureSkeletonStyles>
  );
};

export default PostItemLargeGridSkeleton;

const PostItem = () => {
  return (
    <div className="flex items-center gap-5 mb-10 mobile:mb-[14px]">
      <LoadingSkeleton className="flex-shrink-0 w-[140px] h-[100px] rounded-xl lg:w-[180px] lg:h-[130px]"></LoadingSkeleton>
      <div className="flex flex-col">
        <span>
          <LoadingSkeleton className="h-5 w-20 rounded-md mb-4 mobile:h-5"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton className="h-8 lg:w-[250px] mobile:w-[170px] md:w-[300px] rounded-md mb-4 mobile:h-7"></LoadingSkeleton>
        </span>
        <span>
          <LoadingSkeleton className="h-4 w-36 rounded-md mobile:h-4"></LoadingSkeleton>
        </span>
      </div>
    </div>
  );
};
