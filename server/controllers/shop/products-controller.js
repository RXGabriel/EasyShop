const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    let filters = {};

    if (Array.isArray(category) && category.length) {
      filters.category = { $in: category };
    } else if (typeof category === "string" && category) {
      filters.category = { $in: category.split(",") };
    }

    if (Array.isArray(brand) && brand.length) {
      filters.brand = { $in: brand };
    } else if (typeof brand === "string" && brand) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-ztoa":
        sort.title = -1;
      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao tentar recuperar os produtos",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Produto não encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao tentar recuperar os produtos",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
