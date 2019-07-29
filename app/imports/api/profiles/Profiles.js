import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const profilesName = 'Profiles';

/** Define a Mongo collection to hold the data. */
const Profiles = new Mongo.Collection(profilesName);

/** Define a schema to specify the structure of each document in the collection. */
const ProfileSchema = new SimpleSchema({
  email: { type: String },
  firstName: { type: String, optional: true },
  lastName: { type: String, optional: true },
  bio: { type: String, optional: true },
  title: { type: String, optional: true },
  picture: { type: String, optional: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Profiles.attachSchema(ProfileSchema);

/** Guarantee that the email field is unique by making it an index in Mongo. */
if (Meteor.isServer) {
  Profiles._ensureIndex({ email: 1 });
}

/** Make the collection and schema available to other code. */
export { Profiles, ProfileSchema, profilesName };
