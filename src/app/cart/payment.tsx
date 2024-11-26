import { useState, useRef, FormEvent } from "react";
import { useCartStore, useUserBalanceStore } from "../CartStore";
import { IProduct, IProductCount } from "../catalog/Product";
import SuccessMessage from "./dialogSuccess";

export default function Payment(props: {
  products: IProductCount[];
  catalog: IProduct[] | null;
}) {
  const { products } = props;
  const catalog = props.catalog || [];
  const cartCount = useCartStore((state) => state.cartCount);
  const userBalance = useUserBalanceStore((state) => state.coins);
  const topUpCoins = useUserBalanceStore((state) => state.topUpCoins);
  const refConverterForm = useRef<HTMLFormElement>(null);
  const resetCart = useCartStore((state) => state.resetCart);
  const debitCoins = useUserBalanceStore((state) => state.debitCoins);
  const [payMethod, setPayMethod] = useState<string>("coins");
  const [isSuccessfulPayment, setIsSuccessfulPayment] =
    useState<boolean>(false);

  const countCost = () => {
    const cartItems = catalog.filter((product) =>
      products.some((pc) => pc.id === product.id)
    );
    let cost = 0;
    for (const item of cartItems) {
      const price = item.price;
      const count = Object.values(products).find(
        (product) => item.id === product.id
      )?.count;
      if (count) cost += price * count;
    }
    return Number(cost.toFixed(2));
  };
  const cost = {
    coinsCost: countCost(),
    cardCost: countCost(),
  };

  const handleChangePayMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayMethod(e.target.value);
  };

  const convertCoins = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (refConverterForm.current != null) {
      const inputElement: HTMLInputElement = refConverterForm.current
        .children[0] as HTMLInputElement;
      try {
        if (Number.isNaN(Number(inputElement.value))) {
          console.log(inputElement.value);
          throw new Error("CoinsConverter value equival NaN");
        }
        topUpCoins(Number(inputElement.value));
        inputElement.value = "";
        inputElement.placeholder = "12345";
      } catch {
        inputElement.classList.add("border-red");
        inputElement.value = "";
        inputElement.placeholder = "Неверное значение";
      }
    }
  };

  function Pay(
    payMethod: string,
    cost: { coinsCost: number; cardCost: number }
  ) {
    if (cost.cardCost == 0 || cost.coinsCost == 0) return;
    if (payMethod == "coins") {
      if (userBalance < cost.coinsCost) {
        alert("Недостаточно Coins");
        return;
      } else {
        debitCoins(cost.coinsCost);
        setIsSuccessfulPayment(true);
        resetCart();
      }
    } else {
      resetCart();
      setIsSuccessfulPayment(true);
    }
  }

  return (
    <>
      <section className="flex flex-col gap-4 px-9 py-6 w-fit rounded-2xl bg-[#E6E6E6]">
        <h2 className="font-medium text-[2rem]">Total</h2>
        <div className="grid grid-cols-2 gap-24 w-full">
          <div className="flex flex-col w-fit justify-between gap-9">
            <div className="flex flex-col gap-4">
              <p className="font-medium text-[2rem]">{`${cartCount} ${
                cartCount > 1 ? "products" : "product"
              }`}</p>
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-medium">
                  You have: {"\u00A0"}
                  <span className="font-bold text-[#5C8D2C]">{`${userBalance}C`}</span>
                </p>
                <p className="text-xl w-full text-wrap">
                  Do you want to top up your account?
                </p>
                <p className="text-base font-light">1C = 1$</p>
              </div>
            </div>
            <form
              onSubmit={convertCoins}
              ref={refConverterForm}
              className="flex flex-col gap-3"
            >
              <input
                type="text"
                placeholder="12345"
                className="relative flex px-4 items-center w-full h-14 transition-all outline-none border border-[#7a7a7a] rounded-2xl bg-transparent focus:border-gray-700"
              />
              <button
                type="submit"
                className="flex justify-center items-center px-6 py-2 w-full h-[3.75rem] rounded-2xl bg-green-coin font-medium text-2xl text-white transition-all hover:bg-green-coin-hover active:bg-green-coin-active"
              >
                Top up Coins
              </button>
            </form>
          </div>
          <div className="flex flex-col w-full justify-between gap-9 h-full">
            <div className="flex flex-col gap-1 font-semibold">
              <p className="text-2xl">Total cost</p>
              <div className="flex flex-wrap items-end gap-2">
                <p className="text-4xl">{`${cost.coinsCost}C`}</p>
                <span className="text-xl">or</span>
                <p className="text-4xl">{`${cost.cardCost}$`}</p>
              </div>
            </div>
            <form
              action=""
              className="flex flex-col px-4 py-3 gap-3 w-full h-fit rounded-2xl border border-[#7a7a7a] text-base"
            >
              <p className="">Payment method</p>
              <div className="flex items-center gap-2 font-medium">
                <input
                  type="radio"
                  defaultChecked={true}
                  name="payment-method"
                  id="coinsRadio"
                  value="coins"
                  onChange={handleChangePayMethod}
                  className="w-6 h-6 appearance-none bg-white border-solid border-2 transition-all cursor-pointer border-green-coin rounded-full checked:bg-green-coin checked:border-white checked:border-6 checked:outline checked:outline-2 checked:outline-green-coin "
                />
                <label htmlFor="coinsRadio">Coins</label>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <input
                  type="radio"
                  name="payment-method"
                  id="cardRadio"
                  value="card"
                  onChange={handleChangePayMethod}
                  className="w-6 h-6 appearance-none bg-white border-solid border-2 transition-all cursor-pointer border-green-coin rounded-full checked:bg-green-coin checked:border-white checked:border-6 checked:outline checked:outline-2 checked:outline-green-coin "
                />
                <label htmlFor="cardRadio">Bank card</label>
              </div>
            </form>
            <button
              onClick={() => Pay(payMethod, cost)}
              className="flex justify-center items-center px-6 py-2 w-full h-[3.75rem] rounded-2xl bg-green-coin font-medium text-2xl text-white transition-all hover:bg-green-coin-hover active:bg-green-coin-active"
            >
              Pay
            </button>
          </div>
        </div>
      </section>
      <SuccessMessage
        isSuccessfulPayment={isSuccessfulPayment}
        setIsSuccessfulPayment={setIsSuccessfulPayment}
      />
    </>
  );
}
