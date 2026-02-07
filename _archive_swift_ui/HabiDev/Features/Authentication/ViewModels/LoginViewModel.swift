//
//  LoginViewModel.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation
import SwiftUI

/// ViewModel for login screen
@MainActor
final class LoginViewModel: ObservableObject {
    
    // MARK: - Published Properties
    
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?
    @Published var isAuthenticated: Bool = false
    
    // MARK: - Properties
    
    private let authRepository: AuthRepository
    
    // MARK: - Computed Properties
    
    var isFormValid: Bool {
        !email.isEmpty && !password.isEmpty && isValidEmail(email)
    }
    
    // MARK: - Initialization
    
    init(authRepository: AuthRepository) {
        self.authRepository = authRepository
    }
    
    // MARK: - Actions
    
    func login() async {
        guard isFormValid else {
            errorMessage = "Por favor, completa todos los campos correctamente"
            return
        }
        
        isLoading = true
        errorMessage = nil
        
        do {
            _ = try await authRepository.login(email: email, password: password)
            isAuthenticated = true
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
