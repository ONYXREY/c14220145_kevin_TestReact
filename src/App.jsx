import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import MenuList from './components/MenuList';
import Keranjang from './components/Keranjang';
import MenuForm from './components/MenuForm';
import TimerSesi from './components/TimerSesi';
import { semuaMenu as initialData } from './data/menu.js';

export default function App() {

  const [menus, setMenus] = useState(() => {
    const savedMenus = localStorage.getItem('kantinKitaMenus');
    
    return savedMenus ? JSON.parse(savedMenus) : initialData;
  });

   
  useEffect(() => {
    localStorage.setItem('kantinKitaMenus', JSON.stringify(menus));
  }, [menus]);

  
  const [keyword, setKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [showTimer, setShowTimer] = useState(true);

  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('kantinKitaCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('kantinKitaCart', JSON.stringify(cart));
  }, [cart]);

   
  const totalCartItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalCartPrice = cart.reduce((total, item) => total + (item.harga * item.qty), 0);

  useEffect(() => {
    document.title = totalCartItems > 0 ? `(${totalCartItems}) KantinKita` : 'KantinKita';
  }, [totalCartItems]);

  const categoryCounts = menus.reduce((acc, menu) => {
    acc[menu.kategori] = (acc[menu.kategori] || 0) + 1;
    return acc;
  }, {});

  const filteredMenus = menus.filter((menu) => {
    const matchKeyword = menu.nama.toLowerCase().includes(keyword.toLowerCase());
    const matchCategory = activeCategory === 'Semua' || menu.kategori === activeCategory;
    return matchKeyword && matchCategory;
  });

  const addToCart = (menu) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menu.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const updateCartQty = (id, amount) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) return { ...item, qty: item.qty + amount };
        return item;
      }).filter((item) => item.qty > 0); 
    });
  };

  const removeFromCart = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pesanan ini?')) {
      setCart((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddMenu = (newMenu) => {
     
    setMenus((prev) => [...prev, { ...newMenu, id: Date.now() }]);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>KantinKita</h1>
        <div>
          {showTimer && <TimerSesi />}
          <button onClick={() => setShowTimer(!showTimer)} style={{ marginTop: '8px' }}>
            {showTimer ? 'Sembunyikan Timer' : 'Tampilkan Timer'}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '24px', marginTop: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '2', minWidth: '300px' }}>
          <FilterBar 
            keyword={keyword} 
            setKeyword={setKeyword}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categoryCounts={categoryCounts}
            totalMenus={menus.length}
          />

          {filteredMenus.length === 0 ? (
            <div style={{ padding: '24px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', borderRadius: '8px' }}>
              Tidak menemukan menu bernama <b>"{keyword}"</b> {activeCategory !== 'Semua' && `di kategori ${activeCategory}`}.
            </div>
          ) : (
            <MenuList menus={filteredMenus} onAddToCart={addToCart} />
          )}
        </div>

        <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Keranjang 
            cart={cart} 
            totalItems={totalCartItems} 
            totalPrice={totalCartPrice} 
            updateQty={updateCartQty}
            removeFromCart={removeFromCart}
          />
          <MenuForm onAddMenu={handleAddMenu} />
        </div>
      </div>
    </div>
  );
}