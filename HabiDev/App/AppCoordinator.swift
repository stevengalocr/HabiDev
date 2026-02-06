//
//  AppCoordinator.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import SwiftUI

/// Main app coordinator managing navigation and authentication state
@MainActor
final class AppCoordinator: ObservableObject {
    
    // MARK: - Published Properties
    
    @Published var isAuthenticated: Bool = false
    @Published var isLoading: Bool = true
    
    // MARK: - Properties
    
    private let authRepository: AuthRepository
    
    // MARK: - Initialization
    
    init(authRepository: AuthRepository) {
        self.authRepository = authRepository
        Task {
            await checkAuthenticationStatus()
        }
    }
    
    // MARK: - Authentication Check
    
    func checkAuthenticationStatus() async {
        isLoading = true
        
        do {
            let user = try await authRepository.getCurrentUser()
            isAuthenticated = user != nil
        } catch {
            isAuthenticated = false
        }
        
        isLoading = false
    }
}
