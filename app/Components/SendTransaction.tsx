import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

function SendTransaction() {
  const { sendTransactionAsync } = useSendTransaction();

  return (
    <button
      onClick={async () => {
        const tx = await sendTransactionAsync({
          to: "0x109105af554c00c2c419686c9e969e1fb2b6beba",
          value: parseEther("0.001"),
        });
        console.log("🚀 ~ SendTransaction ~ tx:", tx);
      }}
    >
      Send transaction
    </button>
  );
}

export default SendTransaction;
