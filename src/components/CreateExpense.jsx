import { Section } from "../pages/Home";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { postExpense } from "../lib/api/expense";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userStore from "../zustand/userStore";
import { toast } from "react-toastify";

const InputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-end;
`;

const InputGroupInline = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 120px;
  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const AddButton = styled.button`
  padding: 8px 20px;
  height: 34px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #0056b3;
  }
`;

export default function CreateExpense() {
  const [newDate, setNewDate] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { user, selectedMonth } = userStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const handleAddExpense = (e) => {
    e.preventDefault();

    const parsedAmount = parseInt(newAmount, 10);
    if (!newItem || !parsedAmount || !newDescription) {
      toast.error("유효한 항목, 금액, 내용을 입력해주세요.");
      return;
    }

    const newExpense = {
      id: uuidv4(),
      date: newDate,
      item: newItem,
      amount: parsedAmount,
      description: newDescription,
      createdBy: user.userId,
    };

    mutation.mutate(newExpense);

    setNewDate(`2024-${String(selectedMonth).padStart(2, "0")}-01`);
    setNewItem("");
    setNewAmount("");
    setNewDescription("");
  };

  useEffect(() => {
    setNewDate(`2024-${String(selectedMonth).padStart(2, "0")}-01`);
  }, [selectedMonth]);

  return (
    <Section>
      <form onSubmit={handleAddExpense}>
        <InputRow>
          <InputGroupInline>
            <label htmlFor="date">날짜</label>
            <input
              type="date"
              id="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
          </InputGroupInline>
          <InputGroupInline>
            <label htmlFor="item">항목</label>
            <input
              type="text"
              id="item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="지출 항목"
            />
          </InputGroupInline>
          <InputGroupInline>
            <label htmlFor="amount">금액</label>
            <input
              type="number"
              id="amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="지출 금액"
            />
          </InputGroupInline>
          <InputGroupInline>
            <label htmlFor="description">내용</label>
            <input
              type="text"
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="지출 내용"
            />
          </InputGroupInline>
          <AddButton type="submit">저장</AddButton>
        </InputRow>
      </form>
    </Section>
  );
}
