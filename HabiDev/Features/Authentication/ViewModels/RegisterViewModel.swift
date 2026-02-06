//
//  RegisterViewModel.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation
import SwiftUI

/// ViewModel for registration screen
@MainActor
final class RegisterViewModel: ObservableObject {
    
    // MARK: - Published Properties
    
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var confirmPassword: String = ""
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?
    @Published var isRegistered: Bool = false
    @Published var showSuccessMessage: Bool = false
    
    // MARK: - Properties
    
    private let authRepository: AuthRepository
    
    // MARK: - Computed Properties
    
    var isFormValid: Bool {
        !email.isEmpty &&
        !password.isEmpty &&
        !confirmPassword.isEmpty &&
        isValidEmail(email) &&
        password.count >= 6 &&
        password == confirmPassword
    }
    
    var passwordsMatch: Bool {
        password == confirmPassword
    }
    
    // MARK: - Initialization
    
    init(authRepository: AuthRepository) {
        self.authRepository = authRepository
    }
    
    // MARK: - Actions
    
    func register() async {
        guard isFormValid else {
            if !isValidEmail(email) {
                errorMessage = "Por favor, ingresa un email válido"
            } else if password.count < 6 {
                errorMessage = "La contraseña debe tener al menos 6 caracteres"
            } else if !passwordsMatch {
                errorMessage = "Las contraseñas no coinciden"
            } else {
                errorMessage = "Por favor, completa todos los campos"
            }
            return
        }
        
        isLoading = true
        errorMessage = nil
        
        do {
            _ = try await authRepository.register(email: email, password: password)
            showSuccessMessage = true
            isRegistered = true
        } catch let error as AuthError {
            errorMessage = error.localizedDescription
        } catch {
            errorMessage = "Ha ocurrido un error inesperado"
        }
        
        isLoading = false
    }
    
    // MARK: - Validation
    
    private func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPredicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
        return emailPredicate.evaluate(with: email)
    }
}
