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
          className={`fixed w-screen h-screen left-0 top-0 z-50 ${
            backdrop ? "backdrop-blur" : ""
          }`}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="w-full h-full flex justify-center sm:items-center items-end"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
