import React from "react";
import { useConnect, useAccount } from "sdk-passkeyring";

const ConnectPasskey = () => {
  const { onConnect, isConnected, onDisconnect, onOpenWallet } = useConnect();
  const account = useAccount() || {};
  const { address } = account;

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div></div>
      {isConnected ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <h1>Connected</h1>
          <div>
            <button
              onClick={() => {
                onConnect();
              }}
            >
              Address: {address}
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                onDisconnect();
              }}
            >
              Disconnect
            </button>
          </div>

          <div>
            <button onClick={() => onOpenWallet("NFT")}>onOpenWallet</button>
          </div>
        </div>
      ) : (
        <button onClick={onConnect}>Connect</button>
      )}
    </div>
  );
};

export default ConnectPasskey;
