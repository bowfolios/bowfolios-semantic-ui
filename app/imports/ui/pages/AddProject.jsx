import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { addProjectMethod } from '../../startup/both/Methods';
import { interestsName, Interests } from '../../api/interests/Interests';
import { Profiles, profilesName } from '../../api/profiles/Profiles';
import { profilesInterestsName } from '../../api/profiles/ProfilesInterests';
import { profilesProjectsName } from '../../api/profiles/ProfilesProjects';
import { projectsName } from '../../api/projects/Projects';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allParticipants) => new SimpleSchema({
  name: String,
  description: String,
  homepage: String,
  picture: String,
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  participants: { type: Array, label: 'Participants', optional: true },
  'participants.$': { type: String, allowedValues: allParticipants },
});

/** Renders the Page for adding a document. */
class AddProject extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    Meteor.call(addProjectMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Project added successfully', 'success').then(() => formRef.reset());
      }
    });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const allInterests = _.pluck(Interests.find().fetch(), 'name');
    const allParticipants = _.pluck(Profiles.find().fetch(), 'email');
    const formSchema = makeSchema(allInterests, allParticipants);
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Project</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='name' showInlineError={true} placeholder='Project name'/>
                  <TextField name='picture' showInlineError={true} placeholder='Project picture URL'/>
                  <TextField name='homepage' showInlineError={true} placeholder='Homepage URL'/>
                </Form.Group>
                <LongTextField name='description' placeholder='Describe the project here'/>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
                  <MultiSelectField name='participants' showInlineError={true} placeholder={'Participants'}/>
                </Form.Group>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

AddProject.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(interestsName);
  const sub2 = Meteor.subscribe(profilesName);
  const sub3 = Meteor.subscribe(profilesInterestsName);
  const sub4 = Meteor.subscribe(profilesProjectsName);
  const sub5 = Meteor.subscribe(projectsName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(AddProject);
