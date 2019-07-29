import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests, interestName } from '../../api/interests/Interests';
import { Profiles, profilesName } from '../../api/profiles/Profiles';
import { ProfilesInterests, profilesInterestsName } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects, profilesProjectsName } from '../../api/profiles/ProfilesProjects';
import { Projects, projectsName } from '../../api/projects/Projects';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allProjects) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  bio: { type: String, label: 'Biographical statement', optional: true },
  title: { type: String, label: 'Title', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  projects: { type: Array, label: 'Projects', optional: true },
  'projects.$': { type: String, allowedValues: allProjects },
});

/** Renders the Page for adding a document. */
class Home extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { email, firstName, lastName, bio, title, picture, interests, projects, _id } = data;
    console.log(_id);
    Profiles.update(_id, { $set: { email, firstName, lastName, bio, title, picture } });
    ProfilesInterests.remove({ profile: email });
    ProfilesProjects.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.insert({ profile: email, interest }));
    projects.map((project) => ProfilesProjects.insert({ profile: email, project }));
    swal('Success', 'Item added successfully', 'success');
    formRef.reset();
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    // Create the form schema for uniforms.
    const allInterests = _.pluck(this.props.interestDocs, 'name');
    const allProjects = _.pluck(this.props.projectDocs, 'name');
    const formSchema = makeSchema(allInterests, allProjects);
    // Now create the model with all the user information.
    const projects = _.pluck(this.props.profilesProjectsDocs, 'project');
    const interests = _.pluck(this.props.profilesInterestsDocs, 'interest');
    const model = _.extend({}, this.props.profileDoc, { interests, projects });
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Your Profile</Header>
          <AutoForm ref={ref => {
            fRef = ref;
          }} model={model}
                    schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='firstName' showInlineError={true} placeholder={'First Name'}/>
                <TextField name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                <TextField name='email' showInlineError={true} placeholder={'email'} disabled/>
              </Form.Group>
              <LongTextField name='bio' placeholder='Write a little bit about yourself.'/>
              <Form.Group widths={'equal'}>
                <TextField name='title' showInlineError={true} placeholder={'Title'}/>
                <TextField name='picture' showInlineError={true} placeholder={'URL to picture'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
                <MultiSelectField name='projects' showInlineError={true} placeholder={'Projects'}/>
              </Form.Group>
              <SubmitField value='Update'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

Home.propTypes = {
  ready: PropTypes.bool.isRequired,
  interestDocs: PropTypes.array.isRequired,
  profileDoc: PropTypes.object,
  projectDocs: PropTypes.array.isRequired,
  profilesInterestsDocs: PropTypes.array.isRequired,
  profilesProjectsDocs: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(interestName);
  const sub2 = Meteor.subscribe(profilesName);
  const sub3 = Meteor.subscribe(profilesInterestsName);
  const sub4 = Meteor.subscribe(profilesProjectsName);
  const sub5 = Meteor.subscribe(projectsName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
    profileDoc: Profiles.findOne({ email: Meteor.user().username }),
    interestDocs: Interests.find().fetch(),
    projectDocs: Projects.find().fetch(),
    profilesInterestsDocs: ProfilesInterests.find({ profile: Meteor.user().username }).fetch(),
    profilesProjectsDocs: ProfilesProjects.find({ profile: Meteor.user().username }).fetch(),
  };
})(Home);
