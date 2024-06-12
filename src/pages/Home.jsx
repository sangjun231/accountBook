import styled from "styled-components";
import { useState } from "react";
import MonthNavigation from "../components/MonthNavigation";
import ExpenseList from "../components/ExpenseList";
import CreateExpense from "../components/CreateExpense";

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

export default function Home({ user }) {
  const [month, setMonth] = useState(1);

  return (
    <Container>
      <MonthNavigation month={month} setMonth={setMonth} />
      <CreateExpense user={user} month={month} />
      <ExpenseList />
    </Container>
  );
}
