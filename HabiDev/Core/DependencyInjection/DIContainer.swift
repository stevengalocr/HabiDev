//
//  DIContainer.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation

/// Dependency Injection Container
/// Manages and provides access to all app services and dependencies
final class DIContainer {
    
    // MARK: - Singleton
    
    static let shared = DIContainer()
    
    private init() {
        setupServices()
    }
    
    // MARK: - Services
    
    private(set) lazy var supabaseService: SupabaseService = {
        return SupabaseServiceImpl()
    }()
    
    private(set) lazy var authRepository: AuthRepository = {
        return AuthRepositoryImpl(supabaseService: supabaseService)
    }()
    
    // MARK: - Setup
    
    private func setupServices() {
        // Initialize core services
        print("🔧 DIContainer initialized")
    }
    
    // MARK: - Factory Methods
    
    /// Creates a LoginViewModel instance
    func makeLoginViewModel() -> LoginViewModel {
        return LoginViewModel(authRepository: authRepository)
    }
    
    /// Creates a RegisterViewModel instance
    func makeRegisterViewModel() -> RegisterViewModel {
        return RegisterViewModel(authRepository: authRepository)
    }
    
    /// Creates a HomeViewModel instance
    func makeHomeViewModel() -> HomeViewModel {
        return HomeViewModel(authRepository: authRepository)
    }
}
