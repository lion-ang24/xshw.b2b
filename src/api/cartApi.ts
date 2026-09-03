export const addToCart = async (productId: string, qty: number) => {
  console.log('Adding to cart:', productId, 'Quantity:', qty);
  return Promise.resolve({ success: true, message: 'Added to cart' });
};

export const requestQuote = async (productId: string, qty: number) => {
  console.log('Requesting quote for:', productId, 'Quantity:', qty);
  return Promise.resolve({ success: true, message: 'Quote requested' });
};

export const directBuy = async (productId: string, qty: number) => {
  console.log('Direct buy:', productId, 'Quantity:', qty);
  return Promise.resolve({ success: true, message: 'Proceeding to checkout' });
};
