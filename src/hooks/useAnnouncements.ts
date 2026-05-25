import { useState, useMemo } from 'react';
import { Announcement, mockAnnouncements, LocalizedString } from '../data/mockAnnouncements';
import { useTranslation } from './useTranslation';

// Helper to resolve localized string or generic string
const resolveLocalized = (value: string | LocalizedString, lang: 'zh-TW' | 'en-US'): string => {
  if (typeof value === 'object') {
    return value[lang] || value['zh-TW'];
  }
  return value;
};

// Override the Announcement interface for components to only see string values
export interface ResolvedAnnouncement extends Omit<Announcement, 'title' | 'content'> {
  title: string;
  content: string;
}

export const useAnnouncements = () => {
  const { language } = useTranslation();
  const [announcements] = useState<Announcement[]>(mockAnnouncements);

  const localizedAnnouncements = useMemo<ResolvedAnnouncement[]>(() => {
    return announcements.map(item => ({
      ...item,
      title: resolveLocalized(item.title, language),
      content: resolveLocalized(item.content, language),
    }));
  }, [announcements, language]);

  const getRecentAnnouncements = (limit: number = 7) => {
    return useMemo(() => {
      const now = new Date('2026-05-06'); // Use current mock date as baseline
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      return localizedAnnouncements
        .filter(item => new Date(item.date) >= thirtyDaysAgo)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }, [localizedAnnouncements, limit]);
  };

  const getPaginatedAnnouncements = (page: number, limit: number = 6) => {
    return useMemo(() => {
      const sorted = [...localizedAnnouncements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const startIndex = (page - 1) * limit;
      const paginatedData = sorted.slice(startIndex, startIndex + limit);
      const totalPages = Math.ceil(sorted.length / limit);
      
      return {
        data: paginatedData,
        totalPages,
        totalItems: sorted.length
      };
    }, [localizedAnnouncements, page, limit]);
  };

  const getAnnouncementById = (id: string) => {
    return useMemo(() => {
      return localizedAnnouncements.find(item => item.id === id);
    }, [localizedAnnouncements, id]);
  };

  return {
    getRecentAnnouncements,
    getPaginatedAnnouncements,
    getAnnouncementById
  };
};
