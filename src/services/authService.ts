import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';
import { AdminUser } from '../types';

const LOCAL_ADMIN_KEY = 'evolution_fitness_admin_session';

export function getLocalAdminSession(): AdminUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export const getCurrentUser = getLocalAdminSession;

export function setLocalAdminSession(user: AdminUser | null) {
  if (user) {
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
  }
  window.dispatchEvent(new CustomEvent('evolution_auth_changed', { detail: user }));
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  const cleanEmail = email.trim().toLowerCase();

  // If Firebase is configured, authenticate through Firebase Auth
  if (isFirebaseConfigured() && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
    const user = userCredential.user;
    const adminUser: AdminUser = {
      uid: user.uid,
      email: user.email || cleanEmail,
      displayName: user.displayName || 'Administrador Evolution',
      role: 'admin',
    };
    setLocalAdminSession(adminUser);
    return adminUser;
  }

  // Preview / Development Mode Authentication
  // Validates standard admin credential format.
  if (cleanEmail === 'evolutionfitnesstresrios@gmail.com' || cleanEmail.includes('admin')) {
    if (password.length >= 6) {
      const devAdmin: AdminUser = {
        uid: 'admin-preview-uid',
        email: cleanEmail,
        displayName: 'Administrador (Evolution Fitness)',
        role: 'admin',
      };
      setLocalAdminSession(devAdmin);
      return devAdmin;
    } else {
      throw new Error('A senha deve conter pelo menos 6 caracteres.');
    }
  }

  // If other email in dev mode
  if (password.length >= 6) {
    const devAdmin: AdminUser = {
      uid: `admin-${Date.now()}`,
      email: cleanEmail,
      displayName: 'Administrador',
      role: 'admin',
    };
    setLocalAdminSession(devAdmin);
    return devAdmin;
  }

  throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured() && auth) {
    await fbSignOut(auth);
  }
  setLocalAdminSession(null);
}

export function subscribeToAuth(callback: (user: AdminUser | null) => void): () => void {
  // If Firebase is configured
  if (isFirebaseConfigured() && auth) {
    const unsubscribe = fbOnAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const adminUser: AdminUser = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Administrador',
          role: 'admin',
        };
        setLocalAdminSession(adminUser);
        callback(adminUser);
      } else {
        setLocalAdminSession(null);
        callback(null);
      }
    });
    return unsubscribe;
  }

  // Fallback to local session listener
  callback(getLocalAdminSession());

  const handleAuthChange = (e: Event) => {
    const customEvent = e as CustomEvent<AdminUser | null>;
    callback(customEvent.detail ?? null);
  };

  window.addEventListener('evolution_auth_changed', handleAuthChange);
  return () => {
    window.removeEventListener('evolution_auth_changed', handleAuthChange);
  };
}
export const onAuthChange = subscribeToAuth;
