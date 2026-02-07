//
//  LoginView.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import SwiftUI

/// Login screen view
struct LoginView: View {
    
    // MARK: - Properties
    
    @StateObject private var viewModel: LoginViewModel
    @State private var showingRegister = false
    
    // MARK: - Initialization
    
    init(viewModel: LoginViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }
    
    // MARK: - Body
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Logo/Header
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
                        
                        // Error message
                        if let errorMessage = viewModel.errorMessage {
                            Text(errorMessage)
                                .font(.caption)
                                .foregroundColor(.red)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }
                        
                        // Login button
                        PrimaryButton(
                            title: "Iniciar sesión",
                            isLoading: viewModel.isLoading
                        ) {
                            Task {
                                await viewModel.login()
                            }
                        }
                        .padding(.top, 8)
                    }
                    .padding(.horizontal)
                    
                    // Footer
                    footerSection
                }
                .padding(.vertical, 32)
            }
            .navigationDestination(isPresented: $showingRegister) {
                RegisterView(viewModel: DIContainer.shared.makeRegisterViewModel())
            }
        }
    }
    
    // MARK: - Subviews
    
    private var headerSection: some View {
        VStack(spacing: 12) {
            Image(systemName: "person.circle.fill")
                .font(.system(size: 80))
                .foregroundStyle(
                    LinearGradient(
                        colors: [.blue, .purple],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
            
            Text("HabiDev")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Bienvenido de nuevo")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .padding(.bottom, 16)
    }
    
    private var footerSection: some View {
        VStack(spacing: 16) {
            Divider()
                .padding(.horizontal)
            
            HStack {
                Text("¿No tienes cuenta?")
                    .foregroundColor(.secondary)
                
                Button("Regístrate") {
                    showingRegister = true
                }
                .fontWeight(.semibold)
            }
        }
    }
}

#Preview {
    LoginView(viewModel: DIContainer.shared.makeLoginViewModel())
}
