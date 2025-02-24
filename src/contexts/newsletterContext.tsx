"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface INewsletter {
  id: string;
  title: string;
  sentAt: string;
  utmCampaign: string;
  utmSource: string;
  utmMedium: string;
  utmChannel: string;
  createdAt: string;
}

type NewsletterType = {
  newsletters: INewsletter[];
};

export const NewsletterContext = createContext({} as NewsletterType);

export const NewsletterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [newsletters, setNewsletter] = useState<INewsletter[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/news-letter`);
      const data = await response.json();
      setNewsletter(data);
    } catch {
      console.error("Error to fetch newsletters");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextStates = useMemo(
    () => ({
      newsletters,
    }),
    [newsletters]
  );

  return (
    <NewsletterContext.Provider value={contextStates}>
      {children}
    </NewsletterContext.Provider>
  );
};
