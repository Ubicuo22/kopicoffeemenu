# wifi-instagram — Plan de implementación
> Contexto para Claude Code · Kopi Coffee · `kopimenu.ubicuo.icu`

---

## Objetivo
Crear una página `/wifi/` en el repo existente del sitio de Kopi Coffee que:
1. Solo muestre el acceso en horario de apertura
2. Pida al usuario seguir el Instagram del negocio antes de revelar la contraseña del WiFi

---

## Contexto del proyecto

- **URL base:** `https://kopimenu.ubicuo.icu`
- **Página existente de referencia:** `https://kopimenu.ubicuo.icu/links/`
- **Instagram:** `https://www.instagram.com/kopi_coffee_andador`
- **Stack:** HTML estático (sin framework), conectado a dominio propio
- **Deploy:** Git push al repo → se refleja en el dominio

---

## Estructura a crear

```
wifi/
└── index.html   ← única página nueva
```

---

## Flujo de la página

```
GET kopimenu.ubicuo.icu/wifi/
        ↓
¿Hora actual dentro del horario?
    NO  → Vista "cerrado" con hora de apertura
    SÍ  → Vista "follow" con botón de Instagram
              ↓ usuario presiona "Ya te seguí"
           Vista "contraseña" revela clave WiFi
```

---

## Vistas / estados (JS vanilla, sin frameworks)

### Estado 1 — Cerrado
- Ícono de reloj o luna
- Texto: *"Vuelve cuando abramos · [HORA_APERTURA] – [HORA_CIERRE]"*
- Sin ningún dato sensible visible

### Estado 2 — Follow
- Logo de Kopi Coffee (`/imagotipokopi.png`)
- Texto: *"Síguenos en Instagram para conectarte al WiFi"*
- Botón primario → abre Instagram en nueva pestaña
- Botón secundario → *"Ya te seguí →"* avanza al estado 3

### Estado 3 — Contraseña
- Ícono WiFi + animación suave de reveal
- Contraseña en texto grande, fácil de leer
- Texto: *"¡Gracias! Ya puedes conectarte"*
- Red: `[NOMBRE_RED]`
- Contraseña: `[CONTRASEÑA_WIFI]`

---

## Variables a completar antes de codear

```js
const CONFIG = {
  horario: {
    apertura: { hora: ??, minutos: 0 },   // ej: 8
    cierre:   { hora: ??, minutos: 0 },   // ej: 22
  },
  wifi: {
    red: "??",          // nombre de la red WiFi
    password: "??",     // contraseña
  },
  instagram: "https://www.instagram.com/kopi_coffee_andador",
};
```

---

## Diseño / estética

Copiar el estilo de `/links/` para consistencia visual:
- Fondo oscuro (revisar CSS del repo)
- Tipografía y colores existentes
- Logo: `https://kopimenu.ubicuo.icu/imagotipokopi.png`
- Footer: *"kopi coffee · Plaza Andador · Morelia"*

---

## QR

Una vez desplegado, generar QR apuntando a:
```
https://kopimenu.ubicuo.icu/wifi/
```
Herramienta gratuita sugerida: [qr.io](https://qr.io) o equivalente.
Imprimir y colocar en mesas / mostrador.

---

## Notas técnicas

- **Sin backend requerido** — todo es client-side
- El horario se calcula con `new Date()` en el navegador del cliente
  - ⚠️ Afinarlo: definir si se usa hora local del cliente o se fuerza zona horaria `America/Mexico_City`
- El "follow" no se verifica programáticamente (requeriría OAuth + backend)
  - La fricción del botón es suficiente como barrera social
- Si en el futuro se quiere verificación real, agregar una Cloud Function o endpoint serverless

---

## Checklist de implementación

- [ ] Confirmar horario exacto de apertura y cierre
- [ ] Confirmar nombre de red y contraseña WiFi
- [ ] Revisar estructura del repo para saber dónde crear `wifi/`
- [ ] Crear `wifi/index.html` siguiendo este plan
- [ ] Probar los 3 estados manualmente (modificar hora en devtools)
- [ ] Hacer push y verificar en `kopimenu.ubicuo.icu/wifi/`
- [ ] Generar e imprimir QR
