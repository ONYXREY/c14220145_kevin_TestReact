import React from 'react';

export default function Badge({ children, variant }) {
  const backgroundColor = variant === 'danger' ? '#ff4d4f' : '#1890ff';
  
  return (
    <span style={{ 
      padding: '4px 8px', 
      borderRadius: '4px', 
      color: 'white', 
      fontSize: '12px',
      backgroundColor 
    }}>
      {children}
    </span>
  );
}