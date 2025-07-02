/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, afterEach } from 'vitest';
import { isPowerShell } from './detectTerminal.js';

describe('isPowerShell', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('returns true if PSModulePath is defined', () => {
    process.env = { ...originalEnv, PSModulePath: 'some/path' };
    expect(isPowerShell()).toBe(true);
  });

  it('returns false if PSModulePath is undefined', () => {
    process.env = { ...originalEnv, PSModulePath: undefined };
    expect(isPowerShell()).toBe(false);
  });

  it('returns true if PSModulePath is an empty string', () => {
    process.env = { ...originalEnv, PSModulePath: '' };
    expect(isPowerShell()).toBe(true);
  });
});
