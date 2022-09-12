import styled from "styled-components";

export const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  & + & {
    margin-top: 15px;
  }
`;

export const RadioIndicator = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 23px;
  background-color: var(--white);
  border: 5px solid var(--white);
  border-radius: 50%;
  transition: background-color 0.2s ease-out;
`;

export const Radio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked ~ ${RadioIndicator} {
    background-color: var(--turquoise55);
  }
`;

export const RadioLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
  color: var(--white);
`;
