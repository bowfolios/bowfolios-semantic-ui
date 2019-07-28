import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

const projectData = [
  {
    name: 'Open Power Quality', description:
      'Open source hardware and software for distributed power quality data collection, analysis, and visualization.',
    interests: ['Software Engineering', 'Renewable Energy'],
    participants: ['https://philipmjohnson.github.io/images/philip2.jpeg',
      'https://sergey-negrashov.github.io/images/serge.jpg', 'https://anthonyjchriste.github.io/images/me.png'],
    picture: 'https://avatars0.githubusercontent.com/u/4641939',
  },
  {
    name: 'WRENCH', description:
      'WRENCH is an open-source library for developing simulators for large-scale scientific computation',
    interests: ['Distributed and parallel computing'],
    participants: ['http://www.ics.hawaii.edu/wp-content/uploads/2013/08/Henri_Casanova1.jpg'],
    picture: 'https://wrench-project.org/images/logo-vertical.png',
  },
  {
    name: 'Cyber Canoe', description:
      'Software for Unity projects involving stereoscopic resolution driven by 9 PCs with a GeForce 980 graphics card.',
    interests: ['Unity', 'Visualization'],
    participants: ['http://www.ics.hawaii.edu/wp-content/uploads/2013/08/Jason_Leigh-2014.jpg'],
    picture: 'http://lava.manoa.hawaii.edu/wp-content/uploads/2016/07/CC-logo-small.png',
  },

];

/** Component for layout out a Project Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='left' avatar src={props.project.picture}/>
      <Card.Header style={{ marginTop: '0px' }}>{props.project.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.project.title}</span>
      </Card.Meta>
      <Card.Description>
        {props.project.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.project.interests,
        (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      {_.map(props.project.participants, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  project: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class Projects extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Card.Group>
          {_.map(projectData, (project, index) => <MakeCard key={index} project={project}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Projects.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Projects);
