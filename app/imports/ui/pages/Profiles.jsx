import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles, profilesName } from '../../api/profiles/Profiles';
import { ProfilesInterests, profilesInterestsName } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects, profilesProjectsName } from '../../api/profiles/ProfilesProjects';
import { Projects, projectsName } from '../../api/projects/Projects';

function getProfileData(email) {
  const data = Profiles.findOne({ email });
  console.log('data', data);
  const interests = _.pluck(ProfilesInterests.find({ profile: email }).fetch(), 'interest');
  console.log('interests', interests);
  const projects = _.pluck(ProfilesProjects.find({ profile: email }).fetch(), 'project');
  console.log('projects', projects);
  const projectPictures = projects.map(project => _.pluck(Projects.find({ name: project }, 'picture')));
  console.log('pictures', projectPictures);
  return _.extend({ }, data, { interests, projects: projectPictures });
}

// const profileDataOld = [
//   { firstName: 'Philip', lastName: 'Johnson', bio: 'I am a Professor and like to paddle outrigger canoes.',
//     title: 'Professor',
//     interests: ['Software Engineering'], projects: ['https://www.radgrad.org/img/radgrad_logo.png'],
//     picture: 'https://philipmjohnson.github.io/images/philip2.jpeg', email: 'johnson@hawaii.edu' },
//   { firstName: 'Henri', lastName: 'Casanova', bio: 'In my spare time, I like to scuba dive.',
//     title: 'Professor', interests: ['HPC', 'Parallel Computing'],
//     projects: ['https://wrench-project.org/images/logo-vertical.png'],
//     picture: 'http://www.ics.hawaii.edu/wp-content/uploads/2013/08/Henri_Casanova1.jpg',
//     email: 'henric@hawaii.edu' },
//   { firstName: 'Carleton', lastName: 'Moore', bio: 'Every summer, I enjoy visiting Portland, Oregon.',
//     title: 'Assistant Professor',
//     interests: ['Software Engineering'], projects: ['https://www.radgrad.org/img/radgrad_logo.png'],
//     picture: 'https://cammoore.github.io/images/cam-moore.jpg', email: 'cmoore@hawaii.edu' },
//   { firstName: 'Anthony', lastName: 'Christe', bio: 'I enjoy competitive bicycle racing.',
//     title: 'Ph.D. Student', interests: ['AI', 'Distributed Computing'],
//     projects: ['http://intellitech.pro/wp-content/uploads/2016/12/hadoop-300x293.png'],
//     picture: 'https://anthonyjchriste.github.io/images/me.png', email: 'achiste@hawaii.edu' },
//   { firstName: 'Serge', lastName: 'Negrashov', bio: 'Most weekends, you can find me on my 8 foot dinghy.',
//     title: 'Ph.D. Student', interests: ['scalable IP networks'],
//     projects: ['https://www.raspberrypi.org/app/uploads/2018/03/RPi-Logo-Reg-SCREEN-199x250.png'],
//     picture: 'https://sergey-negrashov.github.io/images/serge.jpg', email: 'sin8@hawaii.edu' },
// ];

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
      {_.map(props.profile.interest,
        (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Projects</Header>
      {_.map(props.profile.projects, (project, index) => <Image key={index} size='tiny' src={project}/>)}
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};


/** Renders the Profile Collection as a set of Cards. */
class ProfilesPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(Profiles.find().fetch(), 'email');
    const profileData = emails.map(email => getProfileData(email));
    return (
      <Container>
        <Card.Group>
          {_.map(profileData, (profile, index) => <MakeCard key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfilesPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(profilesName);
  const sub2 = Meteor.subscribe(profilesInterestsName);
  const sub3 = Meteor.subscribe(profilesProjectsName);
  const sub4 = Meteor.subscribe(projectsName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(ProfilesPage);
