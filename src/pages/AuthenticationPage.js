import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 0;
  .logo {
    margin: 0 auto;
    max-width: 150px;
  }
  .logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 40px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
  /* .horizontal {
    position: relative;
    margin: 25px 80px 25px 80px;
  }
  .horizontalText {
    width: 100%;
    text-align: center;
    position: relative;
    color: #ababab;
    font-size: 16px;
    z-index: 1;
    overflow: hidden;
  }
  .horizontalText::before {
    display: block;
    content: "";
    width: 45%;
    top: 50%;
    left: 0;
    overflow: hidden;
    height: 1px;
    background-color: #d0d0d0;
    position: absolute;
  }
  .horizontalText::after {
    display: block;
    content: "";
    width: 45%;
    top: 50%;
    right: 0;
    overflow: hidden;
    height: 1px;
    background-color: #d0d0d0;
    position: absolute;
  } */

  @media screen and (max-width: 950px) {
    padding: 40px 0;
    .logo {
      max-width: 60px;
    }
    .heading {
      font-size: 32px;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 540px) {
    padding: 30px 10px;
    .logo {
      max-width: 50px;
    }
    .heading {
      font-size: 28px;
      margin-bottom: 30px;
    }
    /* .horizontal {
      position: relative;
      margin: 25px 0 25px 0;
    }
    .horizontalText::before,
    .horizontalText::after {
      width: 44%;
    } */
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <div className="text-center">
          <NavLink to="/" className="inline-block">
            <div className="logo">
              <img srcSet="/logo.png 3x" alt="monkey-blogging" />
            </div>
          </NavLink>
          <h1 className="heading">Monkey Blogging</h1>
        </div>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
