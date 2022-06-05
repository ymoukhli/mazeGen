import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "Ubuntu Mono";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  align-items: center;
  color: white;
  text-align: center;
  /* darkliniar */
  width: 231px;
  height: 102px;
  background: linear-gradient(
    258.97deg,
    #1a002b 0%,
    rgba(70, 14, 180, 0.86) 100%
  );
  border-radius: 19px;
  &:hover {
    width: 233px;
    height: 104px;
    background: linear-gradient(
      258.97deg,
      rgba(90, 29, 210, 0.86) 0%,
      #692a93 100%
    );
  }
`;
export default function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}
