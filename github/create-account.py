#!/usr/bin/env python3
"""
Automated GitHub Account Creation for Heimdall
Uses Playwright for browser automation
"""
import asyncio
from playwright.async_api import async_playwright
import subprocess
import time

async def create_github_account():
    """Create GitHub account automatically."""
    
    # Account details
    email = "heim.dall@prometheus-labs.io"
    username = "heimdall-prometheus"
    password = "Heimdall2026!Prometheus#GitHubStrong"
    
    async with async_playwright() as p:
        print("🚀 Starting browser...")
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()
        
        try:
            print("📝 Opening GitHub signup...")
            await page.goto("https://github.com/signup")
            await page.wait_for_load_state("networkidle")
            
            print("✍️  Filling email...")
            email_input = await page.wait_for_selector('input[name="user[email]"]', timeout=10000)
            await email_input.fill(email)
            await page.click('button:has-text("Continue")')
            await asyncio.sleep(2)
            
            print("✍️  Filling password...")
            await page.fill('input[name="user[password]"]', password)
            await page.click('button:has-text("Continue")')
            await asyncio.sleep(2)
            
            print("✍️  Filling username...")
            await page.fill('input[name="user[login]"]', username)
            await page.click('button:has-text("Continue")')
            await asyncio.sleep(2)
            
            print("📧 Solving email verification...")
            # This needs email verification - we'll handle that separately
            
            print("✅ Account creation started!")
            print(f"📧 Check email: {email}")
            print(f"👤 Username: {username}")
            print(f"🔑 Password saved to credentials/github.md")
            
            # Save credentials
            with open("/home/reisig/.openclaw/workspace/credentials/github.md", "w") as f:
                f.write(f"""# GitHub Account - Heimdall

- **Username:** {username}
- **Email:** {email}
- **Password:** {password}
- **Profile:** https://github.com/{username}
- **Created:** {time.strftime('%Y-%m-%d %H:%M:%S UTC')}

## SSH Key
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAID3BVjfximt3JucrW0J2hj3seeUr6u6SSysPqR4b2080 heim.dall@prometheus-labs.io
```

## Next Steps After Email Verification:
1. Verify email
2. Login to GitHub
3. Add SSH key (Settings → SSH and GPG keys)
4. Test connection: `ssh -T git@github.com`
""")
            
            # Screenshot for debugging
            await page.screenshot(path="/home/reisig/.openclaw/workspace/github/signup-screenshot.png")
            print("📸 Screenshot saved: github/signup-screenshot.png")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            await page.screenshot(path="/home/reisig/.openclaw/workspace/github/error-screenshot.png")
            raise
        
        finally:
            await browser.close()


async def check_email_for_verification():
    """Check IMAP for GitHub verification email."""
    print("\n📧 Checking email for verification link...")
    
    # Use the working email credentials
    result = subprocess.run([
        "python3", "-c", """
import imaplib
import email
from email.header import decode_header

mail = imaplib.IMAP4_SSL('imap.ionos.de', 993)
mail.login('heim.dall@prometheus-labs.io', 'heimdallseinpasswortMitZahlen1337')
mail.select('INBOX')

# Search for GitHub emails
typ, data = mail.search(None, '(FROM "GitHub" UNSEEN)')
if data[0]:
    for num in data[0].split():
        typ, msg_data = mail.fetch(num, '(RFC822)')
        email_body = msg_data[0][1]
        msg = email.message_from_bytes(email_body)
        
        subject = decode_header(msg['Subject'])[0][0]
        if isinstance(subject, bytes):
            subject = subject.decode()
        
        print(f"📧 Found: {subject}")
        
        # Get body
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    body = part.get_payload(decode=True).decode()
                    # Find verification link
                    for line in body.split('\\n'):
                        if 'github.com' in line and 'verify' in line:
                            print(f"🔗 Verification link found!")
                            print(line)
        
mail.close()
mail.logout()
"""
    ], capture_output=True, text=True)
    
    print(result.stdout)
    if result.returncode != 0:
        print(f"❌ Email check error: {result.stderr}")


if __name__ == "__main__":
    print("🤖 Heimdall - GitHub Account Creation")
    print("=" * 50)
    
    # Run account creation
    asyncio.run(create_github_account())
    
    # Wait a bit for email
    print("\n⏳ Waiting 10 seconds for verification email...")
    time.sleep(10)
    
    # Check email
    asyncio.run(check_email_for_verification())
