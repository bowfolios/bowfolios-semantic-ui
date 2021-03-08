import { Meteor } from 'meteor/meteor';
import { Bowfolios } from '../../api/bowfolios/Bowfolios';

Bowfolios.collections.forEach((collection) => {
  // console.log(`Publishing ${collection.getCollectionName()}`);
  collection.publish();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
