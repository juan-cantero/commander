export class UserResponseDto {
  _id: String;
  name: String;
  email: String;

  constructor(id: String, name: String, email: String) {
    this._id = id;
    this.name = name;
    this.email = email;
  }
}
