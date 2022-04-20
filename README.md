# School Admin SQL REST API

Demo REST API developed using Node.js, Express, and Sequelize provides a way to administer a school database containing information about users and courses.

---

## Running the App

Assuming you have `node` and `npm` already installed globally on your system - clone this repo, `cd` into the app folder, then install dependencies:

```bash
git clone https://github.com/danpoynor/school-admin-sql-rest-api.git
cd school-admin-sql-rest-api/
npm install
```

In the terminal run the `npm run seed` command. This will create the `fsjstd-restapi.db` database and seed it with initial data. Then start the app with `npm start`

```bash
npm run seed && npm start
```

In your terminal output, you should see something similar to the following:

```bash
✅ 8 Routes found: [
  { path: '/', method: 'GET' },
  { path: '/api/courses/', method: 'GET' },
  { path: '/api/courses/', method: 'POST' },
  { path: '/api/courses/:id', method: 'GET' },
  { path: '/api/courses/:id', method: 'PUT' },
  { path: '/api/courses/:id', method: 'DELETE' },
  { path: '/api/users/', method: 'GET' },
  { path: '/api/users/', method: 'POST' }
]
✅ Express server is listening on port 5000
✅ Connection to 'sqlite' database 'fsjstd-restapi.db' established.
✅ Model 'Course' is defined. Table name is 'Courses'.
✅ Model 'User' is defined. Table name is 'Users'.
✅ 2 Tables found: [ 'Users', 'Courses' ] (Uncomment lines below to copy model starters)
```

Visiting <http://localhost:5000/> in a web browser you should see a "Welcome to the REST API project!" message.

The `RESTAPI.postman_collection.json` file can be imported into [Postman](https://www.postman.com) to manually test the application. Or import `RESTAPI.postman_collection--with-tests.json` to run 63 automated test assertions (see [note below](#postman-test-collection)).

Or, use the `tests.http` file as an alternative method for testing the application. You'll need to install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) package as a dependency in order to run the tests in this file.

---

## Project Features

- REST API Validation
- User Authentication Middleware using [bcryptjs](https://www.npmjs.com/package/bcryptjs).
- `isEmail` validation of the emailAddress attribute in the User model to ensure that the provided email address is properly formatted.
- `unique` constraint to the User model to ensure that the provided email address isn't already associated with an existing user.
- `len` validation to the User model to ensure that the provided password is between 7 and 50 characters long.
<!-- - Added `is` validation to ensure password meets the following criteria:
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character -->
- [Express Hook](https://sequelize.org/docs/v6/other-topics/hooks/) `afterValidate` used to encrypt the User password with [bcryptjs](https://www.npmjs.com/package/bcryptjs)
 after it's validated and before it's saved to the database.

---

## API Endpoints

<code><font color="#49cc90">GET</font></code> <code>/</code> Returns the message "Welcome to the REST API project!"

<details>
<summary><code><font color="#49cc90">GET</font></code> <code>/api/users</code> Returns all properties and values for the currently authenticated <code>User</code> including <code>Courses</code> they own</summary>

<table>
  <thead>
    <tr>
      <th width="120">HTTP Status</th>
      <th>Message</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>200 OK</code></td>
      <td></td>
      <td>
      User authenticated.
      Returns all user properties and values.
        <ul>
          <li>User authenticated.</li>
          <li>Returns all user properties and values including `Courses` the user owns.</li>
          <li>Filters out `password`, `createdAt`, and `updatedAt` values.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>401 Unauthorized</code></td><td>Access Denied</td><td>User is not authenticated.</td>
    </tr>
    <tr>
      <td><code>404 Not Found</code></td>
      <td>User not found</td>
      <td>An authenticated user should always be able to find their own user record, so this might never be seen.</td>
    </tr>
  </tbody>
</table>

</details>

<details>
<summary><code><font color="#49cc90">POST</font></code> <code>/api/users</code> Creates a new user</summary>

<table>
  <thead>
    <tr>
      <th width="120">HTTP Status</th>
      <th>Message</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>201 Created</code></td>
      <td></td>
      <td>
        <ul>
          <li>Current user is not authenticate before creating a new user.</li>
          <li>Returns no content.</li>
          <li>Set the <code>Location</code> header to <code>/</code>.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>400 Bad Request</code></td>
      <td>
        <ul>
          <li>First Name value is required</li>
          <li>Last Name value is required</li>
          <li>Password value is required</li>
          <li>Password must 7 - 50 characters long</li>
          <!-- <li>Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Special characters $%!@-+= okay.</li> -->
          <li>Email Address value is required</li>
          <li>Email Address format is invalid</li>
          <li>Email Address must be unique</li>
          <li>User already exists</li>
        </ul>
      </td>
      <td></td>
    </tr>
  </tbody>
</table>

</details>

<details>
<summary><code><font color="#49cc90">GET</font></code> <code>/api/courses</code> Returns all courses including the <code>User</code> associated with each course</summary>

<table>
  <thead>
    <tr>
      <th width="120">HTTP Status</th>
      <th>Message</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>200 OK</code>
      </td><td></td>
      <td>
        <ul>
          <li>Returns all courses including the User associated with each course.</li>
          <li>Filters out `createdAt`, and `updatedAt` values.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

</details>

<details>
<summary><code><font color="#49cc90">GET</font></code> <code>/api/courses/:id</code> Returns the corresponding course including the <code>User</code> associated with that course</summary>

<table>
  <thead>
    <tr>
      <th width="120">HTTP Status</th>
      <th>Message</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>200 OK</code></td>
      <td></td>
      <td>
        <ul>
          <li>Returns the corresponding course including the User associated with that course.</li>
          <li>Filters out `createdAt`, and `updatedAt` values.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>404 Not Found</code></td>
      <td>Course not found</td>
      <td></td>
    </tr>
  </tbody>
</table>

</details>

<details>
<summary><code><font color="#49cc90">POST</font></code> <code>/api/courses</code> Create a new course, set the Location header to the URI for the newly created course</summary>

<table>
  <thead>
    <tr>
      <th width="120">HTTP Status</th>
      <th>Message</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>201 Created</code></td>
      <td></td>
      <td>
        <ul>
          <li>User authenticated.</li>
          <li>Returns no content</li>
          <li>Set the <code>Location</code> header to the URI for the newly created course</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>400 Bad Request</code></td>
      <td>
        <ul>
          <li>Title is required</li>
          <li>Description is required</li>
          <li>User Id is required.</li>
        </ul>
      </td>
      <td></td>
    </tr>
    <tr>
      <td valign="top"><code>401 Unauthorized</code></td>
      <td>Access Denied</td>
      <td>User is not authenticated.</td>
    </tr>
  </tbody>
</table>

</details>

<details>
<summary><code><font color="#fca130">PUT</font></code> <code>/api/courses/:id</code> Update the corresponding course</summary>

<table>
  <thead>
    <tr>
      <th width="120">HTTP Status</th>
      <th>Message</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>204 No Content</code></td>
      <td></td>
      <td>
        <ul>
          <li>User authenticated.</li>
          <li>Returns no content.</li>
          <li>Course successfully updated.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>400 Bad Request</code></td>
      <td>
        <ul>
          <li>Title is required</li>
          <li>Description is required</li>
        </ul>
      </td>
      <td></td>
    </tr>
    <tr>
      <td valign="top"><code>401 Unauthorized</code></td>
      <td>Access Denied</td>
      <td>User is not authenticated.</td>
    </tr>
    <tr>
      <td valign="top"><code>403 Forbidden</code></td>
      <td>Access Denied. You are not the owner of this course.</td>
      <td>Current user is not the course owner.</td>
    </tr>
  </tbody>
</table>

</details>

<details>
<summary><code><font color="#f93e3e">DELETE</font></code> <code>/api/courses/:id</code> Delete the corresponding course</summary>

<table>
  <thead>
    <tr>
      <th width="120">HTTP Status</th>
      <th>Message</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>204 No Content</code></td>
      <td></td>
      <td>
        <ul>
          <li>User authenticated.</li>
          <li>User is course owner.</li>
          <li>Returns no content.</li>
          <li>Course successfully deleted.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td valign="top"><code>401 Unauthorized</code></td>
      <td>Access Denied</td>
      <td>User is not authenticated.</td>
    </tr>
    <tr>
      <td valign="top"><code>403 Forbidden</code></td>
      <td>Access Denied. You are not the owner of this course.</td>
      <td>Current user is not the course owner.</td>
    </tr>
    <tr>
      <td valign="top"><code>404 Not Found</code></td>
      <td>Course not found.</td>
      <td>Tries to find the course before authenticating the owner.</td>
    </tr>
  </tbody>
</table>

</details>

---

## Postman Test Collection

The file `RESTAPI.postman_collection--with-tests.json` includes 63 API endpoint tests ([view Postman Test docs](https://learning.postman.com/docs/writing-scripts/script-references/test-examples/)). To run the collection of tests in [Postman](https://www.postman.com), click the three dots to the right of the name and select `Run Collection` in the dropdown menu ([more info](https://learning.postman.com/docs/running-collections/intro-to-collection-runs/#running-your-collections)).

Note: You'll need to run `npm run seed` before running the tests each time since some endpoints manipulate the database.

<details>
<summary>View sample list of included tests</summary>

Get Users (With Auth)

- "Status code is `200 OK`"
- "Response has a JSON body"
- "Response type should be a JSON object"
- "User `id`, `firstName`, `lastName`, `email` is returned"
- "User owned `courses` array is returned"
- "Courses length is 2"
- "Response should not include `password`, `createdAt`, `updatedAt`"

Create User (with dynamic values)

- "Status code is `201 Created`"
- "Response should contain no content"
- "`Location` header is `/`"
  
Create User (Existing Email Address) - EXCEEDS

- "Status code is 400 Bad Request"
- "Response has a JSON body"
- "'Email Address must be unique' error message should be returned"
  
Get Courses

- "Status code is `200 OK`"
- "Response has a JSON body"
- "Response type should be a JSON array"
- "Should return more than 1 courses"
- "Should contain some correct titles"
- "Course owners `firstName` and `lastName` should be included with each course"
- "Response should not include `createdAt`, `updatedAt`"
  
etc...

</details>

---

## Other Notes

- `sequelize.getDatabaseName()` returns `undefined` even though `.authenticate()` will return successful when `dialect` is set to `sqlite`. The function does not read the `config.json` `storage` value, so I kept the `database` value in `config.json`, even though I don't think it should be needed. Potential Sequelize issue or feature request needed to fix this, perhaps.
- When the app first starts, the fancy logging messages in the terminal (with ✅ and ❌ icons) are my development sanity checks indicating the app is correctly configured initially and I haven't broken anything. If this code ever sees a production environment, I would remove the messages or use [`debug`](https://www.npmjs.com/package/debug) for logging.
