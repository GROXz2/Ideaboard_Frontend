import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

export const boardSchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const nodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: z.string(),
  preview: z.string().optional(),
  x: z.number(),
  y: z.number(),
  size: z.enum(['S', 'M', 'L']).optional(),
  content: z.object({ activeForPrompt: z.boolean().optional() }).optional(),
});

export const edgeSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
});

export const templateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  nodeId: z.string().optional(),
});

export const aiRunMessageSchema = z.object({
  id: z.string(),
  role: z.string(),
  content: z.string(),
  tokens_in: z.number(),
  tokens_out: z.number(),
  usd_cost: z.number(),
});
