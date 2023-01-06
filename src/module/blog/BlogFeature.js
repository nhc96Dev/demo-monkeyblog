import PostNewestItem from "module/post/PostNewestItem";
import PostNewestLarge from "module/post/PostNewestLarge";
import React from "react";
import styled from "styled-components";

const BlogFeatureStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 30px;
    margin-bottom: 40px;
    align-items: start;
  }
  .sidebar {
    padding: 20px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout {
      grid-template-columns: 100%;
    }
    .sidebar {
      padding: 14px 10px;
    }
  }
`;

const BlogFeature = ({ data }) => {
  if (data.length <= 0) return null;
  const [first, ...other] = data;
  return (
    <BlogFeatureStyles>
      <div className="layout">
        <PostNewestLarge data={first}></PostNewestLarge>
        <div className="sidebar">
          {other.length > 0 &&
            other.map((item) => (
              <PostNewestItem key={item.id} data={item}></PostNewestItem>
            ))}
        </div>
      </div>
    </BlogFeatureStyles>
  );
};

export default BlogFeature;
