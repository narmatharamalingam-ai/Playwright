# Execution Guide

How to install, configure and run the Playwright automation suite for
[saucedemo.com](https://www.saucedemo.com/).

---

## 1. Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | 18 LTS or newer (20/22 recommended) | `node -v` |
| npm | 9+ | ships with Node |
| OS | Windows / macOS / Linux | suite developed on Windows 11 |
| Network | outbound HTTPS to `www.saucedemo.com` | tests run against the live public site; there is no local app to start |

---

## 2. New Playwright project

```bash
npm init playwright
```

### Run everything

```bash
npx playwright test
```

### Run only the assignment suite (skips the scaffolding `example.spec.js`)

```bash
npx playwright test tests/Waracletest.spec.js
```

### Run a single test by name

```bash
npx playwright test -g "EndtoEndPositive for standard_user"
```

`-g` matches against the full test title, so it also works for the data-driven titles, e.g. `-g "loginflow for locked_out_user"`.

### Run a single file at a single line

```bash
npx playwright test tests/Waracletest.spec.js:96
```

### Useful flags

| Command | Purpose |
|---|---|
| `npx playwright test --headed` | watch the browser (this config is already headed — see §6) |
| `npx playwright test --debug` | step through with the Playwright Inspector |
| `npx playwright test --ui` | interactive UI mode / time-travel runner |
| `npx playwright test --workers=1` | run serially, useful when debugging flakiness |
| `npx playwright test --repeat-each=3` | flakiness hunt |
| `npx playwright test --list` | list the 13 collected tests without running them |
| `npx playwright test --trace on` | force trace recording |

### Record a new test against the app

```bash
npx playwright codegen https://www.saucedemo.com/
```

---

## 4. Reports and artifacts

```bash
npx playwright show-report
```

This serves `playwright-report/` on `http://localhost:9323`.

| Path | Contents |
|---|---|
| `playwright-report/` | HTML report (open with the command above) |
| `test-results/` | per-test screenshots, videos, traces on failure |

Both `playwright-report/` and `test-results/` are gitignored.

### Opening a trace

`trace: 'on'` is set, so every test produces a trace. Open one with:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

---

## 5. Test data

Credentials and product data are **not** environment variables — they live in three places:

| File | Feeds |
|---|---|
| `Utils/testdata.json` | the four data-driven `loginflow for <user>` tests |
| `Utils/endtoendtestdata.json` | the three data-driven `EndtoEndPositive for <user>` tests |
| `Utils/test-base.js` | the `testdataforbrowse` fixture used by the four standalone cart/checkout tests |

To add a new login scenario, append an object to `Utils/testdata.json` — a new test is generated automatically from the array. All users share the password `secret_sauce`, which is the published demo credential for saucedemo.com.

---