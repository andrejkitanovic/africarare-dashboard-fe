import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { WithChildren } from "utils/types";

const SplashScreenContext = createContext<any>(null);

const SplashScreenProvider: FC<WithChildren> = ({ children }) => {
  const [count, setCount] = useState<number>(0);
  let visible = count > 0;

  useEffect(() => {
    const splashScreen = document.getElementById("splash-screen");

    // Show SplashScreen
    if (splashScreen && visible) {
      splashScreen.classList.remove("hidden");

      return () => {
        splashScreen.classList.add("hidden");
      };
    }

    // Hide SplashScreen
    let timeout: ReturnType<typeof setTimeout>;
    if (splashScreen && !visible) {
      timeout = setTimeout(() => {
        splashScreen.classList.add("hidden");
      }, 0);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  return (
    <SplashScreenContext.Provider value={setCount}>
      {children}
    </SplashScreenContext.Provider>
  );
};

export const LayoutSplashScreen = ({ visible = true }) => {
  // Everything are ready - remove splashscreen
  const setCount = useContext(SplashScreenContext);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setCount((prev: number) => {
      return prev + 1;
    });

    return () => {
      setCount((prev: number) => {
        return prev - 1;
      });
    };
  }, [setCount, visible]);

  return null;
};

export default SplashScreenProvider;
