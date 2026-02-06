//
//  HabiDevApp.swift
//  HabiDev
//
//  Created on 2026-02-05
//

import SwiftUI

@main
struct HabiDevApp: App {
    
    // MARK: - Properties
    
    @StateObject private var coordinator = AppCoordinator(
        authRepository: DIContainer.shared.authRepository
    )
    
    // MARK: - Initialization
    
    init() {
        setupApp()
    }
    
    // MARK: - Body
    
    var body: some Scene {
        WindowGroup {
            Group {
                if coordinator.isLoading {
                    SplashView()
                } else if coordinator.isAuthenticated {
                    HomeView(viewModel: DIContainer.shared.makeHomeViewModel())
                } else {
                    LoginView(viewModel: DIContainer.shared.makeLoginViewModel())
                }
            }
            .environmentObject(coordinator)
        }
    }
    
    // MARK: - Setup
    
    private func setupApp() {
        // Validate environment configuration
        Environment.validate()
        
        // Configure app appearance
        configureAppearance()
    }
    
    private func configureAppearance() {
        // Set global tint color
        UIView.appearance(whenContainedInInstancesOf: [UIAlertController.self]).tintColor = .systemBlue
    }
}

// MARK: - Splash View

struct SplashView: View {
    var body: some View {
        ZStack {
            Color(.systemBackground)
                .ignoresSafeArea()
            
            VStack(spacing: 20) {
                Image(systemName: "leaf.circle.fill")
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
                
                ProgressView()
                    .padding(.top)
            }
        }
    }
}

#Preview {
    SplashView()
}
