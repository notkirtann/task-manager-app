import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-[--color-bg]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}
