import { Button } from "components/button";
import { SearchPosts } from "components/search";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Swal from "sweetalert2";
const menuLinks = [
  {
    url: "/",
    title: "Home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    url: "/blog",
    title: "Blog",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    url: "/contact",
    title: "Contact",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
  },
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
];

const logInLinks = [
  {
    url: "/sign-in",
    title: "Log in",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
  },
];

const logOutLinks = [
  {
    title: "Log out",
    url: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
    onClick: () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1DC071",
        cancelButtonColor: "#ef233c",
        confirmButtonText: "Yes, log out!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          signOut(auth);
          Swal.fire("Logged out!", "You have been logged out.", "success");
        }
      });
    },
  },
];

const HeaderStyles = styled.header`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcfcfd;
  .header-main {
    display: flex;
    align-items: center;
  }
  .header-auth {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .logo,
  .logo-sidebar {
    display: block;
    max-width: 40px;
  }
  .sidebarBtn {
    display: none;
  }
  .sidebar {
    position: fixed;
    width: fit-content;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
    transform: translateX(-200%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fcfcfd;
    transition: all 0.3s linear;
    ${(props) =>
      props.open === true &&
      css`
        transform: translateX(0);
      `};
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;
  }

  .link {
    line-height: 1.5em;
    padding: 1em 2em;
    font-weight: 600;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }

  .about {
    background-color: ${(props) => props.theme.grayF3};
  }

  @media screen and (max-width: 950px) {
    .menu,
    .logo {
      display: none;
    }
    .header-button {
      height: 50px;
    }

    .sidebarBtn {
      display: inline-block;
      font-size: 22px;
      margin-right: 25px;
    }
  }
  @media screen and (max-width: 540px) {
    .header-button {
      display: none;
    }

    .logo-sidebar {
      max-width: 30px;
    }
  }
`;
const Header = () => {
  const { userInfo } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const sidebarRef = useRef();
  const buttonOpenSidebarRef = useRef();
  useEffect(() => {
    const handleSidebarMenu = (e) => {
      if (e.target === buttonOpenSidebarRef.current) {
        setOpenMenu(true);
      } else {
        if (sidebarRef) {
          if (!sidebarRef?.current?.contains(e.target)) {
            setOpenMenu(false);
          }
        }
      }
    };

    window.document.addEventListener("click", handleSidebarMenu);
  }, []);

  return (
    <HeaderStyles open={openMenu}>
      <div className="container">
        <div className="header-main">
          <button className="sidebarBtn" ref={buttonOpenSidebarRef}>
            <i className="fa-solid fa-bars pointer-events-none"></i>
          </button>
          <NavLink to="/">
            <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
          </NavLink>
          <ul className="menu">
            {menuLinks.slice(0, 3).map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menu-link">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="sidebar" ref={sidebarRef}>
            <div>
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-x-4">
                  <NavLink to="/">
                    <img
                      srcSet="/logo.png 2x"
                      alt="monkey-blogging"
                      className="logo-sidebar"
                    />
                  </NavLink>
                  <h2 className="font-semibold">Monkey Blogging</h2>
                </div>
                <button
                  className="text-xl font-semibold cursor-pointer"
                  onClick={() => setOpenMenu(false)}
                >
                  <i className="fa-solid fa-angle-left"></i>
                </button>
              </div>

              <div className="px-5">
                <SearchPosts></SearchPosts>
              </div>

              <div className="mt-5">
                {userInfo &&
                  menuLinks.map((item) => (
                    <li key={item.title}>
                      <NavLink
                        to={item.url}
                        className="flex items-center justify-between link"
                      >
                        <div className="flex items-center gap-x-4">
                          <span>{item.icon}</span>
                          <span className="menu-link">{item.title}</span>
                        </div>
                        <span className="text-sm">
                          <i className="fa-solid fa-angle-down"></i>
                        </span>
                      </NavLink>
                    </li>
                  ))}
                {!userInfo && (
                  <>
                    <MenuLinks></MenuLinks>
                    <LogInItem></LogInItem>
                  </>
                )}
              </div>
            </div>

            {userInfo && (
              <div>
                <LogOutItem></LogOutItem>
                <NavLink to="/manage/profile">
                  <div className="flex items-center about p-5 gap-x-4">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src={userInfo?.avatar}
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold">{userInfo?.fullname}</h2>
                      <span className="text-xs text-gray-600">
                        {userInfo?.email}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            )}
          </ul>

          <SearchPosts></SearchPosts>

          {!userInfo ? (
            <Button
              type="button"
              height="56px"
              className="header-button"
              to="/sign-in"
            >
              Login
            </Button>
          ) : (
            <div className="header-auth">
              <Button
                type="button"
                height="56px"
                className="header-button"
                to="/dashboard"
              >
                Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;

const LogInItem = () => {
  return logInLinks.map((item) => (
    <li key={item.title}>
      <NavLink to={item.url} className="flex items-center justify-between link">
        <div className="flex items-center gap-x-4">
          <span>{item.icon}</span>
          <span className="menu-link">{item.title}</span>
        </div>
        <span className="text-sm">
          <i className="fa-solid fa-angle-down"></i>
        </span>
      </NavLink>
    </li>
  ));
};
const LogOutItem = () => {
  return logOutLinks.map((item) => (
    <li key={item.title}>
      <div
        onClick={item.onClick}
        className="flex items-center justify-between link"
      >
        <div className="flex items-center gap-x-4">
          <span>{item.icon}</span>
          <span className="menu-link">{item.title}</span>
        </div>
        <span className="text-sm">
          <i className="fa-solid fa-angle-down"></i>
        </span>
      </div>
    </li>
  ));
};

const MenuLinks = () => {
  return menuLinks.slice(0, 3).map((item) => (
    <li key={item.title}>
      <NavLink to={item.url} className="flex items-center justify-between link">
        <div className="flex items-center gap-x-4">
          <span>{item.icon}</span>
          <span className="menu-link">{item.title}</span>
        </div>
        <span className="text-sm">
          <i className="fa-solid fa-angle-down"></i>
        </span>
      </NavLink>
    </li>
  ));
};
