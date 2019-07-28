import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ProjectsInterests = new Mongo.Collection('ProjectsInterests');

/** Define a schema to specify the structure of each document in the collection. */
const ProjectInterestSchema = new SimpleSchema({
  project: String,
  interest: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProjectsInterests.attachSchema(ProjectInterestSchema);

/** Define a publication to publish this collection. */
Meteor.publish('ProjectsInterests', () => ProjectsInterests.find());

/** Make the collection and schema available to other code. */
export { ProjectsInterests, ProjectInterestSchema };
