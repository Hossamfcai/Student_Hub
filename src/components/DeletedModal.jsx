import { Modal } from "@mantine/core";

export default function DeletedModal({ children, opened, close }) {
  return (
    <Modal opened={opened} onClose={close} withCloseButton={false} centered>
      {children}
    </Modal>
  );
}
