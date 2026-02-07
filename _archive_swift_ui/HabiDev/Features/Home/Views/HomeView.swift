//
//  HomeView.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import SwiftUI

/// Home screen view (post-authentication)
struct HomeView: View {
    
    // MARK: - Properties
    
    @StateObject private var viewModel: HomeViewModel
    
    // MARK: - Initialization
    
    init(viewModel: HomeViewModel) {
        _viewModel = StateObject(wrappedValue: viewModel)
    }
    
    // MARK: - Body
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 32) {
                    // Welcome section
                    welcomeSection
                    
                    // Quick actions
                    quickActionsSection
                    
                    Spacer()
                }
                .padding()
            }
            .navigationTitle("Inicio")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        Task {
                            await viewModel.logout()
                        }
                    } label: {
                        if viewModel.isLoading {
                            ProgressView()
                        } else {
                            Image(systemName: "rectangle.portrait.and.arrow.right")
                                .foregroundColor(.red)
                        }
                    }
                }
            }
        }
        .fullScreenCover(isPresented: $viewModel.isLoggedOut) {
            LoginView(viewModel: DIContainer.shared.makeLoginViewModel())
        }
    }
    
    // MARK: - Subviews
    
    private var welcomeSection: some View {
        VStack(spacing: 16) {
            Image(systemName: "checkmark.circle.fill")
                .font(.system(size: 70))
                .foregroundStyle(
                    LinearGradient(
                        colors: [.green, .blue],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
            
            if let user = viewModel.currentUser {
                Text("¡Hola, \(user.displayName)!")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Text(user.email)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            } else {
                Text("Bienvenido")
                    .font(.title2)
                    .fontWeight(.bold)
            }
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 32)
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(.systemGray6))
        )
    }
    
    private var quickActionsSection: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Acciones rápidas")
                .font(.headline)
            
            VStack(spacing: 12) {
                QuickActionButton(
                    icon: "chart.line.uptrend.xyaxis",
                    title: "Ver progreso",
                    color: .blue
                ) {
                    // TODO: Navigate to progress
                }
                
                QuickActionButton(
                    icon: "target",
                    title: "Mis objetivos",
                    color: .purple
                ) {
                    // TODO: Navigate to goals
                }
                
                QuickActionButton(
                    icon: "gearshape.fill",
                    title: "Configuración",
                    color: .gray
                ) {
                    // TODO: Navigate to settings
                }
            }
        }
    }
}

// MARK: - Quick Action Button

struct QuickActionButton: View {
    let icon: String
    let title: String
    let color: Color
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                Image(systemName: icon)
                    .font(.title3)
                    .foregroundColor(color)
                    .frame(width: 40)
                
                Text(title)
                    .fontWeight(.medium)
                    .foregroundColor(.primary)
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(12)
        }
    }
}

#Preview {
    HomeView(viewModel: DIContainer.shared.makeHomeViewModel())
}
