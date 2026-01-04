import { auth, db } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Mock Database of Users
const MOCK_USERS = [
  { username: "nitin", password: "123", email: "nitincsemmmut@gmail.com", studentId: 'nitin-deep' },
  { username: "visionx_user", password: "Password@123", email: "user@example.com", studentId: 'mock-1' },
  { username: "admin_master", password: "Admin#2025", email: "admin@example.com", studentId: 'mock-2' }
];

export const AuthService = {
  // Regex Patterns
  patterns: {
    phone: /^[6-9]\d{9}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/, // Relaxed for local demo (was 9+)
    username: /^.{3,}$/
  },

  // Google Login - Clean implementation
  async loginWithGoogle(): Promise<{ success: boolean; message: string; user?: any; isNewUser?: boolean }> {
    const provider = new GoogleAuthProvider();
    
    try {
      // Note: Ensure Google Auth is enabled in Firebase Console and local domain is white-listed.
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "students", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        localStorage.setItem('campus_connect_current_user_id', user.uid);
        return { success: true, message: "Login successful!", user: user, isNewUser: false };
      } else {
        return { success: true, message: "Please complete your profile.", user: user, isNewUser: true };
      }

    } catch (error: any) {
      console.error("Google Login Error:", error);
      
      // Provide more helpful error messages for debugging
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, message: "Login window was closed." };
      }
      if (error.code === 'auth/unauthorized-domain') {
        return { success: false, message: "Domain not authorized. Please check Firebase configuration." };
      }

      return { success: false, message: error.message || "Google Sign-In failed." };
    }
  },

  // Mock Login System
  login(usernameOrEmail: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(u => 
          (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
        );

        if (user) {
          localStorage.setItem('campus_connect_current_user_id', user.studentId);
          resolve({ success: true, message: "Login successful!", user });
        } else {
          resolve({ success: false, message: "Invalid username or password." });
        }
      }, 800); 
    });
  },

  checkUsernameAvailability(username: string): boolean {
    return !MOCK_USERS.some(u => u.username === username);
  },

  validatePhone(phone: string): boolean {
    return this.patterns.phone.test(phone);
  },

  validatePassword(password: string): boolean {
    return this.patterns.password.test(password);
  }
};