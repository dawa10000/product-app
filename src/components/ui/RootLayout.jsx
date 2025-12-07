import { Outlet } from "react-router";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className="px-20">
        <Outlet />
      </main>
    </div>
  );
}
