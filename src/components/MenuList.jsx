import React from 'react';
import MenuCard from './MenuCard';



export default function MenuList({ menus, onAddToCart }) {
  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}