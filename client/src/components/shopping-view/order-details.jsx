import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";

function ShoppingOrderDetailsView({ orderDetails }) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">ID do pedido</p>
            <Label>{orderDetails?._id}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Data do pedido</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Preço do pedido</p>
            <Label>{orderDetails?.totalAmount}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Método de pagamento</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Status do pagamento</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>

          <div></div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
