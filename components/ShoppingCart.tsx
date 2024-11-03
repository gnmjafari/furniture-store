import Image from "next/image";
import React, { useEffect } from "react";
import { fetcher, getShoppingCart } from "./utils";
import { ShoppingCart as cartType, Product } from "@/types/types";
import useSWR, { mutate } from "swr";
import _ from "lodash";
import { MdClose } from "react-icons/md";

const ShoppingCart = () => {
  const { data, isLoading } = useSWR("/api", fetcher);
  const { data: cart, isLoading: isLoadingGetCart } = useSWR<
    cartType[] | undefined
  >("cart", () => getShoppingCart());

  useEffect(() => {
    const cart = getShoppingCart();
    mutate("cart", cart);
  }, []);

  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number
  ) => {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
  };

  const calculateTotalPrice = (cart: cartType[], products: Product[]) => {
    return cart.reduce((total, item) => {
      const product = products.find((product) => product.id === item.productId);
      if (product) {
        const finalPrice = product.discount
          ? calculateDiscountedPrice(product.price, product.discountPercentage)
          : product.price;
        return total + finalPrice * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div className="drawer drawer-end w-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
          <Image
            src="/icon/Vector.png"
            alt="Next.js Vector"
            width={20}
            height={20}
            style={{ width: "20px", height: "20px" }}
            priority
          />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="relative menu bg-base-200 text-base-content min-h-[500px] w-96 p-4">
          <div className="text-2xl">Shopping Cart</div>
          <div className="divider" />
          <div className="flex flex-col justify-start h-auto max-h-[270px] overflow-y-scroll items-start gap-5">
            {isLoading || isLoadingGetCart ? (
              <span className="loading loading-ring loading-lg mx-auto"></span>
            ) : (
              <>
                {cart &&
                  cart.map((item, key) => {
                    const findProduct: Product = _.find(
                      data.products,
                      (product: Product) => product.id == item.productId && item
                    );

                    if (findProduct) {
                      return (
                        <div
                          key={key}
                          className="flex flex-row justify-start items-center gap-5"
                        >
                          <div className="relative w-20 h-20 rounded-md overflow-hidden">
                            <Image
                              className="object-cover"
                              src={findProduct.image}
                              alt={findProduct.name}
                              fill
                            />
                          </div>
                          <div className="flex justify-center items-start flex-col gap-3 bg-transparent">
                            <div>{findProduct.name}</div>
                            <div className="flex justify-start items-center gap-5">
                              <span>{item.quantity}</span>
                              <span className="cursor-pointer">
                                <MdClose />
                              </span>
                              <span className="text-warning flex justify-start items-center gap-2">
                                <span>Rs.</span>
                                {findProduct.discount ? (
                                  <>
                                    <span className="line-through text-black">
                                      {findProduct.price.toLocaleString("en")}
                                    </span>
                                    <span>
                                      {calculateDiscountedPrice(
                                        findProduct.price,
                                        findProduct.discountPercentage
                                      )}
                                    </span>
                                  </>
                                ) : (
                                  <span>
                                    {findProduct.price.toLocaleString("en")}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </>
            )}
          </div>

          <div className="absolute bottom-5 flex flex-col justify-start items-start gap-5 w-full">
            <div className="divider mb-0" />
            {cart && data && (
              <div className="flex  justify-between items-center gap-10">
                <span>Subtotal</span>
                <span className="text-warning">
                  {calculateTotalPrice(cart, data.products).toLocaleString(
                    "en"
                  )}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center gap-5">
              <button className="btn btn-sm btn-outline">Cart</button>
              <button className="btn btn-sm btn-outline">Checkout</button>
              <button className="btn btn-sm btn-outline">Comparison</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
