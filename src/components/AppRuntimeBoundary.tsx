import { Component, type ErrorInfo, type ReactNode } from "react";

type AppRuntimeBoundaryProps = {
  children: ReactNode;
};

type AppRuntimeBoundaryState = {
  hasError: boolean;
  errorMessage: string | null;
};

export class AppRuntimeBoundary extends Component<
  AppRuntimeBoundaryProps,
  AppRuntimeBoundaryState
> {
  state: AppRuntimeBoundaryState = {
    hasError: false,
    errorMessage: null,
  };

  static getDerivedStateFromError(error: Error): AppRuntimeBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App runtime boundary caught an error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="app-page flex min-h-screen items-center justify-center px-6">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-4 text-center">
          <p className="surface-eyebrow-coral">App Recovery</p>
          <h1 className="surface-heading-lg">The app hit a runtime error.</h1>
          <p className="text-muted-foreground">
            The provider tree stayed mounted behind this recovery screen so the app does not fail as a blank page.
          </p>
          {import.meta.env.DEV && this.state.errorMessage ? (
            <pre className="w-full overflow-x-auto rounded-xl bg-black/5 p-4 text-left text-xs text-muted-foreground">
              {this.state.errorMessage}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={this.handleReload}
            className="surface-button-primary inline-flex items-center justify-center rounded-full px-6 py-3"
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}

// Codebase classification: runtime app-level error boundary.
