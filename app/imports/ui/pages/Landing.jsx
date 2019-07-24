import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <div className='landing-green-background'>
            foo
          </div>
          <div className='landing-white-background'>
            bar
          </div>
          <div className='landing-green-background'>
            bar
          </div>
        </div>
    );
  }
}

export default Landing;
