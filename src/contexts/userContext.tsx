"use client";
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

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/user`);
      const data = await response.json();
      setUsers(data);
    } catch {
      console.error("Error to fetch users");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
