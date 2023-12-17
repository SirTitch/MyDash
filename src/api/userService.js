const usersJson = require('../mockData/users.json');
const dashboardItemJson = require('../mockData/dashboardItem.json');


/**
 * for now, as we don't have REST APIs, I've put local json files under mockData Folder
 */
export class UserService {
  /**
   * Fetch the user object using the email address and password
   *
   * @param userName (for example info@example.com)
   * @param password (for example securePassword1)
   * @returns returns the specific user object linked to user email
   */
  doLogin(userName, password) {
    let userObject = usersJson.find((i) => i.email == userName);
    if (userObject !== undefined){
        if (userObject.password === password){
            return {response: userObject, status: 'success'}
        } else {
            return {response: { msg: "Password does not match", variable: 'password'}, status: 'error'}
        }
    } else {
        return {response: { msg:"No account found matching this email address.", variable: 'email'}, status: 'error'}
    }
  }

  /**
   * get the list of dashboard items using a list of ids from the dashboard item
   *
   * @param itemIds
   * @returns Filtered list of dashboardItems based on a list from the dashboard object of a user
   */
  getDashboardItems(itemIds) {
    return dashboardItemJson.filter((i) =>
      itemIds.includes(i.id),
    );
  }

   /**
   * get the list of all dashboard items
   *
   * @returns Filtered list of dashboardItems based on a list from the dashboard object of a user
   */
   getAllDashboardItems() {
    return dashboardItemJson;
  }

}