//
//  HomeViewModel.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation
import SwiftUI

/// ViewModel for home screen
@MainActor
final class HomeViewModel: ObservableObject {
    
    // MARK: - Published Properties
    
    @Published var currentUser: User?
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?
    @Published var isLoggedOut: Bool = false
    
    // MARK: - Properties
    
    private let authRepository: AuthRepository
    
    // MARK: - Initialization
    
    init(authRepository: AuthRepository) {
        self.authRepository = authRepository
        Task {
            await loadCurrentUser()
        }
    }
    
    // MARK: - Actions
    
    func loadCurrentUser() async {
        isLoading = true
        
        do {
            currentUser = try await authRepository.getCurrentUser()
        } catch {
            errorMessage = "Error al cargar usuario"
        }
        
        isLoading = false
    }
    
    func logout() async {
        isLoading = true
        errorMessage = nil
        
        do {
            try await authRepository.logout()
            isLoggedOut = true
        } catch {
            errorMessage = "Error al cerrar sesión"
        }
        
        isLoading = false
    }
}
