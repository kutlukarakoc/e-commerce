export interface IUser {
   user?: {
      accessToken?: string
      email?: string
      emailVerified?: boolean
      phoneNumber?: any
      photoURL?: any
      uid?: string
      metadata?: {
         createdAt?: string
         creationTime?: string
         lastLoginAt?: string
         lastSignInTime?: string
      }
      displayName?: any
   }
}