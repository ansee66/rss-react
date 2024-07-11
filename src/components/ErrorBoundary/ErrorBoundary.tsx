import React, { Fragment, ReactNode } from 'react';
import Button from '../Button/Button';

export type TriggerErrorType = (error: Error) => void;

type PropsType = {
  children: ReactNode | ReactNode[];
};

export const ErrorBoundaryContext = React.createContext<TriggerErrorType>(
  () => null
);

class ErrorBoundary extends React.Component<PropsType> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log('Error', error);
  }

  triggerError = (error: Error) => {
    console.log('Error details:', error);
    this.setState({ hasError: true });
  };

  render() {
    return (
      <ErrorBoundaryContext.Provider value={this.triggerError}>
        {this.state.hasError ? (
          <Fragment>
            <h1>Oops, an error has occurred</h1>
            <Button
              title="Reload the page"
              onClick={() => {
                window.location.reload();
              }}
            />
          </Fragment>
        ) : (
          this.props.children
        )}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export default ErrorBoundary;
