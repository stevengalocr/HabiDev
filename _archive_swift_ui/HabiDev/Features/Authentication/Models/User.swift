//
//  User.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import Foundation

/// User domain model
struct User: Identifiable, Codable {
    let id: String
    let email: String
    let createdAt: Date
    
    var displayName: String {
        return email.components(separatedBy: "@").first?.capitalized ?? "Usuario"
    }
}
