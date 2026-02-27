// ════════════════════════════════════════════════════
//  menu.js — DATOS DEL MENÚ
//
//  Aquí se editan nombres, precios, imágenes/videos
//  y descripciones de cada producto.
//
//  Para agregar media a un producto:
//    src:  'media/nombre-archivo.jpg'   (imagen)
//    src:  'media/nombre-archivo.mp4'   (video)
//    type: 'video'                      (solo si es video)
//    desc: 'Descripción del producto.'  (texto propio)
//
//  Si un producto no tiene src/desc, usa el placeholder
//  y el texto genérico automáticamente.
// ════════════════════════════════════════════════════

const MENU = [

  {
    id:    'calientes',
    title: 'Bebidas\nCalientes',
    sub:   'Chica / Grande',
    items: [
      { name: 'Expreso',                              price: '$40'        },
      { name: 'Expreso Cortado',                      price: '$45'        },
      { name: 'Americano',                            price: '$50 / $55'  },
      { name: 'Capuchino',                            price: '$65 / $70'  },
      { name: 'Latte',                                price: '$65 / $70'  },
      { name: 'Matcha',                               price: '$65 / $70'  },
      { name: 'Chai',                                 price: '$65 / $70'  },
      { name: 'Caramel Macchiato',                    price: '$65 / $70'  },
      { name: 'Leche Dorada',                         price: '$65 / $70'  },
      { name: 'Dirty Chai',                           price: '$70 / $75'  },
      { name: 'Chocolate de Metate', sub: 'Agua',     price: '$60 / $65'  },
      { name: 'Chocolate de Metate', sub: 'Leche',    price: '$65 / $70'  },
      { name: 'Tisana',                               price: '$60 / $65'  },
    ]
  },

  {
    id:    'frias',
    title: 'Bebidas\nFrías',
    items: [
      { name: 'Frappuccino',            price: '$75' },
      { name: 'Latte Frío',             price: '$75' },
      { name: 'Matcha Frío',            price: '$75' },
      { name: 'Chai Frío',              price: '$75' },
      { name: 'Caramel Macchiato Frío', price: '$75' },
      { name: 'Chocolate Blanco',       price: '$75' },
      { name: 'Leche Dorada Fría',      price: '$75' },
      { name: 'Smoothies',              price: '$75' },
      { name: 'Malteadas',              price: '$75' },
      { name: 'Dirty Chai Frío',        price: '$80' },
      { name: 'Monster',                price: '$45' },
      { name: 'Agua Chica',             price: '$15' },
      { name: 'Agua Grande',            price: '$25' },
      { name: 'Tisana Fría',            price: '$60' },
      { name: 'Refrescos',              price: '$25' },
    ]
  },

  {
    id:     'batidos',
    title:  'Batidos',
    sub:    'Todos · $75',
    layout: 'grid',
    nota:   '* Extra proteína — $25',
    items: [
      { name: 'Chocolate',               price: '$75' },
      { name: 'Fresa',                   price: '$75' },
      { name: 'Frutos Rojos',            price: '$75' },
      { name: 'Crema de Maní / Plátano', price: '$75' },
      { name: 'Mango / Fresa',           price: '$75' },
      { name: 'Guayaba',                 price: '$75' },
      { name: 'Fresa / Coco',            price: '$75' },
      { name: 'Mango',                   price: '$75' },
    ]
  },

  {
    id:    'panaderia',
    title: 'Panadería',
    items: [
      { name: 'Concha',             price: '$30' },
      { name: 'Muffin',             price: '$35' },
      { name: 'Croissant',          price: '$45' },
      { name: 'Chocolatín',         price: '$45' },
      { name: 'Rol con Chispas',    price: '$45' },
      { name: 'Frangipán',          price: '$50' },
      { name: 'Rebanada de Pastel', price: '$45' },
    ]
  },

  {
    id:    'hotcakes',
    title: 'Hotcakes\n& Waffles',
    items: [
      { name: 'Hotcakes / Waffles', price: '$75' },
    ]
  },

  {
    id:    'wraps',
    title: 'Wraps &\nEnsaladas',
    items: [
      { name: 'Wrap',     sub: 'Pollo chipotle · Pollo finas hierbas · Pavo · Atún', price: '$95' },
      { name: 'Ensalada', sub: 'Pollo · Atún',                                       price: '$95' },
    ]
  },

];
