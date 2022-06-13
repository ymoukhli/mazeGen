import Grid from "./Grid"
// import { Header } from "semantic-ui-react"
import { Header } from './Header'
import styled from "styled-components";
import React from 'react'
const StyledApp = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            margin-top : 62px;
        }
        margin-top: 120px;
    }
    .algos {

    }
`;

export default function MainPage() {
    console.log('setting main')
    return (
    <StyledApp>
    <main>
      <Grid></Grid>
      {/* <Button onClick={generateMaze} width="441">
        generate maze
      </Button> */}
    </main>
    <Header/>
  </StyledApp>)
  }