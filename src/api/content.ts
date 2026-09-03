import { supabase } from './supabaseClient';
import { ContentPage } from '../types/supabase';

/**
 * 依據 slug 撈取靜態頁面內容
 * @param slug 頁面識別碼 (如 about, privacy, terms, shipping)
 */
export async function getContentPage(slug: string): Promise<ContentPage | null> {
  try {
    const { data, error } = await supabase
      .from('content_pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`撈取靜態頁面 [${slug}] 失敗:`, error.message);
      return null;
    }

    return data as ContentPage;
  } catch (err) {
    console.error(`撈取靜態頁面 [${slug}] 發生未預期錯誤:`, err);
    return null;
  }
}
