//
//  APIError.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation

/// Custom errors for API and network operations
enum APIError: LocalizedError {
    case invalidURL
    case invalidResponse
    case decodingError
    case networkError(Error)
    case unauthorized
    case serverError(String)
    case unknown
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "URL inválida"
        case .invalidResponse:
            return "Respuesta del servidor inválida"
        case .decodingError:
            return "Error al procesar la respuesta"
        case .networkError(let error):
            return "Error de red: \(error.localizedDescription)"
        case .unauthorized:
            return "No autorizado. Por favor, inicia sesión nuevamente."
        case .serverError(let message):
            return "Error del servidor: \(message)"
        case .unknown:
            return "Ha ocurrido un error desconocido"
        }
    }
}

/// Authentication-specific errors
enum AuthError: LocalizedError {
    case invalidCredentials
    case emailAlreadyInUse
    case weakPassword
    case userNotFound
    case emailNotConfirmed
    case passwordMismatch
    case unknown(String)
    
    var errorDescription: String? {
        switch self {
        case .invalidCredentials:
            return "Credenciales inválidas"
        case .emailAlreadyInUse:
            return "Este email ya está registrado"
        case .weakPassword:
            return "La contraseña debe tener al menos 6 caracteres"
        case .userNotFound:
            return "Usuario no encontrado"
        case .emailNotConfirmed:
            return "Por favor, confirma tu email antes de iniciar sesión"
        case .passwordMismatch:
            return "Las contraseñas no coinciden"
        case .unknown(let message):
            return message
        }
    }
}
