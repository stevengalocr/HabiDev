//
//  CustomTextField.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import SwiftUI

/// Reusable custom text field component
struct CustomTextField: View {
    
    // MARK: - Properties
    
    let icon: String
    let placeholder: String
    @Binding var text: String
    var isSecure: Bool = false
    
    // MARK: - Body
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(.secondary)
                .frame(width: 20)
            
            if isSecure {
                SecureField(placeholder, text: $text)
                    .textContentType(.password)
                    .autocapitalization(.none)
            } else {
                TextField(placeholder, text: $text)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)
                    .keyboardType(.emailAddress)
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color(.systemGray4), lineWidth: 1)
        )
    }
}

#Preview {
    VStack(spacing: 16) {
        CustomTextField(
            icon: "envelope.fill",
            placeholder: "Email",
            text: .constant("")
        )
        
        CustomTextField(
            icon: "lock.fill",
            placeholder: "Contraseña",
            text: .constant(""),
            isSecure: true
        )
    }
    .padding()
}
