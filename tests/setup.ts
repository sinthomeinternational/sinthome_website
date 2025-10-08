import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
vi.mock('astro:env/server', () => ({
  SECRET_KEY: 'test-secret-key',
  DATABASE_URL: 'sqlite::memory:',
}));

// Mock Astro runtime
vi.mock('astro:content', () => ({
  getCollection: vi.fn(() => Promise.resolve([])),
  getEntry: vi.fn(() => Promise.resolve({})),
}));

// Mock import.meta.env for tests
Object.defineProperty(global, 'importMeta', {
  value: {
    env: {
      BASE_URL: '/',
      MODE: 'test',
      DEV: false,
      PROD: true,
    },
  },
});

// Mock window.location for tests
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
  },
  writable: true,
});

// Mock console methods to reduce noise in tests
console.warn = vi.fn();
console.error = vi.fn();