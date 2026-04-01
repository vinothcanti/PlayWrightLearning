import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

<<<<<<< HEAD
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: true
  },

  // Run only Chrome
=======
  // Parallel execution
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed test in Jenkins / CI
  retries: process.env.CI ? 2 : 0,

  // Run one worker in CI for stability
  workers: process.env.CI ? 1 : undefined,

  // HTML report
  reporter: 'html',

  use: {
    // Collect trace only on first retry
    trace: 'on-first-retry',

    // Run in headless mode for Jenkins
    headless: true,

    // Increase action timeout
    actionTimeout: 30000,

    // Page load timeout
    navigationTimeout: 60000,

    // Maximize browser window
    viewport: null,

    launchOptions: {
      args: ['--start-maximized']
    }
  },

  // Run only in Chrome
>>>>>>> f01d981665f6c9cc6a6d12a77e65186306f534c4
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
<<<<<<< HEAD
      },
    }
  ],
});
=======
      }
    }
  ]
});
>>>>>>> f01d981665f6c9cc6a6d12a77e65186306f534c4
