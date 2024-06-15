import { useEffect, useState } from "react";
import styled from "styled-components";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";
import userStore from "../zustand/userStore";
import { toast } from "react-toastify";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export default function Profile() {
  const { user, setUser } = userStore();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    if (!nickname || !avatar) {
      if (!toast.isActive("updateError")) {
        toast.error("닉네임과 아바타를 수정하고 업데이트 해주세요!", {
          toastId: "updatedError",
        });
      }
      return;
    }

    const formData = new FormData();

    formData.append("nickname", nickname);
    formData.append("avatar", avatar);

    const response = await updateProfile(formData);

    if (response.success) {
      setUser({
        ...user,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate("/");
    }
  };

  const handleAvatarChange = (e) => {
    const imgFile = e.target.files[0];

    setAvatar(imgFile);
    setAvatarPreview(URL.createObjectURL(imgFile));
  };

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  return (
    <Container>
      <h2 className="mb-4">프로필 수정</h2>
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          placeholder={nickname}
          value={nickname}
          minLength="1"
          maxLength="10"
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="avatar">아바타 이미지</label>
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </InputGroup>
      <div className="flex gap-20">
        <Button onClick={handleUpdateProfile}>프로필 업데이트</Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          돌아가기
        </Button>
      </div>
      <h2 className="text-xl">아바타 미리보기</h2>
      {avatarPreview && (
        <img
          className="w-32 h-32 rounded-full items-center"
          src={avatarPreview}
          alt="아바타 미리보기"
        />
      )}
    </Container>
  );
}
