import { Mongo } from 'meteor/mongo';

export const userTeamLinkCollection = new Mongo.Collection('userTeamLinks');
export const userBrandLinkCollection = new Mongo.Collection('userBrandLinks');
export const userBrandGroupLinkCollection = new Mongo.Collection('userBrandGroupLinks');

export const brandBrandGroupLinkCollection = new Mongo.Collection('brandBrandGroupLinks');
export const teamBrandLinkCollection = new Mongo.Collection('teamBrandLinks');
export const teamBrandGroupLinkCollection = new Mongo.Collection('teamBrandGroupLinks');
