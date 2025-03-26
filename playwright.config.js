// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 400 * 1000,
  // timeout: 40 * 1000,

  expect: {
    timeout: 5 * 1000,
  },
  //expect timeout is for the assertions
  reporter: 'html',
  use: {
    browserName: `chromium`, //chrome
    // browserName: `firefox`, //firefox  
    // browserName: `webkit`, //safari
    headless: false,
    // slowMo: 50,
    // screenshot: `on`,
    // trace: `on`,
    // trace: 'retain-on-failure', //only create trace when test fails
    // video:'retain-on-failure', //record video when test fails
    },

  
});

