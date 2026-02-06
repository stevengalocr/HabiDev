//
//  PrimaryButton.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import SwiftUI

/// Reusable primary button component
struct PrimaryButton: View {
    
    // MARK: - Properties
    
    let title: String
    let isLoading: Bool
    let action: () -> Void
    
    // MARK: - Body
    
    var body: some View {
        Button(action: action) {
            HStack {
                if isLoading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .white))
                } else {
                    Text(title)
                        .fontWeight(.semibold)
                }
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(
                LinearGradient(
                    colors: [Color.blue, Color.purple],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .foregroundColor(.white)
            .cornerRadius(12)
        }
        .disabled(isLoading)
    }
}

#Preview {
    VStack(spacing: 16) {
        PrimaryButton(title: "Iniciar sesión", isLoading: false) {}
        PrimaryButton(title: "Cargando...", isLoading: true) {}
    }
    .padding()
}
