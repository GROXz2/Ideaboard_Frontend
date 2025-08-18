export type User = {
  id: string;
  email: string;
};

export type Board = {
  id: string;
  title: string;
};

export type NodeKind = 'role' | 'objective' | 'context' | 'constraints' | 'note' | 'task';

export type Node = {
  id: string;
  title: string;
  kind: NodeKind;
  preview?: string;
  x: number;
  y: number;
  size?: 'S' | 'M' | 'L';
  content?: { activeForPrompt?: boolean };
};

export type Edge = {
  id: string;
  from: string;
  to: string;
};

export type Template = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type Task = {
  id: string;
  title: string;
  done: boolean;
  nodeId?: string;
};

export type AIThread = {
  id: string;
  boardId: string;
  lastMessage: string;
};

export type AIRunMessage = {
  id: string;
  role: string;
  content: string;
  tokens_in: number;
  tokens_out: number;
  usd_cost: number;
};
