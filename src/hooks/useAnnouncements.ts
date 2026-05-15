import { useState, useMemo } from 'react';
import { Announcement, mockAnnouncements } from '../data/mockAnnouncements';

export const useAnnouncements = () => {
  const [announcements] = useState<Announcement[]>(mockAnnouncements);

  const getRecentAnnouncements = (limit: number = 7) => {
    return useMemo(() => {
      const now = new Date('2026-05-06'); // Use current mock date as baseline
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      return announcements
        .filter(item => new Date(item.date) >= thirtyDaysAgo)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
    }, [announcements, limit]);
  };

  const getPaginatedAnnouncements = (page: number, limit: number = 6) => {
    return useMemo(() => {
      const sorted = [...announcements].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      const startIndex = (page - 1) * limit;
      const paginatedData = sorted.slice(startIndex, startIndex + limit);
      const totalPages = Math.ceil(sorted.length / limit);
      
      return {
        data: paginatedData,
        totalPages,
        totalItems: sorted.length
      };
    }, [announcements, page, limit]);
  };

  const getAnnouncementById = (id: string) => {
    return useMemo(() => {
      return announcements.find(item => item.id === id);
    }, [announcements, id]);
  };

  return {
    getRecentAnnouncements,
    getPaginatedAnnouncements,
    getAnnouncementById
  };
};
