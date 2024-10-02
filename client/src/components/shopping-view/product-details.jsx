import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "../ui/dialog";
import { setProductDetails } from "@/store/shop-slice/products-slice";
import { useEffect, useState } from "react";
import StarRatingComponent from "../common/star-rating";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop-slice/cart-slice";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { addReview, getReviews } from "@/store/shop-slice/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");
  const { reviews } = useSelector((state) => state.shopReview);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Somente ${getQuantity} quantidade pode ser adicionada a esse item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        product: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Produto adicionado ao carrinho" });
      }
    });
  }

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Comentário adicionado com sucesso" });
      }
    });
  }

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold">{productDetails?.title} </h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {productDetails?.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={`text-3xl font-bold text-primary ${
              productDetails?.salePrice > 0 ? "line-through" : ""
            }`}
          >
            R${productDetails?.price}
          </p>

          {productDetails?.salePrice > 0 && (
            <p className="text-2xl font-bold text-muted-foreground">
              {productDetails?.salePrice}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-0.5">
            <StarRatingComponent rating={averageReview} />
          </div>
          <span className="text-muted-foreground">
            ({averageReview.toFixed(2)})
          </span>
        </div>

        <div className="mt-5 mb-5">
          {productDetails?.totalStock === 0 ? (
            <Button className="w-full opacity-60 cursor-not-allowed">
              Sem Estoque
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() =>
                handleAddToCart(productDetails?._id, productDetails?.totalStock)
              }
            >
              Adicionar no carrinho
            </Button>
          )}
        </div>
        <Separator />

        <div className="max-h-[300px] overflow-auto">
          <h2 className="text-xl font-bold mb-4">Comentários</h2>
          <div className="grid gap-6">
            {reviews && reviews.length > 0 ? (
              reviews.map((reviewItem) => (
                <div className="flex gap-4" key={reviewItem._id}>
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>
                      {reviewItem?.userName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">{reviewItem?.userName}</h3>
                    </div>

                    <div className="flex items-center gap-0.5">
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                    </div>

                    <p>{reviewItem.reviewMessage}</p>
                  </div>
                </div>
              ))
            ) : (
              <h1>Nenhum comentário</h1>
            )}
          </div>

          <div className="mt-10 flex-col flex gap-2">
            <Label>Escreva um comentário</Label>
            <StarRatingComponent
              rating={rating}
              handleRatingChange={handleRatingChange}
            />

            <Input
              value={reviewMsg}
              onChange={(event) => setReviewMsg(event.target.value)}
              placeholder="Escreva um comentário..."
            />

            <Button
              onClick={handleAddReview}
              disabled={reviewMsg.trim() === ""}
            >
              Enviar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
