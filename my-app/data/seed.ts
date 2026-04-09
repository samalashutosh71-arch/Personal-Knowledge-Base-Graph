export type SeedNode = {
  id: string;
  title: string;
  note: string;
};

export type SeedEdge = {
  source: string;
  target: string;
  label: string;
};

export const seedNodes: SeedNode[] = [
  { id: '1', title: 'React', note: 'A JavaScript library for building UIs.' },
  { id: '2', title: 'Next.js', note: 'React framework with SSR & routing.' },
  { id: '3', title: 'TypeScript', note: 'Typed superset of JavaScript.' },
  { id: '4', title: 'State Management', note: 'Context, Zustand, Redux.' },
  { id: '5', title: 'Component Design', note: 'Reusable UI principles.' },
  { id: '6', title: 'Performance', note: 'Memoization, lazy loading.' },
  { id: '7', title: 'Testing', note: 'Unit, integration, e2e.' },
  { id: '8', title: 'CSS & Styling', note: 'Tailwind, CSS Modules.' },
];

export const seedEdges: SeedEdge[] = [
  { source: '2', target: '1', label: 'built on' },
  { source: '1', target: '3', label: 'pairs well' },
  { source: '1', target: '4', label: 'uses' },
  { source: '1', target: '5', label: 'guides' },
  { source: '2', target: '6', label: 'improves' },
  { source: '1', target: '7', label: 'requires' },
  { source: '1', target: '8', label: 'styled with' },
];
