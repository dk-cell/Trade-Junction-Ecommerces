import React, { useEffect, useState } from 'react'
import { product } from '../static/data';
import styles from '../style/styles';
import ProductCard from './main/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const ShowRelatedProduct = ({data}) => {
    const {allProducts} = useSelector((state)=>state.products)
const [relatedProduct, setRelatedProduct] = useState(null);

useEffect(()=>{
    const allProductsData = allProducts ? [...allProducts] : [];
    const filteredProduct = allProductsData && allProductsData.filter((item)=>item.category === data.category)
    setRelatedProduct(filteredProduct)
},[])
  return (
    <div>
        {
            data && (
               <div className={`${styles.section} p-4`}>
                 <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5 `}>
                    Related Products
                </h2>
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                        relatedProduct && relatedProduct.map((item, index)=>(
                            <ProductCard data={item} key = {index} />
                        ))
                    }
                </div>
               </div>
            )
        }
    </div>
  )
}

export default ShowRelatedProduct