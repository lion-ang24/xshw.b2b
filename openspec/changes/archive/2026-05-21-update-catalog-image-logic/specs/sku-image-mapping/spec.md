## ADDED Requirements

### Requirement: SKU Specific Image Mapping in Data Layer
The JSON conversion script SHALL extract `imageUrl` fields per SKU and assign them directly to the `specs` array objects instead of the root product object.

#### Scenario: Script processes catalog
- **WHEN** the `convertXlsxToJson.cjs` script processes a row representing a product SKU
- **THEN** it sets the `imageUrl` property inside that specific SKU's object within the product's `specs` array.

### Requirement: Default Product Image in Subcategory List
The product list view SHALL display the first SKU's image as the default image for the product.

#### Scenario: Rendering product cards in subcategory
- **WHEN** a user navigates to a subcategory page
- **THEN** the product card displays the image from `product.specs[0].imageUrl`.
- **WHEN** `product.specs[0].imageUrl` is empty or missing
- **THEN** a default fallback image or no image is shown without crashing.

### Requirement: Dynamic Image Update in Product Details
The product detail view SHALL dynamically update the main product image based on the selected SKU.

#### Scenario: User selects a different SKU
- **WHEN** a user clicks on a different spec name in the product detail page (`Product.tsx`)
- **THEN** the main displayed image immediately switches to the `imageUrl` of the newly selected SKU.
