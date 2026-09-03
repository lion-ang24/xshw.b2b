export interface ContentPage {
  id: string;
  slug: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title_zh: string;
  title_en: string;
  content_zh: string;
  content_en: string;
  date: string;
  status: string;
  created_at: string;
}

export interface Category {
  id: string;
  name_zh: string;
  name_en: string;
  sort_order: number;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name_zh: string;
  name_en: string;
  sort_order: number;
}

export interface Product {
  id: string;
  subcategory_id: string | null;
  category_id: string;
  brand_id: string | null;
  name_zh: string;
  name_en: string;
  status: string;
  created_at: string;
  // 關聯屬性
  product_attributes?: ProductAttribute[];
}

export interface ProductAttribute {
  id: string;
  product_id: string;
  sku: string;
  spec_name_zh: string;
  spec_name_en: string;
  spec_detail_zh: string | null;
  spec_detail_en: string | null;
  price: number;
  stock_qty: number;
  // 關聯圖片
  product_images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_attribute_id: string;
  image_url: string | null;
  file_extension: string | null;
  is_primary: boolean;
}

// 用於前端渲染的樹狀分類結構
export interface CategoryTree extends Category {
  subcategories: Subcategory[];
}
