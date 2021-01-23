import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  jusitfy-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 5px;
  height: 100%;
  overflow: hidden;
  img {
    width: 90%;
    max-height: 200px;
    object-fit: cover;
    display: block;
    margin: auto;
    margin-top: 10px;
  }
  button {
    border-radius: 0 0 5px 5px;
  }
  div {
    padding: 16px;
    font-family: Arial, Helvetica, sans-serif;
    color: #333;
    line-height: 1.6;
    flex: 1;
  }
`;
