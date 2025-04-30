# BetterAuthExpoNextBroken

There exists a bug in the combination of BetterAuth with Expo and Next.js. It results in API requests that cannot be authenticated because the "Cookie" header sent by the device is malformed. This is a minimal reproduction.

## Installation and setup

1. Clone the repository
2. Run `npm install` in the `app-server` directory
3. Run `npm install` in the `StickerSmash` directory
4. Run the migrate command to create the database: `npx @better-auth/cli migrate` in the `app-server` directory
5. Start the web server - run `npm run dev` in the `app-server` directory
6. Start the iOS simulator - run `npm run ios` in the `StickerSmash` directory

## Create a user

1. Visit `http://localhost:3000` in your web browser and create a User. You might need to reload the page after creating it.
2. Sign in with your new user account in the web if you're not already signed in.

## Sign in with iOS

1. Open the iOS simulator and sign in with your new user account.
2. You'll be redirected to a very simple dashboard page.

## Reproduce the bug

There's a button the page that says "Get Stuff". Press it and watch logs in the web server. 

A good request will log like this:

```
POST /api/get-stuff 201 in 37ms
```

Set a timer for 5 minutes, the same value as the `cookieCache` maxAge. After that hits, press Get Stuff again. You'll see an error in the logs:

```
2025-04-30T17:33:12.380Z ERROR [Better Auth]: INTERNAL_SERVER_ERROR Error: Invalid Base64 character: ,
    at async POST (app/api/get-stuff/route.ts:12:18)
  10 |   // const cookieValue = headersData.get("cookie");
  11 |
> 12 |   const session = await auth.api.getSession({
     |                  ^
  13 |     headers: headersData,
  14 |   });
  15 |
 ⨯ [Error [APIError]: Failed to get session] {
  status: 'INTERNAL_SERVER_ERROR',
  body: [Object],
  headers: {},
  statusCode: 500
}
 POST /api/get-stuff 500 in 84ms
```

At this point, visit `app-server/app/api/get-stuff/route.ts` and uncomment the lines that log the cookie value. You'll see it contains extra key value pairs, one of which is malformed with a `,`, character.

An example malformed payload will have keys like this:

* better-auth.session_data - first one with a `,` at the end
* better-auth.session_token
* better-auth.session_data - second one without a `,` at the end

If you then go into `StickerSmash/app/dashboard.tsx` and uncomment the line that logs that cookie value, you'll see it does NOT contain the malformed data. This is being added *somewhere*.

## Where is this data coming from?

It is definitely not being added by the web server. If you add logging in a Next.js middleware, you'll see the data as soon as it hits the server matches what's coming out of the headers.

If you add the cookie payload data to the body of your POST request, it is not manipulated. This is specific to the `headers: { Cookie: cookie }` object. This occurs with both `fetch` and `axios`.