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

function NavItem({ to, children }) {
  return (
    <Link to={to} className="text-white mx-2 no-underline hover:underline">
      {children}
    </Link>
  );
}

export default function Layout() {
  const { user, setUser } = userStore();
  const [loading, setLoading] = useState(true);
  const [leftTime, setLeftTime] = useState(null);
  const navigate = useNavigate();

  const mathMinute = Math.floor(leftTime / 60000);
  const mathSecond = Math.floor((leftTime % 60000) / 1000);

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

  // 첫 로그인 시 남은 시간이 안나옴 하지만 로그 아웃 시 잘 사라졌다가
  // 재 로그인 시 남은 시간이 다시 잘나옴...순서 문제 같은데 잘 모르겠음..
  // useEffect자체가 첫 로그인 시 작동을 안함 (콘솔로그 안나옴)
  // 로그아웃 후 새로고침하고 재 로그인 시 위 과정 반복
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar>
        <div className="flex align-center">
          <NavItem to="/">HOME</NavItem>
          <NavItem to="/profile">내 프로필</NavItem>
        </div>
        {leftTime !== null && leftTime > 0 ? (
          <div>{`계정 남은 시간 : ${mathMinute}분 ${mathSecond}초`}</div>
        ) : null}
        <div className="flex items-center">
          {user && (
            <>
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-white mr-4">{user.nickname}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-700"
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </Navbar>
      <div className="py-24 px-8">
        <Outlet />
      </div>
    </>
  );
}
