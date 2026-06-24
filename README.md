# OpenCart Web Framework (Playwright)

This is a professional test automation framework designed to verify the functionality of the OpenCart e-commerce platform. It is built using **Playwright**, **TypeScript**, and follows the **Page Object Model (POM)** design pattern to ensure scalability and maintainability.

## 🚀 Overview

The framework focuses on modularity and data-driven testing, allowing the same test logic to be executed across multiple data sets provided via CSV, Excel, or JSON files.

### Key Features
- **Page Object Model (POM)**: Decouples UI locators from test logic.
- **Data-Driven Testing (DDT)**: Support for `.xlsx`, `.csv`, and `.json` data sources.
- **Custom Fixtures**: Simplified page object instantiation using Playwright fixtures.
- **Allure Reporting**: High-quality visual reporting for test execution and failure analysis.
- **Cross-Browser Support**: Capable of running tests across Chromium, Firefox, and WebKit.

## 🏗️ Project Architecture

```text
├── src
│   ├── data          # Test data files (Excel, CSV, JSON)
│   ├── fixtures      # Playwright fixtures for Page Object injection
│   ├── pages         # Page Object classes (BasePage, HomePage, etc.)
│   └── utils         # Helpers for parsing data files (ExcelHelper, CsvHelper, etc.)
├── tests             # Test suites (.spec.ts files)
│   └── api           # API-specific tests
├── playwright.config.ts # Playwright configuration
└── package.json      # Project dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd opencart_webframework_pw
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

The following scripts are available in `package.json`:

| Command | Description |
| :--- | :--- |
| `npm test` | Runs all tests in headless mode |
| `npm run test:headed` | Runs tests with the browser UI visible (ideal for debugging) |
| `npm run test:chrome` | Runs tests specifically for the Chromium project |

## 📊 Reporting

This project uses **Allure** for comprehensive test reporting.

1. **Generate and Open Report**:
   ```bash
   npm run allure:report
   ```
2. **Clean Reports**:
   ```bash
   npm run allure:clean
   ```

## 📂 Data Management

Tests can be driven by data located in `src/data/`. The framework includes utilities in `src/utils/` to handle:
- **Excel (`.xlsx`)**: Via `ExcelHelper.ts`
- **CSV (`.csv`)**: Via `CsvHelper.ts`
- **JSON (`.json`)**: Via `JsonHelper.ts`

## 📝 License
This project is licensed under the ISC License.
