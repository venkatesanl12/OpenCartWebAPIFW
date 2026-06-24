import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterAccountPage extends BasePage {

    // Private Locators for Register Account form
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly passwordInput: Locator;
    private readonly passwordConfirmInput: Locator;
    private readonly newsletterYesRadio: Locator;
    private readonly newsletterNoRadio: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly registerPageHeading: Locator;
    private readonly privacyPolicyLink: Locator;
    private readonly loginPageLink: Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize locators using getByRole and getByPlaceholder as per SKILL guidelines
        this.registerPageHeading = page.getByRole('heading', { name: 'Register Account', level: 1 });
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.telephoneInput = page.getByPlaceholder('Telephone');
        this.passwordInput = page.getByPlaceholder('Password').first();
        this.passwordConfirmInput = page.getByPlaceholder('Password Confirm');
        this.newsletterYesRadio = page.getByRole('radio', { name: 'Yes' });
        this.newsletterNoRadio = page.getByRole('radio', { name: 'No' });
        this.privacyPolicyCheckbox = page.locator('input[type="checkbox"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });
        this.loginPageLink = page.getByRole('link', { name: 'login page' });
    }

    // Navigation method
    async goToRegisterPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/register');
    }

    // Getter method for page title
    async getRegisterPageTitle(): Promise<string> {
        return await this.page.title();
    }

    // Getter method to verify page heading is visible
    async isRegisterPageHeadingVisible(): Promise<boolean> {
        return await this.registerPageHeading.isVisible();
    }

    // Individual action methods - one per user action
    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async fillTelephone(telephone: string): Promise<void> {
        await this.telephoneInput.fill(telephone);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async fillPasswordConfirm(passwordConfirm: string): Promise<void> {
        await this.passwordConfirmInput.fill(passwordConfirm);
    }

    async selectNewsletterYes(): Promise<void> {
        await this.newsletterYesRadio.click();
    }

    async selectNewsletterNo(): Promise<void> {
        await this.newsletterNoRadio.click();
    }

    async isNewsletterNoSelected(): Promise<boolean> {
        return await this.newsletterNoRadio.isChecked();
    }

    async acceptPrivacyPolicy(): Promise<void> {
        await this.privacyPolicyCheckbox.check();
    }

    async isPrivacyPolicyChecked(): Promise<boolean> {
        return await this.privacyPolicyCheckbox.isChecked();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickPrivacyPolicyLink(): Promise<void> {
        await this.privacyPolicyLink.click();
    }

    async clickLoginPageLink(): Promise<void> {
        await this.loginPageLink.click();
    }

    // Composite action method - combines multiple steps
    async registerWithAllDetails(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string,
        subscribeNewsletter: boolean = false
    ): Promise<void> {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillTelephone(telephone);
        await this.fillPassword(password);
        await this.fillPasswordConfirm(password);
        
        if (subscribeNewsletter) {
            await this.selectNewsletterYes();
        }
        
        await this.acceptPrivacyPolicy();
        await this.clickContinue();
    }

    // Composite action for minimal registration
    async registerWithBasicDetails(
        firstName: string,
        lastName: string,
        email: string,
        telephone: string,
        password: string
    ): Promise<void> {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillTelephone(telephone);
        await this.fillPassword(password);
        await this.fillPasswordConfirm(password);
        await this.acceptPrivacyPolicy();
        await this.clickContinue();
    }
}

