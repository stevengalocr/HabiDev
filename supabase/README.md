# 🗄️ Configuración de Base de Datos - HabiDev

## 📋 Instrucciones para Configurar Supabase

### Paso 1: Acceder al SQL Editor

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. En el menú lateral, haz clic en **"SQL Editor"**
3. Haz clic en **"New Query"**

### Paso 2: Ejecutar el Schema

1. Abre el archivo `schema.sql` de este directorio
2. Copia **TODO** el contenido del archivo
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **"Run"** (botón inferior derecho)

### Paso 3: Verificar la Creación

Deberías ver un mensaje de éxito. Verifica que se crearon las siguientes tablas:

✅ **Tablas creadas**:

- `profiles` - Perfiles de usuario extendidos
- `habit_categories` - Categorías para organizar hábitos
- `habits` - Tabla principal de hábitos
- `habit_logs` - Registro diario de completación de hábitos

### Paso 4: Configurar Autenticación

1. Ve a **"Authentication" → "Providers"** en el menú lateral
2. Asegúrate de que **Email** esté habilitado
3. Opcionalmente, puedes habilitar **Google**, **Apple**, etc.

### Paso 5: Configurar Email Templates (Opcional)

1. Ve a **"Authentication" → "Email Templates"**
2. Personaliza los mensajes de:
   - Confirmación de cuenta
   - Recuperación de contraseña
   - Cambio de email

---

## 🔐 Políticas de Seguridad (RLS)

El schema ya incluye políticas de Row Level Security que garantizan:

- ✅ Los usuarios solo pueden ver y modificar sus propios datos
- ✅ Los perfiles son públicos (para futuras features sociales)
- ✅ Las operaciones están protegidas a nivel de base de datos

---

## 📊 Estructura de Datos

### `profiles`

Extiende `auth.users` con información adicional del usuario.

### `habit_categories`

Permite organizar hábitos en categorías personalizadas (ej: Salud, Productividad, etc.)

### `habits`

Tabla principal con:

- Tipo: `good` (hábito bueno) o `bad` (hábito malo)
- Frecuencia: `daily`, `weekly`, o `custom`
- Objetivo diario/semanal
- Recordatorios opcionales

### `habit_logs`

Registro de cada vez que se completa un hábito, usado para:

- Estadísticas
- Gráficos
- Rachas (streaks)

---

## 🚀 Próximos Pasos

Después de ejecutar este schema, tu app estará lista para:

1. ✅ Registro e inicio de sesión
2. ✅ Creación de hábitos personalizados
3. ✅ Organización por categorías
4. ✅ Tracking diario
5. ✅ (Próximamente) Gráficos y estadísticas

---

**by GaloDev.com**
