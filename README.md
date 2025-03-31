# 💼 **Lucanet Automation Project**

This is a UI automation project built with **[Playwright](https://playwright.dev/)** and **TypeScript**, focusing on validating key user flows and content on the public **Lucanet** website.

---

## 🔍 **Features Covered**

- ✅ Homepage content checks (hero section, nav menu, footer)
- 🌐 Language switching validation (English / German)
- 🔗 Navigation via **Solutions** dropdown
- 📩 Request demo form:
  - ✍️ Form field validation
  - 📬 Email domain restriction

---

## 🧰 **Tech Stack**

- 🧪 Playwright
- ⌨️ TypeScript
- 🧾 HTML Reporter

## 🚀 **Getting Started**

### 📦 **Install dependencies**
npm install


### 🧪 **Run tests**

npx playwright test


### 📊 **View test report**

npx playwright show-report


---

## 📝 **Notes**

- 🛡️ Form submission is safely mocked via `page.route()` to prevent real backend requests.
- ✅ Tests run on **Chromium**, **Firefox**, and **WebKit**.
- ⚠️ On older macOS (e.g. macOS 12 on M1), WebKit tests may fail due to a frozen browser version.  
  ✅ After updating macOS and reinstalling Playwright, WebKit tests should work properly.
