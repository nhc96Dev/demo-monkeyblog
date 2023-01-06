import React from "react";
import styled from "styled-components";
const HeadingStyles = styled.h2`
  font-size: 25px;
  position: relative;
  margin-bottom: 30px;
  font-weight: 600;
  @media screen and (max-width: 1023.98px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 640px) {
    font-size: 18px;
  }
`;
const Heading = ({ className = "", children }) => {
  return <HeadingStyles className={className}>{children}</HeadingStyles>;
};

export default Heading;
