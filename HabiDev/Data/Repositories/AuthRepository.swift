//
//  AuthRepository.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation

/// Protocol defining authentication repository operations
protocol AuthRepository {
    func login(email: String, password: String) async throws -> User
    func register(email: String, password: String) async throws -> User
    func logout() async throws
    func getCurrentUser() async throws -> User?
    func resetPassword(email: String) async throws
}

/// Implementation of authentication repository
final class AuthRepositoryImpl: AuthRepository {
    
    // MARK: - Properties
    
    private let supabaseService: SupabaseService
    
    // MARK: - Initialization
    
    init(supabaseService: SupabaseService) {
        self.supabaseService = supabaseService
    }
    
    // MARK: - Repository Methods
    
    func login(email: String, password: String) async throws -> User {
        return try await supabaseService.signIn(email: email, password: password)
    }
    
    func register(email: String, password: String) async throws -> User {
        return try await supabaseService.signUp(email: email, password: password)
    }
    
    func logout() async throws {
        try await supabaseService.signOut()
    }
    
    func getCurrentUser() async throws -> User? {
        return try await supabaseService.getCurrentUser()
    }
    
    func resetPassword(email: String) async throws {
        try await supabaseService.resetPassword(email: email)
    }
}
