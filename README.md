## Commands

generate prisma client - create classes

run this each time schema changes

```
npx prisma generate
```

Check and correct schema

```
npx prisma format
```

GUI for db

```
npx prisma studio
```

### Migration

Whenever you change schema.prisma, run:

Create a migration + apply it

```
npx prisma migrate dev --name <migration-name>
```

Example:

```
npx prisma migrate dev --name add-price-to-event
```
