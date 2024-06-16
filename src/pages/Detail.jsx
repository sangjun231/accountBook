import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpense, putExpense, deleteExpense } from "../lib/api/expense";
import userStore from "../zustand/userStore";
import { toast } from "react-toastify";
import {
  InputGroup,
  Label,
  Input,
  Container,
} from "../components/atoms/Sign/signAtom";

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.danger ? "#cc0000" : "#0056b3")};
  }
`;

export default function Detail() {
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const { user } = userStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: selectedExpense,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses", id],
    queryFn: getExpense,
  });

  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      navigate("/");
      // 캐시 처리 시 필요한 코드
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      // 아래 코드가 주석이여야 오류가 안나옴.. 순서 바꿔도 이상하네..
      // queryClient.invalidateQueries(["expenses"]);
      navigate("/");
    },
  });

  const editExpense = () => {
    if (!item || !amount || !description) {
      if (!toast.isActive("updateError")) {
        toast.error("유효한 항목, 금액, 내용을 입력해주세요.", {
          toastId: "updateError",
        });
      }
      return;
    }

    const newExpense = {
      id,
      date,
      item,
      amount: parseInt(amount, 10),
      description,
      createdBy: user.userId,
    };

    toast.success("수정이 완료되었습니다.");
    mutationEdit.mutate(newExpense);
    navigate("/");
  };

  const handleDelete = () => {
    toast.success("삭제가 완료되었습니다.");
    mutationDelete.mutate(id);
  };

  useEffect(() => {
    if (selectedExpense) {
      setDate(selectedExpense.date);
      setItem(selectedExpense.item);
      setAmount(selectedExpense.amount);
      setDescription(selectedExpense.description);
    }
  }, [selectedExpense]);

  return (
    <Container>
      <InputGroup>
        <Label htmlFor="date">날짜</Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="item">항목</Label>
        <Input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="지출 항목"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="amount">금액</Label>
        <Input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="지출 금액"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="description">내용</Label>
        <Input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="지출 내용"
        />
      </InputGroup>
      <div className="flex justify-around">
        <Button onClick={editExpense}>수정</Button>
        <Button danger="true" onClick={handleDelete}>
          삭제
        </Button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
        >
          뒤로 가기
        </button>
      </div>
    </Container>
  );
}
