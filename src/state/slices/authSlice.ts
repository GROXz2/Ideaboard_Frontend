import { StateCreator } from 'zustand';
import Api, { setAuthToken } from '../../client/Api';
import { User } from '../../types/dto';

export interface AuthSlice {
  user?: User;
  token?: string;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  me: () => Promise<void>;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: undefined,
  token: undefined,
  login: async (email, password) => {
    const res = await Api.post('/auth/login', { email, password });
    setAuthToken(res.data.token);
    set({ token: res.data.token, user: res.data.user });
  },
  signup: async (email, password) => {
    const res = await Api.post('/auth/signup', { email, password });
    setAuthToken(res.data.token);
    set({ token: res.data.token, user: res.data.user });
  },
  me: async () => {
    const res = await Api.get('/me');
    set({ user: res.data.user });
  },
  logout: () => {
    setAuthToken(undefined);
    set({ user: undefined, token: undefined });
  },
});
