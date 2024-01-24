import styled from "styled-components";
import tw from "twin.macro";

export const SubmitButton = styled.button`
  ${tw`w-full px-4 py-2 rounded border-0 bg-[#0c83c7] text-white`}
  &:disabled {
    ${tw`bg-[#898989]`}
  }
`