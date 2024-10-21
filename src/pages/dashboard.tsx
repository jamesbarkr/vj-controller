import { useLocalStorage } from "@mantine/hooks";
import { ChangeEvent } from "react";

export const LOCAL_SPEED_KEY = "VJ-Controller__speed";

const Dashboard = () => {
  const [speed, setSpeed] = useLocalStorage({
    key: LOCAL_SPEED_KEY,
    defaultValue: 0,
  });

  const handleSetSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    const newSpeed = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : 0;

    setSpeed(newSpeed);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-indigo-900 space-y-10">
      <input type="number" value={speed} onChange={handleSetSpeed} />
    </div>
  );
};

export default Dashboard;
