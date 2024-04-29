export class User {
    constructor(
      public uid?: string,
      public id?: string,
      public email?: string,
      public password?: string,
      public displayName?: string,
      public photoURL?: string,
      public emailVerified?: string,
    ) { }
  }