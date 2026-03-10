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
const handleMenuClick = (menu) => {

  if (menu.path === "/community") {
    setShowInstallPopup(true);
    return;
  }

  navigate(menu.path);
};
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
      activeIcon: IoChatbubble,
      highlight: true
    },
    {
      label: "내정보",
      path: "/mypage",
      icon: IoPersonOutline,
      activeIcon: IoPerson
    }
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 68,
        paddingBottom: "env(safe-area-inset-bottom)",
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 1000
      }}
    >
{showInstallPopup && (

<div
style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.4)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:2000
}}
>

<div
style={{
background:"white",
borderRadius:20,
padding:28,
width:"90%",
maxWidth:340,
textAlign:"center"
}}
>

<div style={{fontSize:18,fontWeight:700,marginBottom:10}}>
LawHero 앱에서 이용 가능합니다
</div>

<div style={{fontSize:14,color:"#6B7280",marginBottom:24}}>
커뮤니티 기능은 앱에서 제공됩니다
</div>

<button
onClick={()=>{
window.open(
"https://play.google.com/store/apps/details?id=com.anonymous.lawhero"
);
}}
style={{
width:"100%",
padding:12,
marginBottom:10,
background:"#111827",
color:"white",
border:"none",
borderRadius:10,
fontWeight:600
}}
>
Google Play
</button>

<button
onClick={()=>{
window.open("https://apps.apple.com/");
}}
style={{
width:"100%",
padding:12,
background:"#F3F4F6",
border:"none",
borderRadius:10,
fontWeight:600
}}
>
App Store
</button>

<div
onClick={()=>setShowInstallPopup(false)}
style={{
marginTop:16,
fontSize:13,
color:"#9CA3AF",
cursor:"pointer"
}}
>
닫기
</div>

</div>

</div>

)}
      {menus.map((menu) => {

        const active = location.pathname.startsWith(menu.path);
        const Icon = active ? menu.activeIcon : menu.icon;

        return (
          <button
            key={menu.path}
           onClick={() => handleMenuClick(menu)}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              color: active ? "#4F46E5" : "#9CA3AF",
              transform: menu.highlight ? "translateY(-4px)" : "none"
            }}
          >

            <Icon size={menu.highlight ? 22 : 24} />

            <span
              style={{
                fontSize: 11,
                marginTop: 4,
                fontWeight: active ? 700 : 500
              }}
            >
              {menu.label}
            </span>

          </button>
        );

      })}

    </nav>
    
  );

}