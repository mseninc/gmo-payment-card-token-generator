import { CardInfo } from "@/types/card-info";
import { useEffect, useState } from "react";

export function useCardInfo() {
  const key = "CardInfo";
  const [current, setCurrent] = useState<CardInfo | null>(null); // null on loading

  useEffect(() => {
    const json = localStorage.getItem(key);
    if (json) {
      try {
        const cardInfo = JSON.parse(json);
        setCurrent(cardInfo as CardInfo);
      } catch (e) {
        console.warn(`invalid data (${key})`, e);
        localStorage.removeItem(key);
        setCurrent(null);
      }
    } else {
      setCurrent(null);
    }
  }, [setCurrent]);

  const update = (value: CardInfo) => {
    setCurrent(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { current, update };
}
