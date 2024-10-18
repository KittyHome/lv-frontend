import { PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  backdrop?: boolean;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  onClose,
  backdrop = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed w-screen h-screen left-0 top-0 z-50 flex sm:items-center items-end justify-center ${
            backdrop ? "backdrop-blur" : ""
          }`}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="w-full"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
