import React from 'react';

export default function Keranjang({ cart, totalItems, totalPrice, updateQty, removeFromCart }) {
  const formatRupiah = (harga) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(harga);

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fafafa' }}>
      <h2 style={{ marginTop: 0 }}>Keranjang ({totalItems})</h2>
      
      {cart.length === 0 ? (
        <p style={{ color: '#888' }}>Keranjang masih kosong.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
              <div>
                <strong>{item.nama}</strong> <br/>
                <small>{formatRupiah(item.harga)} x {item.qty}</small>
              </div>
              
              
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span style={{ width: '24px', textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)} style={{ color: 'red', marginLeft: '8px' }}>🗑</button>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '16px', borderTop: '2px solid #ccc', paddingTop: '8px', textAlign: 'right' }}>
            <strong>Total: {formatRupiah(totalPrice)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}