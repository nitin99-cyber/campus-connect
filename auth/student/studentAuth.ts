import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const provider = new GoogleAuthProvider();

// 🔑 FORCE account chooser EVERY time
provider.setCustomParameters({
  prompt: "select_account",
  hd: "mmmut.ac.in",
});

const ALLOWED_DOMAIN = "mmmut.ac.in";

export async function studentGoogleLogin() {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  if (!user.email) {
    await signOut(auth);
    throw new Error("Email not available from Google account");
  }

  if (!user.email.endsWith(`@${ALLOWED_DOMAIN}`)) {
    await signOut(auth);
    throw new Error("Only MMMUT college email (@mmmut.ac.in) is allowed");
  }

  return user;
}
