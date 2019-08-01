import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Image, Label, Header, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import SubmitField from 'uniforms-semantic/SubmitField';
import AutoForm from 'uniforms-semantic/AutoForm';
import { Interests, interestsName } from '../../api/interests/Interests';
import { Profiles, profilesName } from '../../api/profiles/Profiles';
import { ProfilesInterests, profilesInterestsName } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects, profilesProjectsName } from '../../api/profiles/ProfilesProjects';
import { Projects, projectsName } from '../../api/projects/Projects';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

function getProfileData(email) {
  const data = Profiles.findOne({ email });
  const interests = _.pluck(ProfilesInterests.find({ profile: email }).fetch(), 'interest');
  const projects = _.pluck(ProfilesProjects.find({ profile: email }).fetch(), 'project');
  const projectPictures = projects.map(project => Projects.findOne({ name: project }).picture);
  return _.extend({ }, data, { interests, projects: projectPictures });
}

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
      {_.map(props.profile.interests,
        (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Projects</Header>
      {_.map(props.profile.projects, (project, index) => <Image key={index} size='mini' src={project}/>)}
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};


/** Renders the Profile Collection as a set of Cards. */
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interests: [] };
  }

  submit(data) {
    this.setState({ interests: data.interests || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allInterests = _.pluck(Interests.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests);
    const emails = _.pluck(ProfilesInterests.find({ interest: { $in: this.state.interests } }).fetch(), 'profile');
    const profileData = _.uniq(emails).map(email => getProfileData(email));
    return (
      <Container>
        <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
            <SubmitField value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(profileData, (profile, index) => <MakeCard key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Filter.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(profilesName);
  const sub2 = Meteor.subscribe(profilesInterestsName);
  const sub3 = Meteor.subscribe(profilesProjectsName);
  const sub4 = Meteor.subscribe(projectsName);
  const sub5 = Meteor.subscribe(interestsName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(Filter);
