# 🎨 HabiDev - Guía de Marca

## 🌱 Concepto Visual

**HabiDev** es una marca independiente de control de hábitos que transmite:

- **Calidez** a través de tonos terrosos y cálidos
- **Limpieza** con espacios en blanco y diseño minimalista
- **Modernidad** mediante gradientes suaves y tipografía contemporánea
- **Orden y paz** con paleta relajante inspirada en la naturaleza

---

## 🎨 Paleta de Colores

### Colores Principales

```
Teal (Primary)
━━━━━━━━━━━━━━━━━━━━━━━━
#14B8A6  ████████  Teal 500
#2DD4BF  ████████  Teal 400 (Dark Mode)
#5EEAD4  ████████  Teal 300 (Light Accent)
#0D9488  ████████  Teal 600 (Dark Shade)

Naranja (Accent)
━━━━━━━━━━━━━━━━━━━━━━━━
#FB923C  ████████  Orange 400
#FDBA74  ████████  Orange 300
#F97316  ████████  Orange 500

Neutrales (Backgrounds & Text)
━━━━━━━━━━━━━━━━━━━━━━━━
#FAFAF9  ████████  Stone 50 (Background)
#F5F5F4  ████████  Stone 100 (Surface)
#FFFFFF  ████████  White (Cards)
#E7E5E4  ████████  Stone 200 (Borders)
#1C1917  ████████  Stone 900 (Text)
#78716C  ████████  Stone 500 (Secondary Text)
#A8A29E  ████████  Stone 400 (Muted Text)
```

### Psicología del Color

| Color                    | Significado                                     | Uso en HabiDev                                    |
| ------------------------ | ----------------------------------------------- | ------------------------------------------------- |
| **Verde Azulado (Teal)** | Crecimiento, equilibrio, naturaleza, renovación | Botones principales, elementos interactivos, logo |
| **Naranja Cálido**       | Energía positiva, motivación, calidez           | Acentos, botones secundarios, alertas positivas   |
| **Blanco Roto/Crema**    | Minimalismo, limpieza, espacio para respirar    | Fondos, superficies                               |
| **Tonos Piedra**         | Estabilidad, grounding, conexión a tierra       | Textos, bordes                                    |

---

## 🍃 Logo y Símbolo

**Símbolo**: Hoja (Leaf) 🍃

- Representa crecimiento orgánico
- Conexión con la naturaleza
- Renovación y ciclos (como los hábitos)

**Formas**:

- **Icono en círculo**: Fondo blanco con borde Teal de 3px
- **Hoja**: Color Teal (#14B8A6), tamaño 36-48px
- **Radio de borde**: 24-28px (suave y amigable)
- **Sombra**: Teal con opacidad 0.15, offset (0, 8), radio 16px

---

## 🔤 Tipografía

### Familia Principal

**Geist Sans** (Sistema: Inter, SF Pro, Roboto como fallbacks)

### Escala de Tamaños

```
H1 (Hero)       48-60px   ExtraBold (800)
H2 (Title)      30-36px   Bold (700)
H3 (Heading)    24px      SemiBold (600)
Body Large      18px      Medium (500)
Body            16px      Regular (400)
Small           14px      Regular (400)
Caption         12px      Medium (500)
```

### Pesos

- **Regular** (400): Cuerpo de texto
- **Medium** (500): Labels, énfasis suave
- **SemiBold** (600): Subtítulos
- **Bold** (700): Títulos principales

---

## 📐 Sistema de Espaciado

```
xs     4px    Padding interno muy pequeño
sm     8px    Separación mínima entre elementos
md     16px   Separación estándar
lg     24px   Separación entre secciones
xl     32px   Separación grande
2xl    48px   Separación muy grande
3xl    64px   Separación de secciones principales
```

---

## 🎯 Componentes Base

### Botón Principal

```
- Gradiente: Teal (#14B8A6) → Teal claro (#2DD4BF)
- Dirección: diagonal (0,0) → (1,1)
- Border radius: 12px
- Padding: 16px horizontal, 14px vertical
- Altura mínima: 56px
- Sombra: Teal, offset (0,3), opacidad 0.2, radio 6px
- Texto: Blanco, SemiBold 16px
```

### Input Field

```
- Background: Blanco (#FFFFFF)
- Border: 1.5px Stone 200 (#E7E5E4)
- Border radius: 12px
- Padding: 16px
- Altura mínima: 56px
- Focus: Border Teal + sombra sutil
- Error: Border Red + fondo rosa muy claro (#FEF2F2)
```

### Card/Tarjeta

```
- Background: Blanco (#FFFFFF)
- Border: 1px Stone 200
- Border radius: 16px
- Padding: 20-24px
- Sombra: Stone 900, offset (0,2), opacidad 0.08, radio 4px
```

---

## 🌗 Dark Mode (Opcional)

### Colores Oscuros Cálidos

```
Background:  #292524 (Stone 800) - NO negro puro
Surface:     #1C1917 (Stone 900)
Card:        #292524 (Stone 800)
Border:      #44403C (Stone 700)
Text:        #FAFAF9 (Stone 50)

Primary:     #2DD4BF (Teal más brillante para contraste)
Accent:      #FB923C (mismo naranja)
```

**Nota**: El dark mode mantiene la calidez usando tonos Stone en lugar de grises fríos.

---

## ✨ Principios de Diseño

### 1. Respiración

- Usa espacios en blanco generosamente
- No llenes toda la pantalla
- Agrupa elementos relacionados con espacio entre grupos

### 2. Jerarquía Visual

- Tamaño de fuente para importancia
- Color para acciones (Teal = acción, Piedra = información)
- Peso de fuente para énfasis

### 3. Consistencia

- Usa siempre los mismos border radius por tipo de componente
- Mantén el mismo spacing entre elementos similares
- Aplica sombras consistentemente

### 4. Accesibilidad

- Contraste mínimo WCAG AA (4.5:1 para texto normal)
- Touch targets mínimo 44x44px
- Focus states visibles

---

## 🎨 Ejemplos de Uso

### Botón de Acción Principal

```typescript
<Button
  title="Iniciar Sesión"
  variant="primary"  // Gradiente Teal
/>
```

### Indicador de Hábito Bueno

```typescript
<HabitBadge
  type="good"
  color="#10B981"  // Emerald (verde)
  icon="checkmark-circle"
/>
```

### Indicador de Hábito a Romper

```typescript
<HabitBadge
  type="bad"
  color="#F97316"  // Orange (naranja)
  icon="close-circle"
/>
```

---

## 📱 Iconografía

**Librería**: Ionicons
**Estilo**: Outline (no filled)
**Tamaños estándar**: 20px (small), 24px (medium), 32px (large)

### Iconos Clave

- 🍃 `leaf` - Logo principal, crecimiento
- ✅ `checkmark-circle` - Hábito completado
- 🎯 `target` - Objetivo
- 📊 `stats-chart` - Estadísticas
- 📆 `calendar` - Frecuencia
- 🔔 `notifications` - Recordatorios
- ⚙️ `settings` - Configuración

---

## 🚫 Qué NO Hacer

❌ **NO usar**:

- Azul genérico (#0000FF) - demasiado frío
- Negro puro (#000000) - demasiado duro
- Gradientes estridentes o neón
- Fuentes decorativas o script
- Bordes cuadrados (0px radius)
- Sombras muy marcadas o dramáticas
- Emojis en la UI principal

✅ **SÍ usar**:

- Tonos cálidos de la paleta Stone
- Teal y naranja como acentos
- Gradientes suaves y naturales
- Bordes redondeados (12-24px)
- Sombras sutiles y elegantes
- Iconos outline de Ionicons

---

**Diseñado por GaloDev**
**Producto: HabiDev - Habit Tracking App**
