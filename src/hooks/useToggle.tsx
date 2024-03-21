import { useState, useCallback } from "react";

const useToggle = (): [boolean, () => void] => {
  const [value, setValue] = useState(false);

  const toggleValue = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggleValue];
};

export default useToggle;
