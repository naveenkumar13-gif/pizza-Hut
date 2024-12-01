import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UPdateQuantity from "./UPdateQuantity";
import { getCuurentQuantityId } from "./CartSlice";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currenQuantity = useSelector(getCuurentQuantityId(pizzaId));
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UPdateQuantity pizzaId={pizzaId} currenQuantity={currenQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
