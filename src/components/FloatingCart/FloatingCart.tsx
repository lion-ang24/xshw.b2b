import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ORDER_EMAIL } from '../../config/orderConfig';

const FloatingCart: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { items, updateQty, removeItem, toggleCheck, toggleAll, clearChecked } = useCart();

  const totalItems = items.length;
  const checkedItems = items.filter(i => i.checked);
  const allChecked = totalItems > 0 && items.every(i => i.checked);
  const someChecked = items.some(i => i.checked);

  const handleSubmit = () => {
    if (checkedItems.length === 0) return;

    const today = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });

    const itemLines = checkedItems
      .map((i, idx) => `  ${idx + 1}. ${i.productName}\n     規格：${i.spec}\n     數量：${i.qty}`)
      .join('\n\n');

    const subject = `【需求單】採購申請 ${today}`;
    const body =
      `您好，

      以下為本次採購需求，請確認後回覆。

      ──────────────────────
      訂單日期：${today}
      品項數量：${checkedItems.length} 項
      ──────────────────────

      ${itemLines}

      ──────────────────────
      備註：
    `;

    const mailto = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className="floating-cart-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="採購清單"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {totalItems > 0 && (
          <span className="floating-cart-badge">{totalItems}</span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div className="floating-cart-backdrop" onClick={() => setOpen(false)} />
      )}

      {/* Cart Panel */}
      <div className={`floating-cart-panel ${open ? 'open' : ''}`}>
        {/* Panel Header */}
        <div className="floating-cart-header">
          <span className="floating-cart-title">
            採購清單
            {totalItems > 0 && (
              <span className="floating-cart-count">{totalItems}</span>
            )}
          </span>
          <button className="floating-cart-close" onClick={() => setOpen(false)} aria-label="關閉">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Select All / Deselect All */}
        {totalItems > 0 && (
          <div className="floating-cart-toolbar">
            <label className="floating-cart-select-all">
              <input
                type="checkbox"
                checked={allChecked}
                ref={el => { if (el) el.indeterminate = someChecked && !allChecked; }}
                onChange={toggleAll}
              />
              <span>{allChecked ? '反全選' : '全選'}</span>
            </label>
            {someChecked && (
              <button className="floating-cart-clear-btn" onClick={clearChecked}>
                移除已選
              </button>
            )}
          </div>
        )}

        {/* Item List */}
        <div className="floating-cart-list">
          {items.length === 0 ? (
            <div className="floating-cart-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span>尚無加入的項目</span>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className={`floating-cart-item ${item.checked ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  className="floating-cart-item-check"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                />
                <div className="floating-cart-item-info">
                  <div className="floating-cart-item-name">{item.productName}</div>
                  <div className="floating-cart-item-spec">{item.spec}</div>
                  {/* Quantity controls */}
                  <div className="floating-cart-qty">
                    <button
                      className="floating-cart-qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="減少數量"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="floating-cart-qty-input"
                      value={item.qty}
                      min={1}
                      onChange={e => updateQty(item.id, parseInt(e.target.value, 10) || 1)}
                    />
                    <button
                      className="floating-cart-qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="增加數量"
                    >
                      ＋
                    </button>
                  </div>
                </div>
                <button
                  className="floating-cart-remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label="移除項目"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="floating-cart-footer">
            <div className="floating-cart-selected-count">
              已選 {checkedItems.length} / {totalItems} 項
            </div>
            <button
              className="floating-cart-submit-btn"
              disabled={checkedItems.length === 0}
              onClick={handleSubmit}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22 11 13 2 9l20-7z" />
              </svg>
              送出需求
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingCart;
