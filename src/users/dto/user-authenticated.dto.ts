class UserAuthenticatedDto {
  _id: String;
  name: String;
  email: String;
  token: String;

  constructor(id: String, name: String, email: String, token: String) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.token = token;
  }
}

export default UserAuthenticatedDto;
