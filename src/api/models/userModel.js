import { Dashboard } from "./dashboardModel";

class User {
    constructor(id, email, password, avatar) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.avatar = avatar;
      this.dashboard = Dashboard;
    }
  }
  
  module.exports = User;