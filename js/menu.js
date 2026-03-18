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
      { name: 'Espresso',                             price: '$40'        },
      { name: 'Espresso Cortado',                     price: '$45'        },
      { name: 'Americano',                            price: '$50 / $55'  },
      { name: 'Capuchino',                            price: '$65 / $70'  },
      { name: 'Latte',                                price: '$65 / $70'  },
      { name: 'Matcha',                               price: '$65 / $70'  },
      { name: 'Chai',                                 price: '$65 / $70'  },
      { name: 'Taro',                                 price: '$65 / $70'  },
      { name: 'Caramel Macchiato',                    price: '$65 / $70', srcs: ['media/caramel-macchiato1.jpg','media/caramel-macchiato2.jpg'], desc: 'Intenso por debajo, aterciopelado en cada sorbo. Espresso que se abre paso entre leche caliente y cremosa, coronado con caramelo que lo lleva al límite exacto de lo dulce. Entera, deslactosada, de almendra o de coco — tú eliges la leche, nosotros hacemos el resto.' },
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
      { name: 'Taro Frío',              price: '$75' },
      { name: 'Caramel Macchiato Frío', price: '$75' },
      { name: 'Chocolate Blanco',       price: '$75' },
      { name: 'Leche Dorada Fría',      price: '$75' },
      { name: 'Smoothies',              price: '$75' },
      { name: 'Malteadas',              price: '$75' },
      { name: 'Dirty Chai Frío',        price: '$80' },
      { name: 'Monster',                price: '$45', src: 'media/monster.mp4', type: 'video', desc: 'La dosis exacta de cafeína, taurina y adrenalina que necesitas para no parar. Siérvelo frío, siéntelo rápido.' },
      { name: 'Agua Chica',             price: '$15' },
      { name: 'Agua Mediana',           price: '$20' },
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
      { name: 'Brownie',            price: '$45', src: 'media/brownie1.jpg', desc: 'Húmedo por dentro, firme en cada mordida. Brownie de chocolate oscuro con almendra escondida en el corazón. El azúcar glass al final lo equilibra todo.' },
      { name: 'Croissant',          price: '$45' },
      { name: 'Chocolatín',         price: '$45' },
      { name: 'Rol con Chispas',    price: '$45' },
      { name: 'Frangipán',          price: '$50' },
    ]
  },

  {
    id:    'hotcakes',
    title: 'Hotcakes',
    items: [
      { name: 'Hotcakes', price: '$75' },
    ]
  },

  {
    id:    'wraps',
    title: 'Wraps &\nEnsaladas',
    items: [
      { name: 'Wrap',     sub: 'Pollo chipotle · Pollo finas hierbas · Pavo · Atún', price: '$95', srcs: ['media/wrap1.jpg','media/wrap2.jpg','media/wrap3.jpg'], desc: 'Crujiente en cada vuelta, fresco en cada capa. Tortilla de harina, chipotle o nopal cargada con lechuga, zanahoria rallada, morrón de colores, jitomate y queso manchego. Elige tu aderezo —César, ranch, mil islas o chipotle— y los chips al lado hacen el cierre perfecto.' },
      { name: 'Ensalada', sub: 'Pollo · Atún',                                       price: '$95' },
    ]
  },

  {
    id:    'suplementos',
    title: 'Suplementos',
    sub:   'Todos · $25 · por porción / scoop',
    items: [
      { name: 'Creatina',    src: 'media/creatina.mp4',    type: 'video', desc: 'Creatina monohidratada de grado farmacéutico. Aumenta la producción de ATP en tus músculos para mayor fuerza, rendimiento y recuperación. El suplemento más respaldado por la ciencia.' },
      { name: 'Preentreno',  src: 'media/preeworkout.mp4', type: 'video', desc: 'Fórmula explosiva con B-Alanina, Creatina, Arginina y Cafeína. Activa tu circulación, retrasa la fatiga y reduce el dolor muscular hasta un 40% en las 24-48 horas post entrenamiento.' },
      { name: 'Proteína',    src: 'media/proteina.mp4',    type: 'video', desc: 'Whey isolate con 27g de proteína y 5g de BCAAs por porción, sin azúcares. Diseñado para la recuperación muscular rápida y el rendimiento en entrenamientos de alta demanda.' },
      { name: 'BCAAs',       src: 'media/bcaas.mp4',       type: 'video', desc: 'Leucina, isoleucina y valina: los tres aminoácidos esenciales para proteger el músculo, reducir la fatiga y acelerar la recuperación. Con electrolitos para una hidratación óptima.' },
      { name: 'Colágeno',    src: 'media/colageno.mp4',    type: 'video', desc: 'Colágeno hidrolizado de alta biodisponibilidad con vitamina C, biotina y ácido hialurónico. Cuida tus articulaciones, piel, cabello y uñas desde adentro hacia afuera.' },
    ]
  },

];
