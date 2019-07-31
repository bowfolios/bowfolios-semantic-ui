import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** The name of the collection and the global publication. */
const interestName = 'Interests';

/** Define a Mongo collection to hold the data. */
const Interests = new Mongo.Collection(interestName);

/** Define a schema to specify the structure of each document in the collection. */
const InterestSchema = new SimpleSchema({
  name: { type: String, index: true, unique: true },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Interests.attachSchema(InterestSchema);

/** Make the collection and schema available to other code. */
export { Interests, InterestSchema, interestName };
