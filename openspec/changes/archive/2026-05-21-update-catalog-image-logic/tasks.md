## 1. Data Layer Update

- [x] 1.1 Update `scripts/convertXlsxToJson.cjs` to extract `imageUrl` and place it under each SKU within the `specs` array.
- [x] 1.2 Run `node scripts/convertXlsxToJson.cjs` to generate the new `src/data/catalog.json`.
- [x] 1.3 Verify the structure of `src/data/catalog.json` reflects the changes.

## 2. UI Updates

- [x] 2.1 Update `src/pages/Subcategory/Subcategory.tsx` to display `product.specs[0]?.imageUrl` as the default cover image in the product card.
- [x] 2.2 Add state management (`selectedSpecImageUrl`) in `src/pages/Product/Product.tsx` to handle dynamic image updates.
- [x] 2.3 Bind `onClick` events on spec selection elements in `Product.tsx` to update the `selectedSpecImageUrl`.
- [x] 2.4 Verify dynamic image switching works as expected when selecting different SKUs on the `Product.tsx` page.
