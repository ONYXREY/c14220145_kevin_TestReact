import React, { useState } from 'react';
// import menu, { semuaMenu } from '../data/menu.js';


const initialState = { nama: '', kategori: '', harga: '', stok: '' };

export default function MenuForm({ onAddMenu }) {
  
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
     
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
     
    if (formData.nama.trim().length < 3) newErrors.nama = 'Nama minimal 3 karakter.';
    if (!formData.kategori) newErrors.kategori = 'Kategori wajib dipilih.';
    if (Number(formData.harga) <= 0) newErrors.harga = 'Harga harus lebih dari 0.';
    if (formData.stok === '' || Number(formData.stok) < 0) newErrors.stok = 'Stok tidak boleh negatif.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
    
    if (validate()) {
      onAddMenu({
        nama: formData.nama.trim(),
        kategori: formData.kategori,
        harga: Number(formData.harga),
        stok: Number(formData.stok)
      });
      setFormData(initialState);  
    }
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #1890ff', borderRadius: '8px', backgroundColor: '#e6f7ff' }}>
      <h2 style={{ marginTop: 0 }}>Tambah Menu</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        
        <div>
          <label htmlFor="nama">Nama Menu</label><br/>
          <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleChange} style={{ width: '100%', padding: '6px' }} />
          {errors.nama && <span role="alert" style={{ color: 'red', fontSize: '12px' }}>{errors.nama}</span>}
        </div>

        <div>
          <label htmlFor="kategori">Kategori</label><br/>
          <select id="kategori" name="kategori" value={formData.kategori} onChange={handleChange} style={{ width: '100%', padding: '6px' }}>
            <option value="">Pilih Kategori...</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Camilan">Camilan</option>
          </select>
          {errors.kategori && <span role="alert" style={{ color: 'red', fontSize: '12px' }}>{errors.kategori}</span>}
        </div>

        <div>
          <label htmlFor="harga">Harga (Rp)</label><br/>
          <input type="number" id="harga" name="harga" value={formData.harga} onChange={handleChange} style={{ width: '100%', padding: '6px' }} />
          {errors.harga && <span role="alert" style={{ color: 'red', fontSize: '12px' }}>{errors.harga}</span>}
        </div>

        <div>
          <label htmlFor="stok">Stok</label><br/>
          <input type="number" id="stok" name="stok" value={formData.stok} onChange={handleChange} style={{ width: '100%', padding: '6px' }} />
          {errors.stok && <span role="alert" style={{ color: 'red', fontSize: '12px' }}>{errors.stok}</span>}
        </div>

        <button type="submit" style={{ padding: '8px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '8px' }}>
          Simpan Menu
        </button>
      </form>
    </div>
  );
}