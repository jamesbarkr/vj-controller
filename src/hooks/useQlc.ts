const QLC_WS_URL = "http://localhost:9999/qlcplusWS";

const useQlc = () => {
  const websocket = new WebSocket(QLC_WS_URL);

  websocket.onopen = () => {
    console.log("connected successfully");
  };

  websocket.onmessage = function (ev) {
    // Event data is formatted as follows: "QLC+API|API name|arguments"
    // Arguments vary depending on the API called

    const msgParams = ev.data.split("|");
    // TODO: hoist this up a level? maybe provide a context for all data?
    console.log(msgParams);
  };
};

export default useQlc;
