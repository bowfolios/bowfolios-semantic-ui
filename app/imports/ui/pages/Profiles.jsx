import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const profileData = [
  { firstName: 'Philip', lastName: 'Johnson', bio: '', department: 'ICS',
    interests: ['Software Engineering', 'Climate Change'], projects: ['https://www.radgrad.org/img/radgrad_logo.png',
      'https://openpowerquality.org/img/opqlogo_white.png'],
    picture: 'https://philipmjohnson.github.io/images/philip2.jpeg', email: 'johnson@hawaii.edu' },
  { firstName: 'Henri', lastName: 'Casanova', bio: '', department: 'ICS', interests: ['HPC', 'Parallel Computing'],
    projects: ['https://wrench-project.org/images/logo-vertical.png'],
    picture: 'https://github.com/ics-portfolios/ics-portfolios.github.io/raw/master/images/casanova.jpg',
    email: 'henric@hawaii.edu' },
  { firstName: 'Carleton', lastName: 'Moore', bio: '', department: 'ICS',
    interests: ['Software Engineering', 'Renewable Energy'], projects: ['https://www.radgrad.org/img/radgrad_logo.png'],
    picture: 'https://cammoore.github.io/images/cam-moore.jpg', email: 'cmoore@hawaii.edu' },
  { firstName: 'Anthony', lastName: 'Christe', bio: '', department: 'ICS', interests: ['AI', 'Distributed Computing'],
    projects: ['https://openpowerquality.org/img/opqlogo_white.png'],
    picture: 'https://anthonyjchriste.github.io/images/me.png', email: 'achiste@hawaii.edu' },
  { firstName: 'Serge', lastName: 'Negrashov', bio: '', department: 'ICS', interests: ['scalable IP networks'],
    projects: ['https://openpowerquality.org/img/opqlogo_white.png'],
    picture: 'https://sergey-negrashov.github.io/images/serge.jpg', email: 'sin8@hawaii.edu' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profiles extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Card.Group>
            
          </Card.Group>
        </Container>
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
