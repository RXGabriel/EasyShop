const paypal = require("../../utils/paypal");
const Order = require("../../models/Order");
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "BRL",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "BRL",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: true,
          message: "Erro ao criar o pagamento.",
        });
      } else {
        const createOrder = await Order.create({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await createOrder.save();
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        );

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: createOrder._id,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao criar o pedido.",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findById({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Erro ao buscar o pedido",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao buscar os pedidos.",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao buscar os detalhes do pedido.",
    });
  }
};

module.exports = { createOrder, getAllOrdersByUser, getOrderDetails };
