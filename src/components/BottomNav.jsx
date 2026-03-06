import { useNavigate, useLocation } from "react-router-dom";
import {
  IoHomeOutline,
  IoHome,
  IoChatbubbleOutline,
  IoChatbubble,
  IoPersonOutline,
  IoPerson,
  IoPeopleOutline,
  IoPeople
} from "react-icons/io5";

export default function BottomNav() {

  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      label: "홈",
      path: "/home",
      icon: IoHomeOutline,
      activeIcon: IoHome
    },
    {
      label: "커뮤니티",
      path: "/community",
      icon: IoPeopleOutline,
      activeIcon: IoPeople
    },
    {
      label: "상담",
      path: "/chat",
      icon: IoChatbubbleOutline,
      activeIcon: IoChatbubble
    },
    {
      label: "내정보",
      path: "/mypage",
      icon: IoPersonOutline,
      activeIcon: IoPerson
    }
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 62,
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 100
      }}
    >
      {menus.map((menu) => {

        const active = location.pathname.startsWith(menu.path);
        const Icon = active ? menu.activeIcon : menu.icon;

        return (
          <div
            key={menu.path}
            onClick={() => navigate(menu.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              color: active ? "#222222" : "#B0B3BA"
            }}
          >
            <Icon size={24} />

            <div
              style={{
                fontSize: 11,
                marginTop: 2,
                fontWeight: 500
              }}
            >
              {menu.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}