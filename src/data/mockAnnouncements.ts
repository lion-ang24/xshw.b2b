export type AnnouncementStatus = '新活動' | '公告' | '更新';

export interface LocalizedString {
  'zh-TW': string;
  'en-US': string;
}

export interface Announcement {
  id: string;
  title: string | LocalizedString;
  content: string | LocalizedString;
  date: string;
  status: AnnouncementStatus;
}

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: {
      'en-US': '🚀 Exciting Milestone: First Container Shipped & Opening Date Announced!',
      'zh-TW': '🌟 重大里程碑：首批貨櫃已出貨與開業營運公告'
    },
    date: '2026/05/25',
    status: '公告',
    content: {
      'en-US': 'AZX Xiang Sheng Hardware Inc. is thrilled to announce that our very first container was officially shipped out on May 20th and is scheduled to arrive in mid-June!\nTo kickstart our operations, our company officers will be arriving on May 27th to begin setting up on-site. We are incredibly happy to share that we will soon be fully operational and ready to supply everyone with all your hardware needs. Thank you for your support as we launch this exciting journey!',
      'zh-TW': '翔盛五金股份有限公司 (AZX Xiang Sheng Hardware Inc.) 欣然宣布：我們的首個貨櫃已於 5 月 20 日正式出貨，預計將於 6 月中旬抵達！\n為了開啟全新篇章，公司管理人員將於 5 月 27 日率先抵達並展開現場營運籌備。我們非常高興地宣布，公司很快將全面投入運作，全力滿足大家對各類五金物資的需求。感謝您一直以來的支持，期待盡快為您服務！'
    }
  },
  {
    id: '2',
    title: {
      'en-US': 'AZX Xiang Sheng Hardware Inc. is proud to announce the launch of our UL94 V-0 certified flame-resistant PVC floor mats. Engineered specifically for the demanding semiconductor manufacturing plant environment, these mats meet the highest safety standards to drastically reduce flammability risks.',
      'zh-TW': '翔盛五金股份有限公司 (AZX Xiang Sheng Hardware Inc.) 隆重宣布推出高規格 UL94 V-0 認證耐燃 PVC 地墊。此產品專為要求極嚴格的半導體製造廠房環境打造，符合頂級安全分級標準，能有效杜絕火源蔓延風險。'
    },
    date: '2026/05/25',
    status: '公告',
    content: {
      'en-US': 'Crucially, this specialized product is designed to significantly elevate safety precautions within TSMC’s fabrication facilities, with a particular focus on the stringent requirements of cleanroom environments. By delivering exceptional flame retardancy without compromising cleanroom contamination controls, our new mats ensure optimal protection for advanced wafer production.',
      'zh-TW': '誠如所述，此款專用防護透明地墊將全面助力台積電 (TSMC) 生產廠區大幅升級其安全防護措施，特別是針對規範極為嚴苛的無塵室 (Cleanroom)。本產品在提供卓越耐燃性能的同時，亦完美符合晶圓生產對落塵與污染控制的嚴格要求，為頂尖半導體製程環境提供最強有力的安全後盾。'
    }
  }
];
