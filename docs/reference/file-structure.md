# Estructura de Archivos

## 📁 Vista General

```
HabiDev/
├── App/                           # 🚀 Entry Point
│   ├── HabiDevApp.swift          # Main app entry point
│   └── AppCoordinator.swift      # Navigation coordinator
│
├── Core/                          # ⚙️ Shared Functionality
│   ├── Config/
│   │   └── Environment.swift     # Environment variables manager
│   ├── DependencyInjection/
│   │   └── DIContainer.swift     # Dependency injection container
│   ├── Extensions/
│   │   └── View+Extensions.swift # SwiftUI view extensions
│   └── Network/
│       └── APIError.swift        # Custom error definitions
│
├── Features/                      # 🎯 Feature Modules
│   ├── Authentication/
│   │   ├── Models/
│   │   │   └── User.swift        # User entity
│   │   ├── ViewModels/
│   │   │   ├── LoginViewModel.swift
│   │   │   └── RegisterViewModel.swift
│   │   └── Views/
│   │       ├── LoginView.swift
│   │       ├── RegisterView.swift
│   │       └── Components/
│   │           ├── CustomTextField.swift
│   │           └── PrimaryButton.swift
│   └── Home/
│       ├── ViewModels/
│       │   └── HomeViewModel.swift
│       └── Views/
│           └── HomeView.swift
│
├── Data/                          # 💾 Data Layer
│   ├── Repositories/
│   │   └── AuthRepository.swift  # Repository implementation
│   └── Services/
│       └── SupabaseService.swift # Supabase integration
│
├── Resources/                     # 📦 Assets & Config
│   ├── Assets.xcassets/          # Images, colors, etc.
│   ├── Info.plist               # App configuration
│   └── Config.template.xcconfig  # Config template
│
└── docs/                          # 📚 Documentation
    ├── README.md
    ├── architecture/
    ├── setup/
    ├── guides/
    └── reference/
```

## 📂 Descripción de Carpetas

### App/

Punto de entrada de la aplicación y coordinación global.

**Archivos clave:**

- `HabiDevApp.swift`: Entry point, inicializa DI Container y muestra la vista inicial
- `AppCoordinator.swift`: Gestiona navegación global y estado de autenticación

### Core/

Funcionalidad compartida entre todos los módulos.

**Subcarpetas:**

- `Config/`: Variables de entorno y configuración
- `DependencyInjection/`: Container para inyección de dependencias
- `Extensions/`: Extensiones de Swift/SwiftUI
- `Network/`: Networking, errores, APIs

**Regla:** Solo código reutilizable, sin lógica de negocio específica.

### Features/

Módulos organizados por funcionalidad.

**Estructura de cada feature:**

```
FeatureName/
├── Models/       # Domain entities
├── ViewModels/   # Business logic
├── Views/        # UI components
└── Services/     # Feature-specific services (opcional)
```

**Features actuales:**

- `Authentication`: Login, registro, recuperación de contraseña
- `Home`: Pantalla principal post-login

**Para agregar nueva feature:**

1. Crear carpeta en `Features/`
2. Seguir estructura Models/ViewModels/Views
3. Registrar ViewModels en `DIContainer`

### Data/

Capa de acceso a datos.

**Subcarpetas:**

- `Repositories/`: Implementaciones de repository pattern
- `Services/`: Integración con servicios externos (Supabase, APIs)

**Responsabilidades:**

- Comunicación con backend
- Transformación de DTOs a Entities
- Caché y persistencia local

### Resources/

Recursos estáticos y configuración.

**Archivos:**

- `Assets.xcassets/`: Imágenes, colores, iconos
- `Info.plist`: Metadata de la app
- `Config.template.xcconfig`: Template de configuración

## 📝 Convenciones de Nombres

### Archivos Swift

| Tipo      | Convención                              | Ejemplo                 |
| --------- | --------------------------------------- | ----------------------- |
| View      | `<Name>View.swift`                      | `LoginView.swift`       |
| ViewModel | `<Name>ViewModel.swift`                 | `LoginViewModel.swift`  |
| Model     | `<Name>.swift`                          | `User.swift`            |
| Protocol  | `<Name>Protocol.swift` o `<Name>.swift` | `AuthRepository.swift`  |
| Service   | `<Name>Service.swift`                   | `SupabaseService.swift` |
| Extension | `<Type>+<Feature>.swift`                | `View+Extensions.swift` |

### Carpetas

- PascalCase para features: `Authentication/`, `UserProfile/`
- camelCase o singular para tipos: `Models/`, `Views/`, `Services/`

## 🔍 Dónde Encontrar...

### Agregar una nueva pantalla

1. Crear en `Features/<Feature>/Views/`
2. Crear ViewModel en `Features/<Feature>/ViewModels/`
3. Registrar factory en `DIContainer.swift`

### Agregar integración con API externa

1. Crear Service en `Data/Services/`
2. Crear Repository en `Data/Repositories/`
3. Registrar en `DIContainer.swift`

### Agregar componente reutilizable

1. Si es UI: `Features/Authentication/Views/Components/` (o crear `Core/Components/`)
2. Si es lógica: `Core/Utilities/`
3. Si es extensión: `Core/Extensions/`

### Configurar nuevo environment variable

1. Editar `Config.xcconfig`
2. Agregar a `Info.plist`
3. Acceder via `Environment.swift`

## 📊 Estadísticas

- **Total archivos Swift**: 17
- **Total líneas de código**: ~1,500
- **Componentes reutilizables**: 2 (CustomTextField, PrimaryButton)
- **ViewModels**: 4
- **Views**: 4
- **Services**: 2
- **Repositories**: 1

## ✅ Checklist para Nuevos Desarrolladores

- [ ] Leer [Arquitectura Overview](../architecture/overview.md)
- [ ] Revisar [Capas y Responsabilidades](../architecture/layers.md)
- [ ] Entender estructura de `Features/`
- [ ] Conocer `DIContainer` y cómo registrar dependencias
- [ ] Leer [Convenciones de Código](code-conventions.md)
- [ ] Revisar un feature completo (ej: `Authentication/`)
