# Bank of Canada - valet API testing

## Setup

1. Install Node.js latest version
2. Install Playwright latest version - https://playwright.dev/docs/intro
3. Run --npm install

## Run tests

To run all api tests use 'npx playwright test ./tests/averageConversionRate.test.ts' command

## How to open HTML report

'result.html' file will be generated after test run. You will find it in projectr root folder, can be opened in default browser

### Additional steps I would have take with more time

1. Install ESLint + Prettier + Husky pre-commit hook
2. Configure CI environment
3. Verify different response formats other than JSON - (XML and CSV)
4. Add test to verify that all dates in response are different
5. Add test to verify there is no 0 among conversion values in response
6. Add test to verify that number of records in response corresponds to a number of working days during the given period of time (number of weeks)
7. Add test to verify order directions (including negative scenario with invalid input parameter)
8. Add test to verify error if 'seriesName' parameter missing
