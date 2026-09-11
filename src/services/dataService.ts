import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured, handleFirestoreError, OperationType } from './firebase';
import { initialSiteData } from '../data/initialData';
import {
  SiteData,
  HeroContent,
  AboutContent,
  Modality,
  GalleryPhoto,
  VideoItem,
  Testimonial,
  OperatingHours,
  ContactInfo,
} from '../types';

const LOCAL_STORAGE_KEY = 'evolution_fitness_site_data_v2';
const LEGACY_STORAGE_KEY = 'evolution_fitness_site_data_v1';
const FIRESTORE_DOC_PATH = 'site_content/evolution_main';

let memoryCache: SiteData | null = null;

function safeSetLocalStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    // If quota exceeded, clean up legacy keys to recover storage space
    try {
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      localStorage.setItem(key, value);
      return true;
    } catch (retryErr) {
      console.warn(`[storage] localStorage quota exceeded; keeping updates in memory.`, retryErr);
      return false;
    }
  }
}

// Helper for local storage
export function getLocalData(): SiteData {
  if (memoryCache) {
    return memoryCache;
  }

  try {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) {
        const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacy) {
          raw = legacy;
          try {
            localStorage.removeItem(LEGACY_STORAGE_KEY);
          } catch {}
        }
      }
    } catch (readErr) {
      console.warn('Unable to read localStorage:', readErr);
    }

    if (!raw) {
      memoryCache = initialSiteData;
      safeSetLocalStorage(LOCAL_STORAGE_KEY, JSON.stringify(initialSiteData));
      return initialSiteData;
    }
    const parsed = JSON.parse(raw);
    
    // Auto-normalize legacy references to Studio in existing local storage
    if (parsed.contact && parsed.contact.studioName === 'Evolution Fitness Studio') {
      parsed.contact.studioName = 'Academia Evolution Fitness';
    }
    if (parsed.about && typeof parsed.about.story === 'string' && parsed.about.story.includes('Evolution Fitness Studio')) {
      parsed.about.story = parsed.about.story.replace(/Evolution Fitness Studio/g, 'Academia Evolution Fitness');
    }

    const merged: SiteData = {
      hero: { ...initialSiteData.hero, ...(parsed.hero || {}) },
      about: { ...initialSiteData.about, ...(parsed.about || {}) },
      modalities: parsed.modalities || initialSiteData.modalities,
      gallery: parsed.gallery || initialSiteData.gallery,
      videos: parsed.videos || initialSiteData.videos,
      testimonials: parsed.testimonials || initialSiteData.testimonials,
      hours: parsed.hours || initialSiteData.hours,
      contact: { ...initialSiteData.contact, ...(parsed.contact || {}) },
    };

    memoryCache = merged;
    return merged;
  } catch (e) {
    console.warn('Notice reading localStorage, falling back to safe initial data:', e);
    memoryCache = initialSiteData;
    return initialSiteData;
  }
}
export const getInitialOrStoredData = getLocalData;

function saveLocalData(data: SiteData) {
  memoryCache = data;
  safeSetLocalStorage(LOCAL_STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('evolution_data_updated', { detail: data }));
}

// Subscribe to site data changes
export function subscribeToSiteData(callback: (data: SiteData) => void): () => void {
  // If Firebase is configured and db is ready
  if (isFirebaseConfigured() && db) {
    const docRef = doc(db, 'site_content', 'evolution_main');
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data() as SiteData;
          callback({
            hero: { ...initialSiteData.hero, ...(remoteData.hero || {}) },
            about: { ...initialSiteData.about, ...(remoteData.about || {}) },
            modalities: remoteData.modalities || initialSiteData.modalities,
            gallery: remoteData.gallery || initialSiteData.gallery,
            videos: remoteData.videos || initialSiteData.videos,
            testimonials: remoteData.testimonials || initialSiteData.testimonials,
            hours: remoteData.hours || initialSiteData.hours,
            contact: { ...initialSiteData.contact, ...(remoteData.contact || {}) },
          });
        } else {
          // Document does not exist yet in Firestore, initialize it with confirmed data!
          setDoc(docRef, initialSiteData).catch((err) => {
            console.error('Failed to bootstrap initial Firestore data:', err);
          });
          callback(initialSiteData);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, FIRESTORE_DOC_PATH);
      }
    );

    return unsubscribe;
  }

  // Fallback to local storage reactive listener
  callback(getLocalData());

  const handleUpdate = (e: Event) => {
    const customEvent = e as CustomEvent<SiteData>;
    callback(customEvent.detail || getLocalData());
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === LOCAL_STORAGE_KEY) {
      callback(getLocalData());
    }
  };

  window.addEventListener('evolution_data_updated', handleUpdate);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('evolution_data_updated', handleUpdate);
    window.removeEventListener('storage', handleStorage);
  };
}

// Generic updater
async function updateSiteDataField<K extends keyof SiteData>(field: K, value: SiteData[K]): Promise<void> {
  const current = getLocalData();
  const updated: SiteData = {
    ...current,
    [field]: value,
  };

  saveLocalData(updated);

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, 'site_content', 'evolution_main');
      await setDoc(docRef, { [field]: value }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, FIRESTORE_DOC_PATH);
    }
  }
}

// Specific update methods
export async function updateHero(hero: HeroContent): Promise<void> {
  await updateSiteDataField('hero', hero);
}

export async function updateAbout(about: AboutContent): Promise<void> {
  await updateSiteDataField('about', about);
}

export async function updateModalities(modalities: Modality[]): Promise<void> {
  await updateSiteDataField('modalities', modalities);
}

export async function updateGallery(gallery: GalleryPhoto[]): Promise<void> {
  await updateSiteDataField('gallery', gallery);
}

export async function updateVideos(videos: VideoItem[]): Promise<void> {
  await updateSiteDataField('videos', videos);
}

export async function updateTestimonials(testimonials: Testimonial[]): Promise<void> {
  await updateSiteDataField('testimonials', testimonials);
}

export async function updateHours(hours: OperatingHours[]): Promise<void> {
  await updateSiteDataField('hours', hours);
}
export const updateOperatingHours = updateHours;

export async function updateContact(contact: ContactInfo): Promise<void> {
  await updateSiteDataField('contact', contact);
}
export const updateContactInfo = updateContact;

// Reset data to verified initial state
export async function resetToConfirmedData(): Promise<void> {
  saveLocalData(initialSiteData);
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, 'site_content', 'evolution_main');
      await setDoc(docRef, initialSiteData);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, FIRESTORE_DOC_PATH);
    }
  }
}

// Helper to downscale large photos for local fallback storage (keeping files ~100-200KB instead of 5-10MB)
function compressImageFile(file: File, maxDim = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };
    img.src = url;
  });
}

// Upload helper for photos, cover images, or video files
export async function uploadMediaFile(file: File, folder: 'gallery' | 'videos' | 'covers' | 'testimonials'): Promise<string> {
  if (isFirebaseConfigured() && storage) {
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `${folder}/${timestamp}_${safeName}`;
    const fileRef = ref(storage, storagePath);

    const snapshot = await uploadBytes(fileRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  // Fallback: If it is an image, downscale it to prevent exceeding localStorage quota
  if (file.type.startsWith('image/')) {
    try {
      return await compressImageFile(file);
    } catch {
      // Continue to direct reader if canvas compression fails
    }
  }

  // Fallback for videos or other media: convert to Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
