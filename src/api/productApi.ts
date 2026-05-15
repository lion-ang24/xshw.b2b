import catalogData from '../data/catalog.json';

export const fetchProductDetails = async (productId: string) => {
  const decodedName = decodeURIComponent(productId);
  const product = catalogData.products.find((p: any) => typeof p.name === 'string' ? p.name === decodedName : p.name['zh-TW'] === decodedName);
  if (!product) {
    // [LEGACY DATA] fallback
    return Promise.resolve({
      id: productId,
      name: 'FORCE D12 BRUSHLESS IMPACT DRILL',
      brand: 'FORCE',
      sku: 'FRC-D12-PRO',
      description: 'Professional 20V Max 4.0Ah cordless drill with heavy-duty chuck and LED worklight.',
      imageUrl: 'https://loremflickr.com/400/400/drill',
      specs: [
        {
          sku: 'FRC-D12-PRO-20',
          specName: '2.0Ah Compact',
          specDetail: '2.0Ah Compact Bare Tool / Kit with Charger',
          price: 245
        },
        {
          sku: 'FRC-D12-PRO-40',
          specName: '4.0Ah High Capacity',
          specDetail: '4.0Ah High Capacity Bare Tool / Kit with Charger',
          price: 285
        },
        {
          sku: 'FRC-D12-PRO-50',
          specName: '5.0Ah Extended',
          specDetail: '5.0Ah Extended Bare Tool / Kit with Charger',
          price: 320
        }
      ]
    });
  }
  return Promise.resolve(product);
};

export const fetchSubcategoryProducts = async (_categoryId: string, _subcategoryId: string) => {
  return Promise.resolve([]);
};
