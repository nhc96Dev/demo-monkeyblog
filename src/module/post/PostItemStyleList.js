import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyleListStyles = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 280px;
      height: 200px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-content {
      flex: 1;
    }

    &-title {
      margin-bottom: 8px;
    }
  }
  .whitespace-nowrap {
    margin-top: 15px;
    line-height: 1.5;
    letter-spacing: 0.25px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;
  }
  @media screen and (min-width: 541px) and (max-width: 1023px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 220px;
        height: 160px;
      }
    }
    .whitespace-nowrap {
      display: none;
    }
  }
  @media screen and (max-width: 540px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
    .whitespace-nowrap {
      display: none;
    }
  }
`;
const PostItemStyleList = ({ data }) => {
  if (!data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyleListStyles>
      <PostImage url={data.image} alt="" to={data?.slug}></PostImage>

      <div className="post-content">
        <PostTitle to={data?.slug}>{data.title}</PostTitle>
        <PostCategory to={data?.category?.slug}>
          {data.category?.name}
        </PostCategory>
        <PostMeta
          to={slugify(data?.user?.username || "", { lower: true })}
          authorName={data?.user?.fullname}
          date={formatDate}
        ></PostMeta>

        <div
          className="entry-content whitespace-nowrap"
          dangerouslySetInnerHTML={{
            __html: data.content || "",
          }}
        ></div>
      </div>
    </PostItemStyleListStyles>
  );
};
export default PostItemStyleList;
