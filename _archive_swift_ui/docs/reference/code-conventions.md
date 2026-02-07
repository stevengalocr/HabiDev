# Convenciones de Código

## 🎯 Objetivo

Mantener un código consistente, legible y mantenible en todo el proyecto HabiDev.

## 📏 Swift Style Guide

Seguimos el [Google Swift Style Guide](https://google.github.io/swift/) con algunas adaptaciones.

## 🏗️ Estructura de Archivos

### Orden de Elementos en un Archivo

```swift
//
//  FileName.swift
//  HabiDev
//
//  Created on YYYY-MM-DD
//

import Foundation
import SwiftUI

// MARK: - Main Type

struct/class MainType {

    // MARK: - Type Aliases

    typealias CompletionHandler = (Result<User, Error>) -> Void

    // MARK: - Properties

    // Static properties
    static let shared = MainType()

    // Public properties
    let publicProperty: String

    // Private properties
    private let privateProperty: String

    // Computed properties
    var computedProperty: String {
        return "\(publicProperty)-\(privateProperty)"
    }

    // MARK: - Initialization

    init(publicProperty: String, privateProperty: String) {
        self.publicProperty = publicProperty
        self.privateProperty = privateProperty
    }

    // MARK: - Public Methods

    func publicMethod() {
        // Implementation
    }

    // MARK: - Private Methods

    private func privateMethod() {
        // Implementation
    }
}

// MARK: - Protocol Conformance

extension MainType: SomeProtocol {
    func protocolMethod() {
        // Implementation
    }
}

// MARK: - Preview

#Preview {
    MainView()
}
```

## 🎨 Naming Conventions

### Types (Clases, Structs, Enums, Protocols)

```swift
// ✅ Correcto: PascalCase
class UserManager {}
struct UserProfile {}
enum NetworkError {}
protocol DataRepository {}

// ❌ Incorrecto
class userManager {}
struct user_profile {}
```

### Variables y Funciones

```swift
// ✅ Correcto: camelCase
let userName: String
var isLoggedIn: Bool
func fetchUserData() {}

// ❌ Incorrecto
let UserName: String
func FetchUserData() {}
```

### Constants

```swift
// ✅ Correcto: camelCase (igual que variables)
let maxRetryCount = 3
let defaultTimeout: TimeInterval = 30

// Para constantes globales, usar enum como namespace
enum Constants {
    static let apiBaseURL = "https://api.example.com"
    static let defaultPageSize = 20
}
```

### Protocols

```swift
// ✅ Para capacidades: usar -able, -ing
protocol Drawable {}
protocol Animating {}

// ✅ Para abstracciones: nombre descriptivo
protocol DataRepository {}
protocol NetworkService {}
```

## 📝 ViewModels

```swift
@MainActor
final class FeatureViewModel: ObservableObject {

    // MARK: - Published Properties

    @Published var state: ViewState = .idle
    @Published var errorMessage: String?
    @Published var isLoading: Bool = false

    // MARK: - Properties

    private let repository: FeatureRepository

    // MARK: - Computed Properties

    var isFormValid: Bool {
        // Validation logic
    }

    // MARK: - Initialization

    init(repository: FeatureRepository) {
        self.repository = repository
    }

    // MARK: - Public Methods

    func performAction() async {
        isLoading = true
        defer { isLoading = false }

        do {
            // Logic
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    // MARK: - Private Methods

    private func validate() -> Bool {
        // Validation
    }
}
```

**Reglas:**

- ✅ Siempre `@MainActor` para ViewModels
- ✅ Siempre `final class`
- ✅ Usar `@Published` para propiedades observables
- ✅ Validaciones en computed properties
- ✅ Operaciones async con `async/await`

## 🎨 SwiftUI Views

```swift
struct FeatureView: View {

    // MARK: - Properties

    @StateObject private var viewModel: FeatureViewModel
    @State private var showSheet = false
    @Environment(\.dismiss) private var dismiss

    // MARK: - Initialization

    init(viewModel: FeatureViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }

    // MARK: - Body

    var body: some View {
        NavigationStack {
            content
                .navigationTitle("Title")
                .toolbar {
                    toolbarContent
                }
        }
    }

    // MARK: - Subviews

    private var content: some View {
        VStack {
            // Content
        }
    }

    private var toolbarContent: some ToolbarContent {
        ToolbarItem(placement: .navigationBarTrailing) {
            Button("Action") {
                // Action
            }
        }
    }
}

#Preview {
    FeatureView(viewModel: DIContainer.shared.makeFeatureViewModel())
}
```

**Reglas:**

- ✅ Extraer subviews complejas a computed properties
- ✅ Usar `@StateObject` para el ViewModel principal
- ✅ Usar `@State` para estado local temporal
- ✅ Incluir `#Preview` siempre
- ✅ Inicializar ViewModels via DI

## 🔧 Functions

### Naming

```swift
// ✅ Correcto: verbos para acciones
func fetchUserData() {}
func validateEmail() -> Bool {}
func configure(with data: Data) {}

// ❌ Incorrecto
func user() {} // No es claro qué hace
func data() {} // Muy genérico
```

### Parameters

```swift
// ✅ Correcto: primer parámetro sin label si es obvio
func move(to destination: Point) {}
func remove(at index: Int) {}

// ✅ Correcto: labels descriptivos
func send(message: String, to recipients: [User]) {}

// ❌ Incorrecto
func send(_ message: String, _ recipients: [User]) {}
```

## 🎯 Error Handling

```swift
// ✅ Enums para errores
enum NetworkError: LocalizedError {
    case invalidURL
    case noConnection
    case serverError(Int)

    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "URL inválida"
        case .noConnection:
            return "Sin conexión a internet"
        case .serverError(let code):
            return "Error del servidor: \(code)"
        }
    }
}

// ✅ Async/await para operaciones asíncronas
func fetchData() async throws -> Data {
    // Implementation
}

// ✅ Do-catch para manejar errores
do {
    let data = try await fetchData()
} catch let error as NetworkError {
    print("Network error: \(error)")
} catch {
    print("Unknown error: \(error)")
}
```

## 📦 Optionals

```swift
// ✅ Correcto: Optional binding
if let user = optionalUser {
    print(user.name)
}

// ✅ Correcto: Guard para early return
guard let user = optionalUser else {
    return
}

// ✅ Correcto: Nil coalescing
let name = user?.name ?? "Guest"

// ❌ Evitar: Force unwrap (solo cuando estás 100% seguro)
let user = optionalUser! // Peligroso
```

## 🔄 Async/Await

```swift
// ✅ Correcto
func loadData() async throws -> Data {
    let data = try await networkService.fetch()
    return data
}

// ✅ Correcto: Task para llamar async desde sync
Task {
    await viewModel.loadData()
}

// ❌ Evitar: Callbacks anidados
func loadData(completion: @escaping (Result<Data, Error>) -> Void) {
    // Usar async/await en su lugar
}
```

## 💬 Comments

```swift
// ✅ Comentarios para explicar "por qué", no "qué"

// WORKAROUND: Server returns null for deleted users
let userName = user.name ?? "Deleted User"

// ✅ MARK para organizar código
// MARK: - Properties
// MARK: - Initialization
// MARK: - Public Methods
// MARK: - Private Methods

// ✅ TODO para trabajo pendiente
// TODO: Add pagination support

// ✅ FIXME para bugs conocidos
// FIXME: Memory leak when dismissing view

// ❌ Evitar comentarios obvios
let count = 0 // Set count to zero
```

## 🎨 SwiftUI Modifiers Order

```swift
SomeView()
    // Content modifiers
    .foregroundColor(.primary)
    .font(.headline)

    // Layout modifiers
    .frame(maxWidth: .infinity)
    .padding()

    // Interactive modifiers
    .onTapGesture {}
    .onAppear {}

    // Container modifiers
    .background(Color.blue)
    .cornerRadius(12)
    .shadow(radius: 5)
```

## ✅ Best Practices

### DO ✅

- Usar `let` siempre que sea posible
- Preferir `struct` sobre `class` cuando sea apropiado
- Usar `guard` para early returns
- Documentar código público con doc comments
- Usar `@MainActor` para ViewModels
- Preferir `async/await` sobre closures
- Usar dependency injection
- Escribir tests para lógica compleja

### DON'T ❌

- No usar force unwrap (`!`) sin razón válida
- No usar `Any` o `AnyObject` innecesariamente
- No crear clases con estado mutable si puede ser struct
- No tener ViewModels sin tests
- No hardcodear strings (usar localization)
- No ignorar warnings del compilador

## 📐 Line Length

- **Máximo**: 120 caracteres por línea
- **Preferido**: 100 caracteres

```swift
// ✅ Correcto
func processUserData(
    userId: String,
    includeProfile: Bool,
    completion: @escaping (Result<User, Error>) -> Void
) {
    // Implementation
}

// ❌ Incorrecto: Línea muy larga
func processUserData(userId: String, includeProfile: Bool, completion: @escaping (Result<User, Error>) -> Void) {
    // Implementation
}
```

## 🔍 Code Review Checklist

- [ ] Sigue las convenciones de nombres
- [ ] Usa MARK comments apropiadamente
- [ ] ViewModels son `@MainActor` y `final class`
- [ ] Views usan `@StateObject` para ViewModels
- [ ] No hay force unwraps innecesarios
- [ ] Errores bien manejados con do-catch
- [ ] Código documentado cuando es necesario
- [ ] No hay warnings del compilador
- [ ] Tests escritos para nueva lógica
