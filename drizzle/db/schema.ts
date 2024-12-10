import { relations, sql } from "drizzle-orm";
import { pgTable, text, integer, timestamp, boolean, primaryKey, vector, date,decimal,doublePrecision,PgArray, uuid, varchar, time } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
  id: text('id').default(nanoid())
  .primaryKey(),
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
  id: text('id').default(nanoid())
  .primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
ipAddress: text('ipAddress'),
userAgent: text('userAgent'),
userId: text('userId').notNull().references(()=> user.id)
});

export const account = pgTable("account", {
  id: text('id').default(nanoid())
  .primaryKey(),
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
  id:  text('id').default(nanoid())
  .primaryKey(),
  identifier: text('identifier').notNull(),
value: text('value').notNull(),
expiresAt: timestamp('expiresAt').notNull()
});
export const genre = pgTable("genre" , {
  id:uuid('id').defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  title : text("title").notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})

export const language = pgTable("language" , {
  id:uuid("id").defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  title : text("title").notNull().unique(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})

export const studio = pgTable("studio" , {
  id:uuid('id').defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  title : text("title").notNull().unique(),
  image : text("image"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})
export const creator = pgTable("creator" , {
  id:uuid('id').defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  name : text("name").notNull().unique(),
  birth : text('birth'),
  image : text("image"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})
export const cast = pgTable("cast" , {
  id:uuid('id').defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  name : text("name").notNull().unique(),
  birth : text("birth"),
  job : text("job").notNull(),
  image : text("image"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull()
})
export const charachter = pgTable("charachter" , {
  id:uuid('id').defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  name : text("name").notNull().unique(),
  image : text("image"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  showId : uuid("showId").references(() => show.id , {onDelete : 'cascade'}),
  castId : uuid("castId").references(() => cast.id , {onDelete : 'cascade'}),
})

export const show = pgTable("show" , {
  id:uuid('id').defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  title : text("title").notNull().unique(),
  secondTilte : text("secondTilte"),
  tags : text("tags").array() ,
  relativeTitle : text("relativeTitle").notNull(),
  description : text("description").notNull(),
  status : text("status").notNull(),
  season : text("season").notNull(),
  type : text("type",{enum : ["TV" , "MOVIE"]}).notNull(),
  trailer : text("trailer"),
  rating : doublePrecision("rating").notNull(),
  image : text("image").notNull(),
  backgroundImage : text("backgroundImage").notNull(),
  images : text("images").array().default(sql`'{}'::text[]`) ,
  embedding : vector("embedding",{
    dimensions : 1024
  }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  languageId : uuid("languageId"),
  creatorId : uuid("creatorId"),
  studioId : uuid("studioId"),
  airing : date('airing').notNull() ,
  video : text("video").default('').notNull() ,
  videoKey : text("videoKey").default('').notNull() ,
  
})
export const collection = pgTable("collection" , {
  id:uuid('id').defaultRandom()// Auto-generate a UUID
  .primaryKey(),
  title : text("title").notNull(),
  description : text("description"),
  private : boolean("private").default(false),
  image : text("image"),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  userId : text("userId").notNull()
})



export const userRelations = relations(user , ({many}) => ({
  collections : many(collection)
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
  showCasts: many(showToCast),
  charachter :many(charachter),
}))
export const genreRelations = relations(genre , ({many}) => ({
  showGenres: many(showToGenre),
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
  }),
  castId:one(cast, {
    fields : [charachter.castId],
    references:[cast.id]
  }),
}))

export const showToGenre = pgTable(
  "show_genre",
  {
    showId: uuid("show_id").notNull(),
    genreId: uuid("genre_id").notNull(),
  },
  (table) => ({
    compositeKey: primaryKey(table.showId, table.genreId), // Composite primary key
  })
);
export const showToCast = pgTable(
  "show_casts",
  {
    showId: uuid("show_id").notNull(),
    castId: uuid("cast_id").notNull(),
  },
  (table) => ({
    compositeKey: primaryKey({columns : [table.showId, table.castId]}), // Composite primary key
  })
);

export const showToCollection = pgTable('show_to_collection',  {
  showId: uuid('show_id')
    .notNull()
    .references(() => show.id , {onDelete :"cascade"}),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collection.id , {onDelete :"cascade"}),
},
(t) => ({
  pk: primaryKey({ columns: [t.showId, t.collectionId] }),
})
)


export const showRelations = relations(show,({one,many}) => ({
  lang : one(language, {
    fields : [show.languageId],
    references : [language.id]
  }) ,
  charachter :many(charachter),
  creator : one(creator, {
    fields : [show.creatorId],
    references : [creator.id]
  }) ,
  studio : one(studio, {
    fields : [show.studioId],
    references : [studio.id]
  }),
  showCasts: many(showToCast),
  showGenres: many(showToGenre)
}))

export const showCastRelations = relations(showToCast, ({ one }) => ({
  show: one(show, { fields: [showToCast.showId], references: [show.id] }),
  cast: one(cast, { fields: [showToCast.castId], references: [cast.id] }),
}));
export const showGenreRelations = relations(showToGenre, ({ one }) => ({
  show: one(show, { fields: [showToGenre.showId], references: [show.id] }),
  genre: one(genre, { fields: [showToGenre.genreId], references: [genre.id] }),
}));

export const userPreferences = pgTable("user_preferences", {
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  genreId: uuid("genre_id").references(() => genre.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({columns : [table.userId,table.genreId]}),
}));

export const userInteractions = pgTable("user_interactions", {
  userId: text("user_id").notNull(),
  showId: uuid("show_id").notNull().references(() => show.id),
  interactionType: text("interaction_type").notNull(), // e.g., 'like', 'view'
  interactionWeight: integer("interaction_weight").default(1), // Weight for importance
}, table => ({
  pk: primaryKey({columns : [table.userId, table.showId]}),
}));