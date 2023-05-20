/* eslint-disable import/extensions */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { CustomModalProps } from '@/types/customModal';
import CustomButton from './customButton';

const CustomModal = ({
  modalHeading,
  label,
  value,
  buttonText,
  buttonHandle,
  buttonDisable,
  isOpen,
  onClose,
}: CustomModalProps) => (
  <Modal isCentered size="xs" onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{modalHeading}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>{`${label}:  ${value}`}</Text>
        <CustomButton
          onClick={buttonHandle}
          innerText={buttonText}
          type="modal"
          disabled={buttonDisable}
        />
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default CustomModal;
