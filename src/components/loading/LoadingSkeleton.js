import React from "react";
import styled from "styled-components";
const LoadingSkeletonStyles = styled.div`
  background-color: #eee;
  background-image: linear-gradient(
    110deg,
    #ececec 8%,
    #f5f5f5 18%,
    #ececec 33%
  );
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;

const LoadingSkeleton = (props) => {
  return (
    <LoadingSkeletonStyles className={props.className}></LoadingSkeletonStyles>
  );
};

export default LoadingSkeleton;
