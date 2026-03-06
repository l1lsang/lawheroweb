import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function BottomNavLayout() {

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <div style={{ flex: 1, paddingBottom: 88 }}>
        <Outlet />
      </div>

      <BottomNav />

    </div>
  );

}