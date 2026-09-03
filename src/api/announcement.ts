import { supabase } from './supabaseClient';
import { Announcement } from '../types/supabase';

/**
 * 撈取所有啟用的公告，並按日期降序排列
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      //.eq('status', 'active')
      .order('date', { ascending: false });

    if (error) {
      console.error('撈取公告清單失敗:', error.message);
      throw new Error(`撈取公告清單失敗: ${error.message}`);
    }

    return (data || []) as Announcement[];
  } catch (err) {
    console.error('撈取公告清單發生未預期錯誤:', err);
    throw err instanceof Error ? err : new Error('撈取公告清單發生未預期錯誤');
  }
}

/**
 * 依據 ID 撈取特定公告明細
 * @param id 公告識別碼
 */
export async function getAnnouncementById(id: string): Promise<Announcement | null> {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`撈取公告 [${id}] 失敗:`, error.message);
      throw new Error(`撈取公告 [${id}] 失敗: ${error.message}`);
    }

    return data as Announcement;
  } catch (err) {
    console.error(`撈取公告 [${id}] 發生未預期錯誤:`, err);
    throw err instanceof Error ? err : new Error(`撈取公告 [${id}] 發生未預期錯誤`);
  }
}

