import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './Terms.css';

const Terms: React.FC = () => {
  const { language } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="terms-page">
      <div className="container">
        {language === 'en-US' ? (
          <div className="terms-content">
            <h1>Terms of Use – AZX Xiang Sheng Hardware Inc. Website</h1>
            <p>This website (“Site”) is owned and operated by <strong>AZX Xiang Sheng Hardware Inc.</strong> (“AZX,” “we,” “us,” or “our”) and is provided for informational and business purposes only. By accessing or using this Site, you agree to be bound by the terms and conditions set forth below. If you do not agree with these terms, please do not use this Site.</p>
            <p>AZX reserves the right to update, modify, or change these Terms of Use at any time at its sole discretion. Any updates will be effective immediately upon posting. Continued use of the Site after changes are posted constitutes your acceptance of the revised terms.</p>
            
            <h2>1. Site License</h2>
            <p>AZX grants you a limited, non-exclusive, non-transferable license to access and use this Site strictly for lawful business or informational purposes related to AZX products and services.</p>
            <p>You agree not to:</p>
            <ul>
              <li>Resell, distribute, or commercially exploit any content from this Site</li>
              <li>Collect product listings, pricing, or descriptions for commercial use</li>
              <li>Copy, modify, or create derivative works from Site content</li>
              <li>Use any data mining, scraping, robots, or similar tools</li>
              <li>Interfere with or disrupt the Site’s operation or security</li>
            </ul>
            <p>Any unauthorized use automatically terminates this license and may result in legal action.</p>
            
            <h2>2. Intellectual Property</h2>
            <p>All content on this Site, including but not limited to text, images, graphics, logos, product information, designs, and layouts, are owned by AZX Xiang Sheng Hardware Inc. or its licensors and are protected by applicable intellectual property laws.</p>
            <p>You may not copy, reproduce, republish, upload, transmit, or distribute any materials from this Site without prior written permission from AZX.</p>
            <p>All trademarks, logos, and product names displayed on this Site are the property of AZX or their respective owners and may not be used without authorization.</p>
            
            <h2>3. Third-Party Links</h2>
            <p>This Site may contain links to third-party websites for convenience. AZX does not control, endorse, or assume responsibility for any third-party websites, content, or services.</p>
            <p>If you access third-party sites, you do so at your own risk.</p>
            
            <h2>4. User Submissions</h2>
            <p>If you submit any information, feedback, or materials through this Site:</p>
            <ul>
              <li>You confirm that the information does not contain confidential or proprietary third-party content</li>
              <li>You grant AZX a worldwide, royalty-free, perpetual license to use, reproduce, and distribute such submissions for business purposes</li>
              <li>You agree not to submit unlawful, defamatory, obscene, or harmful content</li>
            </ul>
            <p>AZX reserves the right to remove or reject any submission at its sole discretion.</p>
            
            <h2>5. Disclaimer</h2>
            <p>This Site and all content are provided “as is” and “as available” without warranties of any kind, express or implied.</p>
            <p>AZX does not guarantee:</p>
            <ul>
              <li>Accuracy, completeness, or reliability of Site content</li>
              <li>That the Site will be uninterrupted or error-free</li>
              <li>That the Site is free of viruses or harmful components</li>
            </ul>
            <p>Any reliance on Site content is at your own risk.</p>
            
            <h2>6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, AZX Xiang Sheng Hardware Inc. shall not be liable for any damages arising from or related to your use of this Site, including but not limited to:</p>
            <ul>
              <li>Loss of profits or revenue</li>
              <li>Business interruption</li>
              <li>Data loss</li>
              <li>Indirect, incidental, or consequential damages</li>
            </ul>
            <p>If liability cannot be fully excluded, AZX’s total liability shall not exceed the amount you paid (if any) to access the Site, or USD $1, whichever is lower.</p>
            
            <h2>7. Governing Law</h2>
            <p>These Terms shall be governed by and interpreted in accordance with the laws of <strong>Taiwan (R.O.C.)</strong>, without regard to conflict of law principles.</p>
            <p>Any disputes shall be subject to the exclusive jurisdiction of the courts located in Taiwan.</p>
            
            <h2>8. Enforcement</h2>
            <p>AZX reserves the right to monitor Site usage and investigate any violations of these Terms. We may take any action we deem appropriate, including:</p>
            <ul>
              <li>Suspending or blocking access</li>
              <li>Reporting to law enforcement authorities</li>
              <li>Pursuing legal remedies</li>
            </ul>
            <p>We may also disclose information when required by law or to protect our rights, customers, or operations.</p>
            
            <h2>9. Severability</h2>
            <p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
            
            <h2>10. Contact Information</h2>
            <p>If you have any questions regarding these Terms of Use, please contact us:</p>
            <p><strong>AZX Xiang Sheng Hardware Inc.</strong><br /> Email: <a href="mailto:info@xshw.com.tw">info@xshw.com.tw</a></p>
          </div>
        ) : (
          <div className="terms-content">
            <h1>使用條款 – AZX 翔盛五金股份有限公司網站</h1>
            <p>本網站（下稱「本網站」）由 <strong>AZX 翔盛五金股份有限公司</strong>（下稱「AZX」、「我們」或「我們的」）擁有並營運，僅供資訊提供及商業目的之用。當您存取或使用本網站時，即表示您同意接受下列條款及條件之約束。如果您不同意這些條款，請勿使用本網站。</p>
            <p>AZX 保留隨時自行決定更新、修改或變更本使用條款的權利。任何更新在發佈後立即生效。在變更發佈後繼續使用本網站，即構成您接受修訂後的條款。</p>
            
            <h2>1. 網站授權</h2>
            <p>AZX 授予您有限的、非專屬的、不可轉讓的許可，以嚴格限制於與 AZX 產品和服務相關的合法商業或資訊目的存取和使用本網站。</p>
            <p><strong>您同意不進行以下行為：</strong></p>
            <ul>
              <li>轉售、分銷或將本網站的任何內容用於商業開發</li>
              <li>收集產品列表、價格或說明以用於商業用途</li>
              <li>複製、修改或根據本網站內容創作衍生作品</li>
              <li>使用任何數據挖掘、網絡爬蟲、機器人或類似工具</li>
              <li>干擾或破壞本網站的運作或安全性</li>
            </ul>
            <p>任何未經授權的使用將自動終止此項授權，並可能導致法律訴訟。</p>
            
            <h2>2. 智慧財產權</h2>
            <p>本網站上的所有內容，包括但不限於文字、圖像、圖表、標誌（Logos）、產品資訊、設計和版面配置，均歸 AZX 翔盛五金有限公司或其授權人所有，並受適用之智慧財產權法保護。</p>
            <p>未經 AZX 事先書面許可，您不得複製、重製、重新發佈、上傳、傳送或分發本網站的任何材料。</p>
            <p>本網站上顯示的所有商標、標誌和產品名稱均為 AZX 或其各自所有者的財產，未經授權不得使用。</p>
            
            <h2>3. 第三方連結</h2>
            <p>本網站可能包含指向第三方網站的連結，以提供便利。AZX 對於任何第三方網站、內容或服務不進行控制、背書，亦不承擔任何責任。</p>
            <p>如果您存取第三方網站，須自行承擔風險。</p>
            
            <h2>4. 使用者提交資料</h2>
            <p>如果您透過本網站提交任何資訊、回饋或材料：</p>
            <ul>
              <li>您確認該資訊不包含第三方的保密或專有內容。</li>
              <li>您授予 AZX 全球性、免權利金、永久的許可，允許我們出於商業目的使用、重製和分發此類提交的內容。</li>
              <li>您同意不提交任何違法、誹謗、淫穢或有害的內容。</li>
            </ul>
            <p>AZX 保留自行決定刪除或拒絕任何提交內容的權利。</p>
            
            <h2>5. 免責聲明</h2>
            <p>本網站及所有內容均按「現狀（As is）」和「可提供性（As available）」原則提供，不附帶任何形式的明示或暗示保證。</p>
            <p><strong>AZX 不保證：</strong></p>
            <ul>
              <li>網站內容的準確性、完整性或可靠性</li>
              <li>本網站將毫無中斷或毫無錯誤</li>
              <li>本網站不含病毒或其他有害成分</li>
            </ul>
            <p>任何對本網站內容的依賴均由您自行承擔風險。</p>
            
            <h2>6. 責任限制</h2>
            <p>在法律允許的最大範圍內，AZX 翔盛五金有限公司對因您使用本網站而引起的或與之相關的任何損害不承擔任何責任，包括但不限於：</p>
            <ul>
              <li>利潤或收入損失</li>
              <li>營業中斷</li>
              <li>數據遺失</li>
              <li>間接、附帶或衍生性損害</li>
            </ul>
            <p>若責任無法被完全排除，AZX 的總體賠償責任不應超過您為存取本網站所支付的金額（如有），或以 1 美元（USD $1）為限（以較低者為準）。</p>
            
            <h2>7. 準據法</h2>
            <p>本條款應受中華民國（台灣）法律管轄並依其解釋，不適用其法律衝突原則。</p>
            <p>任何爭議均應提交至位於台灣的法院管轄，並以其為專屬管轄法院。</p>
            
            <h2>8. 執行</h2>
            <p>AZX 保留監控網站使用情況並調查任何違反本條款行為的權利。我們可能會採取我們認為適當的任何行動，包括：</p>
            <ul>
              <li>暫停或阻止存取</li>
              <li>向執法機關舉報</li>
              <li>尋求法律救濟</li>
            </ul>
            <p>當法律要求，或為了保護我們的權利、客戶或營運時，我們亦可能會披露相關資訊。</p>
            
            <h2>9. 可分割性</h2>
            <p>若本條款的任何條款被認定為無效或不可執行，其餘條款應繼續具有完全的效力。</p>
            
            <h2>10. 聯絡資訊</h2>
            <p>如果您對本使用條款有任何疑問，請與我們聯絡：</p>
            <p><strong>AZX 翔盛五金有限公司</strong><br /> 電子郵件：<a href="mailto:info@xshw.com.tw">info@xshw.com.tw</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terms;
