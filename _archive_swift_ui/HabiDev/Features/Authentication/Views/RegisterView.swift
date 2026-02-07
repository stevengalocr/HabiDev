//
//  RegisterView.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import SwiftUI

/// Registration screen view
struct RegisterView: View {
    
    // MARK: - Properties
    
    @StateObject private var viewModel: RegisterViewModel
    @Environment(\.dismiss) private var dismiss
    
    // MARK: - Initialization
    
    init(viewModel: RegisterViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }
    
    // MARK: - Body
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Header
                headerSection
                
                // Form
                VStack(spacing: 16) {
                    CustomTextField(
                        icon: "envelope.fill",
                        placeholder: "Email",
                        text: $viewModel.email
                    )
                    
                    CustomTextField(
                        icon: "lock.fill",
                        placeholder: "Contraseña",
                        text: $viewModel.password,
                        isSecure: true
                    )
                    
                    CustomTextField(
                        icon: "lock.fill",
                        placeholder: "Confirmar contraseña",
                        text: $viewModel.confirmPassword,
                        isSecure: true
                    )
                    
                    // Error message
                    if let errorMessage = viewModel.errorMessage {
                        Text(errorMessage)
                            .font(.caption)
                            .foregroundColor(.red)
                            .frame(maxWidth: .infinity, alignment: .leading)
                    }
                    
                    // Register button
                    PrimaryButton(
                        title: "Crear cuenta",
                        isLoading: viewModel.isLoading
                    ) {
                        Task {
                            await viewModel.register()
                        }
                    }
                    .padding(.top, 8)
                }
                .padding(.horizontal)
            }
            .padding(.vertical, 32)
        }
        .navigationTitle("Registro")
        .navigationBarTitleDisplayMode(.inline)
        .alert("¡Cuenta creada!", isPresented: $viewModel.showSuccessMessage) {
            Button("OK") {
                dismiss()
            }
        } message: {
            Text("Tu cuenta ha sido creada exitosamente. Revisa tu email para confirmar tu cuenta.")
        }
    }
    
    // MARK: - Subviews
    
    private var headerSection: some View {
        VStack(spacing: 12) {
            Image(systemName: "person.badge.plus.fill")
                .font(.system(size: 70))
                .foregroundStyle(
                    LinearGradient(
                        colors: [.blue, .purple],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
            
            Text("Crea tu cuenta")
                .font(.title2)
                .fontWeight(.bold)
            
            Text("Únete a HabiDev hoy")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .padding(.bottom, 16)
    }
}

#Preview {
    NavigationStack {
        RegisterView(viewModel: DIContainer.shared.makeRegisterViewModel())
    }
}
