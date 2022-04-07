import React from 'react';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  render() {
    const {hasError} = this.state;
    if (hasError) {
      return <SomethingWentWrong />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
