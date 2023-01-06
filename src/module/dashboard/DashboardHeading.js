import React from "react";
import styled from "styled-components";

const DashboardHeadingStyles = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 24px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }
    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }

    @media screen and (max-width: 1023.98px) {
      &-heading {
        font-size: 20px;
      }
    }
    @media screen and (max-width: 640px) {
      &-heading {
        font-size: 18px;
      }
    }
  }
`;
const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <DashboardHeadingStyles>
      <div>
        <h1 className="dashboard-heading">{title}</h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </DashboardHeadingStyles>
  );
};

export default DashboardHeading;
