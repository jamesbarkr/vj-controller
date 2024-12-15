import { useEffect } from "react";
import { usePlaylistControls } from "./usePlaylistControls";

const QLC_WS_URL = "http://10.0.0.126:9999/qlcplusWS";

enum QLCPlusMessageType {
  FUNCTION = "FUNCTION",
}

enum QLCPlusFunction {
  RESTART = "0",
  BLACKOUT = "2",
  NEXT = "11",
  PRE = "283",
  POST = "284",
}

const useQlc = () => {
  const { nextViz, restart, toggleBlackout, preParty, postParty } =
    usePlaylistControls();

  useEffect(() => {
    const websocket = new WebSocket(QLC_WS_URL);

    websocket.onmessage = function (ev) {
      // Event data is formatted as follows: "QLC+API|API name|arguments"
      // Arguments vary depending on the API called

      const msgParams = ev.data.split("|");
      const msgType = msgParams[0];
      const msgData1 = msgParams[1] as QLCPlusFunction;

      if (msgType === QLCPlusMessageType.FUNCTION) {
        switch (msgData1) {
          case QLCPlusFunction.NEXT:
            nextViz();
            break;
          case QLCPlusFunction.RESTART:
            restart();
            break;
          case QLCPlusFunction.BLACKOUT:
            toggleBlackout();
            break;
          case QLCPlusFunction.PRE:
            preParty();
            break;
          case QLCPlusFunction.POST:
            postParty();
            break;
          default:
            console.log(msgData1);
            break;
        }
      }
    };

    return () => websocket.close();
  }, [nextViz, restart, toggleBlackout]);
};

export default useQlc;
