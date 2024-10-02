import Logo from "/logo.png";
import GoogleLogo from "/images/google-icon-logo.svg";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../common/Modal/Modal";
import { useAppContext } from "../../hooks/useAppContext";

const AuthModal = () => {
  const { isOpenAuthModal, closeAuthModal } = useAppContext();

  return (
    <Modal isOpen={isOpenAuthModal} onClose={closeAuthModal}>
      <div className="p-5 py-10 rounded shadow-lg sm:w-[500px] w-[300px] border-secondary-100 border bg-background-100">
        <div className="w-full flex justify-center">
          <img src={Logo} alt="Lucky Village Logo" />
        </div>
        <div className="flex justify-center mb-4 mt-10">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-center gap-3"
            onClick={() => {
              console.log("Google login clicked");
            }}
          >
            <img src={GoogleLogo} alt="Google Logo" className="w-6 h-6" />
            Continue with Google
          </Button>
        </div>
        <div className="relative my-5">
          <hr className="border-t-2 border-background-200" />
          <span className="absolute inset-0 flex justify-center items-center text-text-200/50 px-2 bg-background-100 rounded-md w-[fit-content] left-1/2 -translate-x-1/2 text-sm text-nowrap">
            Continue directly with
          </span>
        </div>
        <form>
          <div className="mb-4">
            <Input
              type="text"
              className="w-full"
              placeholder="Enter your email here"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              className="w-full"
              placeholder="Enter your password here"
            />
          </div>
        </form>
        <Button className="w-full">Continue</Button>
      </div>
    </Modal>
  );
};

export default AuthModal;
