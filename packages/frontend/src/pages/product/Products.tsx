import React from 'react'
import { useGetAllProductsQuery , useLazyGetAllProductsQuery} from '../../services/product/productSlice';
import ProductCard from '../../components/productCard';

export const Products = () => {
    const { data: products, isLoading } = useGetAllProductsQuery();
   if(isLoading) <>Loading</>
  
   
    
  return (
    <div class="text-3xl text-black">
        <h2 class="mb-4 text-xl ">All Products</h2>
        <div className="container px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            { products &&
                products.map((product)=> <ProductCard product={product} />  )
            }
        </div>
    </div>
  )
}
