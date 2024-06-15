import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../lib/api/auth";
import userStore from "../zustand/userStore";
import { toast } from "react-toastify";

const Navbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100% - 2rem);
  top: 0;
  z-index: 1000;
  max-width: 1240px;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  color: white;
  margin-right: 20px;
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const PageContainer = styled.div`
  padding: 6rem 2rem;
`;

export default function Layout() {
  const { user, setUser } = userStore();
  const [loading, setLoading] = useState(true);
  const [leftTime, setLeftTime] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("로그아웃 되었습니다.");
    setUser(null);
    setLeftTime(null);
    localStorage.clear();
    navigate("/sign_in");
  };

  const RemainingTime = () => {
    const tokenTime = localStorage.getItem("tokenTime");
    if (!tokenTime) return;

    const at = new Date(tokenTime).getTime();
    const time = at + 30 * 60 * 1000;
    const now = new Date().getTime();
    const leftTime = time - now;
    setLeftTime(leftTime > 0 ? leftTime : 0);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getUserInfo(token)
        .then((userInfo) => {
          if (userInfo) {
            setUser({
              userId: userInfo.id,
              nickname: userInfo.nickname,
              avatar: userInfo.avatar,
            });

            RemainingTime();
            const interval = setInterval(RemainingTime, 1000);
            return () => clearInterval(interval);
          } else {
            handleLogout();
          }
        })
        .catch((error) => {
          toast.error("Error fetching user info:", error);
          handleLogout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [setUser]);

  useEffect(() => {
    if (leftTime === 0) {
      handleLogout();
    }
  }, [leftTime]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar>
        <NavItems>
          <NavItem to="/">HOME</NavItem>
          <NavItem to="/profile">내 프로필</NavItem>
        </NavItems>
        {leftTime !== null && leftTime > 0 ? (
          <div>
            계정 남은 시간 : {Math.floor(leftTime / 60000)}분{" "}
            {Math.floor((leftTime % 60000) / 1000)}초
          </div>
        ) : null}
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserProfile>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}
