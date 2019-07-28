import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Profiles = new Mongo.Collection('Profiles');

/** Define a schema to specify the structure of each document in the collection. */
const ProfileSchema = new SimpleSchema({
  email: { type: String },
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  bio: { type: String, optional: true },
  title: { type: String, optional: true },
  picture: { type: String, optional: true },
  interests: { type: Array, optional: true },
  'interests.$': { type: String },
  projects: { type: Array, optional: true },
  'projects.$': { type: String },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profiles.attachSchema(ProfileSchema);

/** Guarantee that the email field is unique by making it an index in Mongo. */
Profiles._ensureIndex({ email: 1 });

/** Define a publication to publish all profiles. */
Meteor.publish('Profiles', () => Profiles.find());

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema };
