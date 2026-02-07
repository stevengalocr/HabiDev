# � HabiDev - Construye Mejores Hábitos

**Una app moderna, cálida y minimalista para el control de hábitos**

> Desarrollada por **GaloDev.com** | Diseñada para transmitir orden, paz y crecimiento

---

## 🎨 Identidad Visual

### Filosofía de Diseño

HabiDev está diseñada con una estética **cálida, limpia y minimalista** que transmite:

- ✨ **Orden** - Diseño estructurado y organizado
- 🌿 **Paz** - Paleta de colores relajante
- 📈 **Crecimiento** - Símbolos de progreso y naturaleza
- 🎯 **Balance** - Armonía visual y funcional

### Psicología del Color

| Color                       | Hex       | Significado                         |
| --------------------------- | --------- | ----------------------------------- |
| **Teal** (Principal)        | `#14B8A6` | Crecimiento, equilibrio, renovación |
| **Naranja Cálido** (Acento) | `#FB923C` | Energía positiva, motivación        |
| **Blanco Roto** (Fondo)     | `#FAFAF9` | Minimalismo, limpieza, respiro      |
| **Piedra** (Texto)          | `#1C1917` | Estabilidad, grounding              |

### Elementos Visuales

- 🍃 **Logo**: Hoja (leaf) - símbolo de crecimiento orgánico
- 🎨 **Gradientes suaves**: Teal a Teal claro
- 📐 **Bordes redondeados**: 12-24px para suavidad
- 🌫️ **Sombras sutiles**: Elevación delicada
- 🔤 **Tipografía**: Geist Sans (limpia y moderna)

---

## 🚀 Tech Stack

- **Frontend**: React Native con Expo Router
- **Backend**: Supabase (PostgreSQL + Auth)
- **UI/UX**: Diseño minimalista con animaciones suaves
- **Autenticación**: Sistema completo con validación robusta
- **Tipografía**: Basada en Geist Sans (GaloDev.com brand)

---

## 📱 Features (v1.0)

### ✅ Sistema de Autenticación Completo

- Login con email/password
- Registro con validación exhaustiva
- Recuperación de contraseña
- Mensajes de error personalizados en español
- Verificación de email
- Protección con Row Level Security

### 🎯 Gestión de Hábitos (Próximamente)

- Crear hábitos personalizados
- Categorizar hábitos (Salud, Productividad, etc.)
- Clasificar como buenos o malos
- Definir frecuencia (diario, semanal, personalizado)
- Establecer objetivos
- Recordatorios configurables

### 📊 Analytics & Visualización (Próximamente)

- Gráficos de progreso
- Rachas (streaks) de completación
- Estadísticas detalladas
- Reportes semanales/mensuales

---

## 🛠️ Setup del Proyecto

### 1. Clonar el Repositorio

```bash
git clone <tu-repo>
cd habidev
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
EXPO_PUBLIC_SUPABASE_URL=https://ayfsapwmrxvveeeejazj.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
EXPO_PUBLIC_APP_URL=http://localhost:8081
```

### 4. Configurar Supabase

Lee las instrucciones detalladas en: `supabase/README.md`

**Resumen rápido**:

1. Ve al SQL Editor en Supabase
2. Copia y pega el contenido de `supabase/schema.sql`
3. Ejecuta el script

### 5. Iniciar el Proyecto

```bash
npx expo start
```

**Opciones**:

- Presiona `w` para abrir en el navegador web
- Escanea el código QR con Expo Go en tu celular (iOS/Android)
- Presiona `a` para Android emulator
- Presiona `i` para iOS simulator (solo Mac)

---

## 📁 Estructura del Proyecto

```
habidev/
├── app/                      # Expo Router - Rutas de la app
│   ├── (auth)/              # Pantallas de autenticación
│   │   ├── login.tsx        # Inicio de sesión
│   │   ├── register.tsx     # Registro
│   │   └── forgot-password.tsx
│   ├── (tabs)/              # Navegación principal
│   │   ├── explore.tsx      # Pantalla principal
│   │   └── profile.tsx      # Perfil de usuario
│   ├── _layout.tsx          # Layout raíz con AuthProvider
│   └── index.tsx            # Splash/Redirect inicial
│
├── src/
│   ├── components/
│   │   └── ui/              # Componentes reutilizables
│   │       ├── Input.tsx    # Input con validación
│   │       └── Button.tsx   # Botón con variantes
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx  # Estado global de autenticación
│   │
│   ├── lib/
│   │   └── supabase.ts      # Cliente de Supabase
│   │
│   ├── theme/
│   │   ├── Colors.ts        # Paleta de colores (warm palette)
│   │   ├── typography.ts    # Sistema tipográfico
│   │   └── tokens.ts        # Spacing, borders, shadows
│   │
│   └── utils/
│       └── validation.ts    # Validadores y mensajes de error
│
├── supabase/
│   ├── schema.sql           # Schema completo de la BD
│   └── README.md            # Instrucciones de setup
│
├── .env                     # Variables de entorno (no subir a git)
└── package.json
```

---

## 🎨 Design System

### Colores Principales

- **Primary (Teal)**: `#14B8A6` - Crecimiento y equilibrio
- **Accent (Orange)**: `#FB923C` - Energía y calidez
- **Background**: `#FAFAF9` - Blanco cálido
- **Surface**: `#F5F5F4` - Gris muy claro
- **Text**: `#1C1917` - Casi negro

### Colores Semánticos

- **Success**: `#10B981` (Emerald) - Logros
- **Warning**: `#F59E0B` (Amber) - Atención
- **Error**: `#EF4444` (Red) - Errores
- **Hábitos Buenos**: `#10B981` (Green)
- **Hábitos Malos**: `#F97316` (Orange)

### Tipografía

Basada en **Geist Sans** (GaloDev.com brand):

- Sans: System fonts optimizados
- Tamaños: 12px - 60px
- Pesos: 400, 500, 600, 700

### Spacing

- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px

### Bordes

- sm: 8px | md: 12px | lg: 16px | xl: 24px

---

## 🔐 Seguridad

- ✅ Variables de entorno protegidas (`.env` en `.gitignore`)
- ✅ Row Level Security (RLS) en Supabase
- ✅ Validación exhaustiva de inputs
- ✅ Mensajes de error seguros (no exponen información sensible)
- ✅ Sanitización de datos de usuario

---

## 📝 Roadmap

### ✅ Fase 1: Autenticación & Branding (COMPLETADO)

- [x] Login/Register/Password Reset
- [x] Validación robusta
- [x] UI cálida y minimalista
- [x] Integración con Supabase Auth
- [x] Identidad visual definida

### 🚧 Fase 2: Gestión de Hábitos (SIGUIENTE)

- [ ] CRUD de hábitos
- [ ] Categorías personalizadas
- [ ] Tracking diario
- [ ] Notificaciones/Recordatorios

### 📅 Fase 3: Analytics & Visualización

- [ ] Gráficos de progreso
- [ ] Estadísticas detalladas
- [ ] Rachas y logros
- [ ] Exportar datos

### 🎯 Fase 4: Features Avanzadas

- [ ] Modo offline
- [ ] Compartir hábitos (social)
- [ ] Temas personalizados
- [ ] Widgets

### 🚀 Fase 5: Lanzamiento

- [ ] Testing exhaustivo
- [ ] Optimización de rendimiento
- [ ] Preparación para App Store/Play Store
- [ ] Marketing y lanzamiento

---

## 🤝 Contribuir

Este es un proyecto privado de **GaloDev.com**. Si tienes sugerencias, abre un issue.

---

## 📮 Contacto

**Developed by**: GaloDev.com  
**Product**: HabiDev - Habit Tracking App  
**Website**: https://galodev.com

---

## 📄 Licencia

© 2026 GaloDev.com. Todos los derechos reservados.

---

🌱 **Made with care using React Native & Supabase**
