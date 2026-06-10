import { getProductDetailsByName } from './catalog';

export const fetchProductDetails = async (productId: string) => {
  const decodedName = decodeURIComponent(productId);
  const dbProduct = await getProductDetailsByName(decodedName);
  if (!dbProduct) {
    return null;
  }

  // 將資料對應（Mapping）至原本的前端介面格式
  const specs = (dbProduct.product_attributes || []).map(attr => {
    // 尋找此規格的主圖，若無則拿第一張圖，再無則為空
    const primaryImage = attr.product_images?.find(img => img.is_primary);
    const imageUrl = primaryImage?.image_url || attr.product_images?.[0]?.image_url || '';

    return {
      sku: attr.sku,
      specName: {
        'zh-TW': attr.spec_name_zh,
        'en-US': attr.spec_name_en
      },
      specDetail: {
        'zh-TW': attr.spec_detail_zh || '',
        'en-US': attr.spec_detail_en || ''
      },
      price: Number(attr.price),
      stockQty: attr.stock_qty,
      imageUrl: imageUrl
    };
  });

  const firstSpec = dbProduct.product_attributes?.[0];
  const firstSpecImage = firstSpec?.product_images?.find(img => img.is_primary);
  const defaultImageUrl = firstSpecImage?.image_url || firstSpec?.product_images?.[0]?.image_url || '';

  return {
    id: dbProduct.id,
    categoryId: dbProduct.category_id,
    name: {
      'zh-TW': dbProduct.name_zh,
      'en-US': dbProduct.name_en
    },
    brand: dbProduct.brand_id || '',
    imageUrl: defaultImageUrl,
    specs: specs
  };
};

export const fetchSubcategoryProducts = async (_categoryId: string, _subcategoryId: string) => {
  return Promise.resolve([]);
};

