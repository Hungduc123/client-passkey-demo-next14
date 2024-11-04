import React from "react";
import { useConnect, useAccount } from "sdk-passkeyring";

const ConnectPasskey = () => {
  const { onConnect, isConnected, onDisconnect } = useConnect();
  const account = useAccount() || {};
  const { address } = account;

  return (
    <div>
      {isConnected ? (
        <div>
          <h1>Connected</h1>
          <button
            onClick={() => {
              onConnect();
            }}
          >
            Address: {address}
          </button>
          <br />
          <button
            onClick={() => {
              onDisconnect();
            }}
          >
            disConnect
          </button>
        </div>
      ) : (
        <button onClick={onConnect}>Connect</button>
      )}
    </div>
  );
};

export default ConnectPasskey;
