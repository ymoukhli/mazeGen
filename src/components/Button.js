import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-family: "Ubuntu Mono";
  border: none;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  align-items: center;
  color: white;
  text-align: center;
  /* darkliniar */
  // width: ${(props) => (props.width ? props.width : 200)}px;
  height: 70px;
  // background: linear-gradient(
  //   258.97deg,
  //   #1a002b 0%,
  //   rgba(70, 14, 180, 0.86) 100%
  // );
  background-color: #1a002b;
  border-radius: 19px;
  &:hover {
    // background: linear-gradient(
    //   258.97deg,
    //   rgba(90, 29, 210, 0.86) 0%,
    //   #692a93 100%
    // );
    background-color: #692a93;
  }
  transition: 200ms;
`;
export default function Button({ onClick, children, width }) {
  return (
    <StyledButton onClick={() => onClick()} width={width}>
      {children}
    </StyledButton>
  );
}
