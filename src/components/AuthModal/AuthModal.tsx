import React, { useState } from "react";

import Logo from "/logo.png";
import GoogleLogo from "/images/google-icon-logo.svg";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Modal from "../../common/Modal/Modal";
import { useAppContext } from "../../hooks/useAppContext";
import { signInWithEmail, signInWithGoogle } from "../../lib/firebase/auth";

const AuthModal = () => {
  const { isOpenAuthModal, closeAuthModal } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signInWithEmail(email, password);
      console.log("Signed in user:", user);
      closeAuthModal();
    } catch (error) {
      console.error("Error signing in with email:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in user with Google:", user);
      closeAuthModal();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

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
            onClick={handleGoogleSignIn}
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
        <form onSubmit={handleEmailSignIn}>
          <div className="mb-4">
            <Input
              type="text"
              className="w-full"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              className="w-full"
              placeholder="Enter your password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AuthModal;
