import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { vehicles } from '../src/catalogue.js';

test('vehicle selection, filtering, bag persistence, and demo checkout', async () => {
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1050}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.TEST_BASE_URL||'http://localhost:5173');
 assert.equal(await page.locator('.product-card').count(),4);
 assert.equal(await page.locator('#model').isDisabled(),true);
 for(const [make, models] of Object.entries(vehicles)) {
 await page.selectOption('#make',make);
 assert.equal(await page.locator('#model option').count(),models.length+1);
 }
 await page.selectOption('#make','Tesla');await page.selectOption('#model','Model Y');await page.getByRole('button',{name:'Find my parts'}).click();
 assert.match(await page.locator('#vehicle-status').textContent(),/Tesla Model Y/);
 await page.locator('[data-category="charging"]').click();
 assert.equal(await page.locator('.product-card').count(),1);
 await page.getByRole('button',{name:'Add Type 2 charging cable to bag'}).click();
 await page.getByRole('button',{name:'Open shopping bag'}).click();
 assert.match(await page.locator('#cart-summary').textContent(),/€149/);
 await page.locator('[data-plus="cable"]').click();
 assert.match(await page.locator('#cart-summary').textContent(),/€298/);
 await page.getByRole('button',{name:'Preview checkout'}).click();
 assert.match(await page.locator('#checkout-message').textContent(),/no order has been placed/);
 await page.keyboard.press('Escape');
 await page.reload();assert.equal(await page.locator('#cart-count').textContent(),'2');
 await page.getByRole('button',{name:'Open shopping bag'}).click();
 await page.locator('[data-minus="cable"]').click();await page.locator('[data-minus="cable"]').click();
 assert.equal(await page.locator('#checkout').isDisabled(),true);
 await page.keyboard.press('Escape');
 await page.screenshot({path:'/tmp/evstra-desktop.png',fullPage:true});
 for(const width of [375,390,768]) {
 await page.setViewportSize({width,height:844});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true,`No horizontal overflow at ${width}px`);
 }
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'/tmp/evstra-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);
 } finally {await browser.close();}
});
