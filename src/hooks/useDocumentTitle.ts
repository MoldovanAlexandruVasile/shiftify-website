import { useEffect } from "react";

// The browser tab's title, kept in step with the page's language.
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
