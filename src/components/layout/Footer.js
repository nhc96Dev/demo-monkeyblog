import React from "react";
import styled from "styled-components";

const FooterStyles = styled.footer`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  background: #333;
  color: white;
  @media screen and (max-width: 1023.98px) {
    margin-top: 40px;
  }
`;
const Footer = () => {
  return (
    <div className="mt-auto">
      <FooterStyles>
        <div className="mx-auto p-5 mobile:p-3">
          <div className="flex items-center justify-center gap-x-8 mb-1">
            <a
              href="https://www.facebook.com/"
              target={"_blank"}
              rel="noreferrer"
              className="social text-[24px] mobile:text-[18px]"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target={"_blank"}
              rel="noreferrer"
              className="social text-[24px] mobile:text-[18px]"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.youtube.com/"
              target={"_blank"}
              rel="noreferrer"
              className="social text-[24px] mobile:text-[18px]"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
          <span className="text-gray-400 text-sm">nhc96.dev@gmail.com</span>
        </div>
      </FooterStyles>
    </div>
  );
};
export default Footer;
