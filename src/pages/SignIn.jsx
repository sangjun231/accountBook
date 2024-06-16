import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userStore from "../zustand/userStore";
import { login } from "../lib/api/auth";
import {
  InputGroup,
  Label,
  Input,
  Button,
  ToggleButton,
  Container,
} from "../components/atoms/Sign/signAtom";

export default function SignIn() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = userStore();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!id || !password) {
      if (!toast.isActive("signInError")) {
        toast.error("아이디와 비밀번호를 모두 입력해주세요.", {
          toastId: "signInError",
        });
      }
      return;
    }
    const { userId, nickname, avatar } = await login({
      id,
      password,
    });
    toast.success("로그인이 완료되었습니다.");
    setUser({ userId, nickname, avatar });
    navigate("/");
  };

  return (
    <Container>
      <InputGroup>
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </InputGroup>
      <Button onClick={handleSignIn}>로그인</Button>
      <ToggleButton
        onClick={() => {
          navigate("/sign_up");
        }}
      >
        회원가입
      </ToggleButton>
    </Container>
  );
}
