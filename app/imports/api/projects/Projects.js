import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Projects = new Mongo.Collection('Projects');

/** Define a schema to specify the structure of each document in the collection. */
const ProjectSchema = new SimpleSchema({
  name: String,
  homepage: { type: String, optional: true },
  description: { type: String, optional: true },
  picture: { type: String, optional: true },
  interests: { type: Array, optional: true },
  'interests.$': { type: String },
  participants: { type: Array, optional: true },
  'participants.$': { type: String },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Projects.attachSchema(ProjectSchema);

/** Guarantee that the name field is unique by making it an index in Mongo. */
Projects._ensureIndex({ name: 1 });

/** Define a publication to publish all projects. */
Meteor.publish('Projects', () => Projects.find());

/** Make the collection and schema available to other code. */
export { Projects, ProjectSchema };
