import React from 'react';
import { Grid, Image, Container, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <div className='landing-green-background'>
            <Container textAlign='center'>
              <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
                Welcome to Bowfolios
              </Header>
              <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
                Professional portfolios, projects, and networking for the UH Community
              </Header>
            </Container>
          </div>
          <div className='landing-white-background'>
            <Grid container columns='equal' style={{ marginTop: '0', marginBottom: '0' }}>
              <Grid.Column textAlign='right'>
                <Image src="/images/logo.png" floated='right'/>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <Header style={{ color: '#376551' }} as='h2'>Create your portfolio.</Header>
                <Header style={{ color: '#376551' }} as='h2'>Specify your interests and projects.</Header>
              </Grid.Column>
            </Grid>
          </div>
          <div className='landing-green-background'>
            <Grid container columns='equal' style={{ marginTop: '0', marginBottom: '0' }}>
              <Grid.Column textAlign='right'>
                <Image src="/images/logo.png" floated='right'/>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <Header style={{ color: 'white' }} as='h2'>Publish your portfolio.</Header>
              </Grid.Column>
            </Grid>
          </div>
          <div className='landing-white-background'>
            <Grid container columns='equal' style={{ marginTop: '0', marginBottom: '0' }}>
              <Grid.Column textAlign='right'>
                <Image src="/images/logo.png" floated='right'/>
              </Grid.Column>
              <Grid.Column verticalAlign='middle'>
                <Header style={{ color: '#376551' }} as='h2'>Find others with similar interests</Header>
              </Grid.Column>
            </Grid>
          </div>
        </div>

    );
  }
}

export default Landing;
