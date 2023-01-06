import { SearchPosts } from "components/search";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Swal from "sweetalert2";

const sidebarLinks = [
  {
    title: "Dashboard",
    url: "/dashboard",
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
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Post",
    url: "/manage/posts",
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Category",
    url: "/manage/category",
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
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: "User",
    url: "/manage/user",
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
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

const DashboardHeaderStyles = styled.div`
  background-color: #fcfcfd;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
  .sidebar {
    position: fixed;
    width: 300px;
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

  @media screen and (max-width: 1023.98px) {
    .logo {
      display: none;
    }
  }
  @media screen and (max-width: 950px) {
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
    .logo-sidebar {
      max-width: 30px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  @media screen and (max-width: 540px) {
    .header-button {
      display: none;
    }

    .logo-sidebar {
      max-width: 30px;
    }

    .header-avatar {
      width: 44px;
      height: 44px;
    }
  }
`;

const DashboardHeader = () => {
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
    <DashboardHeaderStyles open={openMenu}>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="" />
        <span className="hidden lg:inline-block">Monkey Blogging</span>
      </NavLink>

      <div className="lg:hidden">
        <button className="sidebarBtn" ref={buttonOpenSidebarRef}>
          <i className="fa-solid fa-bars pointer-events-none"></i>
        </button>
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
              <span
                className="text-xl font-semibold cursor-pointer"
                onClick={() => setOpenMenu(false)}
              >
                <i className="fa-solid fa-angle-left"></i>
              </span>
            </div>
            <div className="px-5">
              <SearchPosts></SearchPosts>
            </div>
            <div className="mt-5">
              {sidebarLinks.map((item) => {
                if (item.onClick)
                  return (
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
                  );
                return (
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
                );
              })}
            </div>
          </div>
          {userInfo && (
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
          )}
        </ul>
      </div>
      <div className="header-right">
        <Link to="/manage/profile" className="header-avatar">
          <img src={userInfo?.avatar} alt="" />
        </Link>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
