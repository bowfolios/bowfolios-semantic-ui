import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Icon } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

const profileData = [
  { firstName: 'Philip', lastName: 'Johnson', bio: 'I am a Professor and like to paddle outrigger canoes.',
    title: 'Professor',
    interests: ['Software Engineering', 'Climate Change'], projects: ['https://www.radgrad.org/img/radgrad_logo.png',
      'https://openpowerquality.org/img/opqlogo_white.png'],
    picture: 'https://philipmjohnson.github.io/images/philip2.jpeg', email: 'johnson@hawaii.edu' },
  { firstName: 'Henri', lastName: 'Casanova', bio: 'In my spare time, I like to scuba dive.',
    title: 'Professor', interests: ['HPC', 'Parallel Computing'],
    projects: ['https://wrench-project.org/images/logo-vertical.png'],
    picture: 'https://github.com/ics-portfolios/ics-portfolios.github.io/raw/master/images/casanova.jpg',
    email: 'henric@hawaii.edu' },
  { firstName: 'Carleton', lastName: 'Moore', bio: 'Every summer, I enjoy visiting Portland, Oregon.',
    title: 'Assistant Professor',
    interests: ['Software Engineering', 'Renewable Energy'], projects: ['https://www.radgrad.org/img/radgrad_logo.png'],
    picture: 'https://cammoore.github.io/images/cam-moore.jpg', email: 'cmoore@hawaii.edu' },
  { firstName: 'Anthony', lastName: 'Christe', bio: 'I enjoy competitive bicycle racing.',
    title: 'Ph.D. Student', interests: ['AI', 'Distributed Computing'],
    projects: ['https://openpowerquality.org/img/opqlogo_white.png'],
    picture: 'https://anthonyjchriste.github.io/images/me.png', email: 'achiste@hawaii.edu' },
  { firstName: 'Serge', lastName: 'Negrashov', bio: 'Most weekends, you can find me on my 8 foot dinghy.',
    title: 'Ph.D. Student', interests: ['scalable IP networks'],
    projects: ['https://openpowerquality.org/img/opqlogo_white.png'],
    picture: 'https://sergey-negrashov.github.io/images/serge.jpg', email: 'sin8@hawaii.edu' },
];

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.profile.picture} />
      <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.profile.title}</span>
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};


/** Renders the Profile Collection as a set of Cards. */
class Profiles extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const style = { paddingTop: '20px', paddingBottom: '20px' };
    return (
      <div style={style}>
        <Container>
          <Card.Group>
            {_.map(profileData, (profile) => <MakeCard profile={profile} />)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profiles.propTypes = {
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
})(Profiles);
