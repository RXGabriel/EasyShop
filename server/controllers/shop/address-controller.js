const Address = require("../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Necessário preencher todos os campos",
      });
    }

    const createNewAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await createNewAddress.save();

    res.status(200).json({
      success: true,
      data: createNewAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao tentar adicionar o endereço",
    });
  }
};

module.exports = { addAddress };
