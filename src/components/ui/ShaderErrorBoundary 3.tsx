import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ShaderErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ShaderErrorBoundary caught an error:', error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full bg-red-900/20 border border-red-600/50 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h3 className="text-red-400 font-bold text-lg mb-2">Shader Component Error</h3>
            <p className="text-red-300 text-sm mb-4 font-mono">
              {this.state.error?.message || 'Unknown shader error'}
            </p>
            <p className="text-zinc-400 text-xs mb-4">
              This usually happens when WebGL is not available or the shader library failed to load.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}