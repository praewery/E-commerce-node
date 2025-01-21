const prisma = require('../config/prisma')

exports.create = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } = req.body;
    const product = await prisma.product.create({
      data: {
        title: title,
        description: description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
          images: {
            create: images.map((item) => ({
                asset_id: item.asset_id,
                public_id: item.public_id,
                url: item.url,
                secure_url: item.secure_url
            }))
        },
      },
    });

    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.list = async (req, res) => {
  try {
    const{count}  = req.params
    const products = await prisma.product.findMany({
        take: parseInt(count),
        orderBy: { createdAt : 'desc' },//desc = สินค้าเรียงจากมากไปน้อย
        include: {
            category: true,
            images: true,
            
        }
    })
    console.log(count)
    res.send(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.update = async (req, res) => {
  try {
    res.send("hi update product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.remove = async (req, res) => {
  try {
    res.send("remove product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.listby = async (req, res) => {
  try {
    res.send("list by product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.searchfilter = async (req, res) => {
  try {
    res.send("search filter product");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
