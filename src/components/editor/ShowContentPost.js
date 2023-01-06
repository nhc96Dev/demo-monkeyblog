import React from "react";
import PropTypes from "prop-types";
const ShowContentPost = ({ content }) => {
  return (
    <div
      className="entry-content"
      // Prevent XSS Attack recommen from React Docs
      dangerouslySetInnerHTML={{
        __html: content || "",
      }}
    ></div>
  );
};
ShowContentPost.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ShowContentPost;
