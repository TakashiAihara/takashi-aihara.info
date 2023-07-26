---
title: "PrismaClient error in Next13/NextAuth/Prisma monorepo configuration. 'Error: PrismaClient is unable to run in the browser.'"
description: "PrismaClient error in Next13/NextAuth/Prisma monorepo configuration. 'Error: PrismaClient is unable to run in the browser.'"
pubDate: "Jul 26 2023"
---

## Error message

```Error
Unhandled Runtime Error
Error: PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues
```

It says, PrismaClient can't run in the browser.

## Configuration

### Directory structure

```bash
packages
  - auth (NextAuth) ... Central management for authentication
  - db (Prisma) ... Related to DB
apps
  - web (Next13) ... Main application
```

### package.json (Excerpt)

```json
"dependencies": {
  "next": "^13.4.12",
  "next-auth": "^4.22.3",
  "prisma": "^5.0.0"
}
```

## Background

I'm trying to create a simple service based on [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).

There's already a workspace called 'auth', so I tried to centralize the next-auth-related things here, and then it crashed.

## When the failure occurred

All I did was pack the necessary things to export into packages/auth/index.ts.

That's really all I did 😢

▼ packages/auth/index.ts

```TypeScript
export { default } from "next-auth";
export { signIn, signOut, useSession } from "next-auth/react";
export { authOptions } from "./src/auth-options";
export { getServerSession } from "./src/get-session";
export type { Session } from "next-auth";
```

I thought I could manage the version of next-auth centrally, and the number of files wouldn't increase unnecessarily.

I was plotting that users just import from here. Then, I got the error at the beginning.

I wonder if people who understand would see it as "sounds bad".

## Cause

There is a part in the definition of NextAuthOptions that uses prisma, and the problem was that it was being imported on the front-end.

Here is a typical definition:

```TypeScript
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};
```

When I say "it was imported", it was called via packages/auth/index.ts on its own. It was very hard to find.

To illustrate,

▼ apps/web/src/components/auth.tsx

```TypeScript
import { signIn, signOut, useSession } from "@acme/auth";
export const AuthButton = () => {
  const { data: session } = useSession();
  if (session) {
~~~
```

When you import a component like this 👇 (inline

▼ packages/auth/index.ts

```TypeScript
export { default } from "next-auth";
export { signIn, signOut, useSession } from "next-auth/react"; // <- When you import this
export { authOptions } from "./src/auth-options"; // <- This comes along and causes an error
export { getServerSession } from "./src/get-session";
export type { Session } from "next-auth";
```

That's the situation. It seemed like NextAuthOptions itself could be called from the front-end, so I wasn't too concerned, but it seems that was a mistake.

## Fix

I was able to fix this by splitting packages/auth into client.ts/server.ts.

Specifically, I judged whether it was being called from the front-end or the server-side, and inferred from the usage side.

I also separated types by the way.

▼ packages/auth/client.ts

```TypeScript
export { default } from "next-auth";
export { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
```

▼ packages/auth/server.ts

```TypeScript
export { authOptions } from "./src/auth-options";
export { getServerSession } from "./src/get-session";
```

▼ packages/auth/type.d.ts

```TypeScript
export type { Session } from "next-auth";
```

▼ packages/auth/package.json

```json
  "files": [
    "client.ts",
    "server.ts",
    "type.d.ts"
  ],
```

And, the import side followed.

▼ apps/web/src/components/auth.tsx

```TypeScript
import { signIn, signOut, useSession } from "@acme/auth/client"; // <-
export const AuthButton = () => {
  const { data: session } = useSession();
  if (session) {
~~~
```

## Summary

**Don't centralize everything in index.ts for the sake of convenience, it will crash!**
**In Next13, clearly distinguish whether it's on the Client side or Server side and separate them!**

## Postscript

As Next13 becomes popular, this kind of investigation will be quite hard. 😢
But it's necessary.
