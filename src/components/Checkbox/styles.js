import styled from "styled-components";

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  & + & {
    margin-top: 15px;
  }
`;

export const CheckboxIndicator = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 23px;
  background-color: var(--offWhite);
  border: 5px solid var(--offWhite);
  border-radius: 50%;
  transition: background-color 0.2s ease-out;
`;

export const CheckboxInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;

  &:checked ~ ${CheckboxIndicator} {
    background-color: var(--turquoise55);
  }
`;

export const CheckboxLabel = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.6;
  color: var(--offWhite);
`;
