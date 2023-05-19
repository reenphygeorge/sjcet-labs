export interface CustomModalProps {
  modalHeading: string;
  label: string;
  value: string;
  buttonText: string;
  buttonDisable: boolean;
  buttonHandle: (event: MouseEvent<HTMLButtonElement>) => void;
  isOpen: boolean;
  onClose: () => void;
}

export interface ModalTexts {
  id: string;
}
