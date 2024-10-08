export const registerFormControls = [
  {
    name: "userName",
    label: "Nome de Usuário",
    placeholder: "Digite seu nome de usuário",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "E-mail",
    placeholder: "Digite seu e-mail",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "E-mail",
    placeholder: "Digite seu e-mail",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Digite sua senha",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Título",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Digite o título do produto",
  },
  {
    label: "Descrição",
    name: "description",
    componentType: "textarea",
    placeholder: "Digite a descrição do produto",
  },
  {
    label: "Categoria",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Homem" },
      { id: "women", label: "Mulher" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Acessórios" },
      { id: "footwear", label: "Calçados" },
    ],
  },
  {
    label: "Marca",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Preço",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Digite o preço do produto",
  },
  {
    label: "Preço de Venda",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Digite o preço de venda (opcional)",
  },
  {
    label: "Estoque Total",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Digite o estoque total",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Início",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Produtos",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Homem",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Mulher",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Calçados",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Acessórios",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Buscar",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  men: "Homem",
  women: "Mulher",
  kids: "Kids",
  accessories: "Acessórios",
  footwear: "Calçados",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

export const filterOptions = {
  category: [
    { id: "men", label: "Homem" },
    { id: "women", label: "Mulher" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Acessórios" },
    { id: "footwear", label: "Calçados" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Preço: Menor para Maior" },
  { id: "price-hightolow", label: "Preço: Maior para Menor" },
  { id: "title-atoz", label: "Título: A a Z" },
  { id: "title-ztoa", label: "Título: Z a A" },
];

export const addressFormControls = [
  {
    label: "Endereço",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu endereço",
  },
  {
    label: "Cidade",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Digite sua cidade",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu pincode",
  },
  {
    label: "Telefone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu número de telefone",
  },
  {
    label: "Notas",
    name: "notes",
    componentType: "textarea",
    placeholder: "Digite quaisquer notas adicionais",
  },
];
