import { UserContext } from "@/contexts/userContext";
import { useContext } from "react";

export const useUsers = () => useContext(UserContext);
