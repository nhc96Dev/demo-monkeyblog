import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 16px 20px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.grayddd};
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
    resize: none;
    min-height: 150px;
  }
  textarea:focus {
    border: 1px solid ${(props) => props.theme.primary};
  }
  textarea::-webkit-input-placeholder {
    color: #b2b3bd;
  }
  textarea::-moz-input-placeholder {
    color: #b2b3bd;
  }
`;
const Textarea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles>
      <textarea id={name} type={type} {...field} {...props} />
    </TextareaStyles>
  );
};

export default Textarea;
