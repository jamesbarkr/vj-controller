import { useLocalStorage } from "@mantine/hooks";
import {
  CityState,
  LOCAL_CAMERA_CONTROLS_KEY,
  LOCAL_CITY_STATE_KEY,
  LOCAL_HIDE_VISUALS_KEY,
  LOCAL_SCALE_KEY,
  LOCAL_VIZ_KEY,
  orderedVizList,
  Visualization,
} from "../utils/constants";
import { Label, RangeSlider, ToggleSwitch } from "flowbite-react";
import { ChangeEvent } from "react";
import { getNextTransitionState } from "../utils/transitions";

const Dashboard = () => {
  const [enableCameraControls, toggleEnableCameraControls] = useLocalStorage({
    key: LOCAL_CAMERA_CONTROLS_KEY,
    defaultValue: false,
  });
  const [viz, setViz] = useLocalStorage<Visualization>({
    key: LOCAL_VIZ_KEY,
    defaultValue: Visualization.CUBE,
  });
  const [cityState, setCityState] = useLocalStorage<CityState>({
    key: LOCAL_CITY_STATE_KEY,
    defaultValue: CityState.ENTRY_WORMHOLE,
  });
  const [scale, setScale] = useLocalStorage({
    key: LOCAL_SCALE_KEY,
    defaultValue: 1,
  });
  const [hideVisuals, setHideVisuals] = useLocalStorage({
    key: LOCAL_HIDE_VISUALS_KEY,
    defaultValue: false,
  });

  const handleSetScale = (e: ChangeEvent<HTMLInputElement>) => {
    const newScale = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : 1;
    setScale(newScale);
  };

  const setNextTransitionState = () => {
    if (hideVisuals) {
      setHideVisuals(false)
    } else {
      const nextState = getNextTransitionState(viz, cityState);
      setViz(nextState.visualization)
      setCityState(nextState.cityState)
    }
  };

  const playFromStart = () => {
    setViz(orderedVizList[0])
    setCityState(CityState.ENTRY_WORMHOLE)
  }

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
      <ToggleSwitch
        checked={hideVisuals}
        label="Hide Visuals"
        onChange={() => { setHideVisuals(!hideVisuals) }}
      />
      <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={playFromStart}
        >
          Play from Start
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={setNextTransitionState}
        >
          Next
        </button>
      <div className="flex space-x-6">
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.DVD_BOUNCE)}
        >
          DVD Bounce
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.TILES)}
        >
          Tiles
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.MUON_SPIN)}
        >
          Muon Spin
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.BOWLING_CARPET)}
        >
          Bowling Carpet
        </button>
        <button
          className="py-4 px-8 bg-pink-500 text-white text-2xl rounded-sm flex items-center"
          onClick={() => setViz(Visualization.CITY)}
        >
          San Francisco
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
