const axios = require('axios');

class AuthService {
    constructor(baseUri) {
        this.baseUri = baseUri;
        this.token = null;
        this.currentUser = null;
    }

    async register(username, email, password) {
        console.log("⚙️ Starting Puppeteer (Vercel Optimized)...");
        const puppeteer = require('puppeteer-core');
        const chromium = require('@sparticuz/chromium');

        let browser;
        try {
            // إعدادات خاصة لبيئة Vercel
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            });

            const page = await browser.newPage();

            console.log("🌍 Navigating to signup page...");
            await page.goto(`${this.baseUri}/signup.html`, { waitUntil: 'networkidle2', timeout: 30000 });

            console.log("✍️ Filling form...");
            await page.type('#name', username);
            await page.type('#email', email);
            await page.type('#password', password);

            console.log("🖱️ Clicking Signup...");
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }),
                page.click('#submit')
            ]);

            console.log("✅ Registration Successful");
            return { success: true };

        } catch (error) {
            console.error("Puppeteer Registration Error:", error.message);
            throw new Error(`Registration Failed: ${error.message}`);
        } finally {
            if (browser) await browser.close();
        }
    }

    async login(username, password) {
        // يمكن إضافة منطق الدخول هنا أيضاً باستخدام puppeteer-core بنفس الطريقة
        // للتبسيط حالياً سنتركها فارغة أو ننسخ المنطق عند الحاجة
        return { token: "dummy_token_vercel" };
    }
}

module.exports = AuthService;
