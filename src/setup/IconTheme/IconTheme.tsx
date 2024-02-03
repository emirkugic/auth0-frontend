import { useEffect, useState, FC, useCallback } from "react";
import { DarkModeWrapperProps } from "../../types";

const DarkModeWrapper: FC<DarkModeWrapperProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  const updateIcon = useCallback(() => {
    const iconElement = document.getElementById("icon");

    if (iconElement && iconElement instanceof HTMLLinkElement) {
      iconElement.href = isDarkMode
        ? "/public/auth0-light.svg"
        : "/public/auth0-dark.svg";
    } else {
      console.error("Icon element not found or not of type HTMLLinkElement.");
    }
  }, [isDarkMode]);

  const handleChange = useCallback(() => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  }, []);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    darkModeMediaQuery.addEventListener("change", handleChange);

    updateIcon();

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, [handleChange, updateIcon]);

  return <>{children}</>;
};

export default DarkModeWrapper;
