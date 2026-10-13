import React, { useRef } from 'react';

export default function FilterBar({ keyword, setKeyword, activeCategory, setActiveCategory, categoryCounts, totalMenus }) {
  
  const searchInputRef = useRef(null);

  const handleClear = () => {
    setKeyword('');
    searchInputRef.current.focus();
  };

  return (
    <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input 
          ref={searchInputRef}
          type="text" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari nama menu..." 
          style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button onClick={handleClear} style={{ padding: '8px 16px' }}>Bersihkan</button>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveCategory('Semua')}
          style={{ fontWeight: activeCategory === 'Semua' ? 'bold' : 'normal' }}
        >
          Semua ({totalMenus})
        </button>
        
       
        {Object.entries(categoryCounts).map(([cat, count]) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            style={{ fontWeight: activeCategory === cat ? 'bold' : 'normal' }}
          >
           
            {cat} ({count})
          </button>
        ))}
      </div>
    </div>
  );
}