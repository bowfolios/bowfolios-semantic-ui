import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { addProjectMethod } from '../../startup/both/Methods';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allParticipants) => new SimpleSchema({
  name: String,
  description: String,
  homepage: String,
  picture: String,
  interests: { type: Array, label: 'Interests', optional: false },
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
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allParticipants = _.pluck(Profiles.collection.find().fetch(), 'email');
    const formSchema = makeSchema(allInterests, allParticipants);
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <Grid id="add-project-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Project</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='name' name='name' showInlineError={true} placeholder='Project name'/>
                <TextField id='picture' name='picture' showInlineError={true} placeholder='Project picture URL'/>
                <TextField id='homepage' name='homepage' showInlineError={true} placeholder='Homepage URL'/>
              </Form.Group>
              <LongTextField id='description' name='description' placeholder='Describe the project here'/>
              <Form.Group widths={'equal'}>
                <MultiSelectField id='interests' name='interests' showInlineError={true} placeholder={'Interests'}/>
                <MultiSelectField id='participants' name='participants' showInlineError={true} placeholder={'Participants'}/>
              </Form.Group>
              <SubmitField id='submit' value='Submit'/>
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
  const sub1 = Meteor.subscribe(Interests.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub5 = Meteor.subscribe(Projects.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(AddProject);
