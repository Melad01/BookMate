import { create } from "zustand";
import createStore from "react-auth-kit/createStore";
import Category from "./types/Category";
import Notification from "./types/Notification";

interface IUserData {
  email: string;
  uid: string;
}

interface AuthState {
  email: string | null;
  token: string | null;
  otp: string | null;
  setToken: (newToken: string) => void;
  setOtp: (newOtp: string) => void;
  setEmail: (newEmail: string) => void;
  clearToken: () => void;
  clearOtp: () => void;
  clearEmail: () => void;
}

export const store = createStore<IUserData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

interface BookQuery {
  genres?: Category[];
  searchText?: string;
}

interface BookQueryStore {
  bookQuery: BookQuery;
  setSearchText: (searchText: string) => void;
  setGenres: (genres: Category[]) => void;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAllAsRead: () => void;
}

export const useBookQueryStore = create<BookQueryStore>((set) => ({
  bookQuery: {},
  setSearchText: (searchText) => set(() => ({ bookQuery: { searchText } })),
  setGenres: (genres) =>
    set((store) => ({
      bookQuery: { ...store.bookQuery, genres, searchText: undefined },
    })),
}));

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => {
      const exists = state.notifications.some((n) => n.id === notification.id);
      if (!exists) {
        return {
          notifications: [
            ...state.notifications,
            { ...notification, isRead: false },
          ],
        };
      }
      return state;
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    })),
}));

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  otp: null,
  email: null,

  // Actions to set token and OTP
  setToken: (newToken) => set({ token: newToken }),
  setOtp: (newOtp) => set({ otp: newOtp }),
  setEmail: (newEmail) => set({ email: newEmail }),

  // Actions to clear token and OTP
  clearToken: () => set({ token: null }),
  clearOtp: () => set({ otp: null }),
  clearEmail: () => set({ email: null }),
}));
