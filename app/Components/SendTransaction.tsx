import { useSendTransaction } from "wagmi";
import { isAddress, parseEther } from "viem";
import MyModal from "@/app/Components/Modal";
import { useState } from "react";
import { Button, Input } from "antd";
import useNotification from "@/app/hooks/useNotification";

function SendTransaction() {
  const { sendTransactionAsync } = useSendTransaction();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {openNotification} = useNotification();

  const ContentModal = () => {
    const [toAddress, setToAddress] = useState<`0x${string}`>("0x");
    const [value, setValue] = useState("");
    const onSend = async () => {
      const tx = await sendTransactionAsync({
        to: toAddress,
        value: parseEther(value),
      });
      openNotification({title: "Send Transaction successfully", content: `Hash:${tx}`});

    };
    return (
      <div className="flex flex-col gap-4">
        <h1>Send Coin</h1>
        <Input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value as `0x${string}`)}
        />
        <Input
          type="text"
          placeholder="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="primary" onClick={onSend}
        disabled={!isAddress(toAddress) || value === ""}
        >Send</Button>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={async () => {
          setIsModalOpen(true);
        }}
      >
        Send transaction
      </button>
      <MyModal
        title="Send transaction"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={ContentModal}
      />
    </>
  );
}

export default SendTransaction;
