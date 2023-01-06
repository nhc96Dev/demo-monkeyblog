import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchPostsStyles = styled.div`
  margin-left: auto;
  width: 100%;
  max-width: 320px;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 20px;
  .search-input {
    border-radius: 8px;
    flex: 1;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 55px;
    font-weight: 500;
    background-color: ${(props) => props.theme.grayLight};
    border: 1px solid transparent;
    transition: all 0.2s linear;
    &:focus {
      border-color: ${(props) => props.theme.primary};
      background-color: transparent;
    }
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
  }
  @media screen and (max-width: 950px) {
    .search-input {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
  @media screen and (max-width: 540px) {
    margin-right: 0;
    .search-input {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;
const SearchPosts = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const handleClickSearch = () => {
    setFilter(searchInputRef.current.value);
  };
  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      setFilter(searchInputRef.current.value);
    }
  };

  useEffect(() => {
    if (filter) {
      navigate(`/search/${filter}`);
    }
  }, [filter, navigate]);
  return (
    <SearchPostsStyles className="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search posts..."
        ref={searchInputRef}
        onKeyDown={handleEnterSearch}
        defaultValue={filter}
      />
      <span className="search-icon" onClick={handleClickSearch}>
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="7.66669"
            cy="7.05161"
            rx="6.66669"
            ry="6.05161"
            stroke="#999999"
            strokeWidth="1.5"
          />
          <path
            d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
            stroke="#999999"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </SearchPostsStyles>
  );
};

export default SearchPosts;
