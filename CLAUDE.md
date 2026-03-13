# Kopi Coffee — Contexto del Proyecto

## Qué es
Menú digital y página de WiFi para **Kopi Coffee**, un kiosko de specialty coffee ubicado en Plaza Andador, Morelia, Michoacán.

- **URL:** https://kopimenu.ubicuo.icu/
- **Owner:** Ubicuo22
- **Stack:** HTML estático + CSS + JS vanilla. Sin frameworks ni bundler.

## Estructura
```
index.html          ← Menú principal
wifi/index.html     ← Página WiFi (flujo follow → contraseña)
css/styles.css      ← Estilos globales
js/app.js           ← Lógica: construye el menú dinámicamente, expandibles, scroll reveal
js/menu.js          ← DATOS DEL MENÚ (aquí se editan precios, nombres, productos)
links/              ← Página de links (linktree)
media/              ← Videos e imágenes de productos
fonts/              ← Behmer.otf (fuente display del logo)
```

## Menú actual (js/menu.js)

### Bebidas Calientes (Chica / Grande)
| Producto | Precio |
|---|---|
| Espresso | $40 |
| Espresso Cortado | $45 |
| Americano | $50 / $55 |
| Capuchino | $65 / $70 |
| Latte | $65 / $70 |
| Matcha | $65 / $70 |
| Chai | $65 / $70 |
| Taro | $65 / $70 |
| Caramel Macchiato | $65 / $70 |
| Leche Dorada | $65 / $70 |
| Dirty Chai | $70 / $75 |
| Chocolate de Metate (Agua) | $60 / $65 |
| Chocolate de Metate (Leche) | $65 / $70 |
| Tisana | $60 / $65 |

### Bebidas Frías
| Producto | Precio |
|---|---|
| Frappuccino | $75 |
| Latte Frío | $75 |
| Matcha Frío | $75 |
| Chai Frío | $75 |
| Taro Frío | $75 |
| Caramel Macchiato Frío | $75 |
| Chocolate Blanco | $75 |
| Leche Dorada Fría | $75 |
| Smoothies | $75 |
| Malteadas | $75 |
| Dirty Chai Frío | $80 |
| Monster | $45 |
| Agua Chica/Mediana/Grande | $15 / $20 / $25 |
| Tisana Fría | $60 |
| Refrescos | $25 |

### Batidos (Todos $75, extra proteína +$25)
Chocolate, Fresa, Frutos Rojos, Crema de Maní/Plátano, Mango/Fresa, Guayaba, Fresa/Coco, Mango

### Panadería
| Producto | Precio |
|---|---|
| Concha | $30 |
| Brownie | $45 |
| Croissant | $45 |
| Chocolatín | $45 |
| Rol con Chispas | $45 |
| Frangipán | $50 |

### Hotcakes — $75

### Wraps & Ensaladas — $95
- Wrap: Pollo chipotle / Pollo finas hierbas / Pavo / Atún
- Ensalada: Pollo / Atún

### Suplementos (Todos $25 por porción/scoop)
Creatina, Preentreno, Proteína, BCAAs, Colágeno

## Página WiFi (`/wifi/`)
Flujo: usuario ve CTA → abre Instagram de Kopi → espera countdown de 10s → aparece botón "Ver contraseña WiFi".

- La contraseña WiFi está hardcodeada en `wifi/index.html`
- El botón de Instagram apunta al perfil de Kopi Coffee

## Cómo editar el menú
Solo hay que editar `js/menu.js`. Cada sección es un objeto con:
- `id`, `title`, `sub` (subtítulo opcional), `layout` ('grid' o lista), `nota`
- `items[]`: `{ name, sub, price, src, type, desc }`
  - `src`: ruta a `media/archivo.jpg` o `.mp4`
  - `type: 'video'` si es video
  - `desc`: descripción propia (si se omite usa texto genérico)

## Deploy
Sitio estático en GitHub Pages con CNAME `kopimenu.ubicuo.icu`. Se publica automáticamente desde `main`.

## Convenciones Git
- Branch de trabajo: `claude/review-wifi-instagram-plan-epDdL`
- Commits en español, formato: `tipo(scope): descripción`
- Nunca hacer push directo a `main` sin PR
