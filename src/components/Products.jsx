import useFetch from "../useFetch";

const Products = ()=>{

    const {data, loading, error} = useFetch("https://backend-products-pearl.vercel.app/products")
    console.log(data)
    return(
        <></>
    )
}


export default Products;