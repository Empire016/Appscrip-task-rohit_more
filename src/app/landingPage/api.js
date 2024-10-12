import React, { useEffect } from 'react';


export async function fetchProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  }
  
  export async function fetchProduct(id) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  }
  