import { StateCreator } from 'zustand';
import Api from '../../client/Api';
import { AIThread, AIRunMessage } from '../../types/dto';

export interface AISlice {
  threads: AIThread[];
  lastRun?: AIRunMessage;
  runAI: (params: { boardId: string; model: string; include: string[] }) => Promise<AIRunMessage>;
  loadThreads: (boardId: string) => Promise<void>;
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
  threads: [],
  lastRun: undefined,
  runAI: async (params) => {
    const res = await Api.post('/ai/run', params);
    const message = res.data.message as AIRunMessage;
    set({ lastRun: message });
    return message;
  },
  loadThreads: async (boardId) => {
    const res = await Api.get('/ai/threads', { params: { boardId } });
    set({ threads: res.data.threads });
  },
});
