# Visión General de la Arquitectura

## 🎯 Objetivo

HabiDev implementa una arquitectura robusta, escalable y mantenible basada en **MVVM + Clean Architecture**, optimizada para el desarrollo iOS con SwiftUI.

## 🏛️ Capas de la Arquitectura

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                │
│  (Views, ViewModels, Components)            │
└─────────────────────────────────────────────┘
                    ↓ ↑
┌─────────────────────────────────────────────┐
│            Domain Layer                     │
│    (Entities, Use Cases, Protocols)         │
└─────────────────────────────────────────────┘
                    ↓ ↑
┌─────────────────────────────────────────────┐
│             Data Layer                      │
│   (Repositories, Services, Data Sources)    │
└─────────────────────────────────────────────┘
                    ↓ ↑
┌─────────────────────────────────────────────┐
│          External Services                  │
│         (Supabase, APIs)                    │
└─────────────────────────────────────────────┘
```

## 📁 Estructura de Directorios

```
HabiDev/
├── App/
│   ├── HabiDevApp.swift          # Entry point
│   └── AppCoordinator.swift      # Navigation coordinator
│
├── Core/
│   ├── Config/                   # Configuración
│   ├── DependencyInjection/      # DI Container
│   ├── Network/                  # Networking & errors
│   └── Extensions/               # Utilidades comunes
│
├── Features/                     # Módulos por feature
│   ├── Authentication/
│   │   ├── Models/              # Domain models
│   │   ├── ViewModels/          # Business logic
│   │   ├── Views/               # UI components
│   │   └── Services/            # Feature-specific services
│   └── Home/
│       ├── ViewModels/
│       └── Views/
│
├── Data/
│   ├── Repositories/            # Repository implementations
│   └── Services/                # External service integrations
│
└── Resources/
    ├── Assets.xcassets/         # Images, colors
    └── Config.template.xcconfig # Configuration template
```

## 🎨 Patrones de Diseño Implementados

### 1. **MVVM (Model-View-ViewModel)**

Separación entre UI y lógica de negocio:

- **View**: Componentes SwiftUI que solo renderizan UI
- **ViewModel**: Lógica de negocio, validaciones, estado
- **Model**: Entidades de dominio

**Ejemplo:**

```swift
// View
struct LoginView: View {
    @StateObject private var viewModel: LoginViewModel

    var body: some View {
        // Solo UI, sin lógica
    }
}

// ViewModel
class LoginViewModel: ObservableObject {
    @Published var email: String = ""
    @Published var isLoading: Bool = false

    func login() async {
        // Toda la lógica aquí
    }
}
```

### 2. **Repository Pattern**

Abstracción de la capa de datos:

```swift
protocol AuthRepository {
    func login(email: String, password: String) async throws -> User
    func register(email: String, password: String) async throws -> User
}

class AuthRepositoryImpl: AuthRepository {
    private let supabaseService: SupabaseService

    func login(email: String, password: String) async throws -> User {
        return try await supabaseService.signIn(email: email, password: password)
    }
}
```

**Beneficios:**

- Cambiar de backend sin afectar ViewModels
- Facilita testing con mocks
- Centraliza lógica de datos

### 3. **Dependency Injection**

Container centralizado para gestionar dependencias:

```swift
class DIContainer {
    static let shared = DIContainer()

    lazy var authRepository: AuthRepository = {
        return AuthRepositoryImpl(supabaseService: supabaseService)
    }()

    func makeLoginViewModel() -> LoginViewModel {
        return LoginViewModel(authRepository: authRepository)
    }
}
```

**Beneficios:**

- Código desacoplado
- Fácil testing
- Gestión centralizada de instancias

### 4. **Protocol-Oriented Programming**

Uso de protocolos para definir contratos:

```swift
// Protocolo define el contrato
protocol SupabaseService {
    func signIn(email: String, password: String) async throws -> User
    func signUp(email: String, password: String) async throws -> User
}

// Implementación concreta
class SupabaseServiceImpl: SupabaseService {
    // Implementación
}

// Mock para testing
class MockSupabaseService: SupabaseService {
    // Mock implementation
}
```

## 🔄 Flujo de Datos

### Ejemplo: Login de Usuario

```
1. User Input
   LoginView: Usuario ingresa email y password

2. View → ViewModel
   LoginView llama a viewModel.login()

3. ViewModel → Repository
   LoginViewModel llama a authRepository.login()

4. Repository → Service
   AuthRepository llama a supabaseService.signIn()

5. Service → External API
   SupabaseService hace request a Supabase

6. Response Flow (reverso)
   Supabase → Service → Repository → ViewModel → View

7. UI Update
   View se actualiza automáticamente via @Published
```

## 🧩 Módulos Principales

### App Module

- **Responsabilidad**: Inicialización y coordinación global
- **Componentes**: Entry point, coordinadores de navegación
- **Dependencias**: Ninguna (depende de todos los demás)

### Core Module

- **Responsabilidad**: Funcionalidad compartida
- **Componentes**: Config, DI, extensiones, networking
- **Dependencias**: Ninguna

### Features Module

- **Responsabilidad**: Funcionalidades específicas de la app
- **Componentes**: Views, ViewModels, Models
- **Dependencias**: Core, Data

### Data Module

- **Responsabilidad**: Acceso a datos
- **Componentes**: Repositories, Services
- **Dependencias**: Core

## ✅ Ventajas de Esta Arquitectura

1. **Testeable**: Cada capa se puede testear independientemente
2. **Mantenible**: Cambios aislados a una capa
3. **Escalable**: Fácil agregar nuevas features
4. **Reutilizable**: Componentes compartidos en Core
5. **Comprensible**: Estructura clara y predecible

## 🚀 Agregar Nuevas Features

Para agregar una nueva feature, sigue esta estructura:

```
Features/
└── NuevaFeature/
    ├── Models/
    │   └── NuevaFeatureModel.swift
    ├── ViewModels/
    │   └── NuevaFeatureViewModel.swift
    ├── Views/
    │   ├── NuevaFeatureView.swift
    │   └── Components/
    └── Services/
        └── NuevaFeatureService.swift (si es necesario)
```

Ver [Guía de Agregar Features](../guides/adding-features.md) para más detalles.

## 📚 Referencias

- [Swift Style Guide](https://google.github.io/swift/)
- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SwiftUI Best Practices](https://developer.apple.com/documentation/swiftui)
