import styled from "styled-components";
import { Section } from "../pages/Home";
import userStore from "../zustand/userStore";

const MonthButton = styled.button`
  text-align: center;
  font-family: Pretendard, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  display: flex;
  height: 60px;
  padding: 20px;
  width: 104px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: ${(props) =>
    props.selected
      ? "var(--white-alpha-100, #fff)"
      : "var(--black-alpha-100, #000)"};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: ${(props) =>
    !props.selected
      ? "var(--black-alpha-100, #F6F7FA)"
      : "var(--bg-form, #2EC4B6)"};

  &:hover {
    background: #2ec4b6;
    color: #fff;
  }
`;

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function MonthNavigation() {
  const { selectedMonth, setSelectedMonth } = userStore();

  return (
    <Section>
      <div className="flex flex-wrap gap-4 justify-center">
        {MONTHS.map((element) => {
          return (
            <MonthButton
              key={element}
              selected={element === selectedMonth}
              onClick={() => {
                setSelectedMonth(element);
              }}
            >{`${element}월`}</MonthButton>
          );
        })}
      </div>
    </Section>
  );
}
