'use client';

import { Component, ReactNode } from 'react';

interface IState {
  hasError: boolean;
}

interface IProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(): void {
    this.setState({ hasError: true });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong...</p>
          <a href="/">Reset</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
