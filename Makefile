# Sinthome Website Development Tasks
.PHONY: dev build preview clean reset lint format check test deploy help

# Default target
.DEFAULT_GOAL := help

# Development
dev: ## Start development server
	@echo "🚀 Starting development server..."
	@pnpm run dev

dev-debug: ## Start development server with verbose logging
	@echo "🐛 Starting development server with debug info..."
	@pnpm run dev:debug

# Build and Preview
build: ## Build the project for production
	@echo "🔨 Building project..."
	@pnpm run build

build-analyze: ## Build with verbose output for debugging
	@echo "🔍 Building with analysis..."
	@pnpm run build:analyze

preview: ## Preview production build locally
	@echo "👀 Starting preview server..."
	@pnpm run preview

# Code Quality
lint: ## Run ESLint
	@echo "🔍 Running linter..."
	@pnpm run lint

lint-fix: ## Run ESLint and fix issues
	@echo "🔧 Running linter with auto-fix..."
	@pnpm run lint:fix

format: ## Format code with Prettier
	@echo "💅 Formatting code..."
	@pnpm run format

check: ## Run Astro type checking
	@echo "✅ Running type checks..."
	@pnpm run check

type-check: ## Run TypeScript type checking
	@echo "🔍 Running TypeScript checks..."
	@pnpm run type-check

pre-commit: ## Run all pre-commit checks
	@echo "🧪 Running pre-commit checks..."
	@pnpm run pre-commit

# Maintenance
clean: ## Clean build artifacts and cache
	@echo "🧹 Cleaning project..."
	@pnpm run clean

reset: ## Reset project (clean + reinstall dependencies)
	@echo "🔄 Resetting project..."
	@pnpm run reset

install: ## Install dependencies
	@echo "📦 Installing dependencies..."
	@pnpm install

# Git Operations
sync: ## Sync with remote main branch
	@echo "🔄 Syncing with remote..."
	@git fetch origin
	@git rebase origin/main

feature: ## Create new feature branch (usage: make feature name=my-feature)
	@if [ -z "$(name)" ]; then \
		echo "❌ Please provide a feature name: make feature name=my-feature"; \
		exit 1; \
	fi
	@echo "🌿 Creating feature branch: feature/$(name)"
	@git checkout -b feature/$(name)

# Deployment
deploy-check: ## Check if ready for deployment
	@echo "🚀 Checking deployment readiness..."
	@pnpm run pre-commit
	@pnpm run build
	@echo "✅ Ready for deployment!"

# Help
help: ## Show this help message
	@echo "Sinthome Website - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Examples:"
	@echo "  make dev              # Start development"
	@echo "  make feature name=nav # Create feature/nav branch"
	@echo "  make deploy-check     # Verify ready for deployment"