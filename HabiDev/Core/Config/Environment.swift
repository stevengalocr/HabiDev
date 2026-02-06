//
//  Environment.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation

/// Manages application configuration and environment variables
enum Environment {
    
    // MARK: - Configuration Keys
    
    enum Keys {
        static let supabaseURL = "SUPABASE_URL"
        static let supabaseAnonKey = "SUPABASE_ANON_KEY"
    }
    
    // MARK: - Info.plist Access
    
    private static let infoDictionary: [String: Any]? = {
        return Bundle.main.infoDictionary
    }()
    
    // MARK: - Public Properties
    
    /// Supabase project URL
    static var supabaseURL: String {
        guard let url = infoDictionary?[Keys.supabaseURL] as? String else {
            fatalError("⚠️ SUPABASE_URL not set in Info.plist. Please configure your Config.xcconfig file.")
        }
        return url
    }
    
    /// Supabase anonymous key
    static var supabaseAnonKey: String {
        guard let key = infoDictionary?[Keys.supabaseAnonKey] as? String else {
            fatalError("⚠️ SUPABASE_ANON_KEY not set in Info.plist. Please configure your Config.xcconfig file.")
        }
        return key
    }
    
    // MARK: - Validation
    
    /// Validates that all required configuration is present
    static func validate() {
        _ = supabaseURL
        _ = supabaseAnonKey
        print("✅ Environment configuration validated successfully")
    }
}
