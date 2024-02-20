import { auth } from '../firebase/firebase';
import { RecaptchaVerifier } from "firebase/auth";

export const generateCaptcha = (): void => {
  (window as any).recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
    size: 'invisible',
    callback: () => {
      // handle callback function
    },
  }, auth);
};
