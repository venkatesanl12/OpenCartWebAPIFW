
import { test, expect } from '@playwright/test';


//web app --> intercept the network calls and log them...
//** = wildcard -- matched all the URLs...


//intercept the network calls...
test('intercept and log requests', async ({ page }) => {

    await page.route('**/*', async (route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue(); //url1 -- capture and continue./..url2 -- capture -- contiue
    });

    //login steps web
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
});


//intercept with mocking:
//mocking: fake data/response

test('mock search data api', async ({ page }) => {
    let fakeProducts = [
        { name: 'Fake MacBook Pro', price: "$599" },
        { name: 'Fake iphone 20', price: "$999" }
    ];

    await page.route('**/index.php?route=product/search&search=macbook', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts),
        });
    });

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook');
    await page.pause();

    let fakeJson = await page.evaluate(async () => {
        let fakeRes = await fetch('https://abc.com/index.php?route=product/search&search=macbook')
        return await fakeRes.json();
    });

    console.log('fake json response:', fakeJson);
});





test('mock search page with fake HTML', async ({ page }) => {

    await page.route('**/index.php?route=product/search&search=macbook', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'text/html',
            body: `
                <html>
                <body>
                    <h1>Search Results</h1>
                    <div class="product-layout">
                        <h4><a href="#">Fake MacBook Pro</a></h4>
                        <p class="price">$599</p>
                    </div>
                    <div class="product-layout">
                        <h4><a href="#">Fake iPhone 20</a></h4>
                        <p class="price">$999</p>
                    </div>
                </body>
                </html>
            `,
        });
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');

    // now assert on the fake HTML
    const heading = await page.textContent('h1');
    expect(heading).toBe('Search Results');

    const products = await page.locator('.product-layout h4').allTextContents();
    expect(products).toEqual(["Fake MacBook Pro", "Fake iPhone 20"]);

    const prices = await page.locator('.price').allTextContents();
    expect(prices).toEqual(["$599", "$999"]);


    await page.pause();

});






// // 

// import { test, expect } from '@playwright/test';

// test('Verify login network request payload matches UI credentials', async ({ page }) => {
//   // 1. Define the test credentials
//   const testUsername = 'testuser@example.com';
//   const testPassword = 'SecurePassword123';
  
//   // Trackers to verify the API assertion actually executed
//   let loginApiIntercepted = false;

//   // 2. Setup the network interceptor BEFORE navigating or actions
//   // Replace '**/index.php?route=account/login' with your app's actual backend login endpoint URL/pattern
//   await page.route('**/index.php?route=account/login*', async (route) => {
//     const request = route.request();

//     // Only intercept the POST request containing the form data
//     if (request.method() === 'POST') {
//       loginApiIntercepted = true;
      
//       // Parse the request payload (works for JSON or Form URL-encoded data)
//       const postData = request.postData();
//       console.log('Intercepted Login Payload:', postData);

//       // Validate that the request parameters contain the entered username and password
//       // Note: Adjust the keys ('email', 'password') to match your backend's exact parameter keys
//       expect(postData).toContain(encodeURIComponent(testUsername));
//       expect(postData).toContain(encodeURIComponent(testPassword));
//     }

//     // Always continue the request so the user actually gets logged in on the UI
//     await route.continue();
//   });

//   // 3. UI Actions: Navigate to the login page
//   await page.goto('https://naveenautomationlabs.com');

//   // 4. UI Actions: Fill credentials and click submit
//   // (Using standard OpenCart selectors as an example)
//   await page.locator('#input-email').fill(testUsername);
//   await page.locator('#input-password').fill(testPassword);
//   await page.locator('input[type="submit"]').click();

//   // 5. Final Assertions
//   // Ensure the webpage completed its lifecycle navigation
//   await page.waitForURL('**/index.php?route=account/account'); 
  
//   // Hard guard to make sure your interceptor code block actually ran
//   expect(loginApiIntercepted).toBe(true);
// });

// //



