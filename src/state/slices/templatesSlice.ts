import { StateCreator } from 'zustand';
import Api from '../../client/Api';
import { Template } from '../../types/dto';

export interface TemplatesSlice {
  list: Template[];
  detail?: Template;
  loadTemplates: () => Promise<void>;
  loadTemplate: (id: string) => Promise<void>;
  instantiate: (templateId: string, boardId: string) => Promise<void>;
  purchase: (templateId: string) => Promise<void>;
}

export const createTemplatesSlice: StateCreator<TemplatesSlice> = (set) => ({
  list: [],
  detail: undefined,
  loadTemplates: async () => {
    const res = await Api.get('/templates', { params: { status: 'published' } });
    set({ list: res.data.templates });
  },
  loadTemplate: async (id) => {
    const res = await Api.get(`/templates/${id}`);
    set({ detail: res.data.template });
  },
  instantiate: async (templateId, boardId) => {
    await Api.post(`/templates/${templateId}/instantiate`, { boardId });
  },
  purchase: async (templateId) => {
    await Api.post('/purchases', { templateId });
  },
});
