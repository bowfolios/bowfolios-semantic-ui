import React from 'react';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';

/** Returns the Profiles and Projects associated with the passed Interest. */
function getInterestData(name) {
  const profiles = _.pluck(ProfilesInterests.find({ interest: name }).fetch(), 'profile');
  const profilePictures = profiles.map(profile => Profiles.findOne({ email: profile }).picture);
  const projects = _.pluck(ProjectsInterests.find({ interest: name }).fetch(), 'project');
  const projectPictures = projects.map(project => Projects.findOne({ name: project }).picture);
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({ }, { name, profiles: profilePictures, projects: projectPictures });
}

/** Component for layout out an Interest Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header style={{ marginTop: '0px' }}>{props.interest.name}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.interest.profiles, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
      {_.map(props.interest.projects, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  interest: PropTypes.object.isRequired,
};

/** Renders the Interests as a set of Cards. */
class InterestsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const interests = _.pluck(Interests.find().fetch(), 'name');
    const interestData = interests.map(interest => getInterestData(interest));
    return (
      <Container id="interests-page">
        <Card.Group>
          {_.map(interestData, (interest, index) => <MakeCard key={index} interest={interest}/>)}
        </Card.Group>
      </Container>
    );
  }
}

InterestsPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = ProfilesProjects.subscribe();
  const sub2 = Projects.subscribe();
  const sub3 = ProjectsInterests.subscribe();
  const sub4 = Profiles.subscribe();
  const sub5 = Interests.subscribe();
  const sub6 = ProfilesInterests.subscribe();
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
  };
})(InterestsPage);
