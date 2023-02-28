import { useCallback, useState } from "react";

interface Props<T extends {}> {
  initialState?: boolean;
  initialContext?: T;
  options?: {
    /* should match Dialog's transition time in order to prevent context flash on Dialog's close */
    contextResetDelay?: number;
  };
}

function useModal<T extends {}>({
  initialState = false,
  initialContext,
  options,
}: Props<T> = {}) {
  const [isOpen, setIsOpen] = useState(initialState);
  const [context, setContext] = useState(initialContext);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    // 225ms is default Dialog transition time
    setTimeout(() => {
      setContext(undefined);
    }, options?.contextResetDelay || 225);
  }, [options?.contextResetDelay]);

  const handleOpen = useCallback((ctx?: T) => {
    setIsOpen(true);
    setContext(ctx);
  }, []);

  return {
    isOpen,
    setIsOpen,
    toggle,
    handleClose,
    handleOpen,
    context,
    setContext,
  };
}

export { useModal };
