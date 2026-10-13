 import React from 'react';
import styles from './MenuCard.module.css';  
import Badge from './Badge';

export default function MenuCard({ menu, onAddToCart }) {
  const formatRupiah = (harga) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(harga);
  const isHabis = menu.stok === 0;

  return (
    <div className={`${styles.card} ${isHabis ? styles.soldOut : ''}`}>
      <h3 style={{ margin: '0 0 8px 0' }}>{menu.nama}</h3>
      <p style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>{formatRupiah(menu.harga)}</p>
      
      {isHabis ? (
        <Badge variant="danger">Habis</Badge>
      ) : (
        <span style={{ fontSize: '14px', color: '#555' }}>Stok: {menu.stok}</span>
      )}

      <button 
        className={styles.button} 
        disabled={isHabis}
        onClick={() => onAddToCart(menu)}  
      >
        Tambah
      </button>
    </div>
  );
}

