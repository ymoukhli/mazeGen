import React from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  width: calc(97vw / ${({ width }) => width});
  height: calc(97vw / ${({ width }) => width});
  max-width: 30px;
  max-height: 30px;
  border: 1px #000000 solid;
  border-right: ${({ right }) => (right ? "1px #000000 solid" : "none")};
  border-left: ${({ left }) => (left ? "1px #000000 solid" : "none")};
  border-top: ${({ top }) => (top ? "1px #000000 solid" : "none")};
  border-bottom: ${({ bottom }) => (bottom ? "1px #000000 solid" : "none")};
  background-color: ${({ color }) => (color ? color : "#fff")};
`;
export default function Cell({
  width,
  id,
  // key,
  cell,
}) {
  return (
    <StyledCell
      id={id}
      width={width}
      // key={key}
      right={cell["border-right"]}
      left={cell["border-left"]}
      bottom={cell["border-bottom"]}
      top={cell["border-top"]}
      color={cell.color}
    ></StyledCell>
  );
}

export const MemoizedCell = React.memo(Cell, (prev, current) => {
  if (
    prev.cell["border-right"] === current.cell["border-right"] &&
    prev.cell["border-left"] === current.cell["border-left"] &&
    prev.cell["border-bottom"] === current.cell["border-bottom"] &&
    prev.cell["border-top"] === current.cell["border-top"] &&
    prev.cell.color === current.cell.color
  )
    return true;
  return false;
});
