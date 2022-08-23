# Challenge

Create a fictional address book app, where you can search for users' addresses and
personal information. The app displays a list of users which you can browse and where you
can see personal information for a selected user. There is also a settings page where you
can select which nationalities you are interested in.

## Setup project

Use node in version 16.17.0
You can use [nave](https://github.com/isaacs/nave) to install correct node version.

Install project dependencies

```bash
npm install
```

## Run local server

Run in terminal

```bash
npm run dev
```

then go to http://localhost:3000.

## Testing

Run in terminal

```bash
npm run test
```

## Writeup

I started project with `create-next-app`, then added linting and code formatting to speedup development.
Then I added `swr` library for fetching data which is very light. While developing I had facing CORS errors for `https://randomuser.me` api, and changed `swr` to `react-query` as it have built-in refreshing logic.
I tried to split code into smaller parts and keep logic and render separated, it gives us more readability.
I used `styled-components` for styling as it's natural to write components with React. It also gives us pretty nice functionality to set up theme for our application.

I used following folder structure:
- `components`: this is where I keep all components which can be shared and are dumb (without logic)
- `contexts`: in this place all global contexts are held, I used context for saving nationalities set
- `hooks`: here you can find custom hooks, ie. `useContacts` for fetching user contacts
- `pages`: this directory creates routing for us and keep simple page components, which use views as a content
- `types`: mainly I'm keeping types close to components but here you can find types which are more general and could be shared
- `utils`: some of util functions can be found here
- `views`: content components for pages

I added unit tests for most of the components. Components like `primitives` have only visual impact, so I didn't test them.
