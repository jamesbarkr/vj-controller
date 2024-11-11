import { useLocalStorage } from "@mantine/hooks";
import {
  LOCAL_CAMERA_CONTROLS_KEY,
  LOCAL_SCALE_KEY,
  LOCAL_VIZ_KEY,
  Visualization,
} from "../utils/constants";
import {
  IconBrightnessUpFilled,
  IconCube,
  IconDeviceAudioTape,
  IconPlayCard,
  IconTree,
} from "@tabler/icons-react";
import { Label, RangeSlider, ToggleSwitch } from "flowbite-react";
import { ChangeEvent } from "react";

const Dashboard = () => {
  const [enableCameraControls, toggleEnableCameraControls] = useLocalStorage({
    key: LOCAL_CAMERA_CONTROLS_KEY,
    defaultValue: true,
  });
  const [viz, setViz] = useLocalStorage<Visualization>({
    key: LOCAL_VIZ_KEY,
    defaultValue: Visualization.CUBE,
  });
  const [scale, setScale] = useLocalStorage({
    key: LOCAL_SCALE_KEY,
    defaultValue: 1,
  });

  const handleSetScale = (e: ChangeEvent<HTMLInputElement>) => {
    const newScale = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : 1;
    setScale(newScale);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-indigo-900 space-y-10">
      <div className="flex flex-col items-center text-cyan-400">
        <h1 className="text-3xl">Current viz:</h1>
        <h1 className="text-8xl">{viz}</h1>
      </div>
      <ToggleSwitch
        checked={enableCameraControls}
        label="Camera controls"
        onChange={toggleEnableCameraControls}
      />
      <div className="flex space-x-6">
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.CUBE)}
        >
          Cube
          <IconCube className="ml-2" />
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.SPINNING_CUBE)}
        >
          Spinning Cube
          <IconPlayCard className="ml-2" />
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.LASERS)}
        >
          Lasers
          <IconBrightnessUpFilled className="ml-2" />
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.ASPEN_PLAYGROUND)}
        >
          Aspen Playground
          <IconTree className="ml-2" />
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.MUON_SPIN)}
        >
          Muon Spin
          <IconDeviceAudioTape className="ml-2" />
        </button>
      </div>
      <div>
        <div className="mb-1 block">
          <Label htmlFor="default-range" value="Default" />
        </div>
        <RangeSlider
          id="default-range"
          min={0.1}
          max={10}
          step={0.1}
          value={scale}
          onChange={handleSetScale}
        />
      </div>
    </div>
  );
};

export default Dashboard;
