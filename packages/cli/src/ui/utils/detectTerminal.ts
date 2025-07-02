/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Determines whether the current process is running inside a PowerShell environment.
 *
 * This function checks for the presence of the 'PSModulePath' environment variable,
 * which is typically set by PowerShell and PowerShell Core. If this variable exists,
 * it is a strong indicator that the process was launched from PowerShell.
 *
 * @returns {boolean} True if running in PowerShell, false otherwise.
 */
export function isPowerShell(): boolean {
  return process.env.PSModulePath !== undefined;
}
