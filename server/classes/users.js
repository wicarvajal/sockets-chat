class Users {
  constructor() {
    this.people = [];
  }

  addUsers(id, name, room) {
    let user = { id, name, room };
    this.people.push(user);
    return this.people;
  }

  getUserById(id) {
    return this.people.filter(us => us.id === id)[0];
  }

  getPeople() {
    return this.people;
  }

  getPeopleByRoom(room) {
    return this.people.filter(user => user.room === room)
  }

  deleteUser(id) {
    let deletedUser = this.getUserById(id);
    this.people = this.people.filter(us => us.id != id);
    return deletedUser;
  }
}

module.exports = { Users };
