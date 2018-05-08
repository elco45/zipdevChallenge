import React from 'react';
import Loading from 'react-loading-components';

export class LoadingComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '30vh' }}>
        <Loading type="ball_triangle" width={100} height={100} fill="#F7DF57" />
      </div>
    );
  }
}

export default LoadingComponent;
