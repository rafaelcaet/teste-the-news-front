"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";
import toast from "react-hot-toast";
const topics = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Rewards", path: "/reward" },
  { name: "History", path: "/news-letters-history" },
];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [token, setToken] = useLocalStorage("token", "");
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !validateToken(token)) {
      toast.loading("Sessão expirada! ⏳", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#1E293B",
          color: "#F8FAFC",
          fontSize: "14px",
          fontWeight: "500",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      });
      router.push("/");
    }
  }, [router, token]);

  const validateToken = async (token: string) => {
    const response = await fetch("http://localhost:3000/user", {
      headers: { Authorization: token },
    });
    if (response.ok) return true;
    return false;
  };

  const handleClearToken = () => {
    setToken("");
    toast.error("Logout, até mais! 👋", {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#1E293B",
        color: "#F8FAFC",
        fontSize: "14px",
        fontWeight: "500",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      },
    });
    router.push("/");
  };

  const renderLinks = () => {
    return topics.map((topic, index) => (
      <Link key={index} href={topic.path} className="relative">
        <span
          className={`text-xl font-semibold cursor-pointer transition-colors ${
            pathname === topic.path
              ? "text-theNewsYellow border-b-2 border-theNewsYellow"
              : "hover:text-theNewsYellow"
          }`}
        >
          {topic.name}
        </span>
      </Link>
    ));
  };

  return (
    <header
      className={`${
        pathname === "/"
          ? "hidden"
          : "fixed border-b border-border top-0 w-full z-10 bg-background/95 py-6 dark:text-white text-black"
      }`}
    >
      <nav
        className={`${
          pathname === "/signin" || pathname === "/"
            ? "container flex items-center justify-center"
            : "container flex items-center justify-items-stretch font-medium"
        }`}
      >
        <Link
          href={`${
            pathname === "/signin" || pathname === "/" ? "/" : "/reward"
          }`}
          className="text-lg font-bold"
        >
          <p className="text-4xl font-bold antialiased">
            ☕ <span className="hover:underline">The News</span>
          </p>
        </Link>

        <div
          className={`${
            pathname === "/signin" || pathname === "/"
              ? "hidden"
              : "flex ml-80 gap-10"
          }`}
        >
          {renderLinks()}
        </div>
        <div
          className={`${
            pathname === "/signin" || pathname === "/"
              ? "hidden"
              : "flex ml-auto hover:text-theNewsYellow hover:cursor-pointer group"
          }`}
          onClick={() => {
            handleClearToken();
          }}
        >
          <LogOut size={20} />
          <span className="ml-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            Logout
          </span>
        </div>
      </nav>
    </header>
  );
}
