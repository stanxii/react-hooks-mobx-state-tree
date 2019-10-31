import React, { useState, ChangeEvent } from "react";
import { observer } from "mobx-react-lite";

import { useMst } from "../models/Root";

import Button from "./Button";

interface Props {}

const Cart: React.FC<Props> = observer(() => {
  const { cart } = useMst();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);

  const isDisabled = () => {
    return name === "";
  };

  return (
    <div className="w-64 mx-auto mt-16">
      <p className="font-bold text-2xl text-center">Item Cart</p>
      <label className="block">
        <span className="text-gray-200">Name</span>
        <input
          className="form-input mt-1 block w-full"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e && e.target) {
              setName(e.target.value);
            }
          }}
        />
      </label>
      <label className="block mt-2">
        <span className="text-gray-200">Price</span>
        <input
          className="form-input mt-1 block w-full"
          type="number"
          min="0.0"
          step="any"
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e && e.target) {
              setPrice(Number(e.target.value));
            }
          }}
        />
      </label>
      <div className="mt-4 flex items-center">
        <p
          style={{ fontVariant: "tabular-nums" }}
          className="leading-none font-bold text-lg"
        >
          Items: {cart.totalItems}
        </p>
        <p
          style={{ fontVariant: "tabular-nums" }}
          className="ml-4 flex-grow leading-none font-bold text-lg"
        >
          Total: {cart.totalPrice}
        </p>
        <Button
          disabled={isDisabled()}
          label="Add"
          className={`ml-4 ${isDisabled() ? "cursor-not-allowed" : ""}`}
          onClick={() => {
            cart.addCartItem({
              name,
              price
            });
          }}
        />
      </div>
      <div className="mt-3 h-56 overflow-y-scroll">
        {cart.items.map((item, index) => {
          return (
            <div
              className={`${index !== 0 &&
                "mt-2"} mr-2 px-4 py-2 flex items-center rounded rounded-sm text-gray-700 bg-gray-200`}
            >
              <div className="flex-grow">{item.name}</div>
              <div>{item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Cart;