import { _ } from 'meteor/erasaur:meteor-lodash';
import { Meteor } from 'meteor/meteor';
import { Interests } from '../interests/Interests';
import { Profiles } from '../profiles/Profiles';
import { ProfilesInterests } from '../profiles/ProfilesInterests';
import { ProfilesProjects } from '../profiles/ProfilesProjects';
import { Projects } from '../projects/Projects';
import { ProjectsInterests } from '../projects/ProjectsInterests';

class BowfoliosClass {
  constructor() {
    this.collections = [
      Interests,
      Profiles,
      ProfilesInterests,
      ProfilesProjects,
      Projects,
      ProjectsInterests,
    ];
    this.collectionLoadSequence = [];
    this.collectionAssociation = {};
    _.forEach(this.collections, (collection) => {
      this.collectionAssociation[collection._collectionName] = collection;
    });
  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called Bowfolios.getCollection with unknown collection name: ${collectionName}`, '', Error().stack);
    }
    return collection;
  }
}

export const Bowfolios = new BowfoliosClass();
