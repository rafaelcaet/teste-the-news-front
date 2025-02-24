import { useContext } from "react";
import { NewsletterContext } from "../contexts/newsletterContext";

export const useNewsletter = () => useContext(NewsletterContext);
