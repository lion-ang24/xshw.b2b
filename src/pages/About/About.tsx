import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './About.css';

const EnContent = () => (
  <div className="about-content">
    <h1>About Us</h1>
    <p>At AZX Xiang Sheng Hardware Inc., we are committed to delivering reliable hardware solutions, industrial supplies, and operational support to the growing manufacturing and semiconductor industries in the United States. Built on a foundation of precision, efficiency, and long-term partnership, our mission is to bridge Taiwan’s world-class manufacturing capabilities with the rapidly expanding industrial ecosystem in Arizona.</p>
    <p>As the semiconductor industry continues to transform the future of global technology, Arizona has become one of the most important strategic hubs for advanced manufacturing and innovation. Inspired by the growth of TSMC and the broader semiconductor supply chain in the region, AZX Xiang Sheng Hardware Inc. is actively positioning itself to become a trusted support partner within this ecosystem.</p>
    <p>We understand that semiconductor facilities demand high standards in quality, consistency, logistics, and operational reliability. With experience in hardware sourcing, industrial products, inventory organization, and supplier coordination, our team is dedicated to supporting contractors, manufacturers, facility operators, and infrastructure partners with dependable products and responsive service.</p>
    <p>Although our team brings nearly 20 years of experience in Taiwan serving customers and partners across the industrial and semiconductor supply chain ecosystem, we understand that entering a new country and a new business environment comes with new challenges, new standards, and new opportunities to learn. We approach this journey with humility and a long-term mindset. Rather than assuming past success guarantees future results, we are prepared to start from the ground up, grow alongside our partners, and continuously improve ourselves as we become part of Arizona’s expanding semiconductor community.</p>
    <p>Our vision goes beyond supplying hardware. We aim to contribute to the long-term success of Arizona’s manufacturing future by building strong partnerships, improving supply chain efficiency, and supporting the industries that are shaping the next generation of technology. Through continuous improvement, international collaboration, and a commitment to service excellence, AZX Xiang Sheng Hardware Inc. strives to grow alongside the semiconductor community and help strengthen the connection between Taiwan and the United States industrial markets.</p>
    <p>We sincerely welcome suggestions, feedback, and professional insights from our customers and partners. Your opinions not only help us improve our service and operations, but also help strengthen our future cooperation together. We believe that long-term partnerships are built through communication, trust, and mutual growth, and we look forward to growing together with everyone in this ecosystem.</p>
    <p>As we continue expanding our operations and capabilities, we remain focused on professionalism, reliability, and innovation — values that drive us toward becoming a meaningful contributor to the semiconductor ecosystem in Arizona.</p>
  </div>
);

const ZhContent = () => (
  <div className="about-content">
    <h1>公司簡介</h1>
    <p>AZX Xiang Sheng Hardware Inc. 致力於提供高品質的五金產品、工業材料與供應鏈支援服務，積極投入美國快速成長的製造業與半導體產業。我們以「精準、效率、長期合作」為核心理念，結合台灣優秀的製造實力與美國亞利桑那州快速發展的工業需求，打造穩定且值得信賴的供應體系。</p>
    <p>隨著全球半導體產業持續擴張，亞利桑那州已成為美國最重要的先進製造與科技發展重鎮之一。受到 TSMC 及其半導體供應鏈生態系在當地發展的啟發，AZX Xiang Sheng Hardware Inc. 正積極朝向成為半導體產業生態系重要支援夥伴的目標邁進。</p>
    <p>我們深知半導體產業對於品質穩定性、供應效率、物流管理與專業服務有極高標準。因此，我們結合五金供應、工業產品整合、庫存管理及供應鏈協調等經驗，致力於為工程承包商、製造業者、設備維運團隊及產業合作夥伴提供可靠且高效率的產品與服務支援。</p>
    <p>雖然我們團隊在台灣已累積將近20年的產業經驗，長期服務於工業製造與半導體供應鏈相關客戶與合作夥伴，但我們也深知，進入新的國家與新的市場環境，代表著全新的挑戰、標準與學習機會。我們將秉持謙遜與長期經營的態度，不因過去的經驗而自滿，而是願意從零開始、腳踏實地，與亞利桑那州的產業夥伴們一同成長，持續精進自身能力與服務品質，逐步融入當地快速發展的半導體產業生態系。</p>
    <p>我們的願景不僅是成為五金供應商，更希望能夠成為亞利桑那州製造業長期發展的重要合作夥伴。透過持續優化供應鏈效率、深化台美產業合作，以及秉持專業與誠信的服務精神，AZX Xiang Sheng Hardware Inc. 期望能夠與半導體產業共同成長，並進一步強化台灣與美國之間的工業連結與合作價值。</p>
    <p>我們非常重視每一位客戶與合作夥伴的建議、意見與經驗分享。您的回饋不僅能幫助我們持續改善服務與營運效率，也能讓彼此未來的合作更加順暢與長遠。我們相信，真正長久的合作關係建立於溝通、信任與共同成長之上，也期待能與這個產業生態系中的每一位夥伴攜手前進、共同發展。</p>
    <p>未來，我們將持續拓展營運能力與服務範圍，以專業、可靠與創新的精神，朝向成為亞利桑那州半導體產業生態系中值得信賴的重要夥伴穩健前行。</p>
  </div>
);

const About: React.FC = () => {
  const { language } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        {language === 'en-US' ? <EnContent /> : <ZhContent />}
      </div>
    </div>
  );
};

export default About;
