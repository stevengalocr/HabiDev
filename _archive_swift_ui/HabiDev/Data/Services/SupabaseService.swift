//
//  SupabaseService.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation
import Supabase

/// Protocol defining Supabase service operations
protocol SupabaseService {
    func signIn(email: String, password: String) async throws -> User
    func signUp(email: String, password: String) async throws -> User
    func signOut() async throws
    func getCurrentUser() async throws -> User?
    func resetPassword(email: String) async throws
}

/// Implementation of Supabase service
final class SupabaseServiceImpl: SupabaseService {
    
    // MARK: - Properties
    
    private let client: SupabaseClient
    
    // MARK: - Initialization
    
    init() {
        guard let url = URL(string: Environment.supabaseURL) else {
            fatalError("⚠️ Invalid Supabase URL")
        }
        
        self.client = SupabaseClient(
            supabaseURL: url,
            supabaseKey: Environment.supabaseAnonKey
        )
        
        print("✅ Supabase client initialized")
    }
    
    // MARK: - Authentication
    
    func signIn(email: String, password: String) async throws -> User {
        do {
            let response = try await client.auth.signIn(
                email: email,
                password: password
            )
            
            guard let user = response.user else {
                throw AuthError.userNotFound
            }
            
            return User(
                id: user.id.uuidString,
                email: user.email ?? "",
                createdAt: user.createdAt
            )
        } catch {
            throw mapAuthError(error)
        }
    }
    
    func signUp(email: String, password: String) async throws -> User {
        do {
            let response = try await client.auth.signUp(
                email: email,
                password: password
            )
            
            guard let user = response.user else {
                throw AuthError.unknown("Error al crear usuario")
            }
            
            return User(
                id: user.id.uuidString,
                email: user.email ?? "",
                createdAt: user.createdAt
            )
        } catch {
            throw mapAuthError(error)
        }
    }
    
    func signOut() async throws {
        do {
            try await client.auth.signOut()
        } catch {
            throw mapAuthError(error)
        }
    }
    
    func getCurrentUser() async throws -> User? {
        do {
            let session = try await client.auth.session
            let user = session.user
            
            return User(
                id: user.id.uuidString,
                email: user.email ?? "",
                createdAt: user.createdAt
            )
        } catch {
            // If no session exists, return nil instead of throwing
            return nil
        }
    }
    
    func resetPassword(email: String) async throws {
        do {
            try await client.auth.resetPasswordForEmail(email)
        } catch {
            throw mapAuthError(error)
        }
    }
    
    // MARK: - Error Mapping
    
    private func mapAuthError(_ error: Error) -> AuthError {
        let errorMessage = error.localizedDescription.lowercased()
        
        if errorMessage.contains("invalid login credentials") {
            return .invalidCredentials
        } else if errorMessage.contains("email already registered") {
            return .emailAlreadyInUse
        } else if errorMessage.contains("password") && errorMessage.contains("weak") {
            return .weakPassword
        } else if errorMessage.contains("user not found") {
            return .userNotFound
        } else if errorMessage.contains("email not confirmed") {
            return .emailNotConfirmed
        } else {
            return .unknown(error.localizedDescription)
        }
    }
}
