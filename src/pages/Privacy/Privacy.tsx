import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Privacy.css';

const Privacy: React.FC = () => {
  const { language } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page">
      <div className="container">
        {language === 'en-US' ? (
          <div className="privacy-content">
            <h1>Privacy Policy</h1>
            <p>AZX Xiang Sheng Hardware Inc. (“AZX Xiang Sheng,” “we,” “our,” or “us”) respects the privacy of visitors to our website and is committed to protecting any personal information you may provide to us. This Privacy Policy explains how we collect, use, protect, and process information through our website and related services.</p>
            <p>This Privacy Policy applies only to this website and does not apply to third-party websites linked from our site.</p>
            
            <h2>Information Collected</h2>
            <p>We may collect both personal and non-personal information.</p>
            <p><strong>Personal Information</strong> may include:</p>
            <ul>
              <li>Name</li>
              <li>Company name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Shipping or billing address</li>
              <li>Payment or transaction information</li>
              <li>Inquiry or quotation information</li>
            </ul>
            <p>We collect personal information only when voluntarily provided by you for business purposes such as product inquiries, quotations, purchases, or customer support.</p>
            
            <p><strong>Non-Personal Information</strong> may include:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Website usage data</li>
              <li>Pages visited</li>
              <li>Cookies and analytics information</li>
            </ul>
            <p>We may use cookies and similar technologies to improve website performance and user experience. You may disable cookies through your browser settings, though some website functions may not operate properly.</p>
            
            <h2>Use of Information</h2>
            <p>Information collected through our website may be used for:</p>
            <ul>
              <li>Responding to inquiries and quotation requests</li>
              <li>Processing orders and shipments</li>
              <li>Customer support and communication</li>
              <li>Improving our website, products, and services</li>
              <li>Internal analytics and business operations</li>
              <li>Marketing and promotional communications</li>
              <li>Compliance with legal obligations</li>
              <li>Protecting company rights, property, and security</li>
            </ul>
            
            <p>We may share information with:</p>
            <ul>
              <li>Service providers supporting our operations</li>
              <li>Shipping, logistics, and payment providers</li>
              <li>Authorized distributors and business partners</li>
              <li>Legal or regulatory authorities when required by law</li>
            </ul>
            <p>AZX Xiang Sheng Hardware Inc. does not sell or lease personal information to unrelated third parties.</p>
            
            <h2>Links to Other Websites</h2>
            <p>Our website may contain links to third-party websites. These websites may have separate privacy policies and practices. We are not responsible for the content, security, or privacy practices of external websites.</p>
            
            <h2>Security of Information</h2>
            <p>We maintain reasonable administrative, electronic, and physical safeguards to protect personal information from unauthorized access, misuse, disclosure, or alteration. Access to personal information is limited to authorized personnel with legitimate business purposes.</p>
            <p>However, no online data transmission or storage system can be guaranteed to be completely secure.</p>
            
            <h2>Children’s Privacy</h2>
            <p>This website is intended for business and commercial use and is not directed toward children. We do not knowingly collect personal information from individuals under applicable legal age requirements.</p>
            
            <h2>Policy Changes</h2>
            <p>AZX Xiang Sheng Hardware Inc. reserves the right to modify this Privacy Policy at any time. Updated versions will be posted on this page.</p>
            
            <h2>Consent</h2>
            <p>By using this website, you consent to the terms of this Privacy Policy.</p>
            
            <h2>Governing Law</h2>
            <p>This Privacy Policy shall be governed by applicable laws and regulations of Taiwan and other relevant international trade and privacy regulations where applicable.</p>
          </div>
        ) : (
          <div className="privacy-content">
            <h1>隱私權政策</h1>
            <p>AZX Xiang Sheng Hardware Inc.（以下稱「本公司」）重視網站訪客之隱私權，並致力於保護您所提供之個人資料。本隱私權政策說明本公司如何透過網站蒐集、使用、保護及處理相關資訊。</p>
            <p>本政策僅適用於本網站，不適用於第三方網站。</p>
            
            <h2>資料蒐集</h2>
            <p>本公司可能蒐集個人資料與非個人資料。</p>
            <p><strong>個人資料</strong>可能包括：</p>
            <ul>
              <li>姓名</li>
              <li>公司名稱</li>
              <li>電話</li>
              <li>電子郵件</li>
              <li>收件或帳單地址</li>
              <li>付款或交易資訊</li>
              <li>詢價與聯絡內容</li>
            </ul>
            <p>上述資料僅於您主動提供時蒐集，用於報價、採購、客戶服務及其他合理商業用途。</p>
            
            <p><strong>非個人資料</strong>可能包括：</p>
            <ul>
              <li>IP 位址</li>
              <li>瀏覽器類型</li>
              <li>裝置資訊</li>
              <li>網站使用紀錄</li>
              <li>瀏覽頁面</li>
              <li>Cookies 與網站分析資訊</li>
            </ul>
            <p>本網站可能使用 Cookies 與相關技術以改善網站功能與使用體驗。您可透過瀏覽器設定停用 Cookies，但部分功能可能因此無法正常使用。</p>
            
            <h2>資料使用方式</h2>
            <p>本公司蒐集之資訊可能用於：</p>
            <ul>
              <li>回覆詢價與聯絡需求</li>
              <li>處理訂單與出貨</li>
              <li>客戶服務與商業聯繫</li>
              <li>改善網站、產品與服務</li>
              <li>內部分析與營運管理</li>
              <li>行銷與產品資訊通知</li>
              <li>遵守法律義務</li>
              <li>維護公司權益與安全</li>
            </ul>
            
            <p>本公司可能與以下對象共享必要資訊：</p>
            <ul>
              <li>協助營運之服務供應商</li>
              <li>物流、金流與運輸業者</li>
              <li>授權經銷商與合作夥伴</li>
              <li>法律或政府主管機關</li>
            </ul>
            <p>本公司不會販售或出租您的個人資料予無關第三方。</p>
            
            <h2>第三方網站連結</h2>
            <p>本網站可能包含第三方網站連結。該等網站可能有其獨立之隱私權政策，本公司不對其內容、安全性或隱私作法負責。</p>
            
            <h2>資料安全</h2>
            <p>本公司採取合理之行政、電子及實體安全措施，以保護個人資料免於未經授權之存取、使用、揭露或修改。僅授權人員得基於合理商業目的存取相關資訊。</p>
            <p>惟任何網路傳輸或資料儲存系統皆無法保證百分之百安全。</p>
            
            <h2>兒童隱私</h2>
            <p>本網站主要提供企業與商業用途，並非針對兒童或未成年人設計。本公司不會故意蒐集未成年人之個人資料。</p>
            
            <h2>政策修改</h2>
            <p>本公司保留隨時修改本隱私權政策之權利，更新內容將公告於本頁面。</p>
            
            <h2>使用者同意</h2>
            <p>當您使用本網站時，即表示您同意本隱私權政策之內容。</p>
            
            <h2>準據法</h2>
            <p>本隱私權政策適用中華民國（台灣）相關法律及其他適用之國際隱私與貿易法規。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Privacy;
