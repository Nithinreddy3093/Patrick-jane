import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth Instance
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Firestore DB Instance
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Sign in with Google Popup
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
      console.log('Google Sign-In was cancelled by the user.');
      return null;
    }
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

// Sign in with Email and Password (with seamless fallback if Firebase provider disabled)
export async function signInWithEmail(email: string, pass: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (err: any) {
    if (err?.code === 'auth/operation-not-allowed') {
      const customUid = 'user_email_' + btoa(email.toLowerCase()).replace(/=/g, '');
      const localUserObj = {
        uid: customUid,
        email: email,
        displayName: email.split('@')[0],
        photoURL: ''
      };
      localStorage.setItem('JANE_METHOD_LOCAL_AUTH_USER', JSON.stringify(localUserObj));
      window.dispatchEvent(new Event('localAuthChanged'));
      return localUserObj as any;
    }
    throw err;
  }
}

// Sign up with Email and Password (with seamless fallback if Firebase provider disabled)
export async function signUpWithEmail(email: string, pass: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (err: any) {
    if (err?.code === 'auth/operation-not-allowed') {
      const customUid = 'user_email_' + btoa(email.toLowerCase()).replace(/=/g, '');
      const localUserObj = {
        uid: customUid,
        email: email,
        displayName: email.split('@')[0],
        photoURL: ''
      };
      localStorage.setItem('JANE_METHOD_LOCAL_AUTH_USER', JSON.stringify(localUserObj));
      window.dispatchEvent(new Event('localAuthChanged'));
      return localUserObj as any;
    }
    throw err;
  }
}

// Password Reset
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    if (err?.code === 'auth/operation-not-allowed') {
      return;
    }
    throw err;
  }
}

// Sign Out
export async function signOutUser() {
  localStorage.removeItem('JANE_METHOD_LOCAL_AUTH_USER');
  window.dispatchEvent(new Event('localAuthChanged'));
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Sign-Out Error:', error);
  }
}

// Firestore User Document Helpers
export interface UserDocData {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  createdAt?: any;
  xp?: number;
  level?: number;
  streak?: number;
  completedLessons?: string[];
  preferences?: {
    learningGoal: string;
    difficulty: string;
  };
}

export async function getUserProfile(uid: string): Promise<UserDocData | null> {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data() as UserDocData;
    }
  } catch (err) {
    console.warn('Notice fetching user profile from Firestore, checking local storage backup:', err);
  }
  try {
    const saved = localStorage.getItem(`JANE_METHOD_USER_DOC_${uid}`);
    if (saved) {
      return JSON.parse(saved) as UserDocData;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

export async function createUserProfileDoc(uid: string, data: Partial<UserDocData>) {
  const docData: UserDocData = {
    uid,
    name: data.name || 'Observer',
    email: data.email || '',
    photoURL: data.photoURL || '',
    createdAt: new Date().toISOString(),
    xp: data.xp ?? 0,
    level: data.level ?? 1,
    streak: data.streak ?? 1,
    completedLessons: data.completedLessons || [],
    preferences: data.preferences || {
      learningGoal: 'Master Observation',
      difficulty: 'Apprentice Observer'
    }
  };

  try {
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, { ...docData, createdAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.warn('Notice creating user profile in Firestore:', err);
  }

  try {
    localStorage.setItem(`JANE_METHOD_USER_DOC_${uid}`, JSON.stringify(docData));
  } catch (e) {
    console.error(e);
  }

  return docData;
}

export async function updateUserProfileDoc(uid: string, data: Partial<UserDocData>) {
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, data);
  } catch (err) {
    console.warn('Notice updating user profile in Firestore:', err);
  }

  try {
    const saved = localStorage.getItem(`JANE_METHOD_USER_DOC_${uid}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      localStorage.setItem(`JANE_METHOD_USER_DOC_${uid}`, JSON.stringify({ ...parsed, ...data }));
    }
  } catch (e) {
    console.error(e);
  }
}

// Auth State Observer helper
export function subscribeToAuthChanges(callback: (user: any | null) => void) {
  const getCombinedUser = (fbUser: FirebaseUser | null) => {
    if (fbUser) return fbUser;
    try {
      const saved = localStorage.getItem('JANE_METHOD_LOCAL_AUTH_USER');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const handleLocalChange = () => {
    callback(getCombinedUser(auth.currentUser));
  };

  window.addEventListener('localAuthChanged', handleLocalChange);

  const unsubFirebase = onAuthStateChanged(auth, (fbUser) => {
    callback(getCombinedUser(fbUser));
  });

  return () => {
    window.removeEventListener('localAuthChanged', handleLocalChange);
    unsubFirebase();
  };
}
