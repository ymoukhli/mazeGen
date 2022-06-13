import Button from "./Button";
import { gridContext } from "../context/gridContext";
import styled from "styled-components";
import React, { useContext } from "react";
const StyledHeader = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
width: 100vw;
display: flex;
height: 100px;
button {
  width: 100%;
  border-radius: 0;
}`
export const Header = () => {
  const [,,generateMaze] = useContext(gridContext);

    return (
    <StyledHeader>
        <Button onClick={() => generateMaze("prim")}>prim</Button>
        <Button onClick={() => generateMaze("huntAndKill")}>
        hunt and kill
        </Button>
        <Button onClick={() => generateMaze("backTrack")}>back track</Button>
        <Button onClick={() => generateMaze("ellerMaze")}>eller</Button>
    </StyledHeader>)
}