package auth.models.daos

import auth.models.User
import com.mohiva.play.silhouette.api.LoginInfo
import reactivemongo.bson.BSONObjectID

import scala.concurrent.Future

/**
 * Give access to the user object.
 */
trait UserDAO {

  /**
   * Finds a user by its sign_in info.
   *
   * @param loginInfo The sign_in info of the user to find.
   * @return The found user or None if no user for the given sign_in info could be found.
   */
  def find(loginInfo: LoginInfo): Future[Option[User]]

  /**
   * Finds a user by its user ID.
   *
   * @param userID The ID of the user to find.
   * @return The found user or None if no user for the given ID could be found.
   */
  def find(userID: BSONObjectID): Future[Option[User]]

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User): Future[User]
}
