import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../service/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/CartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalPrice());
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority;
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <button onClick={() => dispatch(fetchAddress())}>get Postion</button>
      <Form method="POST">
        <div className="box">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="box">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="box">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primary">
            {isSubmitting ? "Placing order...." : `Order now ${totalPrice} `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // priority box
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // if everything is okay create new order return and redirect
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "please give us your correct phone number.We might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
