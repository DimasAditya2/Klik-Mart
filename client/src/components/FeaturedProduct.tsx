'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { TypeProducts } from "@/types/ProductType";
import FormatCurrency from "@/helpers/FormatRupiah";
import Link from "next/link";


export default function Products({ products }: { products: TypeProducts[] }) {
  return (
    <>
      <div className="flex flex-col bg-slate-700 m-auto p-auto">
        <div className="flex justify-between">
          <h1 className="flex py-5 mx-5 font-bold text-2xl text-white">
            Products
          </h1>
          <Link
            href={"/products"}
            title="Klik For detail product"
            className="py-5 mx-5 font-bold text-base text-white hover:text-slate-200 underline "
          >
            See all products 
            <FontAwesomeIcon
              icon={faArrowRight}
              className="size-6 inline-block"
              size="2xl"
            />
          </Link>
        </div>
        <div className="flex overflow-x-scroll pb-10">
          <div className="flex flex-nowrap lg:ml-10 md:ml-20 ml-10 gap-2 px-2">
            {products.map((product) => (
              <div key={product._id} className="inline-block px-3">
                <Link href={`/products/${product.slug}`}>
                <div className={`card bg-base-100 w-96 shadow-xl h-full`}>
                  <figure>
                    <img
                    className="h-56 w-full object-cover"
                      src={product.thumbnail}
                      alt={product.name} 
                    />
                  </figure>
                  <div className="card-body">
                    <h1 className="text-2xl font-bold">{FormatCurrency(product.price)}</h1>
                    <h2 className="card-title">
                      {product.name}
                      <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{product.description}</p> 
                    <div className="card-actions justify-center">
                    {product.tags.map((el, i) => (
                      <div className="badge badge-outline" key={i}>{el}</div> 
                    ))}
                    </div>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n",
        }}
      />
    </>
  );
}
