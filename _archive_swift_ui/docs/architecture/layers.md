# Capas y Responsabilidades

## 📋 Tabla de Contenidos

- [Presentation Layer](#presentation-layer)
- [Domain Layer](#domain-layer)
- [Data Layer](#data-layer)
- [Core Layer](#core-layer)

---

## 🎨 Presentation Layer

**Ubicación**: `Features/*/Views/`, `Features/*/ViewModels/`

### Responsabilidades

- Renderizar UI con SwiftUI
- Capturar interacciones del usuario
- Presentar datos al usuario
- Gestionar estado de UI local
- NO contiene lógica de negocio

### Componentes

#### Views (SwiftUI)

```swift
struct LoginView: View {
    @StateObject private var viewModel: LoginViewModel

    var body: some View {
        VStack {
            CustomTextField(
                icon: "envelope.fill",
                placeholder: "Email",
                text: $viewModel.email
            )

            PrimaryButton(
                title: "Iniciar sesión",
                isLoading: viewModel.isLoading
            ) {
                Task { await viewModel.login() }
            }
        }
    }
}
```

**Reglas:**

- ✅ Usar @StateObject para el ViewModel principal
- ✅ Usar @State para estado UI temporal (animaciones, toggles)
- ✅ Delegar toda lógica al ViewModel
- ❌ NO hacer networking directamente
- ❌ NO tener lógica de negocio

#### ViewModels

```swift
@MainActor
final class LoginViewModel: ObservableObject {
    // MARK: - Published Properties
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?

    // MARK: - Dependencies
    private let authRepository: AuthRepository

    // MARK: - Business Logic
    func login() async {
        guard isFormValid else { return }

        isLoading = true
        do {
            _ = try await authRepository.login(email: email, password: password)
        } catch {
            errorMessage = error.localizedDescription
        }
        isLoading = false
    }

    // MARK: - Validation
    private var isFormValid: Bool {
        !email.isEmpty && !password.isEmpty && isValidEmail(email)
    }
}
```

**Reglas:**

- ✅ Marcar con @MainActor (actualiza UI)
- ✅ Usar @Published para estado observable
- ✅ Inyectar dependencias via constructor
- ✅ Validaciones y transformaciones de datos
- ✅ Coordinar llamadas a Repositories
- ❌ NO acceder a servicios externos directamente
- ❌ NO tener referencias a UIKit

---

## 🏛️ Domain Layer

**Ubicación**: `Features/*/Models/`, `Domain/Entities/`

### Responsabilidades

- Definir entidades de negocio
- Representar reglas de negocio
- Ser independiente de frameworks
- Definir interfaces (protocolos)

### Componentes

#### Entities (Models)

```swift
struct User: Identifiable, Codable {
    let id: String
    let email: String
    let createdAt: Date

    // Computed properties con lógica de dominio
    var displayName: String {
        return email.components(separatedBy: "@").first?.capitalized ?? "Usuario"
    }

    var isEmailVerified: Bool {
        // Lógica de verificación
    }
}
```

**Reglas:**

- ✅ Structs inmutables cuando sea posible
- ✅ Lógica de dominio en computed properties
- ✅ Conformar a protocolos Swift estándar (Codable, Identifiable)
- ❌ NO depender de frameworks externos
- ❌ NO tener lógica de presentación

#### Protocols (Interfaces)

```swift
protocol AuthRepository {
    func login(email: String, password: String) async throws -> User
    func register(email: String, password: String) async throws -> User
    func logout() async throws
    func getCurrentUser() async throws -> User?
}
```

**Beneficios:**

- Inversión de dependencias
- Facilita testing con mocks
- Permite múltiples implementaciones

---

## 💾 Data Layer

**Ubicación**: `Data/Repositories/`, `Data/Services/`

### Responsabilidades

- Implementar Repository protocols
- Comunicación con servicios externos
- Transformación de DTOs a Entities
- Caché y persistencia local
- Manejo de errores de red

### Componentes

#### Repositories

```swift
final class AuthRepositoryImpl: AuthRepository {
    private let supabaseService: SupabaseService

    init(supabaseService: SupabaseService) {
        self.supabaseService = supabaseService
    }

    func login(email: String, password: String) async throws -> User {
        // Delega al service
        return try await supabaseService.signIn(email: email, password: password)
    }

    func register(email: String, password: String) async throws -> User {
        // Podría incluir lógica adicional:
        // - Validaciones extras
        // - Logging
        // - Analytics
        return try await supabaseService.signUp(email: email, password: password)
    }
}
```

**Reglas:**

- ✅ Implementar protocols del Domain Layer
- ✅ Inyectar Services como dependencias
- ✅ Transformar DTOs a Entities
- ✅ Manejar caché si es necesario
- ❌ NO exponer detalles de implementación
- ❌ NO hacer lógica de negocio compleja

#### Services

```swift
protocol SupabaseService {
    func signIn(email: String, password: String) async throws -> User
    func signUp(email: String, password: String) async throws -> User
}

final class SupabaseServiceImpl: SupabaseService {
    private let client: SupabaseClient

    init() {
        self.client = SupabaseClient(
            supabaseURL: URL(string: Environment.supabaseURL)!,
            supabaseKey: Environment.supabaseAnonKey
        )
    }

    func signIn(email: String, password: String) async throws -> User {
        let response = try await client.auth.signIn(
            email: email,
            password: password
        )

        // Transformar response a User (Entity)
        return User(
            id: response.user.id.uuidString,
            email: response.user.email ?? "",
            createdAt: response.user.createdAt
        )
    }
}
```

**Reglas:**

- ✅ Encapsular SDK de terceros
- ✅ Manejar errores específicos
- ✅ Transformar datos externos a modelos internos
- ✅ Mapear errores a custom errors
- ❌ NO exponer tipos de SDK externo

---

## ⚙️ Core Layer

**Ubicación**: `Core/`

### Responsabilidades

- Funcionalidad compartida
- Configuración global
- Dependency Injection
- Utilidades comunes
- Extensiones

### Componentes

#### Configuration

```swift
enum Environment {
    static var supabaseURL: String {
        guard let url = Bundle.main.infoDictionary?["SUPABASE_URL"] as? String else {
            fatalError("SUPABASE_URL not configured")
        }
        return url
    }
}
```

#### Dependency Injection

```swift
final class DIContainer {
    static let shared = DIContainer()

    // Lazy initialization
    private(set) lazy var supabaseService: SupabaseService = {
        return SupabaseServiceImpl()
    }()

    private(set) lazy var authRepository: AuthRepository = {
        return AuthRepositoryImpl(supabaseService: supabaseService)
    }()

    // Factory methods
    func makeLoginViewModel() -> LoginViewModel {
        return LoginViewModel(authRepository: authRepository)
    }
}
```

#### Extensions

```swift
extension View {
    func hideKeyboard() {
        UIApplication.shared.sendAction(
            #selector(UIResponder.resignFirstResponder),
            to: nil, from: nil, for: nil
        )
    }

    func cardStyle() -> some View {
        self
            .background(Color(.systemBackground))
            .cornerRadius(12)
            .shadow(color: .black.opacity(0.1), radius: 8)
    }
}
```

#### Error Handling

```swift
enum APIError: LocalizedError {
    case invalidURL
    case networkError(Error)
    case unauthorized

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "URL inválida"
        case .networkError(let error): return error.localizedDescription
        case .unauthorized: return "No autorizado"
        }
    }
}
```

**Reglas:**

- ✅ Solo código reutilizable
- ✅ Sin dependencias de features específicas
- ✅ Configuración centralizada
- ❌ NO incluir lógica de negocio

---

## 🔗 Dependencias entre Capas

```
App ──────────────────────┐
  │                        │
  ├──> Presentation  ──────┤
  │         │              │
  │         ↓              │
  ├──> Domain (Protocols)  │
  │         ↑              │
  │         │              │
  ├──> Data  ──────────────┤
  │                        │
  └──> Core  ──────────────┘
```

**Reglas de Dependencia:**

1. ✅ **App** puede depender de todo
2. ✅ **Presentation** depende de Domain y Core
3. ✅ **Domain** NO depende de nadie (solo Swift estándar)
4. ✅ **Data** depende de Domain y Core
5. ✅ **Core** NO depende de nadie

## 📝 Resumen

| Capa             | Responsabilidad     | Testing                  |
| ---------------- | ------------------- | ------------------------ |
| **Presentation** | UI y presentación   | UI Tests, Snapshot Tests |
| **Domain**       | Lógica de negocio   | Unit Tests               |
| **Data**         | Acceso a datos      | Integration Tests, Mocks |
| **Core**         | Funcionalidad común | Unit Tests               |

Esta separación permite:

- **Testear** cada capa independientemente
- **Cambiar** implementaciones sin afectar otras capas
- **Escalar** agregando nuevas features
- **Mantener** código limpio y organizado
