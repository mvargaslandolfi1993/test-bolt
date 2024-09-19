export default class PrismaException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PrismaException";
  }
}