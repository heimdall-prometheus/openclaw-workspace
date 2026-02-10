const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto('https://ms-dev.erikreisig.de/', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Get footer HTML structure
  const footerHTML = await page.evaluate(() => {
    const footer = document.querySelector('#footerColumns');
    if (!footer) return 'No #footerColumns found';
    // Get first-level children info
    const children = footer.children;
    let info = `#footerColumns role="${footer.getAttribute('role')}" children: ${children.length}\n`;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      info += `  [${i}] <${child.tagName} class="${child.className}" role="${child.getAttribute('role')}" id="${child.id}">\n`;
      // Check first child (headline)
      const headlines = child.querySelectorAll('.footer-column-headline');
      for (const h of headlines) {
        info += `    headline: id="${h.id}" role="${h.getAttribute('role')}" aria-expanded="${h.getAttribute('aria-expanded')}" tabindex="${h.getAttribute('tabindex')}"\n`;
      }
    }
    
    // Also check newsletter section
    const nlFooter = document.querySelector('#footerColumnsNewsletter');
    if (nlFooter) {
      info += `\n#footerColumnsNewsletter role="${nlFooter.getAttribute('role')}" children: ${nlFooter.children.length}\n`;
      for (let i = 0; i < nlFooter.children.length; i++) {
        const child = nlFooter.children[i];
        info += `  [${i}] <${child.tagName} class="${child.className}" role="${child.getAttribute('role')}">\n`;
        const headlines = child.querySelectorAll('.footer-column-headline');
        for (const h of headlines) {
          info += `    headline: id="${h.id}" role="${h.getAttribute('role')}" aria-expanded="${h.getAttribute('aria-expanded')}" tabindex="${h.getAttribute('tabindex')}"\n`;
        }
      }
    }
    
    return info;
  });
  
  console.log(footerHTML);
  
  // Also check all aria-expanded elements in footer
  const ariaExpanded = await page.evaluate(() => {
    const elements = document.querySelectorAll('footer [aria-expanded]');
    return Array.from(elements).map(el => ({
      tag: el.tagName,
      id: el.id,
      role: el.getAttribute('role'),
      tabindex: el.getAttribute('tabindex'),
      ariaExpanded: el.getAttribute('aria-expanded'),
      className: el.className.substring(0, 80)
    }));
  });
  
  console.log('\nAll footer aria-expanded elements:');
  console.log(JSON.stringify(ariaExpanded, null, 2));
  
  await context.close();
  await browser.close();
}

run().catch(console.error);
