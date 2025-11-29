declare global {
  namespace Express {
    interface Request {
      user: {
        id: string,
        name: string,
        email: string,
        isVerified: boolean,
        is2FAEnabled: boolean,
        createdAt: Date,
        updatedAt: Date
      }
    }
  }
}

export { }