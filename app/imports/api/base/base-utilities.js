import { Meteor } from 'meteor/meteor';
import { Bowfolios } from '../bowfolios/Bowfolios';

export const removeAllEntities = () => {
  if (Meteor.isTest || Meteor.isAppTest) {
    Bowfolios.collections.forEach((collection) => {
      if (collection?._type === 'Interest') {
        collection._collection.remove({});
      }
    });
  }
  return true;
};
