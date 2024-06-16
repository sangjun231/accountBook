import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../lib/api/auth";
import {
  InputGroup,
  Label,
  Input,
  Button,
  ToggleButton,
  Container,
} from "../components/atoms/Sign/signAtom";

export default function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (id.length < 4 || id.length > 10) {
      if (!toast.isActive("idError")) {
        toast.error("아이디는 4글자에서 10글자 이내로 입력해주세요!", {
          toastId: "idError",
        });
      }
      return;
    }
    if (password.length < 4 || password.length > 15) {
      if (!toast.isActive("passwordError")) {
        toast.error("패스워드는 4글자에서 15글자 이내로 입력해주세요!", {
          toastId: "passwordError",
        });
      }
      return;
    }
    if (nickname.length < 1 || nickname > 10) {
      if (!toast.isActive("nicknameError")) {
        toast.error("닉네임은 1글자에서 10글자 이내로 입력해주세요!", {
          toastId: "nicknameError",
        });
      }
      return;
    }
    const response = await register({ id, password, nickname });

    if (response) {
      toast.success("회원가입이 완료되었습니다.");
      navigate("/sign_in");
    }
  };

  return (
    <Container>
      <InputGroup>
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
      </InputGroup>
      <Button onClick={handleSignIn}>회원가입</Button>
      <ToggleButton
        onClick={() => {
          navigate("/sign_in");
        }}
      >
        돌아가기
      </ToggleButton>
    </Container>
  );
}
