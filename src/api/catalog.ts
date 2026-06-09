import { supabase } from './supabaseClient';
import { CategoryTree, Product, Category, Subcategory } from '../types/supabase';

/**
 * 撈取所有分類與子分類，並重構為樹狀結構
 */
export async function getCategoriesTree(): Promise<CategoryTree[]> {
  try {
    // 撈取主分類，並按排序欄位排序
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (catError) {
      console.error('撈取主分類失敗:', catError.message);
      return [];
    }

    // 撈取子分類，並按排序欄位排序
    const { data: subcategories, error: subError } = await supabase
      .from('subcategories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (subError) {
      console.error('撈取子分類失敗:', subError.message);
      return [];
    }

    // 組裝樹狀結構
    const tree: CategoryTree[] = (categories || []).map((cat: Category) => {
      const subs = (subcategories || []).filter(
        (sub: Subcategory) => sub.category_id === cat.id
      );
      return {
        ...cat,
        subcategories: subs,
      };
    });

    return tree;
  } catch (err) {
    console.error('建立分類樹狀結構發生未預期錯誤:', err);
    return [];
  }
}

/**
 * 依據主分類（與選填的子分類）撈取產品清單（包含規格與圖片關聯）
 * @param categoryId 主分類識別碼
 * @param subcategoryId 子分類識別碼（選填）
 */
export async function getProductsByCategory(
  categoryId: string,
  subcategoryId?: string
): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_attributes (
          *,
          product_images (
            *
          )
        )
      `)
      .eq('category_id', categoryId)
      .eq('status', 'active')
      .order('update_by', { ascending: false });

    if (subcategoryId) {
      query = query.eq('subcategory_id', subcategoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`撈取分類 [${categoryId}] 下的產品失敗:`, error.message);
      return [];
    }

    return (data || []) as Product[];
  } catch (err) {
    console.error('撈取分類產品時發生未預期錯誤:', err);
    return [];
  }
}

/**
 * 依據產品名稱（中/英文名稱）撈取單一產品詳細資料（包含規格與圖片關聯）
 * @param productName 產品中/英文名稱（由 URL 解碼而來）
 */
export async function getProductDetailsByName(productName: string): Promise<Product | null> {
  try {
    let { data: products, error: prodError } = await supabase
      .from('products')
      .select(`
        *,
        product_attributes (
          *,
          product_images (
            *
          )
        )
      `)
      .eq('name_zh', productName)
      .limit(1);

    if (!prodError && (!products || products.length === 0)) {
      const res = await supabase
        .from('products')
        .select(`
          *,
          product_attributes (
            *,
            product_images (
              *
            )
          )
        `)
        .eq('name_en', productName)
        .limit(1);
      products = res.data;
      prodError = res.error;
    }

    if (prodError) {
      console.error(`撈取產品 [${productName}] 詳細資料失敗:`, prodError.message);
      return null;
    }

    if (!products || products.length === 0) {
      return null;
    }

    return products[0] as Product;
  } catch (err) {
    console.error(`撈取產品 [${productName}] 詳細資料時發生未預期錯誤:`, err);
    return null;
  }
}
