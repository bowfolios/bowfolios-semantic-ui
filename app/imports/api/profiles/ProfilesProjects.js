import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ProfilesProjects = new Mongo.Collection('ProfilesProjects');

/** Define a schema to specify the structure of each document in the collection. */
const ProfileProjectSchema = new SimpleSchema({
  email: String,
  name: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProfilesProjects.attachSchema(ProfileProjectSchema);

/** Define a publication to publish this collection. */
Meteor.publish('ProfilesProjects', () => ProfilesProjects.find());

/** Make the collection and schema available to other code. */
export { ProfilesProjects, ProfileProjectSchema };
