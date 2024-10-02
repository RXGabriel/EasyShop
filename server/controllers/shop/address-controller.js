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

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      res.status(400).json({
        success: false,
        message: "Usuário e endereço é necessário",
      });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Endereço não encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao tentar editar o endereço",
    });
  }
};

module.exports = { addAddress, editAddress };
