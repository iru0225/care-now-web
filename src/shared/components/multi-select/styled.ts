import styled from "styled-components";
import tw from "twin.macro";

export const Label = styled.label`
  ${tw`text-base font-bold`}
`

export const Select = styled.select`
  ${tw`border rounded border-slate-400 w-full p-4`}
`

export const Option = styled.option<{ selected?: boolean }>`
  ${tw`w-full p-6`}
  ${({ selected }) => selected && tw`bg-[#0c83c7] text-white`}
`