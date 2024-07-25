import BannerImage from "@/components/Banner";
import Footer from "@/components/Footer";
import Products from "@/components/FeaturedProduct";
import DetailInfo from "@/components/DetailInfo";
import { TypeProducts } from "@/types/ProductType";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-cache",
  });
  const { products }: { products: TypeProducts[] } = await res.json();
  
  const limitedProducts = products.slice(0, 7);

  return (
    <main>
      <BannerImage/>
      <Products products={limitedProducts} />
      <DetailInfo/>
      <Footer/>
    </main>
  );
}
