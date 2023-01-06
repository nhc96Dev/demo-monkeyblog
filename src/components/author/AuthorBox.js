import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const AuthorBoxStyles = styled.div`
  margin-top: 40px;
  margin-bottom: 80px;
  padding: 5px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) => props.theme.grayF3};
  .author {
    &-image {
      width: 150px;
      height: 150px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 5px;
      margin-left: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
      letter-spacing: 0.25px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: pre-wrap;
    }
  }
  @media screen and (max-width: 1023px) {
    .author {
      &-desc {
        letter-spacing: 0.25px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;
      }
    }
  }
  @media screen and (max-width: 640px) {
    .author {
      &-image {
        width: 100px;
        height: 100px;
      }
      &-name {
        margin-bottom: 0;
        font-size: 18px;
      }
    }
  }
`;

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        setUser(docSnapshot.data());
      }
    }
    fetchUserData();
  }, [userId]);
  if (!userId || !user.username) return null;
  return (
    <AuthorBoxStyles className="author">
      <div className="author-image">
        <img src={user?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname}</h3>
        <p className="author-desc">{user?.description}</p>
      </div>
    </AuthorBoxStyles>
  );
};
AuthorBox.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AuthorBox;
