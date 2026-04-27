export const fetchProductDetails = async (productId: string) => {
  // [LEGACY DATA] 保留原本舊資料：FORCE D12 Brushless Impact Drill 頁面，未來串接 API 再將其刪除
  console.log('Fetching details for', productId);
  return Promise.resolve({
    id: productId,
    name: 'FORCE D12 BRUSHLESS IMPACT DRILL',
    brand: 'FORCE',
    sku: 'FRC-D12-PRO',
    description: 'Professional 20V Max 4.0Ah cordless drill with heavy-duty chuck and LED worklight.',
    images: ['https://loremflickr.com/400/400/drill'], // 這裡可以改為 assets/drill_1.png
    price: 245,
    features: [
      'Torque: 60 Nm',
      'Battery: 20V Li-Ion',
      'Weight: 1.5 kg'
    ],
    options: {
      battery: ['2.0Ah Compact', '4.0Ah High Capacity', '5.0Ah Extended'],
      config: ['Bare Tool', 'Kit with Charger']
    }
  });
};

export const fetchSubcategoryProducts = async (categoryId: string, subcategoryId: string) => {
  console.log('Fetching products for', categoryId, subcategoryId);
  return Promise.resolve([
    { id: 'frc-d12-pro', name: 'FORCE D12 Brushless Impact Drill', sku: 'FRC-D12-PRO', image: 'https://loremflickr.com/400/400/drill' },
    { id: '2', name: '震動電鑽', sku: 'DRL-VIB-01', image: 'https://loremflickr.com/400/400/drill' },
  ]);
};
