import React from "react";
import styled from "styled-components";

export const FrameRootRootRoot1 = ({}) => {
  const Button2Function = (e, name) => {
    alert(`${name} was clicked`);
  };
  return (
    <FrameRootRootRoot>
      <Button1 onClick={(e) => Button2Function(e, "Button2")}>
        <Text1>button</Text1>
      </Button1>
    </FrameRootRootRoot>
  );
};

const FrameRootRootRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 65px 73px 64px 74px;
  background-color: #ffffff;
  overflow: hidden;
`;
const Button1 = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  border-width: 0px;
  border-radius: 100px;
  box-sizing: content-box;
  background-color: #afc89a;
  cursor: pointer;
  &: hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.3);
  } ;
`;
const Text1 = styled.div`
  width: 38px;
  height: 15px;
  font-size: 12px;
  font-family: Inter;
  white-space: nowrap;
`;
