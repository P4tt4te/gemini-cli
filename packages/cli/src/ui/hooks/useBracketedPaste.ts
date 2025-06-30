/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

const ENABLE_BRACKETED_PASTE = '\x1b[?2004h';
const DISABLE_BRACKETED_PASTE = '\x1b[?2004l';

function isPowerShell(): boolean {
  // Check if the current shell is PowerShell
  console.log('SHELL:', process.env.SHELL);
  console.log('TERM_PROGRAM:', process.env.TERM_PROGRAM);
  console.log('PSModulePath:', process.env.PSModulePath);
  console.log('ComSpec:', process.env.ComSpec);
  console.log('WT_SESSION:', process.env.WT_SESSION);
  console.log('TERM:', process.env.TERM);
  return false;
}

/**
 * Enables and disables bracketed paste mode in the terminal.
 *
 * This hook ensures that bracketed paste mode is enabled when the component
 * mounts and disabled when it unmounts or when the process exits.
 */
export const useBracketedPaste = () => {
  const cleanup = () => {
    process.stdout.write(DISABLE_BRACKETED_PASTE);
  };

  useEffect(() => {
    // PowerShell does not support bracketed paste mode
    if (isPowerShell()) {
      return;
    }

    process.stdout.write(ENABLE_BRACKETED_PASTE);

    process.on('exit', cleanup);
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    return () => {
      cleanup();
      process.removeListener('exit', cleanup);
      process.removeListener('SIGINT', cleanup);
      process.removeListener('SIGTERM', cleanup);
    };
  }, []);
};
