# @adyen/adyen-web

## 5.53.2

### Patch Changes

-   chore: fix ts config ([#2313](https://github.com/Adyen/adyen-web/pull/2313))

-   UX improvement for the `QRLoader` component - the QR loader shows amount and redirect button before the QR code image. ([#2359](https://github.com/Adyen/adyen-web/pull/2359))

## 5.53.1

### Patch Changes

-   Typescript: Fixed types for paymentMethodsConfiguration object ([#2363](https://github.com/Adyen/adyen-web/pull/2363))

## 5.53.0

### Minor Changes

-   Add `klarna_b2b` tx variant so that Billie (klarna_b2b) is supported. ([#2355](https://github.com/Adyen/adyen-web/pull/2355))

### Patch Changes

-   Fixes an issue with CtPOneTimePassword getting updates to the input element reference it relies upon ([#2353](https://github.com/Adyen/adyen-web/pull/2353))

-   Improvements: add `authorization_token` in the Klarna widget AdditionalDetails state data, so that we are aligned with the API specs. ([#2358](https://github.com/Adyen/adyen-web/pull/2358))

-   Fix Typescript definition for paymentMethodsConfiguration, allowing usage of Tx variants that are not defined in the codebase ([#2349](https://github.com/Adyen/adyen-web/pull/2349))

-   Populate data with initial values (empty strings) for 'ibanNumber' and 'ownerName' ([#2354](https://github.com/Adyen/adyen-web/pull/2354))

## 5.52.0

### Minor Changes

-   adds support for ANCV payment method ([#2293](https://github.com/Adyen/adyen-web/pull/2293))

### Patch Changes

-   fix: remove inline style applied to iframe ([#2343](https://github.com/Adyen/adyen-web/pull/2343))

-   fix: Clear timeouts on SecuredFieldsProvider when unmounting the component ([#2334](https://github.com/Adyen/adyen-web/pull/2334))

-   fix(personalDetails): classNameModifiers for dateOfBirth ([#2344](https://github.com/Adyen/adyen-web/pull/2344))

## 5.51.0

### Minor Changes

-   Add 'redirectFromTopWhenInIframe' config prop to allow top level redirect when Checkout loaded in an iframe ([#2325](https://github.com/Adyen/adyen-web/pull/2325))

## 5.50.1

### Patch Changes

-   Perform extra checks that a valid value has been passed when a dual branding selection is made ([#2321](https://github.com/Adyen/adyen-web/pull/2321))

## 5.50.0

### Minor Changes

-   Bancontact now returns paymentMethod.type 'bcmc' instead of 'scheme' ([#2286](https://github.com/Adyen/adyen-web/pull/2286))

-   Added environmentUrls parameter to Core, which allows PBL to use custom URLs for the API and assets ([#2262](https://github.com/Adyen/adyen-web/pull/2262))

### Patch Changes

-   For some storedCards it is not allowed to store the expiryDate, so when this info is not present in the storedCardData, we hide the readonly expiryDate field ([#2315](https://github.com/Adyen/adyen-web/pull/2315))

## 5.49.6

### Patch Changes

-   fixes bug where storedetails had state value of true by default without visually showing it ([#2307](https://github.com/Adyen/adyen-web/pull/2307))

## 5.49.5

### Patch Changes

-   Fixes postalCode having maxlength 0 ([#2305](https://github.com/Adyen/adyen-web/pull/2305))

## 5.49.4

### Patch Changes

-   Fixed e2e tests that were failing due to recent changes in how alt attributes are assigned ([#2289](https://github.com/Adyen/adyen-web/pull/2289))

-   Handling Safari's Responsive Design Mode to prevent undesired behaviour revolving around our "disable arrow keys on the iOS soft keyboard" feature ([#2299](https://github.com/Adyen/adyen-web/pull/2299))

-   Send 'do-not-track' as value for checkoutAttemptId when analytics is disabled ([#2290](https://github.com/Adyen/adyen-web/pull/2290))

-   Removes internal function renderFormField, improving typescript for all form fields ([#2298](https://github.com/Adyen/adyen-web/pull/2298))

-   Fixed bug where initial value for cvcPolicy &/or expiryDatePolicy could be overwritten if multiple card components on the same page ([#2297](https://github.com/Adyen/adyen-web/pull/2297))

## 5.49.3

### Patch Changes

-   fixes missing ResultCode typings ([#2287](https://github.com/Adyen/adyen-web/pull/2287))

-   fix issuer list logos not loading from resources url ([#2278](https://github.com/Adyen/adyen-web/pull/2278))

## 5.49.2

### Patch Changes

-   Add description for Trustly. ([#2276](https://github.com/Adyen/adyen-web/pull/2276))

## 5.49.1

### Patch Changes

-   fixes invalid HTML in payment method item and card labels ([#2270](https://github.com/Adyen/adyen-web/pull/2270))

## 5.49.0

### Minor Changes

-   Adding timeout mechanism for Click to Pay to display Card component in case it does not initialize within 5 seconds ([#2265](https://github.com/Adyen/adyen-web/pull/2265))

### Patch Changes

-   Fix Core `update` should also update payment methods list. ([#2266](https://github.com/Adyen/adyen-web/pull/2266))

-   fixes aria-labelledby in paymentMethodItem ([#2261](https://github.com/Adyen/adyen-web/pull/2261))

-   Fix Klarna widget blocks drop-in to be clickable on loaded. ([#2258](https://github.com/Adyen/adyen-web/pull/2258))

## 5.48.0

### Minor Changes

-   Securefields label now is decorative div element ([#2256](https://github.com/Adyen/adyen-web/pull/2256))

-   Stop implicitly associating labels with the elements they label ([#2243](https://github.com/Adyen/adyen-web/pull/2243))

### Patch Changes

-   Refactor the SRPanel type definition ([#2217](https://github.com/Adyen/adyen-web/pull/2217))

-   Alt tags for card brands now use readable values ([#2256](https://github.com/Adyen/adyen-web/pull/2256))

-   Autofocus on the QR code subtitle on mounted. ([#2246](https://github.com/Adyen/adyen-web/pull/2246))

## 5.47.0

### Minor Changes

-   A11y improvements: add form instruction to better assist cognitively impaired shoppers. ([#2241](https://github.com/Adyen/adyen-web/pull/2241))

    By default, we always show the instruction on top of the payment form, this can be turned off by setting `showFormInstruction=false`.

## 5.46.1

### Patch Changes

-   Reverted `threeDSServerTransID` check on challenge completion ([#2231](https://github.com/Adyen/adyen-web/pull/2231)) ([#2238](https://github.com/Adyen/adyen-web/pull/2238))

-   Adjusted amount and currency values in the telemetry event ([#2219](https://github.com/Adyen/adyen-web/pull/2219))

-   Adds new translations strings ([#2239](https://github.com/Adyen/adyen-web/pull/2239))

-   Report to sr panel on payment status for the drop-in and QR code ([#2236](https://github.com/Adyen/adyen-web/pull/2236))

    -   Remove the duplicated sr panel which has the same id

## 5.46.0

### Minor Changes

-   Added isExpress configuration to PayPal component ([#2220](https://github.com/Adyen/adyen-web/pull/2220))

## 5.45.0

### Minor Changes

-   feature: adds address lookup functionality ([#2151](https://github.com/Adyen/adyen-web/pull/2151))

### Patch Changes

-   Change meal voucher label _Pin_ to _Security code_ ([#2210](https://github.com/Adyen/adyen-web/pull/2210))

-   Better regex & error message for validation/formatting of Brazilian post codes. ([#2211](https://github.com/Adyen/adyen-web/pull/2211))

    We now allow a hyphen between the 5th & 6th digits

-   Fix inconsistency displaying custom brand logo for the gift card payment ([#2215](https://github.com/Adyen/adyen-web/pull/2215))

-   Fixes issue which ApplePay crashes Drop-in when initialized within iframe ([#2212](https://github.com/Adyen/adyen-web/pull/2212))

-   Removing tsconfig stripInternals from lib package ([#2213](https://github.com/Adyen/adyen-web/pull/2213))

## 5.44.0

### Minor Changes

-   Feeds the count-down information to the SR panel and refactor the Countdown to a functional component with A11y reporter custom hook. ([#2182](https://github.com/Adyen/adyen-web/pull/2182))

-   Adding support for the payment method Cash App Pay ([#2105](https://github.com/Adyen/adyen-web/pull/2105))

### Patch Changes

-   Prevent double readout of PM names, by a screenreader, in Dropin. ([#2206](https://github.com/Adyen/adyen-web/pull/2206))

-   Fixes for/id in the label of the select field pointing to the outer div instead of the correct combobox input ([#2205](https://github.com/Adyen/adyen-web/pull/2205))
