"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Client-side error boundary — catches render errors in the ceremony/event
 * subtree so we can at least log the cause instead of a blank page.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    console.error("[ErrorBoundary] caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050A0F] p-6 text-[#FF4D5A]">
            <pre className="text-xs overflow-auto max-h-[80vh]">
              {this.state.error?.message}
              {this.state.error?.stack}
            </pre>
          </div>
        )
      );
    }
    return this.props.children;
  }
}