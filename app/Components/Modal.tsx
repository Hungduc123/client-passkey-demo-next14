import React from "react";
import { Modal } from "antd";

interface MyModalProps {
  title?: string;
  onClose: () => void;
  isOpen: boolean;
  content?: () => JSX.Element;
}

const MyModal: React.FC<MyModalProps> = ({
  title,
  onClose,
  isOpen,
  content,
}) => {
  return (
    <>
      <Modal
        forceRender={true}
        destroyOnClose={true}
        footer={null}
        title={title || "Title"}
        open={isOpen}
        onCancel={onClose}
        centered={true}
      >
        {content && content()}
      </Modal>
    </>
  );
};

export default MyModal;
