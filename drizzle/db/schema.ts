import { relations } from "drizzle-orm";
import { pgTable, text, integer, timestamp, boolean, primaryKey, vector, uuid, date } from "drizzle-orm/pg-core";
			
export const user = pgTable("user", {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  password: text('password'),
email: text('email').notNull().unique(),
emailVerified: boolean('emailVerified').notNull(),
image: text('image'),
role: text('role').default('user'),
banned: boolean('banned').default(false),
banReason: text('banReason'),
banExpires: integer('banExpires'),
createdAt: timestamp('createdAt').defaultNow().notNull(),
updatedAt: timestamp('updatedAt').defaultNow().notNull()
});

export const session = pgTable("session", {
  id: uuid('id').defaultRandom().primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
ipAddress: text('ipAddress'),
userAgent: text('userAgent'),
userId: text('userId').notNull().references(()=> user.id)
});

export const account = pgTable("account", {
  id: uuid('id').defaultRandom().primaryKey(),
  accountId: text('accountId').notNull(),
providerId: text('providerId').notNull(),
userId: text('userId').notNull().references(()=> user.id),
accessToken: text('accessToken'),
refreshToken: text('refreshToken'),
idToken: text('idToken'),
expiresAt: timestamp('expiresAt'),
password: text('password')
});

export const verification = pgTable("verification", {
  id: uuid('id').defaultRandom().primaryKey(),
  identifier: text('identifier').notNull(),
value: text('value').notNull(),
expiresAt: timestamp('expiresAt').notNull()
});
export const genre = pgTable("genre" , {
  id:uuid('id').defaultRandom().primaryKey(),
  title : text("title").notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})

export const language = pgTable("language" , {
  id:uuid('id').defaultRandom().primaryKey(),
  title : text("title").notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})

export const studio = pgTable("studio" , {
  id:uuid('id').defaultRandom().primaryKey(),
  title : text("title").notNull().unique(),
  image : text("image"),
  imageId : text("imageId"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})
export const creator = pgTable("creator" , {
  id:uuid('id').defaultRandom().primaryKey(),
  name : text("name").notNull().unique(),
  age : integer("age"),
  image : text("image"),
  imageId : text("imageId"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})
export const cast = pgTable("cast" , {
  id:uuid('id').defaultRandom().primaryKey(),
  name : text("name").notNull().unique(),
  age : integer("age").notNull(),
  job : text("job").notNull(),
  image : text("image"),
  imageId : text("imageId"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})
export const charachter = pgTable("charachter" , {
  id:uuid('id').defaultRandom().primaryKey(),
  name : text("name").notNull().unique(),
  image : text("image"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  showId : text("showId")
})
export const show = pgTable("show" , {
  id:uuid('id').defaultRandom().primaryKey(),
  title : text("title").notNull().unique(),
  relativeTitle : text("relativeTitle").notNull(),
  description : text("description").notNull(),
  status : text("status").notNull(),
  season : text("season").notNull(),
  type : text("type",{enum : ["TV" , "MOVIE"]}).notNull(),
  trailer : text("trailer"),
  rating : integer("rating").notNull(),
  image : text("image"),
  imageId : text("imageId"),
  backgroundImage : text("backgroundImage"),
  backgroundImageId : text("backgroundImageId"),
  embedding : vector("embedding",{
    dimensions : 1024
  }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  languageId : text("languageId"),
  creatorId : text("creatorId"),
  studioId : text("studioId"),
  airing : date('airing').notNull()
})
export const collection = pgTable("collection" , {
  id:uuid('id').defaultRandom().primaryKey(),
  title : text("title").notNull(),
  description : text("description"),
  private : boolean("private").default(false),
  image : text("image"),
  imageId:text("imageId"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  userId : text("userId").notNull()
})
export const userRelations = relations(user , ({many}) => ({
  collections : many(collection)
}))
export const showRelations = relations(show,({one,many}) => ({
  lang : one(language, {
    fields : [show.languageId],
    references : [language.id]
  }) ,
  genres : many(showToGenre),
  cast : many(showToCast) ,
  charachter :many(charachter),
  creator : one(creator) ,
  studio : one(studio)
}))
export const collectionRelations = relations(collection,({one,many}) =>({
  user : one(user ,{
    fields : [collection.userId],
    references : [user.id] ,
  })
}))
export const languageRelations = relations(language , ({many}) => ({
  shows : many(show)
}))
export const castRelations = relations(cast , ({many}) => ({
  shows :many(showToCast)
}))
export const creatorRelations = relations(creator,({many}) => ({
  shows : many(show)
}))
export const studioRelations = relations(studio , ({many}) => ({
  shows : many(show)
}))
export const charachterRelations = relations(charachter , ({one}) => ({
  showId:one(show, {
    fields : [charachter.showId],
    references:[show.id]
  })
}))
export const genreRelations = relations(genre,({many}) => ({
  shows : many(showToGenre)
}))
export const showToGenre = pgTable(
  'show_to_genre',
  {
    showId: text('show_id')
      .notNull()
      .references(() => show.id),
    genreId: text('genre_id')
      .notNull()
      .references(() => genre.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.showId, t.genreId] }),
  }),
);
export const showToCast = pgTable(
  'show_to_cast',
  {
    showId: text('show_id')
      .notNull()
      .references(() => show.id),
    castId: text('cast_id')
      .notNull()
      .references(() => cast.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.showId, t.castId] }),
  }),
);
export const showToCollection = pgTable('show_to_collection',  {
  showId: text('show_id')
    .notNull()
    .references(() => show.id),
  collectionId: text('collection_id')
    .notNull()
    .references(() => collection.id),
},
(t) => ({
  pk: primaryKey({ columns: [t.showId, t.collectionId] }),
})
)
