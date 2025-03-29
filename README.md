# Playwright AUTOMATION
# UI and API automation tests

## TO PREPARE TESTS
### Check if the test data is still valid
Since https://gorest.co.in/ is a live public website with many people using it, the records are being updated regularly. This means the data in the test-data directory may be stale. The records in the JSON may have been deleted already. So go to https://gorest.co.in/public/v2/users to update the test data before running tests.

## TO RUN TESTS

```
npm run test
```

## TO RUN TEST IN AZURE REMOTELY

```
npx playwright test tests/api_gorest.spec.js --config=playwright.service.config.js --workers=1

-or-

npm run testazure
```