import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  message: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  backdropBlur?: boolean;
}

export default function ConfirmModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
  backdropBlur,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel!} backdropBlur={backdropBlur}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
        <p className="text-gray-500 my-4 text-sm leading-relaxed">{message}</p>
        <div className="flex gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex-1 py-2 bg-gray-100 rounded text-sm cursor-pointer"
            >
              취소
            </button>
          )}
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-black text-white rounded text-sm cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
