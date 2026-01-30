#!/usr/bin/env python3
"""
Interactive GitHub Signup - Headful browser for manual CAPTCHA solving
"""
import asyncio
from playwright.async_api import async_playwright
import time

# Credentials
EMAIL = "heim.dall@prometheus-labs.io"
PASSWORD = "Heimdall-Prometheus-2026!"
USERNAME = "heimdall-prometheus"

async def main():
    print("🚀 Starting interactive GitHub signup...")
    
    async with async_playwright() as p:
        # Launch visible browser
        browser = await p.chromium.launch(
            headless=False,
            args=['--start-maximized']
        )
        
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 900},
            user_agent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        
        page = await context.new_page()
        
        print("📱 Opening GitHub signup page...")
        await page.goto('https://github.com/signup', wait_until='networkidle')
        await asyncio.sleep(2)
        
        # Fill email
        print(f"✉️ Entering email: {EMAIL}")
        email_input = page.locator('input[type="email"], input[name="email"], #email')
        await email_input.fill(EMAIL)
        await asyncio.sleep(1)
        
        # Try to continue (GitHub has step-by-step signup)
        continue_btn = page.locator('button:has-text("Continue"), button[type="submit"]').first
        if await continue_btn.is_visible():
            await continue_btn.click()
            await asyncio.sleep(2)
        
        # Fill password
        print("🔐 Entering password...")
        password_input = page.locator('input[type="password"], input[name="password"], #password')
        if await password_input.is_visible():
            await password_input.fill(PASSWORD)
            await asyncio.sleep(1)
            
            continue_btn = page.locator('button:has-text("Continue"), button[type="submit"]').first
            if await continue_btn.is_visible():
                await continue_btn.click()
                await asyncio.sleep(2)
        
        # Fill username
        print(f"👤 Entering username: {USERNAME}")
        username_input = page.locator('input[name="username"], input[id="login"], #login')
        if await username_input.is_visible():
            await username_input.fill(USERNAME)
            await asyncio.sleep(1)
            
            continue_btn = page.locator('button:has-text("Continue"), button[type="submit"]').first
            if await continue_btn.is_visible():
                await continue_btn.click()
                await asyncio.sleep(2)
        
        print("\n" + "="*60)
        print("⚠️  CAPTCHA TIME!")
        print("="*60)
        print("👆 Please solve the CAPTCHA in the browser window.")
        print("   The script will wait for you to complete it.")
        print("="*60 + "\n")
        
        # Wait for either success (redirect to welcome/verify page) or timeout
        print("⏳ Waiting for you to solve CAPTCHA and complete signup...")
        print("   (Will wait up to 5 minutes)")
        
        start_time = time.time()
        success = False
        
        while time.time() - start_time < 300:  # 5 minutes timeout
            current_url = page.url
            
            # Check for success indicators
            if any(x in current_url for x in ['/welcome', '/verify', '/new', 'github.com/' + USERNAME]):
                print(f"\n✅ SUCCESS! Redirected to: {current_url}")
                success = True
                break
            
            # Check for email verification page
            if 'verification' in current_url or 'verify' in current_url:
                print(f"\n📧 Email verification required!")
                print("   Check heim.dall@prometheus-labs.io for the verification code")
                success = True
                break
            
            await asyncio.sleep(2)
        
        if success:
            print("\n🎉 GitHub account creation initiated!")
            print("📸 Taking final screenshot...")
            await page.screenshot(path='/home/reisig/.openclaw/workspace/github/signup-success.png', full_page=True)
            
            # Keep browser open for a bit to verify/continue
            print("\n⏸️ Keeping browser open for 60 seconds for verification...")
            await asyncio.sleep(60)
        else:
            print("\n⏰ Timeout - please check the browser window manually")
            await page.screenshot(path='/home/reisig/.openclaw/workspace/github/signup-timeout.png', full_page=True)
        
        await browser.close()
        print("✅ Done!")

if __name__ == "__main__":
    asyncio.run(main())
