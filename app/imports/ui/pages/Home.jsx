import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  department: { type: String, label: 'Department', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: ['Software Engineering', 'Networking', 'AI'] },
  projects: { type: Array, label: 'Projects', optional: true },
  'projects.$': { type: String, allowedValues: ['RadGrad', 'OPQ'] },
});

/** Renders the Page for adding a document. */
class Home extends React.Component {

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
    swal('Success', 'Profile updated successfully', 'success');
    formRef.reset();
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const model = { email: 'johnson@hawaii.edu' };
    return (
      <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Your Bowfolios Profile</Header>
            <AutoForm ref={ref => { fRef = ref; }} model={model}
                      schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='firstName' showInlineError={true} placeholder={'First Name'}/>
                  <TextField name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                  <TextField name='email' showInlineError={true} placeholder={'email'} disabled />
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField name='department' showInlineError={true} placeholder={'Department'}/>
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
      </div>
    );
  }
}

export default Home;
