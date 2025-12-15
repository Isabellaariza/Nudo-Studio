# NUDO STUDIO - Edge Functions

## Funciones Activas

### `server`
Función principal que maneja todas las rutas de la API del e-commerce.

**Rutas disponibles:**
- `/api/signup` - Registro de usuarios
- `/api/user` - Obtener información del usuario
- `/api/products` - CRUD de productos
- `/api/workshops` - CRUD de talleres
- `/api/cart` - Gestión del carrito
- `/api/orders` - Gestión de pedidos
- `/api/news` - Gestión de novedades/blog
- `/api/seed` - Datos de prueba (desarrollo)

**Configuración:**
- `verify_jwt: false` - No requiere verificación JWT en la función (se maneja internamente)
- Puerto: Desplegado en Supabase Edge Functions

## Estructura de Archivos

```
/supabase/functions/
├── README.md          # Este archivo
└── server/            # Función principal
    ├── index.tsx      # Entry point de la función
    ├── kv_store.tsx   # Almacenamiento en memoria
    └── deno.json      # Configuración de Deno
```

## Configuración de Despliegue

La función está configurada en:
- `/functions.json` - Configuración de Figma Make
- `/supabase/config.toml` - Configuración de Supabase CLI

## Notas Importantes

- ⚠️ La función `make-server` está DEPRECADA y no debe ser usada
- ✅ Toda la lógica está consolidada en la función `server`
- 🔒 La autenticación se maneja mediante tokens de Supabase Auth
- 💾 Los datos se almacenan en memoria (Deno KV Store)

## Desarrollo Local

Para probar localmente:
```bash
supabase functions serve server --no-verify-jwt
```

## Despliegue

El despliegue se hace automáticamente desde Figma Make.
Solo se debe desplegar la función `server`.
