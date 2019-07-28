import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ProfilesInterests = new Mongo.Collection('ProfilesInterests');

/** Define a schema to specify the structure of each document in the collection. */
const ProfileInterestSchema = new SimpleSchema({
  profile: String,
  interest: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
ProfilesInterests.attachSchema(ProfileInterestSchema);

/** Define a publication to publish this collection. */
Meteor.publish('ProfilesInterests', () => ProfilesInterests.find());

/** Make the collection and schema available to other code. */
export { ProfilesInterests, ProfileInterestSchema };
