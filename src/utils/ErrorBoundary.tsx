import React from 'react';

interface Props {
  children: React.ReactNode;
  errorUI?: React.ReactNode;
}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('ErrorBoundary:getDerivedStateFromError');
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {} // You can also log the error

  render() {
    // console.log("ERRORBOUNDARY render");
    if (this.state.hasError) {
      if (this.props.errorUI) {
        return this.props.errorUI;
      }
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
