import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../lib/api/expense";
import userStore from "./../zustand/userStore";
import { toast } from "react-toastify";
import monthStore from "../zustand/monthStore";
import { Section } from "./atoms/Sign/signAtom";

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  span {
    font-size: 16px;
    color: #333;
  }

  span:last-child {
    font-weight: bold;
    color: #007bff;
    flex-shrink: 0;
  }
`;

const ExpenseDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    &:first-child {
      margin-bottom: 5px;
      color: #666;
      font-size: 14px;
    }

    &:last-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }
`;

export default function ExpenseList() {
  const navigate = useNavigate();
  const { user } = userStore();
  const { selectedMonth } = monthStore();

  const {
    data: expenses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expense"],
    queryFn: getExpenses,
  });

  const filteredExpenses = expenses.filter(
    (expense) => new Date(expense.date).getMonth() + 1 === selectedMonth
  );

  const handleItemClick = (expense) => {
    if (expense.createdBy !== user.userId) {
      toast.error("본인의 지출만 수정 할 수 있습니다.");
    } else {
      navigate(`/detail/${expense.id}`);
    }
  };

  return (
    <Section>
      <div className="flex flex-col gap-3">
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            onClick={() => {
              handleItemClick(expense);
            }}
          >
            <ExpenseDetails>
              <span>{expense.date}</span>
              <span>{`${expense.item} - ${expense.description} (${expense.createdBy})`}</span>
            </ExpenseDetails>
            <span>{expense.amount.toLocaleString()} 원</span>
          </ExpenseItem>
        ))}
      </div>
    </Section>
  );
}
