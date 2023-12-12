import { useEffect, useState } from "react";
import style from "./style.module.scss";

const Client = () => {
  const [clientPosition, setPosition] = useState<Record<string, number>>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const timeIntervalId = setInterval(() => {
      setPosition((position) => ({
        top: position.top + 10,
        left: position.left + 10,
      }));
    }, 500);

    return () => {
      clearInterval(timeIntervalId);
    };
  }, []);

  return (
    <div
      style={{
        top: `${clientPosition.top}px`,
        left: `${clientPosition.left}px`,
      }}
      className={style.dot}
    />
  );
};

export default Client;
