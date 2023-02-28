import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function ScrollTopProvider({ children }: { children: JSX.Element }) {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      const content = document.querySelector(".content");
      content?.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line
  }, []);

  return <>{children}</>;
}

export default ScrollTopProvider;
