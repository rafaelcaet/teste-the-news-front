"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IUser {
  id: string;
  email: string;
  lastLogin: string;
  dayStreak: number;
  createdAt: string;
  updatedAt: string;
}

type UserType = {
  users: IUser[];
};

export const UserContext = createContext({} as UserType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [token, setToken] = useLocalStorage("token", "");

  const fetchData = useCallback(async () => {
    if (!token) return;
    console.log("token", token);
    try {
      const response = await fetch(`http://localhost:3000/user`);

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch {
      console.error("Error to fetch users");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [fetchData, token]); // Vai rodar novamente se o token mudar

  const contextStates = useMemo(
    () => ({
      users,
    }),
    [users]
  );

  return (
    <UserContext.Provider value={contextStates}>
      {children}
    </UserContext.Provider>
  );
};
