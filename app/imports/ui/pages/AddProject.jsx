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
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  description: String,
  picture: String,
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: ['Software Engineering', 'Networking', 'AI'] },
  participants: { type: Array, label: 'Participants', optional: true },
  'participants.$': { type: String,
    allowedValues: ['Philip Johnson', 'Henri Casanova', 'Edo Biagioni', 'Serge Negrashov'] },
});

/** Renders the Page for adding a document. */
class AddProject extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    // const { name, quantity, condition } = data;
    // const owner = Meteor.user().username;
    // Stuffs.insert({ name, quantity, condition, owner },
    //   (error) => {
    //     if (error) {
    //       swal('Error', error.message, 'error');
    //     } else {
    //       swal('Success', 'Item added successfully', 'success');
    //       formRef.reset();
    //     }
    //   });
    swal('Success', data, 'success');
    formRef.reset();
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Project</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='name' showInlineError={true} placeholder='Project name'/>
                  <TextField name='picture' showInlineError={true} placeholder='URL to project picture/icon'/>
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

export default AddProject;
