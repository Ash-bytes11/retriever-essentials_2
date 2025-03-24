import React, { useState } from 'react';
import ProductGrid from './Grid';
import Pagination from './Pages';
import './Grid.css';

// Existing products for Pantry category
const products = [
  { id: 19, name: "Frosted Flakes", image: "/images/ff.png", quantity: 12 },
  { id: 20, name: "Spaghetti", image: "/images/spaghetti.png", quantity: 20 },
  { id: 21, name: "Peanut Butter", image: "/images/pb.png", quantity: 15 }
];

function Pantry({ addToCart }) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Since you have only 3 products

  // Paginate the products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div>
      <ProductGrid products={currentProducts}  addToCart={addToCart}/> {/* Pass the current products */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}

export default Pantry;

