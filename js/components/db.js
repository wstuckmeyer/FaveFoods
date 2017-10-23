
import Realm from 'realm';


class User extends Realm.Object{}

User.schema = {
	name: 'User',
	properties: {
		username: 'string',
		password: 'string'
	}
}


export default new Realm({schema: [User]})