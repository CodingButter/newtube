
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * User accounts with settings and preferences
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Connection
 * OAuth connections to external platforms (YouTube, Vimeo, Nebula)
 */
export type Connection = $Result.DefaultSelection<Prisma.$ConnectionPayload>
/**
 * Model Layout
 * User-defined dashboard layouts with drag-and-drop panels
 */
export type Layout = $Result.DefaultSelection<Prisma.$LayoutPayload>
/**
 * Model Panel
 * Panel library/definitions - reusable panel configurations
 */
export type Panel = $Result.DefaultSelection<Prisma.$PanelPayload>
/**
 * Model LayoutPanel
 * Junction table for layouts and their panel instances
 */
export type LayoutPanel = $Result.DefaultSelection<Prisma.$LayoutPanelPayload>
/**
 * Model List
 * User-created lists (playlists, smart lists, etc.)
 */
export type List = $Result.DefaultSelection<Prisma.$ListPayload>
/**
 * Model ListItem
 * Items within user lists
 */
export type ListItem = $Result.DefaultSelection<Prisma.$ListItemPayload>
/**
 * Model Preference
 * Fine-grained user preferences and settings
 */
export type Preference = $Result.DefaultSelection<Prisma.$PreferencePayload>
/**
 * Model Migration
 * Database migrations tracking
 */
export type Migration = $Result.DefaultSelection<Prisma.$MigrationPayload>
/**
 * Model SystemConfig
 * System configuration and feature flags
 */
export type SystemConfig = $Result.DefaultSelection<Prisma.$SystemConfigPayload>
/**
 * Model VideoEmbedding
 * Video content embeddings for personalization and search
 */
export type VideoEmbedding = $Result.DefaultSelection<Prisma.$VideoEmbeddingPayload>
/**
 * Model UserEmbedding
 * User preference embeddings for personalization
 */
export type UserEmbedding = $Result.DefaultSelection<Prisma.$UserEmbeddingPayload>
/**
 * Model CommentEmbedding
 * Comment embeddings for toxicity detection and relevance scoring
 */
export type CommentEmbedding = $Result.DefaultSelection<Prisma.$CommentEmbeddingPayload>
/**
 * Model SearchEmbedding
 * Search query embeddings for query expansion and personalization
 */
export type SearchEmbedding = $Result.DefaultSelection<Prisma.$SearchEmbeddingPayload>
/**
 * Model EmbeddingJob
 * Batch processing jobs for embeddings
 */
export type EmbeddingJob = $Result.DefaultSelection<Prisma.$EmbeddingJobPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ConnectionStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED',
  ERROR: 'ERROR'
};

export type ConnectionStatus = (typeof ConnectionStatus)[keyof typeof ConnectionStatus]


export const PanelType: {
  VIDEO_FEED: 'VIDEO_FEED',
  VIDEO_PLAYER: 'VIDEO_PLAYER',
  SEARCH: 'SEARCH',
  FILTERS: 'FILTERS',
  PLAYLISTS: 'PLAYLISTS',
  SUBSCRIPTIONS: 'SUBSCRIPTIONS',
  TRENDING: 'TRENDING',
  RECOMMENDATIONS: 'RECOMMENDATIONS',
  SETTINGS: 'SETTINGS',
  ANALYTICS: 'ANALYTICS',
  CUSTOM: 'CUSTOM'
};

export type PanelType = (typeof PanelType)[keyof typeof PanelType]


export const ListType: {
  PLAYLIST: 'PLAYLIST',
  SMART: 'SMART',
  FAVORITES: 'FAVORITES',
  WATCHLIST: 'WATCHLIST',
  HISTORY: 'HISTORY'
};

export type ListType = (typeof ListType)[keyof typeof ListType]


export const EmbeddingStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  STALE: 'STALE'
};

export type EmbeddingStatus = (typeof EmbeddingStatus)[keyof typeof EmbeddingStatus]


export const JobType: {
  VIDEO_EMBEDDING: 'VIDEO_EMBEDDING',
  USER_EMBEDDING: 'USER_EMBEDDING',
  COMMENT_EMBEDDING: 'COMMENT_EMBEDDING',
  SEARCH_EMBEDDING: 'SEARCH_EMBEDDING',
  BATCH_UPDATE: 'BATCH_UPDATE',
  INCREMENTAL_UPDATE: 'INCREMENTAL_UPDATE'
};

export type JobType = (typeof JobType)[keyof typeof JobType]


export const JobStatus: {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  RETRYING: 'RETRYING'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]

}

export type ConnectionStatus = $Enums.ConnectionStatus

export const ConnectionStatus: typeof $Enums.ConnectionStatus

export type PanelType = $Enums.PanelType

export const PanelType: typeof $Enums.PanelType

export type ListType = $Enums.ListType

export const ListType: typeof $Enums.ListType

export type EmbeddingStatus = $Enums.EmbeddingStatus

export const EmbeddingStatus: typeof $Enums.EmbeddingStatus

export type JobType = $Enums.JobType

export const JobType: typeof $Enums.JobType

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.connection`: Exposes CRUD operations for the **Connection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Connections
    * const connections = await prisma.connection.findMany()
    * ```
    */
  get connection(): Prisma.ConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.layout`: Exposes CRUD operations for the **Layout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Layouts
    * const layouts = await prisma.layout.findMany()
    * ```
    */
  get layout(): Prisma.LayoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.panel`: Exposes CRUD operations for the **Panel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Panels
    * const panels = await prisma.panel.findMany()
    * ```
    */
  get panel(): Prisma.PanelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.layoutPanel`: Exposes CRUD operations for the **LayoutPanel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LayoutPanels
    * const layoutPanels = await prisma.layoutPanel.findMany()
    * ```
    */
  get layoutPanel(): Prisma.LayoutPanelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.list`: Exposes CRUD operations for the **List** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lists
    * const lists = await prisma.list.findMany()
    * ```
    */
  get list(): Prisma.ListDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.listItem`: Exposes CRUD operations for the **ListItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ListItems
    * const listItems = await prisma.listItem.findMany()
    * ```
    */
  get listItem(): Prisma.ListItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.preference`: Exposes CRUD operations for the **Preference** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Preferences
    * const preferences = await prisma.preference.findMany()
    * ```
    */
  get preference(): Prisma.PreferenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.migration`: Exposes CRUD operations for the **Migration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Migrations
    * const migrations = await prisma.migration.findMany()
    * ```
    */
  get migration(): Prisma.MigrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemConfig`: Exposes CRUD operations for the **SystemConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemConfigs
    * const systemConfigs = await prisma.systemConfig.findMany()
    * ```
    */
  get systemConfig(): Prisma.SystemConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.videoEmbedding`: Exposes CRUD operations for the **VideoEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VideoEmbeddings
    * const videoEmbeddings = await prisma.videoEmbedding.findMany()
    * ```
    */
  get videoEmbedding(): Prisma.VideoEmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userEmbedding`: Exposes CRUD operations for the **UserEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserEmbeddings
    * const userEmbeddings = await prisma.userEmbedding.findMany()
    * ```
    */
  get userEmbedding(): Prisma.UserEmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.commentEmbedding`: Exposes CRUD operations for the **CommentEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommentEmbeddings
    * const commentEmbeddings = await prisma.commentEmbedding.findMany()
    * ```
    */
  get commentEmbedding(): Prisma.CommentEmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.searchEmbedding`: Exposes CRUD operations for the **SearchEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SearchEmbeddings
    * const searchEmbeddings = await prisma.searchEmbedding.findMany()
    * ```
    */
  get searchEmbedding(): Prisma.SearchEmbeddingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embeddingJob`: Exposes CRUD operations for the **EmbeddingJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmbeddingJobs
    * const embeddingJobs = await prisma.embeddingJob.findMany()
    * ```
    */
  get embeddingJob(): Prisma.EmbeddingJobDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.0
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Connection: 'Connection',
    Layout: 'Layout',
    Panel: 'Panel',
    LayoutPanel: 'LayoutPanel',
    List: 'List',
    ListItem: 'ListItem',
    Preference: 'Preference',
    Migration: 'Migration',
    SystemConfig: 'SystemConfig',
    VideoEmbedding: 'VideoEmbedding',
    UserEmbedding: 'UserEmbedding',
    CommentEmbedding: 'CommentEmbedding',
    SearchEmbedding: 'SearchEmbedding',
    EmbeddingJob: 'EmbeddingJob'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "connection" | "layout" | "panel" | "layoutPanel" | "list" | "listItem" | "preference" | "migration" | "systemConfig" | "videoEmbedding" | "userEmbedding" | "commentEmbedding" | "searchEmbedding" | "embeddingJob"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Connection: {
        payload: Prisma.$ConnectionPayload<ExtArgs>
        fields: Prisma.ConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findFirst: {
            args: Prisma.ConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          findMany: {
            args: Prisma.ConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          create: {
            args: Prisma.ConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          createMany: {
            args: Prisma.ConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          delete: {
            args: Prisma.ConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          update: {
            args: Prisma.ConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          deleteMany: {
            args: Prisma.ConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>[]
          }
          upsert: {
            args: Prisma.ConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConnectionPayload>
          }
          aggregate: {
            args: Prisma.ConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConnection>
          }
          groupBy: {
            args: Prisma.ConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<ConnectionCountAggregateOutputType> | number
          }
        }
      }
      Layout: {
        payload: Prisma.$LayoutPayload<ExtArgs>
        fields: Prisma.LayoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LayoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LayoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          findFirst: {
            args: Prisma.LayoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LayoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          findMany: {
            args: Prisma.LayoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>[]
          }
          create: {
            args: Prisma.LayoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          createMany: {
            args: Prisma.LayoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LayoutCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>[]
          }
          delete: {
            args: Prisma.LayoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          update: {
            args: Prisma.LayoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          deleteMany: {
            args: Prisma.LayoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LayoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LayoutUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>[]
          }
          upsert: {
            args: Prisma.LayoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPayload>
          }
          aggregate: {
            args: Prisma.LayoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLayout>
          }
          groupBy: {
            args: Prisma.LayoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<LayoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.LayoutCountArgs<ExtArgs>
            result: $Utils.Optional<LayoutCountAggregateOutputType> | number
          }
        }
      }
      Panel: {
        payload: Prisma.$PanelPayload<ExtArgs>
        fields: Prisma.PanelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PanelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PanelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          findFirst: {
            args: Prisma.PanelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PanelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          findMany: {
            args: Prisma.PanelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>[]
          }
          create: {
            args: Prisma.PanelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          createMany: {
            args: Prisma.PanelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PanelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>[]
          }
          delete: {
            args: Prisma.PanelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          update: {
            args: Prisma.PanelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          deleteMany: {
            args: Prisma.PanelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PanelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PanelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>[]
          }
          upsert: {
            args: Prisma.PanelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PanelPayload>
          }
          aggregate: {
            args: Prisma.PanelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePanel>
          }
          groupBy: {
            args: Prisma.PanelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PanelGroupByOutputType>[]
          }
          count: {
            args: Prisma.PanelCountArgs<ExtArgs>
            result: $Utils.Optional<PanelCountAggregateOutputType> | number
          }
        }
      }
      LayoutPanel: {
        payload: Prisma.$LayoutPanelPayload<ExtArgs>
        fields: Prisma.LayoutPanelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LayoutPanelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LayoutPanelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>
          }
          findFirst: {
            args: Prisma.LayoutPanelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LayoutPanelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>
          }
          findMany: {
            args: Prisma.LayoutPanelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>[]
          }
          create: {
            args: Prisma.LayoutPanelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>
          }
          createMany: {
            args: Prisma.LayoutPanelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LayoutPanelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>[]
          }
          delete: {
            args: Prisma.LayoutPanelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>
          }
          update: {
            args: Prisma.LayoutPanelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>
          }
          deleteMany: {
            args: Prisma.LayoutPanelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LayoutPanelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LayoutPanelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>[]
          }
          upsert: {
            args: Prisma.LayoutPanelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LayoutPanelPayload>
          }
          aggregate: {
            args: Prisma.LayoutPanelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLayoutPanel>
          }
          groupBy: {
            args: Prisma.LayoutPanelGroupByArgs<ExtArgs>
            result: $Utils.Optional<LayoutPanelGroupByOutputType>[]
          }
          count: {
            args: Prisma.LayoutPanelCountArgs<ExtArgs>
            result: $Utils.Optional<LayoutPanelCountAggregateOutputType> | number
          }
        }
      }
      List: {
        payload: Prisma.$ListPayload<ExtArgs>
        fields: Prisma.ListFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findFirst: {
            args: Prisma.ListFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          findMany: {
            args: Prisma.ListFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          create: {
            args: Prisma.ListCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          createMany: {
            args: Prisma.ListCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          delete: {
            args: Prisma.ListDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          update: {
            args: Prisma.ListUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          deleteMany: {
            args: Prisma.ListDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>[]
          }
          upsert: {
            args: Prisma.ListUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListPayload>
          }
          aggregate: {
            args: Prisma.ListAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateList>
          }
          groupBy: {
            args: Prisma.ListGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListCountArgs<ExtArgs>
            result: $Utils.Optional<ListCountAggregateOutputType> | number
          }
        }
      }
      ListItem: {
        payload: Prisma.$ListItemPayload<ExtArgs>
        fields: Prisma.ListItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ListItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ListItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          findFirst: {
            args: Prisma.ListItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ListItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          findMany: {
            args: Prisma.ListItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>[]
          }
          create: {
            args: Prisma.ListItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          createMany: {
            args: Prisma.ListItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ListItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>[]
          }
          delete: {
            args: Prisma.ListItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          update: {
            args: Prisma.ListItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          deleteMany: {
            args: Prisma.ListItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ListItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ListItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>[]
          }
          upsert: {
            args: Prisma.ListItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ListItemPayload>
          }
          aggregate: {
            args: Prisma.ListItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateListItem>
          }
          groupBy: {
            args: Prisma.ListItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ListItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ListItemCountArgs<ExtArgs>
            result: $Utils.Optional<ListItemCountAggregateOutputType> | number
          }
        }
      }
      Preference: {
        payload: Prisma.$PreferencePayload<ExtArgs>
        fields: Prisma.PreferenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreferenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreferenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          findFirst: {
            args: Prisma.PreferenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreferenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          findMany: {
            args: Prisma.PreferenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>[]
          }
          create: {
            args: Prisma.PreferenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          createMany: {
            args: Prisma.PreferenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreferenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>[]
          }
          delete: {
            args: Prisma.PreferenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          update: {
            args: Prisma.PreferenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          deleteMany: {
            args: Prisma.PreferenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreferenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreferenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>[]
          }
          upsert: {
            args: Prisma.PreferenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreferencePayload>
          }
          aggregate: {
            args: Prisma.PreferenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreference>
          }
          groupBy: {
            args: Prisma.PreferenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreferenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreferenceCountArgs<ExtArgs>
            result: $Utils.Optional<PreferenceCountAggregateOutputType> | number
          }
        }
      }
      Migration: {
        payload: Prisma.$MigrationPayload<ExtArgs>
        fields: Prisma.MigrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MigrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MigrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>
          }
          findFirst: {
            args: Prisma.MigrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MigrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>
          }
          findMany: {
            args: Prisma.MigrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>[]
          }
          create: {
            args: Prisma.MigrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>
          }
          createMany: {
            args: Prisma.MigrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MigrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>[]
          }
          delete: {
            args: Prisma.MigrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>
          }
          update: {
            args: Prisma.MigrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>
          }
          deleteMany: {
            args: Prisma.MigrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MigrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MigrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>[]
          }
          upsert: {
            args: Prisma.MigrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MigrationPayload>
          }
          aggregate: {
            args: Prisma.MigrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMigration>
          }
          groupBy: {
            args: Prisma.MigrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<MigrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.MigrationCountArgs<ExtArgs>
            result: $Utils.Optional<MigrationCountAggregateOutputType> | number
          }
        }
      }
      SystemConfig: {
        payload: Prisma.$SystemConfigPayload<ExtArgs>
        fields: Prisma.SystemConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findFirst: {
            args: Prisma.SystemConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          findMany: {
            args: Prisma.SystemConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          create: {
            args: Prisma.SystemConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          createMany: {
            args: Prisma.SystemConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          delete: {
            args: Prisma.SystemConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          update: {
            args: Prisma.SystemConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          deleteMany: {
            args: Prisma.SystemConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>[]
          }
          upsert: {
            args: Prisma.SystemConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemConfigPayload>
          }
          aggregate: {
            args: Prisma.SystemConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemConfig>
          }
          groupBy: {
            args: Prisma.SystemConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemConfigCountArgs<ExtArgs>
            result: $Utils.Optional<SystemConfigCountAggregateOutputType> | number
          }
        }
      }
      VideoEmbedding: {
        payload: Prisma.$VideoEmbeddingPayload<ExtArgs>
        fields: Prisma.VideoEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VideoEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VideoEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.VideoEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VideoEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload>
          }
          findMany: {
            args: Prisma.VideoEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.VideoEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload>
          }
          update: {
            args: Prisma.VideoEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.VideoEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VideoEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VideoEmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VideoEmbeddingPayload>[]
          }
          aggregate: {
            args: Prisma.VideoEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVideoEmbedding>
          }
          groupBy: {
            args: Prisma.VideoEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<VideoEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.VideoEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<VideoEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      UserEmbedding: {
        payload: Prisma.$UserEmbeddingPayload<ExtArgs>
        fields: Prisma.UserEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.UserEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload>
          }
          findMany: {
            args: Prisma.UserEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.UserEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload>
          }
          update: {
            args: Prisma.UserEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.UserEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserEmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEmbeddingPayload>[]
          }
          aggregate: {
            args: Prisma.UserEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserEmbedding>
          }
          groupBy: {
            args: Prisma.UserEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<UserEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      CommentEmbedding: {
        payload: Prisma.$CommentEmbeddingPayload<ExtArgs>
        fields: Prisma.CommentEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.CommentEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload>
          }
          findMany: {
            args: Prisma.CommentEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.CommentEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload>
          }
          update: {
            args: Prisma.CommentEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.CommentEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentEmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentEmbeddingPayload>[]
          }
          aggregate: {
            args: Prisma.CommentEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentEmbedding>
          }
          groupBy: {
            args: Prisma.CommentEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<CommentEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      SearchEmbedding: {
        payload: Prisma.$SearchEmbeddingPayload<ExtArgs>
        fields: Prisma.SearchEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SearchEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SearchEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.SearchEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SearchEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload>
          }
          findMany: {
            args: Prisma.SearchEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.SearchEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload>
          }
          update: {
            args: Prisma.SearchEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.SearchEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SearchEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SearchEmbeddingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SearchEmbeddingPayload>[]
          }
          aggregate: {
            args: Prisma.SearchEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSearchEmbedding>
          }
          groupBy: {
            args: Prisma.SearchEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SearchEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SearchEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<SearchEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      EmbeddingJob: {
        payload: Prisma.$EmbeddingJobPayload<ExtArgs>
        fields: Prisma.EmbeddingJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmbeddingJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmbeddingJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>
          }
          findFirst: {
            args: Prisma.EmbeddingJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmbeddingJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>
          }
          findMany: {
            args: Prisma.EmbeddingJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>[]
          }
          create: {
            args: Prisma.EmbeddingJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>
          }
          createMany: {
            args: Prisma.EmbeddingJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmbeddingJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>[]
          }
          delete: {
            args: Prisma.EmbeddingJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>
          }
          update: {
            args: Prisma.EmbeddingJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>
          }
          deleteMany: {
            args: Prisma.EmbeddingJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmbeddingJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmbeddingJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>[]
          }
          upsert: {
            args: Prisma.EmbeddingJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbeddingJobPayload>
          }
          aggregate: {
            args: Prisma.EmbeddingJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbeddingJob>
          }
          groupBy: {
            args: Prisma.EmbeddingJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmbeddingJobCountArgs<ExtArgs>
            result: $Utils.Optional<EmbeddingJobCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    connection?: ConnectionOmit
    layout?: LayoutOmit
    panel?: PanelOmit
    layoutPanel?: LayoutPanelOmit
    list?: ListOmit
    listItem?: ListItemOmit
    preference?: PreferenceOmit
    migration?: MigrationOmit
    systemConfig?: SystemConfigOmit
    videoEmbedding?: VideoEmbeddingOmit
    userEmbedding?: UserEmbeddingOmit
    commentEmbedding?: CommentEmbeddingOmit
    searchEmbedding?: SearchEmbeddingOmit
    embeddingJob?: EmbeddingJobOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    connections: number
    layouts: number
    lists: number
    preferences: number
    searchEmbeddings: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connections?: boolean | UserCountOutputTypeCountConnectionsArgs
    layouts?: boolean | UserCountOutputTypeCountLayoutsArgs
    lists?: boolean | UserCountOutputTypeCountListsArgs
    preferences?: boolean | UserCountOutputTypeCountPreferencesArgs
    searchEmbeddings?: boolean | UserCountOutputTypeCountSearchEmbeddingsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLayoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LayoutWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPreferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSearchEmbeddingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchEmbeddingWhereInput
  }


  /**
   * Count Type LayoutCountOutputType
   */

  export type LayoutCountOutputType = {
    layoutPanels: number
  }

  export type LayoutCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    layoutPanels?: boolean | LayoutCountOutputTypeCountLayoutPanelsArgs
  }

  // Custom InputTypes
  /**
   * LayoutCountOutputType without action
   */
  export type LayoutCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutCountOutputType
     */
    select?: LayoutCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LayoutCountOutputType without action
   */
  export type LayoutCountOutputTypeCountLayoutPanelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LayoutPanelWhereInput
  }


  /**
   * Count Type PanelCountOutputType
   */

  export type PanelCountOutputType = {
    layoutPanels: number
  }

  export type PanelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    layoutPanels?: boolean | PanelCountOutputTypeCountLayoutPanelsArgs
  }

  // Custom InputTypes
  /**
   * PanelCountOutputType without action
   */
  export type PanelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PanelCountOutputType
     */
    select?: PanelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PanelCountOutputType without action
   */
  export type PanelCountOutputTypeCountLayoutPanelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LayoutPanelWhereInput
  }


  /**
   * Count Type ListCountOutputType
   */

  export type ListCountOutputType = {
    listItems: number
  }

  export type ListCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listItems?: boolean | ListCountOutputTypeCountListItemsArgs
  }

  // Custom InputTypes
  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListCountOutputType
     */
    select?: ListCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ListCountOutputType without action
   */
  export type ListCountOutputTypeCountListItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    clerkId: string | null
    username: string | null
    displayName: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
    isActive: boolean | null
    isVerified: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    clerkId: string | null
    username: string | null
    displayName: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
    isActive: boolean | null
    isVerified: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    clerkId: number
    username: number
    displayName: number
    avatar: number
    settingsJson: number
    createdAt: number
    updatedAt: number
    lastLoginAt: number
    isActive: number
    isVerified: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    clerkId?: true
    username?: true
    displayName?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
    isActive?: true
    isVerified?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    clerkId?: true
    username?: true
    displayName?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
    isActive?: true
    isVerified?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    clerkId?: true
    username?: true
    displayName?: true
    avatar?: true
    settingsJson?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
    isActive?: true
    isVerified?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    clerkId: string | null
    username: string | null
    displayName: string | null
    avatar: string | null
    settingsJson: JsonValue
    createdAt: Date
    updatedAt: Date
    lastLoginAt: Date | null
    isActive: boolean
    isVerified: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    clerkId?: boolean
    username?: boolean
    displayName?: boolean
    avatar?: boolean
    settingsJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    isActive?: boolean
    isVerified?: boolean
    connections?: boolean | User$connectionsArgs<ExtArgs>
    layouts?: boolean | User$layoutsArgs<ExtArgs>
    lists?: boolean | User$listsArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    userEmbedding?: boolean | User$userEmbeddingArgs<ExtArgs>
    searchEmbeddings?: boolean | User$searchEmbeddingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    clerkId?: boolean
    username?: boolean
    displayName?: boolean
    avatar?: boolean
    settingsJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    isActive?: boolean
    isVerified?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    clerkId?: boolean
    username?: boolean
    displayName?: boolean
    avatar?: boolean
    settingsJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    isActive?: boolean
    isVerified?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    clerkId?: boolean
    username?: boolean
    displayName?: boolean
    avatar?: boolean
    settingsJson?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    isActive?: boolean
    isVerified?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "clerkId" | "username" | "displayName" | "avatar" | "settingsJson" | "createdAt" | "updatedAt" | "lastLoginAt" | "isActive" | "isVerified", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connections?: boolean | User$connectionsArgs<ExtArgs>
    layouts?: boolean | User$layoutsArgs<ExtArgs>
    lists?: boolean | User$listsArgs<ExtArgs>
    preferences?: boolean | User$preferencesArgs<ExtArgs>
    userEmbedding?: boolean | User$userEmbeddingArgs<ExtArgs>
    searchEmbeddings?: boolean | User$searchEmbeddingsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      connections: Prisma.$ConnectionPayload<ExtArgs>[]
      layouts: Prisma.$LayoutPayload<ExtArgs>[]
      lists: Prisma.$ListPayload<ExtArgs>[]
      preferences: Prisma.$PreferencePayload<ExtArgs>[]
      userEmbedding: Prisma.$UserEmbeddingPayload<ExtArgs> | null
      searchEmbeddings: Prisma.$SearchEmbeddingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      clerkId: string | null
      username: string | null
      displayName: string | null
      avatar: string | null
      settingsJson: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      lastLoginAt: Date | null
      isActive: boolean
      isVerified: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    connections<T extends User$connectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$connectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    layouts<T extends User$layoutsArgs<ExtArgs> = {}>(args?: Subset<T, User$layoutsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lists<T extends User$listsArgs<ExtArgs> = {}>(args?: Subset<T, User$listsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    preferences<T extends User$preferencesArgs<ExtArgs> = {}>(args?: Subset<T, User$preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userEmbedding<T extends User$userEmbeddingArgs<ExtArgs> = {}>(args?: Subset<T, User$userEmbeddingArgs<ExtArgs>>): Prisma__UserEmbeddingClient<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    searchEmbeddings<T extends User$searchEmbeddingsArgs<ExtArgs> = {}>(args?: Subset<T, User$searchEmbeddingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly settingsJson: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.connections
   */
  export type User$connectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    cursor?: ConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * User.layouts
   */
  export type User$layoutsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    where?: LayoutWhereInput
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    cursor?: LayoutWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LayoutScalarFieldEnum | LayoutScalarFieldEnum[]
  }

  /**
   * User.lists
   */
  export type User$listsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    where?: ListWhereInput
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    cursor?: ListWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * User.preferences
   */
  export type User$preferencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    where?: PreferenceWhereInput
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    cursor?: PreferenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * User.userEmbedding
   */
  export type User$userEmbeddingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    where?: UserEmbeddingWhereInput
  }

  /**
   * User.searchEmbeddings
   */
  export type User$searchEmbeddingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    where?: SearchEmbeddingWhereInput
    orderBy?: SearchEmbeddingOrderByWithRelationInput | SearchEmbeddingOrderByWithRelationInput[]
    cursor?: SearchEmbeddingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SearchEmbeddingScalarFieldEnum | SearchEmbeddingScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Connection
   */

  export type AggregateConnection = {
    _count: ConnectionCountAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  export type ConnectionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    accessTokenEnc: string | null
    refreshTokenEnc: string | null
    expiresAt: Date | null
    status: $Enums.ConnectionStatus | null
    lastSyncAt: Date | null
    providerUserId: string | null
    providerUsername: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConnectionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    accessTokenEnc: string | null
    refreshTokenEnc: string | null
    expiresAt: Date | null
    status: $Enums.ConnectionStatus | null
    lastSyncAt: Date | null
    providerUserId: string | null
    providerUsername: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConnectionCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    accessTokenEnc: number
    refreshTokenEnc: number
    expiresAt: number
    scopes: number
    status: number
    lastSyncAt: number
    providerUserId: number
    providerUsername: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConnectionMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    accessTokenEnc?: true
    refreshTokenEnc?: true
    expiresAt?: true
    status?: true
    lastSyncAt?: true
    providerUserId?: true
    providerUsername?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConnectionMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    accessTokenEnc?: true
    refreshTokenEnc?: true
    expiresAt?: true
    status?: true
    lastSyncAt?: true
    providerUserId?: true
    providerUsername?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConnectionCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    accessTokenEnc?: true
    refreshTokenEnc?: true
    expiresAt?: true
    scopes?: true
    status?: true
    lastSyncAt?: true
    providerUserId?: true
    providerUsername?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connection to aggregate.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Connections
    **/
    _count?: true | ConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConnectionMaxAggregateInputType
  }

  export type GetConnectionAggregateType<T extends ConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConnection[P]>
      : GetScalarType<T[P], AggregateConnection[P]>
  }




  export type ConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConnectionWhereInput
    orderBy?: ConnectionOrderByWithAggregationInput | ConnectionOrderByWithAggregationInput[]
    by: ConnectionScalarFieldEnum[] | ConnectionScalarFieldEnum
    having?: ConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConnectionCountAggregateInputType | true
    _min?: ConnectionMinAggregateInputType
    _max?: ConnectionMaxAggregateInputType
  }

  export type ConnectionGroupByOutputType = {
    id: string
    userId: string
    provider: string
    accessTokenEnc: string
    refreshTokenEnc: string | null
    expiresAt: Date | null
    scopes: string[]
    status: $Enums.ConnectionStatus
    lastSyncAt: Date | null
    providerUserId: string | null
    providerUsername: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConnectionCountAggregateOutputType | null
    _min: ConnectionMinAggregateOutputType | null
    _max: ConnectionMaxAggregateOutputType | null
  }

  type GetConnectionGroupByPayload<T extends ConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], ConnectionGroupByOutputType[P]>
        }
      >
    >


  export type ConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessTokenEnc?: boolean
    refreshTokenEnc?: boolean
    expiresAt?: boolean
    scopes?: boolean
    status?: boolean
    lastSyncAt?: boolean
    providerUserId?: boolean
    providerUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessTokenEnc?: boolean
    refreshTokenEnc?: boolean
    expiresAt?: boolean
    scopes?: boolean
    status?: boolean
    lastSyncAt?: boolean
    providerUserId?: boolean
    providerUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessTokenEnc?: boolean
    refreshTokenEnc?: boolean
    expiresAt?: boolean
    scopes?: boolean
    status?: boolean
    lastSyncAt?: boolean
    providerUserId?: boolean
    providerUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["connection"]>

  export type ConnectionSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    accessTokenEnc?: boolean
    refreshTokenEnc?: boolean
    expiresAt?: boolean
    scopes?: boolean
    status?: boolean
    lastSyncAt?: boolean
    providerUserId?: boolean
    providerUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "accessTokenEnc" | "refreshTokenEnc" | "expiresAt" | "scopes" | "status" | "lastSyncAt" | "providerUserId" | "providerUsername" | "createdAt" | "updatedAt", ExtArgs["result"]["connection"]>
  export type ConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Connection"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      accessTokenEnc: string
      refreshTokenEnc: string | null
      expiresAt: Date | null
      scopes: string[]
      status: $Enums.ConnectionStatus
      lastSyncAt: Date | null
      providerUserId: string | null
      providerUsername: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["connection"]>
    composites: {}
  }

  type ConnectionGetPayload<S extends boolean | null | undefined | ConnectionDefaultArgs> = $Result.GetResult<Prisma.$ConnectionPayload, S>

  type ConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConnectionCountAggregateInputType | true
    }

  export interface ConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Connection'], meta: { name: 'Connection' } }
    /**
     * Find zero or one Connection that matches the filter.
     * @param {ConnectionFindUniqueArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConnectionFindUniqueArgs>(args: SelectSubset<T, ConnectionFindUniqueArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Connection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConnectionFindUniqueOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Connection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConnectionFindFirstArgs>(args?: SelectSubset<T, ConnectionFindFirstArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Connection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindFirstOrThrowArgs} args - Arguments to find a Connection
     * @example
     * // Get one Connection
     * const connection = await prisma.connection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Connections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Connections
     * const connections = await prisma.connection.findMany()
     * 
     * // Get first 10 Connections
     * const connections = await prisma.connection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const connectionWithIdOnly = await prisma.connection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConnectionFindManyArgs>(args?: SelectSubset<T, ConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Connection.
     * @param {ConnectionCreateArgs} args - Arguments to create a Connection.
     * @example
     * // Create one Connection
     * const Connection = await prisma.connection.create({
     *   data: {
     *     // ... data to create a Connection
     *   }
     * })
     * 
     */
    create<T extends ConnectionCreateArgs>(args: SelectSubset<T, ConnectionCreateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Connections.
     * @param {ConnectionCreateManyArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConnectionCreateManyArgs>(args?: SelectSubset<T, ConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Connections and returns the data saved in the database.
     * @param {ConnectionCreateManyAndReturnArgs} args - Arguments to create many Connections.
     * @example
     * // Create many Connections
     * const connection = await prisma.connection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Connections and only return the `id`
     * const connectionWithIdOnly = await prisma.connection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Connection.
     * @param {ConnectionDeleteArgs} args - Arguments to delete one Connection.
     * @example
     * // Delete one Connection
     * const Connection = await prisma.connection.delete({
     *   where: {
     *     // ... filter to delete one Connection
     *   }
     * })
     * 
     */
    delete<T extends ConnectionDeleteArgs>(args: SelectSubset<T, ConnectionDeleteArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Connection.
     * @param {ConnectionUpdateArgs} args - Arguments to update one Connection.
     * @example
     * // Update one Connection
     * const connection = await prisma.connection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConnectionUpdateArgs>(args: SelectSubset<T, ConnectionUpdateArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Connections.
     * @param {ConnectionDeleteManyArgs} args - Arguments to filter Connections to delete.
     * @example
     * // Delete a few Connections
     * const { count } = await prisma.connection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConnectionDeleteManyArgs>(args?: SelectSubset<T, ConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Connections
     * const connection = await prisma.connection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConnectionUpdateManyArgs>(args: SelectSubset<T, ConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Connections and returns the data updated in the database.
     * @param {ConnectionUpdateManyAndReturnArgs} args - Arguments to update many Connections.
     * @example
     * // Update many Connections
     * const connection = await prisma.connection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Connections and only return the `id`
     * const connectionWithIdOnly = await prisma.connection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Connection.
     * @param {ConnectionUpsertArgs} args - Arguments to update or create a Connection.
     * @example
     * // Update or create a Connection
     * const connection = await prisma.connection.upsert({
     *   create: {
     *     // ... data to create a Connection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Connection we want to update
     *   }
     * })
     */
    upsert<T extends ConnectionUpsertArgs>(args: SelectSubset<T, ConnectionUpsertArgs<ExtArgs>>): Prisma__ConnectionClient<$Result.GetResult<Prisma.$ConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Connections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionCountArgs} args - Arguments to filter Connections to count.
     * @example
     * // Count the number of Connections
     * const count = await prisma.connection.count({
     *   where: {
     *     // ... the filter for the Connections we want to count
     *   }
     * })
    **/
    count<T extends ConnectionCountArgs>(
      args?: Subset<T, ConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConnectionAggregateArgs>(args: Subset<T, ConnectionAggregateArgs>): Prisma.PrismaPromise<GetConnectionAggregateType<T>>

    /**
     * Group by Connection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConnectionGroupByArgs['orderBy'] }
        : { orderBy?: ConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Connection model
   */
  readonly fields: ConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Connection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Connection model
   */
  interface ConnectionFieldRefs {
    readonly id: FieldRef<"Connection", 'String'>
    readonly userId: FieldRef<"Connection", 'String'>
    readonly provider: FieldRef<"Connection", 'String'>
    readonly accessTokenEnc: FieldRef<"Connection", 'String'>
    readonly refreshTokenEnc: FieldRef<"Connection", 'String'>
    readonly expiresAt: FieldRef<"Connection", 'DateTime'>
    readonly scopes: FieldRef<"Connection", 'String[]'>
    readonly status: FieldRef<"Connection", 'ConnectionStatus'>
    readonly lastSyncAt: FieldRef<"Connection", 'DateTime'>
    readonly providerUserId: FieldRef<"Connection", 'String'>
    readonly providerUsername: FieldRef<"Connection", 'String'>
    readonly createdAt: FieldRef<"Connection", 'DateTime'>
    readonly updatedAt: FieldRef<"Connection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Connection findUnique
   */
  export type ConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findUniqueOrThrow
   */
  export type ConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection findFirst
   */
  export type ConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findFirstOrThrow
   */
  export type ConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connection to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Connections.
     */
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection findMany
   */
  export type ConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter, which Connections to fetch.
     */
    where?: ConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Connections to fetch.
     */
    orderBy?: ConnectionOrderByWithRelationInput | ConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Connections.
     */
    cursor?: ConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Connections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Connections.
     */
    skip?: number
    distinct?: ConnectionScalarFieldEnum | ConnectionScalarFieldEnum[]
  }

  /**
   * Connection create
   */
  export type ConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Connection.
     */
    data: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
  }

  /**
   * Connection createMany
   */
  export type ConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Connection createManyAndReturn
   */
  export type ConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many Connections.
     */
    data: ConnectionCreateManyInput | ConnectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Connection update
   */
  export type ConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Connection.
     */
    data: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
    /**
     * Choose, which Connection to update.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection updateMany
   */
  export type ConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Connections.
     */
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyInput>
    /**
     * Filter which Connections to update
     */
    where?: ConnectionWhereInput
    /**
     * Limit how many Connections to update.
     */
    limit?: number
  }

  /**
   * Connection updateManyAndReturn
   */
  export type ConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * The data used to update Connections.
     */
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyInput>
    /**
     * Filter which Connections to update
     */
    where?: ConnectionWhereInput
    /**
     * Limit how many Connections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Connection upsert
   */
  export type ConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Connection to update in case it exists.
     */
    where: ConnectionWhereUniqueInput
    /**
     * In case the Connection found by the `where` argument doesn't exist, create a new Connection with this data.
     */
    create: XOR<ConnectionCreateInput, ConnectionUncheckedCreateInput>
    /**
     * In case the Connection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConnectionUpdateInput, ConnectionUncheckedUpdateInput>
  }

  /**
   * Connection delete
   */
  export type ConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
    /**
     * Filter which Connection to delete.
     */
    where: ConnectionWhereUniqueInput
  }

  /**
   * Connection deleteMany
   */
  export type ConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Connections to delete
     */
    where?: ConnectionWhereInput
    /**
     * Limit how many Connections to delete.
     */
    limit?: number
  }

  /**
   * Connection without action
   */
  export type ConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Connection
     */
    select?: ConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Connection
     */
    omit?: ConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConnectionInclude<ExtArgs> | null
  }


  /**
   * Model Layout
   */

  export type AggregateLayout = {
    _count: LayoutCountAggregateOutputType | null
    _avg: LayoutAvgAggregateOutputType | null
    _sum: LayoutSumAggregateOutputType | null
    _min: LayoutMinAggregateOutputType | null
    _max: LayoutMaxAggregateOutputType | null
  }

  export type LayoutAvgAggregateOutputType = {
    version: number | null
  }

  export type LayoutSumAggregateOutputType = {
    version: number | null
  }

  export type LayoutMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    theme: string | null
    isDefault: boolean | null
    isPublic: boolean | null
    description: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LayoutMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    theme: string | null
    isDefault: boolean | null
    isPublic: boolean | null
    description: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LayoutCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    theme: number
    gridSpecJson: number
    isDefault: number
    isPublic: number
    description: number
    tags: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LayoutAvgAggregateInputType = {
    version?: true
  }

  export type LayoutSumAggregateInputType = {
    version?: true
  }

  export type LayoutMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    theme?: true
    isDefault?: true
    isPublic?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LayoutMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    theme?: true
    isDefault?: true
    isPublic?: true
    description?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LayoutCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    theme?: true
    gridSpecJson?: true
    isDefault?: true
    isPublic?: true
    description?: true
    tags?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LayoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Layout to aggregate.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Layouts
    **/
    _count?: true | LayoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LayoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LayoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LayoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LayoutMaxAggregateInputType
  }

  export type GetLayoutAggregateType<T extends LayoutAggregateArgs> = {
        [P in keyof T & keyof AggregateLayout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLayout[P]>
      : GetScalarType<T[P], AggregateLayout[P]>
  }




  export type LayoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LayoutWhereInput
    orderBy?: LayoutOrderByWithAggregationInput | LayoutOrderByWithAggregationInput[]
    by: LayoutScalarFieldEnum[] | LayoutScalarFieldEnum
    having?: LayoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LayoutCountAggregateInputType | true
    _avg?: LayoutAvgAggregateInputType
    _sum?: LayoutSumAggregateInputType
    _min?: LayoutMinAggregateInputType
    _max?: LayoutMaxAggregateInputType
  }

  export type LayoutGroupByOutputType = {
    id: string
    userId: string
    name: string
    theme: string | null
    gridSpecJson: JsonValue
    isDefault: boolean
    isPublic: boolean
    description: string | null
    tags: string[]
    version: number
    createdAt: Date
    updatedAt: Date
    _count: LayoutCountAggregateOutputType | null
    _avg: LayoutAvgAggregateOutputType | null
    _sum: LayoutSumAggregateOutputType | null
    _min: LayoutMinAggregateOutputType | null
    _max: LayoutMaxAggregateOutputType | null
  }

  type GetLayoutGroupByPayload<T extends LayoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LayoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LayoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LayoutGroupByOutputType[P]>
            : GetScalarType<T[P], LayoutGroupByOutputType[P]>
        }
      >
    >


  export type LayoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    theme?: boolean
    gridSpecJson?: boolean
    isDefault?: boolean
    isPublic?: boolean
    description?: boolean
    tags?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    layoutPanels?: boolean | Layout$layoutPanelsArgs<ExtArgs>
    _count?: boolean | LayoutCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["layout"]>

  export type LayoutSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    theme?: boolean
    gridSpecJson?: boolean
    isDefault?: boolean
    isPublic?: boolean
    description?: boolean
    tags?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["layout"]>

  export type LayoutSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    theme?: boolean
    gridSpecJson?: boolean
    isDefault?: boolean
    isPublic?: boolean
    description?: boolean
    tags?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["layout"]>

  export type LayoutSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    theme?: boolean
    gridSpecJson?: boolean
    isDefault?: boolean
    isPublic?: boolean
    description?: boolean
    tags?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LayoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "theme" | "gridSpecJson" | "isDefault" | "isPublic" | "description" | "tags" | "version" | "createdAt" | "updatedAt", ExtArgs["result"]["layout"]>
  export type LayoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    layoutPanels?: boolean | Layout$layoutPanelsArgs<ExtArgs>
    _count?: boolean | LayoutCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LayoutIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LayoutIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LayoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Layout"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      layoutPanels: Prisma.$LayoutPanelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      theme: string | null
      gridSpecJson: Prisma.JsonValue
      isDefault: boolean
      isPublic: boolean
      description: string | null
      tags: string[]
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["layout"]>
    composites: {}
  }

  type LayoutGetPayload<S extends boolean | null | undefined | LayoutDefaultArgs> = $Result.GetResult<Prisma.$LayoutPayload, S>

  type LayoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LayoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LayoutCountAggregateInputType | true
    }

  export interface LayoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Layout'], meta: { name: 'Layout' } }
    /**
     * Find zero or one Layout that matches the filter.
     * @param {LayoutFindUniqueArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LayoutFindUniqueArgs>(args: SelectSubset<T, LayoutFindUniqueArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Layout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LayoutFindUniqueOrThrowArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LayoutFindUniqueOrThrowArgs>(args: SelectSubset<T, LayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Layout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutFindFirstArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LayoutFindFirstArgs>(args?: SelectSubset<T, LayoutFindFirstArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Layout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutFindFirstOrThrowArgs} args - Arguments to find a Layout
     * @example
     * // Get one Layout
     * const layout = await prisma.layout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LayoutFindFirstOrThrowArgs>(args?: SelectSubset<T, LayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Layouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Layouts
     * const layouts = await prisma.layout.findMany()
     * 
     * // Get first 10 Layouts
     * const layouts = await prisma.layout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const layoutWithIdOnly = await prisma.layout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LayoutFindManyArgs>(args?: SelectSubset<T, LayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Layout.
     * @param {LayoutCreateArgs} args - Arguments to create a Layout.
     * @example
     * // Create one Layout
     * const Layout = await prisma.layout.create({
     *   data: {
     *     // ... data to create a Layout
     *   }
     * })
     * 
     */
    create<T extends LayoutCreateArgs>(args: SelectSubset<T, LayoutCreateArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Layouts.
     * @param {LayoutCreateManyArgs} args - Arguments to create many Layouts.
     * @example
     * // Create many Layouts
     * const layout = await prisma.layout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LayoutCreateManyArgs>(args?: SelectSubset<T, LayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Layouts and returns the data saved in the database.
     * @param {LayoutCreateManyAndReturnArgs} args - Arguments to create many Layouts.
     * @example
     * // Create many Layouts
     * const layout = await prisma.layout.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Layouts and only return the `id`
     * const layoutWithIdOnly = await prisma.layout.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LayoutCreateManyAndReturnArgs>(args?: SelectSubset<T, LayoutCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Layout.
     * @param {LayoutDeleteArgs} args - Arguments to delete one Layout.
     * @example
     * // Delete one Layout
     * const Layout = await prisma.layout.delete({
     *   where: {
     *     // ... filter to delete one Layout
     *   }
     * })
     * 
     */
    delete<T extends LayoutDeleteArgs>(args: SelectSubset<T, LayoutDeleteArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Layout.
     * @param {LayoutUpdateArgs} args - Arguments to update one Layout.
     * @example
     * // Update one Layout
     * const layout = await prisma.layout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LayoutUpdateArgs>(args: SelectSubset<T, LayoutUpdateArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Layouts.
     * @param {LayoutDeleteManyArgs} args - Arguments to filter Layouts to delete.
     * @example
     * // Delete a few Layouts
     * const { count } = await prisma.layout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LayoutDeleteManyArgs>(args?: SelectSubset<T, LayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Layouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Layouts
     * const layout = await prisma.layout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LayoutUpdateManyArgs>(args: SelectSubset<T, LayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Layouts and returns the data updated in the database.
     * @param {LayoutUpdateManyAndReturnArgs} args - Arguments to update many Layouts.
     * @example
     * // Update many Layouts
     * const layout = await prisma.layout.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Layouts and only return the `id`
     * const layoutWithIdOnly = await prisma.layout.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LayoutUpdateManyAndReturnArgs>(args: SelectSubset<T, LayoutUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Layout.
     * @param {LayoutUpsertArgs} args - Arguments to update or create a Layout.
     * @example
     * // Update or create a Layout
     * const layout = await prisma.layout.upsert({
     *   create: {
     *     // ... data to create a Layout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Layout we want to update
     *   }
     * })
     */
    upsert<T extends LayoutUpsertArgs>(args: SelectSubset<T, LayoutUpsertArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Layouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutCountArgs} args - Arguments to filter Layouts to count.
     * @example
     * // Count the number of Layouts
     * const count = await prisma.layout.count({
     *   where: {
     *     // ... the filter for the Layouts we want to count
     *   }
     * })
    **/
    count<T extends LayoutCountArgs>(
      args?: Subset<T, LayoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LayoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Layout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LayoutAggregateArgs>(args: Subset<T, LayoutAggregateArgs>): Prisma.PrismaPromise<GetLayoutAggregateType<T>>

    /**
     * Group by Layout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LayoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LayoutGroupByArgs['orderBy'] }
        : { orderBy?: LayoutGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Layout model
   */
  readonly fields: LayoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Layout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LayoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    layoutPanels<T extends Layout$layoutPanelsArgs<ExtArgs> = {}>(args?: Subset<T, Layout$layoutPanelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Layout model
   */
  interface LayoutFieldRefs {
    readonly id: FieldRef<"Layout", 'String'>
    readonly userId: FieldRef<"Layout", 'String'>
    readonly name: FieldRef<"Layout", 'String'>
    readonly theme: FieldRef<"Layout", 'String'>
    readonly gridSpecJson: FieldRef<"Layout", 'Json'>
    readonly isDefault: FieldRef<"Layout", 'Boolean'>
    readonly isPublic: FieldRef<"Layout", 'Boolean'>
    readonly description: FieldRef<"Layout", 'String'>
    readonly tags: FieldRef<"Layout", 'String[]'>
    readonly version: FieldRef<"Layout", 'Int'>
    readonly createdAt: FieldRef<"Layout", 'DateTime'>
    readonly updatedAt: FieldRef<"Layout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Layout findUnique
   */
  export type LayoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout findUniqueOrThrow
   */
  export type LayoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout findFirst
   */
  export type LayoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Layouts.
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Layouts.
     */
    distinct?: LayoutScalarFieldEnum | LayoutScalarFieldEnum[]
  }

  /**
   * Layout findFirstOrThrow
   */
  export type LayoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * Filter, which Layout to fetch.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Layouts.
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Layouts.
     */
    distinct?: LayoutScalarFieldEnum | LayoutScalarFieldEnum[]
  }

  /**
   * Layout findMany
   */
  export type LayoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * Filter, which Layouts to fetch.
     */
    where?: LayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Layouts to fetch.
     */
    orderBy?: LayoutOrderByWithRelationInput | LayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Layouts.
     */
    cursor?: LayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Layouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Layouts.
     */
    skip?: number
    distinct?: LayoutScalarFieldEnum | LayoutScalarFieldEnum[]
  }

  /**
   * Layout create
   */
  export type LayoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Layout.
     */
    data: XOR<LayoutCreateInput, LayoutUncheckedCreateInput>
  }

  /**
   * Layout createMany
   */
  export type LayoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Layouts.
     */
    data: LayoutCreateManyInput | LayoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Layout createManyAndReturn
   */
  export type LayoutCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * The data used to create many Layouts.
     */
    data: LayoutCreateManyInput | LayoutCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Layout update
   */
  export type LayoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Layout.
     */
    data: XOR<LayoutUpdateInput, LayoutUncheckedUpdateInput>
    /**
     * Choose, which Layout to update.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout updateMany
   */
  export type LayoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Layouts.
     */
    data: XOR<LayoutUpdateManyMutationInput, LayoutUncheckedUpdateManyInput>
    /**
     * Filter which Layouts to update
     */
    where?: LayoutWhereInput
    /**
     * Limit how many Layouts to update.
     */
    limit?: number
  }

  /**
   * Layout updateManyAndReturn
   */
  export type LayoutUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * The data used to update Layouts.
     */
    data: XOR<LayoutUpdateManyMutationInput, LayoutUncheckedUpdateManyInput>
    /**
     * Filter which Layouts to update
     */
    where?: LayoutWhereInput
    /**
     * Limit how many Layouts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Layout upsert
   */
  export type LayoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Layout to update in case it exists.
     */
    where: LayoutWhereUniqueInput
    /**
     * In case the Layout found by the `where` argument doesn't exist, create a new Layout with this data.
     */
    create: XOR<LayoutCreateInput, LayoutUncheckedCreateInput>
    /**
     * In case the Layout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LayoutUpdateInput, LayoutUncheckedUpdateInput>
  }

  /**
   * Layout delete
   */
  export type LayoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
    /**
     * Filter which Layout to delete.
     */
    where: LayoutWhereUniqueInput
  }

  /**
   * Layout deleteMany
   */
  export type LayoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Layouts to delete
     */
    where?: LayoutWhereInput
    /**
     * Limit how many Layouts to delete.
     */
    limit?: number
  }

  /**
   * Layout.layoutPanels
   */
  export type Layout$layoutPanelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    where?: LayoutPanelWhereInput
    orderBy?: LayoutPanelOrderByWithRelationInput | LayoutPanelOrderByWithRelationInput[]
    cursor?: LayoutPanelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LayoutPanelScalarFieldEnum | LayoutPanelScalarFieldEnum[]
  }

  /**
   * Layout without action
   */
  export type LayoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Layout
     */
    select?: LayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Layout
     */
    omit?: LayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutInclude<ExtArgs> | null
  }


  /**
   * Model Panel
   */

  export type AggregatePanel = {
    _count: PanelCountAggregateOutputType | null
    _avg: PanelAvgAggregateOutputType | null
    _sum: PanelSumAggregateOutputType | null
    _min: PanelMinAggregateOutputType | null
    _max: PanelMaxAggregateOutputType | null
  }

  export type PanelAvgAggregateOutputType = {
    version: number | null
  }

  export type PanelSumAggregateOutputType = {
    version: number | null
  }

  export type PanelMinAggregateOutputType = {
    id: string | null
    type: $Enums.PanelType | null
    name: string | null
    description: string | null
    category: string | null
    isBuiltIn: boolean | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PanelMaxAggregateOutputType = {
    id: string | null
    type: $Enums.PanelType | null
    name: string | null
    description: string | null
    category: string | null
    isBuiltIn: boolean | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PanelCountAggregateOutputType = {
    id: number
    type: number
    name: number
    description: number
    propsJson: number
    category: number
    tags: number
    isBuiltIn: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PanelAvgAggregateInputType = {
    version?: true
  }

  export type PanelSumAggregateInputType = {
    version?: true
  }

  export type PanelMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    description?: true
    category?: true
    isBuiltIn?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PanelMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    description?: true
    category?: true
    isBuiltIn?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PanelCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    description?: true
    propsJson?: true
    category?: true
    tags?: true
    isBuiltIn?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PanelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Panel to aggregate.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Panels
    **/
    _count?: true | PanelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PanelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PanelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PanelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PanelMaxAggregateInputType
  }

  export type GetPanelAggregateType<T extends PanelAggregateArgs> = {
        [P in keyof T & keyof AggregatePanel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePanel[P]>
      : GetScalarType<T[P], AggregatePanel[P]>
  }




  export type PanelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PanelWhereInput
    orderBy?: PanelOrderByWithAggregationInput | PanelOrderByWithAggregationInput[]
    by: PanelScalarFieldEnum[] | PanelScalarFieldEnum
    having?: PanelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PanelCountAggregateInputType | true
    _avg?: PanelAvgAggregateInputType
    _sum?: PanelSumAggregateInputType
    _min?: PanelMinAggregateInputType
    _max?: PanelMaxAggregateInputType
  }

  export type PanelGroupByOutputType = {
    id: string
    type: $Enums.PanelType
    name: string
    description: string | null
    propsJson: JsonValue
    category: string | null
    tags: string[]
    isBuiltIn: boolean
    version: number
    createdAt: Date
    updatedAt: Date
    _count: PanelCountAggregateOutputType | null
    _avg: PanelAvgAggregateOutputType | null
    _sum: PanelSumAggregateOutputType | null
    _min: PanelMinAggregateOutputType | null
    _max: PanelMaxAggregateOutputType | null
  }

  type GetPanelGroupByPayload<T extends PanelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PanelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PanelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PanelGroupByOutputType[P]>
            : GetScalarType<T[P], PanelGroupByOutputType[P]>
        }
      >
    >


  export type PanelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    propsJson?: boolean
    category?: boolean
    tags?: boolean
    isBuiltIn?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    layoutPanels?: boolean | Panel$layoutPanelsArgs<ExtArgs>
    _count?: boolean | PanelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["panel"]>

  export type PanelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    propsJson?: boolean
    category?: boolean
    tags?: boolean
    isBuiltIn?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["panel"]>

  export type PanelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    propsJson?: boolean
    category?: boolean
    tags?: boolean
    isBuiltIn?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["panel"]>

  export type PanelSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    description?: boolean
    propsJson?: boolean
    category?: boolean
    tags?: boolean
    isBuiltIn?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PanelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "name" | "description" | "propsJson" | "category" | "tags" | "isBuiltIn" | "version" | "createdAt" | "updatedAt", ExtArgs["result"]["panel"]>
  export type PanelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    layoutPanels?: boolean | Panel$layoutPanelsArgs<ExtArgs>
    _count?: boolean | PanelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PanelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PanelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PanelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Panel"
    objects: {
      layoutPanels: Prisma.$LayoutPanelPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.PanelType
      name: string
      description: string | null
      propsJson: Prisma.JsonValue
      category: string | null
      tags: string[]
      isBuiltIn: boolean
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["panel"]>
    composites: {}
  }

  type PanelGetPayload<S extends boolean | null | undefined | PanelDefaultArgs> = $Result.GetResult<Prisma.$PanelPayload, S>

  type PanelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PanelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PanelCountAggregateInputType | true
    }

  export interface PanelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Panel'], meta: { name: 'Panel' } }
    /**
     * Find zero or one Panel that matches the filter.
     * @param {PanelFindUniqueArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PanelFindUniqueArgs>(args: SelectSubset<T, PanelFindUniqueArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Panel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PanelFindUniqueOrThrowArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PanelFindUniqueOrThrowArgs>(args: SelectSubset<T, PanelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Panel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelFindFirstArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PanelFindFirstArgs>(args?: SelectSubset<T, PanelFindFirstArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Panel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelFindFirstOrThrowArgs} args - Arguments to find a Panel
     * @example
     * // Get one Panel
     * const panel = await prisma.panel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PanelFindFirstOrThrowArgs>(args?: SelectSubset<T, PanelFindFirstOrThrowArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Panels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Panels
     * const panels = await prisma.panel.findMany()
     * 
     * // Get first 10 Panels
     * const panels = await prisma.panel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const panelWithIdOnly = await prisma.panel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PanelFindManyArgs>(args?: SelectSubset<T, PanelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Panel.
     * @param {PanelCreateArgs} args - Arguments to create a Panel.
     * @example
     * // Create one Panel
     * const Panel = await prisma.panel.create({
     *   data: {
     *     // ... data to create a Panel
     *   }
     * })
     * 
     */
    create<T extends PanelCreateArgs>(args: SelectSubset<T, PanelCreateArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Panels.
     * @param {PanelCreateManyArgs} args - Arguments to create many Panels.
     * @example
     * // Create many Panels
     * const panel = await prisma.panel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PanelCreateManyArgs>(args?: SelectSubset<T, PanelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Panels and returns the data saved in the database.
     * @param {PanelCreateManyAndReturnArgs} args - Arguments to create many Panels.
     * @example
     * // Create many Panels
     * const panel = await prisma.panel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Panels and only return the `id`
     * const panelWithIdOnly = await prisma.panel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PanelCreateManyAndReturnArgs>(args?: SelectSubset<T, PanelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Panel.
     * @param {PanelDeleteArgs} args - Arguments to delete one Panel.
     * @example
     * // Delete one Panel
     * const Panel = await prisma.panel.delete({
     *   where: {
     *     // ... filter to delete one Panel
     *   }
     * })
     * 
     */
    delete<T extends PanelDeleteArgs>(args: SelectSubset<T, PanelDeleteArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Panel.
     * @param {PanelUpdateArgs} args - Arguments to update one Panel.
     * @example
     * // Update one Panel
     * const panel = await prisma.panel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PanelUpdateArgs>(args: SelectSubset<T, PanelUpdateArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Panels.
     * @param {PanelDeleteManyArgs} args - Arguments to filter Panels to delete.
     * @example
     * // Delete a few Panels
     * const { count } = await prisma.panel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PanelDeleteManyArgs>(args?: SelectSubset<T, PanelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Panels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Panels
     * const panel = await prisma.panel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PanelUpdateManyArgs>(args: SelectSubset<T, PanelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Panels and returns the data updated in the database.
     * @param {PanelUpdateManyAndReturnArgs} args - Arguments to update many Panels.
     * @example
     * // Update many Panels
     * const panel = await prisma.panel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Panels and only return the `id`
     * const panelWithIdOnly = await prisma.panel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PanelUpdateManyAndReturnArgs>(args: SelectSubset<T, PanelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Panel.
     * @param {PanelUpsertArgs} args - Arguments to update or create a Panel.
     * @example
     * // Update or create a Panel
     * const panel = await prisma.panel.upsert({
     *   create: {
     *     // ... data to create a Panel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Panel we want to update
     *   }
     * })
     */
    upsert<T extends PanelUpsertArgs>(args: SelectSubset<T, PanelUpsertArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Panels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelCountArgs} args - Arguments to filter Panels to count.
     * @example
     * // Count the number of Panels
     * const count = await prisma.panel.count({
     *   where: {
     *     // ... the filter for the Panels we want to count
     *   }
     * })
    **/
    count<T extends PanelCountArgs>(
      args?: Subset<T, PanelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PanelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Panel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PanelAggregateArgs>(args: Subset<T, PanelAggregateArgs>): Prisma.PrismaPromise<GetPanelAggregateType<T>>

    /**
     * Group by Panel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PanelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PanelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PanelGroupByArgs['orderBy'] }
        : { orderBy?: PanelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PanelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPanelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Panel model
   */
  readonly fields: PanelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Panel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PanelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    layoutPanels<T extends Panel$layoutPanelsArgs<ExtArgs> = {}>(args?: Subset<T, Panel$layoutPanelsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Panel model
   */
  interface PanelFieldRefs {
    readonly id: FieldRef<"Panel", 'String'>
    readonly type: FieldRef<"Panel", 'PanelType'>
    readonly name: FieldRef<"Panel", 'String'>
    readonly description: FieldRef<"Panel", 'String'>
    readonly propsJson: FieldRef<"Panel", 'Json'>
    readonly category: FieldRef<"Panel", 'String'>
    readonly tags: FieldRef<"Panel", 'String[]'>
    readonly isBuiltIn: FieldRef<"Panel", 'Boolean'>
    readonly version: FieldRef<"Panel", 'Int'>
    readonly createdAt: FieldRef<"Panel", 'DateTime'>
    readonly updatedAt: FieldRef<"Panel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Panel findUnique
   */
  export type PanelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel findUniqueOrThrow
   */
  export type PanelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel findFirst
   */
  export type PanelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Panels.
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Panels.
     */
    distinct?: PanelScalarFieldEnum | PanelScalarFieldEnum[]
  }

  /**
   * Panel findFirstOrThrow
   */
  export type PanelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panel to fetch.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Panels.
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Panels.
     */
    distinct?: PanelScalarFieldEnum | PanelScalarFieldEnum[]
  }

  /**
   * Panel findMany
   */
  export type PanelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter, which Panels to fetch.
     */
    where?: PanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Panels to fetch.
     */
    orderBy?: PanelOrderByWithRelationInput | PanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Panels.
     */
    cursor?: PanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Panels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Panels.
     */
    skip?: number
    distinct?: PanelScalarFieldEnum | PanelScalarFieldEnum[]
  }

  /**
   * Panel create
   */
  export type PanelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * The data needed to create a Panel.
     */
    data: XOR<PanelCreateInput, PanelUncheckedCreateInput>
  }

  /**
   * Panel createMany
   */
  export type PanelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Panels.
     */
    data: PanelCreateManyInput | PanelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Panel createManyAndReturn
   */
  export type PanelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * The data used to create many Panels.
     */
    data: PanelCreateManyInput | PanelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Panel update
   */
  export type PanelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * The data needed to update a Panel.
     */
    data: XOR<PanelUpdateInput, PanelUncheckedUpdateInput>
    /**
     * Choose, which Panel to update.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel updateMany
   */
  export type PanelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Panels.
     */
    data: XOR<PanelUpdateManyMutationInput, PanelUncheckedUpdateManyInput>
    /**
     * Filter which Panels to update
     */
    where?: PanelWhereInput
    /**
     * Limit how many Panels to update.
     */
    limit?: number
  }

  /**
   * Panel updateManyAndReturn
   */
  export type PanelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * The data used to update Panels.
     */
    data: XOR<PanelUpdateManyMutationInput, PanelUncheckedUpdateManyInput>
    /**
     * Filter which Panels to update
     */
    where?: PanelWhereInput
    /**
     * Limit how many Panels to update.
     */
    limit?: number
  }

  /**
   * Panel upsert
   */
  export type PanelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * The filter to search for the Panel to update in case it exists.
     */
    where: PanelWhereUniqueInput
    /**
     * In case the Panel found by the `where` argument doesn't exist, create a new Panel with this data.
     */
    create: XOR<PanelCreateInput, PanelUncheckedCreateInput>
    /**
     * In case the Panel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PanelUpdateInput, PanelUncheckedUpdateInput>
  }

  /**
   * Panel delete
   */
  export type PanelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
    /**
     * Filter which Panel to delete.
     */
    where: PanelWhereUniqueInput
  }

  /**
   * Panel deleteMany
   */
  export type PanelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Panels to delete
     */
    where?: PanelWhereInput
    /**
     * Limit how many Panels to delete.
     */
    limit?: number
  }

  /**
   * Panel.layoutPanels
   */
  export type Panel$layoutPanelsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    where?: LayoutPanelWhereInput
    orderBy?: LayoutPanelOrderByWithRelationInput | LayoutPanelOrderByWithRelationInput[]
    cursor?: LayoutPanelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LayoutPanelScalarFieldEnum | LayoutPanelScalarFieldEnum[]
  }

  /**
   * Panel without action
   */
  export type PanelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Panel
     */
    select?: PanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Panel
     */
    omit?: PanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PanelInclude<ExtArgs> | null
  }


  /**
   * Model LayoutPanel
   */

  export type AggregateLayoutPanel = {
    _count: LayoutPanelCountAggregateOutputType | null
    _avg: LayoutPanelAvgAggregateOutputType | null
    _sum: LayoutPanelSumAggregateOutputType | null
    _min: LayoutPanelMinAggregateOutputType | null
    _max: LayoutPanelMaxAggregateOutputType | null
  }

  export type LayoutPanelAvgAggregateOutputType = {
    gridX: number | null
    gridY: number | null
    gridWidth: number | null
    gridHeight: number | null
    zIndex: number | null
  }

  export type LayoutPanelSumAggregateOutputType = {
    gridX: number | null
    gridY: number | null
    gridWidth: number | null
    gridHeight: number | null
    zIndex: number | null
  }

  export type LayoutPanelMinAggregateOutputType = {
    id: string | null
    layoutId: string | null
    panelId: string | null
    gridX: number | null
    gridY: number | null
    gridWidth: number | null
    gridHeight: number | null
    isVisible: boolean | null
    zIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LayoutPanelMaxAggregateOutputType = {
    id: string | null
    layoutId: string | null
    panelId: string | null
    gridX: number | null
    gridY: number | null
    gridWidth: number | null
    gridHeight: number | null
    isVisible: boolean | null
    zIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LayoutPanelCountAggregateOutputType = {
    id: number
    layoutId: number
    panelId: number
    propsJson: number
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible: number
    zIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LayoutPanelAvgAggregateInputType = {
    gridX?: true
    gridY?: true
    gridWidth?: true
    gridHeight?: true
    zIndex?: true
  }

  export type LayoutPanelSumAggregateInputType = {
    gridX?: true
    gridY?: true
    gridWidth?: true
    gridHeight?: true
    zIndex?: true
  }

  export type LayoutPanelMinAggregateInputType = {
    id?: true
    layoutId?: true
    panelId?: true
    gridX?: true
    gridY?: true
    gridWidth?: true
    gridHeight?: true
    isVisible?: true
    zIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LayoutPanelMaxAggregateInputType = {
    id?: true
    layoutId?: true
    panelId?: true
    gridX?: true
    gridY?: true
    gridWidth?: true
    gridHeight?: true
    isVisible?: true
    zIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LayoutPanelCountAggregateInputType = {
    id?: true
    layoutId?: true
    panelId?: true
    propsJson?: true
    gridX?: true
    gridY?: true
    gridWidth?: true
    gridHeight?: true
    isVisible?: true
    zIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LayoutPanelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LayoutPanel to aggregate.
     */
    where?: LayoutPanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LayoutPanels to fetch.
     */
    orderBy?: LayoutPanelOrderByWithRelationInput | LayoutPanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LayoutPanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LayoutPanels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LayoutPanels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LayoutPanels
    **/
    _count?: true | LayoutPanelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LayoutPanelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LayoutPanelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LayoutPanelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LayoutPanelMaxAggregateInputType
  }

  export type GetLayoutPanelAggregateType<T extends LayoutPanelAggregateArgs> = {
        [P in keyof T & keyof AggregateLayoutPanel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLayoutPanel[P]>
      : GetScalarType<T[P], AggregateLayoutPanel[P]>
  }




  export type LayoutPanelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LayoutPanelWhereInput
    orderBy?: LayoutPanelOrderByWithAggregationInput | LayoutPanelOrderByWithAggregationInput[]
    by: LayoutPanelScalarFieldEnum[] | LayoutPanelScalarFieldEnum
    having?: LayoutPanelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LayoutPanelCountAggregateInputType | true
    _avg?: LayoutPanelAvgAggregateInputType
    _sum?: LayoutPanelSumAggregateInputType
    _min?: LayoutPanelMinAggregateInputType
    _max?: LayoutPanelMaxAggregateInputType
  }

  export type LayoutPanelGroupByOutputType = {
    id: string
    layoutId: string
    panelId: string
    propsJson: JsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible: boolean
    zIndex: number
    createdAt: Date
    updatedAt: Date
    _count: LayoutPanelCountAggregateOutputType | null
    _avg: LayoutPanelAvgAggregateOutputType | null
    _sum: LayoutPanelSumAggregateOutputType | null
    _min: LayoutPanelMinAggregateOutputType | null
    _max: LayoutPanelMaxAggregateOutputType | null
  }

  type GetLayoutPanelGroupByPayload<T extends LayoutPanelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LayoutPanelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LayoutPanelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LayoutPanelGroupByOutputType[P]>
            : GetScalarType<T[P], LayoutPanelGroupByOutputType[P]>
        }
      >
    >


  export type LayoutPanelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    layoutId?: boolean
    panelId?: boolean
    propsJson?: boolean
    gridX?: boolean
    gridY?: boolean
    gridWidth?: boolean
    gridHeight?: boolean
    isVisible?: boolean
    zIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    layout?: boolean | LayoutDefaultArgs<ExtArgs>
    panel?: boolean | PanelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["layoutPanel"]>

  export type LayoutPanelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    layoutId?: boolean
    panelId?: boolean
    propsJson?: boolean
    gridX?: boolean
    gridY?: boolean
    gridWidth?: boolean
    gridHeight?: boolean
    isVisible?: boolean
    zIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    layout?: boolean | LayoutDefaultArgs<ExtArgs>
    panel?: boolean | PanelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["layoutPanel"]>

  export type LayoutPanelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    layoutId?: boolean
    panelId?: boolean
    propsJson?: boolean
    gridX?: boolean
    gridY?: boolean
    gridWidth?: boolean
    gridHeight?: boolean
    isVisible?: boolean
    zIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    layout?: boolean | LayoutDefaultArgs<ExtArgs>
    panel?: boolean | PanelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["layoutPanel"]>

  export type LayoutPanelSelectScalar = {
    id?: boolean
    layoutId?: boolean
    panelId?: boolean
    propsJson?: boolean
    gridX?: boolean
    gridY?: boolean
    gridWidth?: boolean
    gridHeight?: boolean
    isVisible?: boolean
    zIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LayoutPanelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "layoutId" | "panelId" | "propsJson" | "gridX" | "gridY" | "gridWidth" | "gridHeight" | "isVisible" | "zIndex" | "createdAt" | "updatedAt", ExtArgs["result"]["layoutPanel"]>
  export type LayoutPanelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    layout?: boolean | LayoutDefaultArgs<ExtArgs>
    panel?: boolean | PanelDefaultArgs<ExtArgs>
  }
  export type LayoutPanelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    layout?: boolean | LayoutDefaultArgs<ExtArgs>
    panel?: boolean | PanelDefaultArgs<ExtArgs>
  }
  export type LayoutPanelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    layout?: boolean | LayoutDefaultArgs<ExtArgs>
    panel?: boolean | PanelDefaultArgs<ExtArgs>
  }

  export type $LayoutPanelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LayoutPanel"
    objects: {
      layout: Prisma.$LayoutPayload<ExtArgs>
      panel: Prisma.$PanelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      layoutId: string
      panelId: string
      propsJson: Prisma.JsonValue
      gridX: number
      gridY: number
      gridWidth: number
      gridHeight: number
      isVisible: boolean
      zIndex: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["layoutPanel"]>
    composites: {}
  }

  type LayoutPanelGetPayload<S extends boolean | null | undefined | LayoutPanelDefaultArgs> = $Result.GetResult<Prisma.$LayoutPanelPayload, S>

  type LayoutPanelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LayoutPanelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LayoutPanelCountAggregateInputType | true
    }

  export interface LayoutPanelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LayoutPanel'], meta: { name: 'LayoutPanel' } }
    /**
     * Find zero or one LayoutPanel that matches the filter.
     * @param {LayoutPanelFindUniqueArgs} args - Arguments to find a LayoutPanel
     * @example
     * // Get one LayoutPanel
     * const layoutPanel = await prisma.layoutPanel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LayoutPanelFindUniqueArgs>(args: SelectSubset<T, LayoutPanelFindUniqueArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LayoutPanel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LayoutPanelFindUniqueOrThrowArgs} args - Arguments to find a LayoutPanel
     * @example
     * // Get one LayoutPanel
     * const layoutPanel = await prisma.layoutPanel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LayoutPanelFindUniqueOrThrowArgs>(args: SelectSubset<T, LayoutPanelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LayoutPanel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutPanelFindFirstArgs} args - Arguments to find a LayoutPanel
     * @example
     * // Get one LayoutPanel
     * const layoutPanel = await prisma.layoutPanel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LayoutPanelFindFirstArgs>(args?: SelectSubset<T, LayoutPanelFindFirstArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LayoutPanel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutPanelFindFirstOrThrowArgs} args - Arguments to find a LayoutPanel
     * @example
     * // Get one LayoutPanel
     * const layoutPanel = await prisma.layoutPanel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LayoutPanelFindFirstOrThrowArgs>(args?: SelectSubset<T, LayoutPanelFindFirstOrThrowArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LayoutPanels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutPanelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LayoutPanels
     * const layoutPanels = await prisma.layoutPanel.findMany()
     * 
     * // Get first 10 LayoutPanels
     * const layoutPanels = await prisma.layoutPanel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const layoutPanelWithIdOnly = await prisma.layoutPanel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LayoutPanelFindManyArgs>(args?: SelectSubset<T, LayoutPanelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LayoutPanel.
     * @param {LayoutPanelCreateArgs} args - Arguments to create a LayoutPanel.
     * @example
     * // Create one LayoutPanel
     * const LayoutPanel = await prisma.layoutPanel.create({
     *   data: {
     *     // ... data to create a LayoutPanel
     *   }
     * })
     * 
     */
    create<T extends LayoutPanelCreateArgs>(args: SelectSubset<T, LayoutPanelCreateArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LayoutPanels.
     * @param {LayoutPanelCreateManyArgs} args - Arguments to create many LayoutPanels.
     * @example
     * // Create many LayoutPanels
     * const layoutPanel = await prisma.layoutPanel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LayoutPanelCreateManyArgs>(args?: SelectSubset<T, LayoutPanelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LayoutPanels and returns the data saved in the database.
     * @param {LayoutPanelCreateManyAndReturnArgs} args - Arguments to create many LayoutPanels.
     * @example
     * // Create many LayoutPanels
     * const layoutPanel = await prisma.layoutPanel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LayoutPanels and only return the `id`
     * const layoutPanelWithIdOnly = await prisma.layoutPanel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LayoutPanelCreateManyAndReturnArgs>(args?: SelectSubset<T, LayoutPanelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LayoutPanel.
     * @param {LayoutPanelDeleteArgs} args - Arguments to delete one LayoutPanel.
     * @example
     * // Delete one LayoutPanel
     * const LayoutPanel = await prisma.layoutPanel.delete({
     *   where: {
     *     // ... filter to delete one LayoutPanel
     *   }
     * })
     * 
     */
    delete<T extends LayoutPanelDeleteArgs>(args: SelectSubset<T, LayoutPanelDeleteArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LayoutPanel.
     * @param {LayoutPanelUpdateArgs} args - Arguments to update one LayoutPanel.
     * @example
     * // Update one LayoutPanel
     * const layoutPanel = await prisma.layoutPanel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LayoutPanelUpdateArgs>(args: SelectSubset<T, LayoutPanelUpdateArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LayoutPanels.
     * @param {LayoutPanelDeleteManyArgs} args - Arguments to filter LayoutPanels to delete.
     * @example
     * // Delete a few LayoutPanels
     * const { count } = await prisma.layoutPanel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LayoutPanelDeleteManyArgs>(args?: SelectSubset<T, LayoutPanelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LayoutPanels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutPanelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LayoutPanels
     * const layoutPanel = await prisma.layoutPanel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LayoutPanelUpdateManyArgs>(args: SelectSubset<T, LayoutPanelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LayoutPanels and returns the data updated in the database.
     * @param {LayoutPanelUpdateManyAndReturnArgs} args - Arguments to update many LayoutPanels.
     * @example
     * // Update many LayoutPanels
     * const layoutPanel = await prisma.layoutPanel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LayoutPanels and only return the `id`
     * const layoutPanelWithIdOnly = await prisma.layoutPanel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LayoutPanelUpdateManyAndReturnArgs>(args: SelectSubset<T, LayoutPanelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LayoutPanel.
     * @param {LayoutPanelUpsertArgs} args - Arguments to update or create a LayoutPanel.
     * @example
     * // Update or create a LayoutPanel
     * const layoutPanel = await prisma.layoutPanel.upsert({
     *   create: {
     *     // ... data to create a LayoutPanel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LayoutPanel we want to update
     *   }
     * })
     */
    upsert<T extends LayoutPanelUpsertArgs>(args: SelectSubset<T, LayoutPanelUpsertArgs<ExtArgs>>): Prisma__LayoutPanelClient<$Result.GetResult<Prisma.$LayoutPanelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LayoutPanels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutPanelCountArgs} args - Arguments to filter LayoutPanels to count.
     * @example
     * // Count the number of LayoutPanels
     * const count = await prisma.layoutPanel.count({
     *   where: {
     *     // ... the filter for the LayoutPanels we want to count
     *   }
     * })
    **/
    count<T extends LayoutPanelCountArgs>(
      args?: Subset<T, LayoutPanelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LayoutPanelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LayoutPanel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutPanelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LayoutPanelAggregateArgs>(args: Subset<T, LayoutPanelAggregateArgs>): Prisma.PrismaPromise<GetLayoutPanelAggregateType<T>>

    /**
     * Group by LayoutPanel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LayoutPanelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LayoutPanelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LayoutPanelGroupByArgs['orderBy'] }
        : { orderBy?: LayoutPanelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LayoutPanelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLayoutPanelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LayoutPanel model
   */
  readonly fields: LayoutPanelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LayoutPanel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LayoutPanelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    layout<T extends LayoutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LayoutDefaultArgs<ExtArgs>>): Prisma__LayoutClient<$Result.GetResult<Prisma.$LayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    panel<T extends PanelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PanelDefaultArgs<ExtArgs>>): Prisma__PanelClient<$Result.GetResult<Prisma.$PanelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LayoutPanel model
   */
  interface LayoutPanelFieldRefs {
    readonly id: FieldRef<"LayoutPanel", 'String'>
    readonly layoutId: FieldRef<"LayoutPanel", 'String'>
    readonly panelId: FieldRef<"LayoutPanel", 'String'>
    readonly propsJson: FieldRef<"LayoutPanel", 'Json'>
    readonly gridX: FieldRef<"LayoutPanel", 'Int'>
    readonly gridY: FieldRef<"LayoutPanel", 'Int'>
    readonly gridWidth: FieldRef<"LayoutPanel", 'Int'>
    readonly gridHeight: FieldRef<"LayoutPanel", 'Int'>
    readonly isVisible: FieldRef<"LayoutPanel", 'Boolean'>
    readonly zIndex: FieldRef<"LayoutPanel", 'Int'>
    readonly createdAt: FieldRef<"LayoutPanel", 'DateTime'>
    readonly updatedAt: FieldRef<"LayoutPanel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LayoutPanel findUnique
   */
  export type LayoutPanelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * Filter, which LayoutPanel to fetch.
     */
    where: LayoutPanelWhereUniqueInput
  }

  /**
   * LayoutPanel findUniqueOrThrow
   */
  export type LayoutPanelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * Filter, which LayoutPanel to fetch.
     */
    where: LayoutPanelWhereUniqueInput
  }

  /**
   * LayoutPanel findFirst
   */
  export type LayoutPanelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * Filter, which LayoutPanel to fetch.
     */
    where?: LayoutPanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LayoutPanels to fetch.
     */
    orderBy?: LayoutPanelOrderByWithRelationInput | LayoutPanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LayoutPanels.
     */
    cursor?: LayoutPanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LayoutPanels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LayoutPanels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LayoutPanels.
     */
    distinct?: LayoutPanelScalarFieldEnum | LayoutPanelScalarFieldEnum[]
  }

  /**
   * LayoutPanel findFirstOrThrow
   */
  export type LayoutPanelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * Filter, which LayoutPanel to fetch.
     */
    where?: LayoutPanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LayoutPanels to fetch.
     */
    orderBy?: LayoutPanelOrderByWithRelationInput | LayoutPanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LayoutPanels.
     */
    cursor?: LayoutPanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LayoutPanels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LayoutPanels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LayoutPanels.
     */
    distinct?: LayoutPanelScalarFieldEnum | LayoutPanelScalarFieldEnum[]
  }

  /**
   * LayoutPanel findMany
   */
  export type LayoutPanelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * Filter, which LayoutPanels to fetch.
     */
    where?: LayoutPanelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LayoutPanels to fetch.
     */
    orderBy?: LayoutPanelOrderByWithRelationInput | LayoutPanelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LayoutPanels.
     */
    cursor?: LayoutPanelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LayoutPanels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LayoutPanels.
     */
    skip?: number
    distinct?: LayoutPanelScalarFieldEnum | LayoutPanelScalarFieldEnum[]
  }

  /**
   * LayoutPanel create
   */
  export type LayoutPanelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * The data needed to create a LayoutPanel.
     */
    data: XOR<LayoutPanelCreateInput, LayoutPanelUncheckedCreateInput>
  }

  /**
   * LayoutPanel createMany
   */
  export type LayoutPanelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LayoutPanels.
     */
    data: LayoutPanelCreateManyInput | LayoutPanelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LayoutPanel createManyAndReturn
   */
  export type LayoutPanelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * The data used to create many LayoutPanels.
     */
    data: LayoutPanelCreateManyInput | LayoutPanelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LayoutPanel update
   */
  export type LayoutPanelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * The data needed to update a LayoutPanel.
     */
    data: XOR<LayoutPanelUpdateInput, LayoutPanelUncheckedUpdateInput>
    /**
     * Choose, which LayoutPanel to update.
     */
    where: LayoutPanelWhereUniqueInput
  }

  /**
   * LayoutPanel updateMany
   */
  export type LayoutPanelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LayoutPanels.
     */
    data: XOR<LayoutPanelUpdateManyMutationInput, LayoutPanelUncheckedUpdateManyInput>
    /**
     * Filter which LayoutPanels to update
     */
    where?: LayoutPanelWhereInput
    /**
     * Limit how many LayoutPanels to update.
     */
    limit?: number
  }

  /**
   * LayoutPanel updateManyAndReturn
   */
  export type LayoutPanelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * The data used to update LayoutPanels.
     */
    data: XOR<LayoutPanelUpdateManyMutationInput, LayoutPanelUncheckedUpdateManyInput>
    /**
     * Filter which LayoutPanels to update
     */
    where?: LayoutPanelWhereInput
    /**
     * Limit how many LayoutPanels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LayoutPanel upsert
   */
  export type LayoutPanelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * The filter to search for the LayoutPanel to update in case it exists.
     */
    where: LayoutPanelWhereUniqueInput
    /**
     * In case the LayoutPanel found by the `where` argument doesn't exist, create a new LayoutPanel with this data.
     */
    create: XOR<LayoutPanelCreateInput, LayoutPanelUncheckedCreateInput>
    /**
     * In case the LayoutPanel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LayoutPanelUpdateInput, LayoutPanelUncheckedUpdateInput>
  }

  /**
   * LayoutPanel delete
   */
  export type LayoutPanelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
    /**
     * Filter which LayoutPanel to delete.
     */
    where: LayoutPanelWhereUniqueInput
  }

  /**
   * LayoutPanel deleteMany
   */
  export type LayoutPanelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LayoutPanels to delete
     */
    where?: LayoutPanelWhereInput
    /**
     * Limit how many LayoutPanels to delete.
     */
    limit?: number
  }

  /**
   * LayoutPanel without action
   */
  export type LayoutPanelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LayoutPanel
     */
    select?: LayoutPanelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LayoutPanel
     */
    omit?: LayoutPanelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LayoutPanelInclude<ExtArgs> | null
  }


  /**
   * Model List
   */

  export type AggregateList = {
    _count: ListCountAggregateOutputType | null
    _avg: ListAvgAggregateOutputType | null
    _sum: ListSumAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  export type ListAvgAggregateOutputType = {
    itemCount: number | null
  }

  export type ListSumAggregateOutputType = {
    itemCount: number | null
  }

  export type ListMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: $Enums.ListType | null
    description: string | null
    isPublic: boolean | null
    thumbnail: string | null
    itemCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSyncAt: Date | null
  }

  export type ListMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    type: $Enums.ListType | null
    description: string | null
    isPublic: boolean | null
    thumbnail: string | null
    itemCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSyncAt: Date | null
  }

  export type ListCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    type: number
    description: number
    isPublic: number
    rulesJson: number
    tags: number
    thumbnail: number
    itemCount: number
    createdAt: number
    updatedAt: number
    lastSyncAt: number
    _all: number
  }


  export type ListAvgAggregateInputType = {
    itemCount?: true
  }

  export type ListSumAggregateInputType = {
    itemCount?: true
  }

  export type ListMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    description?: true
    isPublic?: true
    thumbnail?: true
    itemCount?: true
    createdAt?: true
    updatedAt?: true
    lastSyncAt?: true
  }

  export type ListMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    description?: true
    isPublic?: true
    thumbnail?: true
    itemCount?: true
    createdAt?: true
    updatedAt?: true
    lastSyncAt?: true
  }

  export type ListCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    type?: true
    description?: true
    isPublic?: true
    rulesJson?: true
    tags?: true
    thumbnail?: true
    itemCount?: true
    createdAt?: true
    updatedAt?: true
    lastSyncAt?: true
    _all?: true
  }

  export type ListAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which List to aggregate.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lists
    **/
    _count?: true | ListCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListMaxAggregateInputType
  }

  export type GetListAggregateType<T extends ListAggregateArgs> = {
        [P in keyof T & keyof AggregateList]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateList[P]>
      : GetScalarType<T[P], AggregateList[P]>
  }




  export type ListGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListWhereInput
    orderBy?: ListOrderByWithAggregationInput | ListOrderByWithAggregationInput[]
    by: ListScalarFieldEnum[] | ListScalarFieldEnum
    having?: ListScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListCountAggregateInputType | true
    _avg?: ListAvgAggregateInputType
    _sum?: ListSumAggregateInputType
    _min?: ListMinAggregateInputType
    _max?: ListMaxAggregateInputType
  }

  export type ListGroupByOutputType = {
    id: string
    userId: string
    name: string
    type: $Enums.ListType
    description: string | null
    isPublic: boolean
    rulesJson: JsonValue
    tags: string[]
    thumbnail: string | null
    itemCount: number
    createdAt: Date
    updatedAt: Date
    lastSyncAt: Date | null
    _count: ListCountAggregateOutputType | null
    _avg: ListAvgAggregateOutputType | null
    _sum: ListSumAggregateOutputType | null
    _min: ListMinAggregateOutputType | null
    _max: ListMaxAggregateOutputType | null
  }

  type GetListGroupByPayload<T extends ListGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListGroupByOutputType[P]>
            : GetScalarType<T[P], ListGroupByOutputType[P]>
        }
      >
    >


  export type ListSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    isPublic?: boolean
    rulesJson?: boolean
    tags?: boolean
    thumbnail?: boolean
    itemCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listItems?: boolean | List$listItemsArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    isPublic?: boolean
    rulesJson?: boolean
    tags?: boolean
    thumbnail?: boolean
    itemCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    isPublic?: boolean
    rulesJson?: boolean
    tags?: boolean
    thumbnail?: boolean
    itemCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["list"]>

  export type ListSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    isPublic?: boolean
    rulesJson?: boolean
    tags?: boolean
    thumbnail?: boolean
    itemCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSyncAt?: boolean
  }

  export type ListOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "type" | "description" | "isPublic" | "rulesJson" | "tags" | "thumbnail" | "itemCount" | "createdAt" | "updatedAt" | "lastSyncAt", ExtArgs["result"]["list"]>
  export type ListInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listItems?: boolean | List$listItemsArgs<ExtArgs>
    _count?: boolean | ListCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ListIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ListIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ListPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "List"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listItems: Prisma.$ListItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      type: $Enums.ListType
      description: string | null
      isPublic: boolean
      rulesJson: Prisma.JsonValue
      tags: string[]
      thumbnail: string | null
      itemCount: number
      createdAt: Date
      updatedAt: Date
      lastSyncAt: Date | null
    }, ExtArgs["result"]["list"]>
    composites: {}
  }

  type ListGetPayload<S extends boolean | null | undefined | ListDefaultArgs> = $Result.GetResult<Prisma.$ListPayload, S>

  type ListCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListCountAggregateInputType | true
    }

  export interface ListDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['List'], meta: { name: 'List' } }
    /**
     * Find zero or one List that matches the filter.
     * @param {ListFindUniqueArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListFindUniqueArgs>(args: SelectSubset<T, ListFindUniqueArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one List that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListFindUniqueOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListFindUniqueOrThrowArgs>(args: SelectSubset<T, ListFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first List that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListFindFirstArgs>(args?: SelectSubset<T, ListFindFirstArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first List that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindFirstOrThrowArgs} args - Arguments to find a List
     * @example
     * // Get one List
     * const list = await prisma.list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListFindFirstOrThrowArgs>(args?: SelectSubset<T, ListFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lists
     * const lists = await prisma.list.findMany()
     * 
     * // Get first 10 Lists
     * const lists = await prisma.list.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listWithIdOnly = await prisma.list.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListFindManyArgs>(args?: SelectSubset<T, ListFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a List.
     * @param {ListCreateArgs} args - Arguments to create a List.
     * @example
     * // Create one List
     * const List = await prisma.list.create({
     *   data: {
     *     // ... data to create a List
     *   }
     * })
     * 
     */
    create<T extends ListCreateArgs>(args: SelectSubset<T, ListCreateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lists.
     * @param {ListCreateManyArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListCreateManyArgs>(args?: SelectSubset<T, ListCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lists and returns the data saved in the database.
     * @param {ListCreateManyAndReturnArgs} args - Arguments to create many Lists.
     * @example
     * // Create many Lists
     * const list = await prisma.list.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lists and only return the `id`
     * const listWithIdOnly = await prisma.list.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListCreateManyAndReturnArgs>(args?: SelectSubset<T, ListCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a List.
     * @param {ListDeleteArgs} args - Arguments to delete one List.
     * @example
     * // Delete one List
     * const List = await prisma.list.delete({
     *   where: {
     *     // ... filter to delete one List
     *   }
     * })
     * 
     */
    delete<T extends ListDeleteArgs>(args: SelectSubset<T, ListDeleteArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one List.
     * @param {ListUpdateArgs} args - Arguments to update one List.
     * @example
     * // Update one List
     * const list = await prisma.list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListUpdateArgs>(args: SelectSubset<T, ListUpdateArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lists.
     * @param {ListDeleteManyArgs} args - Arguments to filter Lists to delete.
     * @example
     * // Delete a few Lists
     * const { count } = await prisma.list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListDeleteManyArgs>(args?: SelectSubset<T, ListDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListUpdateManyArgs>(args: SelectSubset<T, ListUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lists and returns the data updated in the database.
     * @param {ListUpdateManyAndReturnArgs} args - Arguments to update many Lists.
     * @example
     * // Update many Lists
     * const list = await prisma.list.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lists and only return the `id`
     * const listWithIdOnly = await prisma.list.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListUpdateManyAndReturnArgs>(args: SelectSubset<T, ListUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one List.
     * @param {ListUpsertArgs} args - Arguments to update or create a List.
     * @example
     * // Update or create a List
     * const list = await prisma.list.upsert({
     *   create: {
     *     // ... data to create a List
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the List we want to update
     *   }
     * })
     */
    upsert<T extends ListUpsertArgs>(args: SelectSubset<T, ListUpsertArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListCountArgs} args - Arguments to filter Lists to count.
     * @example
     * // Count the number of Lists
     * const count = await prisma.list.count({
     *   where: {
     *     // ... the filter for the Lists we want to count
     *   }
     * })
    **/
    count<T extends ListCountArgs>(
      args?: Subset<T, ListCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListAggregateArgs>(args: Subset<T, ListAggregateArgs>): Prisma.PrismaPromise<GetListAggregateType<T>>

    /**
     * Group by List.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListGroupByArgs['orderBy'] }
        : { orderBy?: ListGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the List model
   */
  readonly fields: ListFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for List.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    listItems<T extends List$listItemsArgs<ExtArgs> = {}>(args?: Subset<T, List$listItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the List model
   */
  interface ListFieldRefs {
    readonly id: FieldRef<"List", 'String'>
    readonly userId: FieldRef<"List", 'String'>
    readonly name: FieldRef<"List", 'String'>
    readonly type: FieldRef<"List", 'ListType'>
    readonly description: FieldRef<"List", 'String'>
    readonly isPublic: FieldRef<"List", 'Boolean'>
    readonly rulesJson: FieldRef<"List", 'Json'>
    readonly tags: FieldRef<"List", 'String[]'>
    readonly thumbnail: FieldRef<"List", 'String'>
    readonly itemCount: FieldRef<"List", 'Int'>
    readonly createdAt: FieldRef<"List", 'DateTime'>
    readonly updatedAt: FieldRef<"List", 'DateTime'>
    readonly lastSyncAt: FieldRef<"List", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * List findUnique
   */
  export type ListFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findUniqueOrThrow
   */
  export type ListFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List findFirst
   */
  export type ListFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findFirstOrThrow
   */
  export type ListFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which List to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lists.
     */
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List findMany
   */
  export type ListFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter, which Lists to fetch.
     */
    where?: ListWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lists to fetch.
     */
    orderBy?: ListOrderByWithRelationInput | ListOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lists.
     */
    cursor?: ListWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lists.
     */
    skip?: number
    distinct?: ListScalarFieldEnum | ListScalarFieldEnum[]
  }

  /**
   * List create
   */
  export type ListCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to create a List.
     */
    data: XOR<ListCreateInput, ListUncheckedCreateInput>
  }

  /**
   * List createMany
   */
  export type ListCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * List createManyAndReturn
   */
  export type ListCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * The data used to create many Lists.
     */
    data: ListCreateManyInput | ListCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * List update
   */
  export type ListUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The data needed to update a List.
     */
    data: XOR<ListUpdateInput, ListUncheckedUpdateInput>
    /**
     * Choose, which List to update.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List updateMany
   */
  export type ListUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lists.
     */
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>
    /**
     * Filter which Lists to update
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to update.
     */
    limit?: number
  }

  /**
   * List updateManyAndReturn
   */
  export type ListUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * The data used to update Lists.
     */
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyInput>
    /**
     * Filter which Lists to update
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * List upsert
   */
  export type ListUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * The filter to search for the List to update in case it exists.
     */
    where: ListWhereUniqueInput
    /**
     * In case the List found by the `where` argument doesn't exist, create a new List with this data.
     */
    create: XOR<ListCreateInput, ListUncheckedCreateInput>
    /**
     * In case the List was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListUpdateInput, ListUncheckedUpdateInput>
  }

  /**
   * List delete
   */
  export type ListDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
    /**
     * Filter which List to delete.
     */
    where: ListWhereUniqueInput
  }

  /**
   * List deleteMany
   */
  export type ListDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lists to delete
     */
    where?: ListWhereInput
    /**
     * Limit how many Lists to delete.
     */
    limit?: number
  }

  /**
   * List.listItems
   */
  export type List$listItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    where?: ListItemWhereInput
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    cursor?: ListItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * List without action
   */
  export type ListDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List
     */
    select?: ListSelect<ExtArgs> | null
    /**
     * Omit specific fields from the List
     */
    omit?: ListOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListInclude<ExtArgs> | null
  }


  /**
   * Model ListItem
   */

  export type AggregateListItem = {
    _count: ListItemCountAggregateOutputType | null
    _avg: ListItemAvgAggregateOutputType | null
    _sum: ListItemSumAggregateOutputType | null
    _min: ListItemMinAggregateOutputType | null
    _max: ListItemMaxAggregateOutputType | null
  }

  export type ListItemAvgAggregateOutputType = {
    duration: number | null
    position: number | null
    watchProgress: number | null
    rating: number | null
  }

  export type ListItemSumAggregateOutputType = {
    duration: number | null
    position: number | null
    watchProgress: number | null
    rating: number | null
  }

  export type ListItemMinAggregateOutputType = {
    id: string | null
    listId: string | null
    platformId: string | null
    platform: string | null
    contentType: string | null
    title: string | null
    description: string | null
    thumbnailUrl: string | null
    duration: number | null
    publishedAt: Date | null
    position: number | null
    addedAt: Date | null
    notes: string | null
    watchProgress: number | null
    rating: number | null
    isFavorite: boolean | null
  }

  export type ListItemMaxAggregateOutputType = {
    id: string | null
    listId: string | null
    platformId: string | null
    platform: string | null
    contentType: string | null
    title: string | null
    description: string | null
    thumbnailUrl: string | null
    duration: number | null
    publishedAt: Date | null
    position: number | null
    addedAt: Date | null
    notes: string | null
    watchProgress: number | null
    rating: number | null
    isFavorite: boolean | null
  }

  export type ListItemCountAggregateOutputType = {
    id: number
    listId: number
    platformId: number
    platform: number
    contentType: number
    title: number
    description: number
    thumbnailUrl: number
    duration: number
    publishedAt: number
    position: number
    addedAt: number
    notes: number
    watchProgress: number
    rating: number
    isFavorite: number
    _all: number
  }


  export type ListItemAvgAggregateInputType = {
    duration?: true
    position?: true
    watchProgress?: true
    rating?: true
  }

  export type ListItemSumAggregateInputType = {
    duration?: true
    position?: true
    watchProgress?: true
    rating?: true
  }

  export type ListItemMinAggregateInputType = {
    id?: true
    listId?: true
    platformId?: true
    platform?: true
    contentType?: true
    title?: true
    description?: true
    thumbnailUrl?: true
    duration?: true
    publishedAt?: true
    position?: true
    addedAt?: true
    notes?: true
    watchProgress?: true
    rating?: true
    isFavorite?: true
  }

  export type ListItemMaxAggregateInputType = {
    id?: true
    listId?: true
    platformId?: true
    platform?: true
    contentType?: true
    title?: true
    description?: true
    thumbnailUrl?: true
    duration?: true
    publishedAt?: true
    position?: true
    addedAt?: true
    notes?: true
    watchProgress?: true
    rating?: true
    isFavorite?: true
  }

  export type ListItemCountAggregateInputType = {
    id?: true
    listId?: true
    platformId?: true
    platform?: true
    contentType?: true
    title?: true
    description?: true
    thumbnailUrl?: true
    duration?: true
    publishedAt?: true
    position?: true
    addedAt?: true
    notes?: true
    watchProgress?: true
    rating?: true
    isFavorite?: true
    _all?: true
  }

  export type ListItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListItem to aggregate.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ListItems
    **/
    _count?: true | ListItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ListItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ListItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ListItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ListItemMaxAggregateInputType
  }

  export type GetListItemAggregateType<T extends ListItemAggregateArgs> = {
        [P in keyof T & keyof AggregateListItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateListItem[P]>
      : GetScalarType<T[P], AggregateListItem[P]>
  }




  export type ListItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ListItemWhereInput
    orderBy?: ListItemOrderByWithAggregationInput | ListItemOrderByWithAggregationInput[]
    by: ListItemScalarFieldEnum[] | ListItemScalarFieldEnum
    having?: ListItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ListItemCountAggregateInputType | true
    _avg?: ListItemAvgAggregateInputType
    _sum?: ListItemSumAggregateInputType
    _min?: ListItemMinAggregateInputType
    _max?: ListItemMaxAggregateInputType
  }

  export type ListItemGroupByOutputType = {
    id: string
    listId: string
    platformId: string
    platform: string
    contentType: string
    title: string | null
    description: string | null
    thumbnailUrl: string | null
    duration: number | null
    publishedAt: Date | null
    position: number
    addedAt: Date
    notes: string | null
    watchProgress: number | null
    rating: number | null
    isFavorite: boolean
    _count: ListItemCountAggregateOutputType | null
    _avg: ListItemAvgAggregateOutputType | null
    _sum: ListItemSumAggregateOutputType | null
    _min: ListItemMinAggregateOutputType | null
    _max: ListItemMaxAggregateOutputType | null
  }

  type GetListItemGroupByPayload<T extends ListItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ListItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ListItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ListItemGroupByOutputType[P]>
            : GetScalarType<T[P], ListItemGroupByOutputType[P]>
        }
      >
    >


  export type ListItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    platformId?: boolean
    platform?: boolean
    contentType?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    publishedAt?: boolean
    position?: boolean
    addedAt?: boolean
    notes?: boolean
    watchProgress?: boolean
    rating?: boolean
    isFavorite?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listItem"]>

  export type ListItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    platformId?: boolean
    platform?: boolean
    contentType?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    publishedAt?: boolean
    position?: boolean
    addedAt?: boolean
    notes?: boolean
    watchProgress?: boolean
    rating?: boolean
    isFavorite?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listItem"]>

  export type ListItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    listId?: boolean
    platformId?: boolean
    platform?: boolean
    contentType?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    publishedAt?: boolean
    position?: boolean
    addedAt?: boolean
    notes?: boolean
    watchProgress?: boolean
    rating?: boolean
    isFavorite?: boolean
    list?: boolean | ListDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["listItem"]>

  export type ListItemSelectScalar = {
    id?: boolean
    listId?: boolean
    platformId?: boolean
    platform?: boolean
    contentType?: boolean
    title?: boolean
    description?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    publishedAt?: boolean
    position?: boolean
    addedAt?: boolean
    notes?: boolean
    watchProgress?: boolean
    rating?: boolean
    isFavorite?: boolean
  }

  export type ListItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "listId" | "platformId" | "platform" | "contentType" | "title" | "description" | "thumbnailUrl" | "duration" | "publishedAt" | "position" | "addedAt" | "notes" | "watchProgress" | "rating" | "isFavorite", ExtArgs["result"]["listItem"]>
  export type ListItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type ListItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }
  export type ListItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    list?: boolean | ListDefaultArgs<ExtArgs>
  }

  export type $ListItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ListItem"
    objects: {
      list: Prisma.$ListPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      listId: string
      platformId: string
      platform: string
      contentType: string
      title: string | null
      description: string | null
      thumbnailUrl: string | null
      duration: number | null
      publishedAt: Date | null
      position: number
      addedAt: Date
      notes: string | null
      watchProgress: number | null
      rating: number | null
      isFavorite: boolean
    }, ExtArgs["result"]["listItem"]>
    composites: {}
  }

  type ListItemGetPayload<S extends boolean | null | undefined | ListItemDefaultArgs> = $Result.GetResult<Prisma.$ListItemPayload, S>

  type ListItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ListItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ListItemCountAggregateInputType | true
    }

  export interface ListItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ListItem'], meta: { name: 'ListItem' } }
    /**
     * Find zero or one ListItem that matches the filter.
     * @param {ListItemFindUniqueArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ListItemFindUniqueArgs>(args: SelectSubset<T, ListItemFindUniqueArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ListItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ListItemFindUniqueOrThrowArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ListItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ListItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemFindFirstArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ListItemFindFirstArgs>(args?: SelectSubset<T, ListItemFindFirstArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ListItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemFindFirstOrThrowArgs} args - Arguments to find a ListItem
     * @example
     * // Get one ListItem
     * const listItem = await prisma.listItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ListItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ListItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ListItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ListItems
     * const listItems = await prisma.listItem.findMany()
     * 
     * // Get first 10 ListItems
     * const listItems = await prisma.listItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const listItemWithIdOnly = await prisma.listItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ListItemFindManyArgs>(args?: SelectSubset<T, ListItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ListItem.
     * @param {ListItemCreateArgs} args - Arguments to create a ListItem.
     * @example
     * // Create one ListItem
     * const ListItem = await prisma.listItem.create({
     *   data: {
     *     // ... data to create a ListItem
     *   }
     * })
     * 
     */
    create<T extends ListItemCreateArgs>(args: SelectSubset<T, ListItemCreateArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ListItems.
     * @param {ListItemCreateManyArgs} args - Arguments to create many ListItems.
     * @example
     * // Create many ListItems
     * const listItem = await prisma.listItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ListItemCreateManyArgs>(args?: SelectSubset<T, ListItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ListItems and returns the data saved in the database.
     * @param {ListItemCreateManyAndReturnArgs} args - Arguments to create many ListItems.
     * @example
     * // Create many ListItems
     * const listItem = await prisma.listItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ListItems and only return the `id`
     * const listItemWithIdOnly = await prisma.listItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ListItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ListItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ListItem.
     * @param {ListItemDeleteArgs} args - Arguments to delete one ListItem.
     * @example
     * // Delete one ListItem
     * const ListItem = await prisma.listItem.delete({
     *   where: {
     *     // ... filter to delete one ListItem
     *   }
     * })
     * 
     */
    delete<T extends ListItemDeleteArgs>(args: SelectSubset<T, ListItemDeleteArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ListItem.
     * @param {ListItemUpdateArgs} args - Arguments to update one ListItem.
     * @example
     * // Update one ListItem
     * const listItem = await prisma.listItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ListItemUpdateArgs>(args: SelectSubset<T, ListItemUpdateArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ListItems.
     * @param {ListItemDeleteManyArgs} args - Arguments to filter ListItems to delete.
     * @example
     * // Delete a few ListItems
     * const { count } = await prisma.listItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ListItemDeleteManyArgs>(args?: SelectSubset<T, ListItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ListItems
     * const listItem = await prisma.listItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ListItemUpdateManyArgs>(args: SelectSubset<T, ListItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ListItems and returns the data updated in the database.
     * @param {ListItemUpdateManyAndReturnArgs} args - Arguments to update many ListItems.
     * @example
     * // Update many ListItems
     * const listItem = await prisma.listItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ListItems and only return the `id`
     * const listItemWithIdOnly = await prisma.listItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ListItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ListItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ListItem.
     * @param {ListItemUpsertArgs} args - Arguments to update or create a ListItem.
     * @example
     * // Update or create a ListItem
     * const listItem = await prisma.listItem.upsert({
     *   create: {
     *     // ... data to create a ListItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ListItem we want to update
     *   }
     * })
     */
    upsert<T extends ListItemUpsertArgs>(args: SelectSubset<T, ListItemUpsertArgs<ExtArgs>>): Prisma__ListItemClient<$Result.GetResult<Prisma.$ListItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ListItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemCountArgs} args - Arguments to filter ListItems to count.
     * @example
     * // Count the number of ListItems
     * const count = await prisma.listItem.count({
     *   where: {
     *     // ... the filter for the ListItems we want to count
     *   }
     * })
    **/
    count<T extends ListItemCountArgs>(
      args?: Subset<T, ListItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ListItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ListItemAggregateArgs>(args: Subset<T, ListItemAggregateArgs>): Prisma.PrismaPromise<GetListItemAggregateType<T>>

    /**
     * Group by ListItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ListItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ListItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ListItemGroupByArgs['orderBy'] }
        : { orderBy?: ListItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ListItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetListItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ListItem model
   */
  readonly fields: ListItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ListItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ListItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    list<T extends ListDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ListDefaultArgs<ExtArgs>>): Prisma__ListClient<$Result.GetResult<Prisma.$ListPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ListItem model
   */
  interface ListItemFieldRefs {
    readonly id: FieldRef<"ListItem", 'String'>
    readonly listId: FieldRef<"ListItem", 'String'>
    readonly platformId: FieldRef<"ListItem", 'String'>
    readonly platform: FieldRef<"ListItem", 'String'>
    readonly contentType: FieldRef<"ListItem", 'String'>
    readonly title: FieldRef<"ListItem", 'String'>
    readonly description: FieldRef<"ListItem", 'String'>
    readonly thumbnailUrl: FieldRef<"ListItem", 'String'>
    readonly duration: FieldRef<"ListItem", 'Int'>
    readonly publishedAt: FieldRef<"ListItem", 'DateTime'>
    readonly position: FieldRef<"ListItem", 'Int'>
    readonly addedAt: FieldRef<"ListItem", 'DateTime'>
    readonly notes: FieldRef<"ListItem", 'String'>
    readonly watchProgress: FieldRef<"ListItem", 'Float'>
    readonly rating: FieldRef<"ListItem", 'Int'>
    readonly isFavorite: FieldRef<"ListItem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ListItem findUnique
   */
  export type ListItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem findUniqueOrThrow
   */
  export type ListItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem findFirst
   */
  export type ListItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListItems.
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListItems.
     */
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * ListItem findFirstOrThrow
   */
  export type ListItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItem to fetch.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ListItems.
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ListItems.
     */
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * ListItem findMany
   */
  export type ListItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter, which ListItems to fetch.
     */
    where?: ListItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ListItems to fetch.
     */
    orderBy?: ListItemOrderByWithRelationInput | ListItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ListItems.
     */
    cursor?: ListItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ListItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ListItems.
     */
    skip?: number
    distinct?: ListItemScalarFieldEnum | ListItemScalarFieldEnum[]
  }

  /**
   * ListItem create
   */
  export type ListItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * The data needed to create a ListItem.
     */
    data: XOR<ListItemCreateInput, ListItemUncheckedCreateInput>
  }

  /**
   * ListItem createMany
   */
  export type ListItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ListItems.
     */
    data: ListItemCreateManyInput | ListItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ListItem createManyAndReturn
   */
  export type ListItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * The data used to create many ListItems.
     */
    data: ListItemCreateManyInput | ListItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListItem update
   */
  export type ListItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * The data needed to update a ListItem.
     */
    data: XOR<ListItemUpdateInput, ListItemUncheckedUpdateInput>
    /**
     * Choose, which ListItem to update.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem updateMany
   */
  export type ListItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ListItems.
     */
    data: XOR<ListItemUpdateManyMutationInput, ListItemUncheckedUpdateManyInput>
    /**
     * Filter which ListItems to update
     */
    where?: ListItemWhereInput
    /**
     * Limit how many ListItems to update.
     */
    limit?: number
  }

  /**
   * ListItem updateManyAndReturn
   */
  export type ListItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * The data used to update ListItems.
     */
    data: XOR<ListItemUpdateManyMutationInput, ListItemUncheckedUpdateManyInput>
    /**
     * Filter which ListItems to update
     */
    where?: ListItemWhereInput
    /**
     * Limit how many ListItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ListItem upsert
   */
  export type ListItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * The filter to search for the ListItem to update in case it exists.
     */
    where: ListItemWhereUniqueInput
    /**
     * In case the ListItem found by the `where` argument doesn't exist, create a new ListItem with this data.
     */
    create: XOR<ListItemCreateInput, ListItemUncheckedCreateInput>
    /**
     * In case the ListItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ListItemUpdateInput, ListItemUncheckedUpdateInput>
  }

  /**
   * ListItem delete
   */
  export type ListItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
    /**
     * Filter which ListItem to delete.
     */
    where: ListItemWhereUniqueInput
  }

  /**
   * ListItem deleteMany
   */
  export type ListItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ListItems to delete
     */
    where?: ListItemWhereInput
    /**
     * Limit how many ListItems to delete.
     */
    limit?: number
  }

  /**
   * ListItem without action
   */
  export type ListItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ListItem
     */
    select?: ListItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ListItem
     */
    omit?: ListItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ListItemInclude<ExtArgs> | null
  }


  /**
   * Model Preference
   */

  export type AggregatePreference = {
    _count: PreferenceCountAggregateOutputType | null
    _min: PreferenceMinAggregateOutputType | null
    _max: PreferenceMaxAggregateOutputType | null
  }

  export type PreferenceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    key: string | null
    category: string | null
    description: string | null
    isUserSet: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PreferenceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    key: string | null
    category: string | null
    description: string | null
    isUserSet: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PreferenceCountAggregateOutputType = {
    id: number
    userId: number
    key: number
    valueJson: number
    category: number
    description: number
    isUserSet: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PreferenceMinAggregateInputType = {
    id?: true
    userId?: true
    key?: true
    category?: true
    description?: true
    isUserSet?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PreferenceMaxAggregateInputType = {
    id?: true
    userId?: true
    key?: true
    category?: true
    description?: true
    isUserSet?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PreferenceCountAggregateInputType = {
    id?: true
    userId?: true
    key?: true
    valueJson?: true
    category?: true
    description?: true
    isUserSet?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PreferenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preference to aggregate.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Preferences
    **/
    _count?: true | PreferenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreferenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreferenceMaxAggregateInputType
  }

  export type GetPreferenceAggregateType<T extends PreferenceAggregateArgs> = {
        [P in keyof T & keyof AggregatePreference]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreference[P]>
      : GetScalarType<T[P], AggregatePreference[P]>
  }




  export type PreferenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreferenceWhereInput
    orderBy?: PreferenceOrderByWithAggregationInput | PreferenceOrderByWithAggregationInput[]
    by: PreferenceScalarFieldEnum[] | PreferenceScalarFieldEnum
    having?: PreferenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreferenceCountAggregateInputType | true
    _min?: PreferenceMinAggregateInputType
    _max?: PreferenceMaxAggregateInputType
  }

  export type PreferenceGroupByOutputType = {
    id: string
    userId: string
    key: string
    valueJson: JsonValue
    category: string | null
    description: string | null
    isUserSet: boolean
    createdAt: Date
    updatedAt: Date
    _count: PreferenceCountAggregateOutputType | null
    _min: PreferenceMinAggregateOutputType | null
    _max: PreferenceMaxAggregateOutputType | null
  }

  type GetPreferenceGroupByPayload<T extends PreferenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreferenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreferenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreferenceGroupByOutputType[P]>
            : GetScalarType<T[P], PreferenceGroupByOutputType[P]>
        }
      >
    >


  export type PreferenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    key?: boolean
    valueJson?: boolean
    category?: boolean
    description?: boolean
    isUserSet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preference"]>

  export type PreferenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    key?: boolean
    valueJson?: boolean
    category?: boolean
    description?: boolean
    isUserSet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preference"]>

  export type PreferenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    key?: boolean
    valueJson?: boolean
    category?: boolean
    description?: boolean
    isUserSet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["preference"]>

  export type PreferenceSelectScalar = {
    id?: boolean
    userId?: boolean
    key?: boolean
    valueJson?: boolean
    category?: boolean
    description?: boolean
    isUserSet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PreferenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "key" | "valueJson" | "category" | "description" | "isUserSet" | "createdAt" | "updatedAt", ExtArgs["result"]["preference"]>
  export type PreferenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PreferenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PreferenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PreferencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Preference"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      key: string
      valueJson: Prisma.JsonValue
      category: string | null
      description: string | null
      isUserSet: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["preference"]>
    composites: {}
  }

  type PreferenceGetPayload<S extends boolean | null | undefined | PreferenceDefaultArgs> = $Result.GetResult<Prisma.$PreferencePayload, S>

  type PreferenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreferenceCountAggregateInputType | true
    }

  export interface PreferenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Preference'], meta: { name: 'Preference' } }
    /**
     * Find zero or one Preference that matches the filter.
     * @param {PreferenceFindUniqueArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreferenceFindUniqueArgs>(args: SelectSubset<T, PreferenceFindUniqueArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Preference that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreferenceFindUniqueOrThrowArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreferenceFindUniqueOrThrowArgs>(args: SelectSubset<T, PreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preference that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceFindFirstArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreferenceFindFirstArgs>(args?: SelectSubset<T, PreferenceFindFirstArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Preference that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceFindFirstOrThrowArgs} args - Arguments to find a Preference
     * @example
     * // Get one Preference
     * const preference = await prisma.preference.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreferenceFindFirstOrThrowArgs>(args?: SelectSubset<T, PreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Preferences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Preferences
     * const preferences = await prisma.preference.findMany()
     * 
     * // Get first 10 Preferences
     * const preferences = await prisma.preference.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preferenceWithIdOnly = await prisma.preference.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreferenceFindManyArgs>(args?: SelectSubset<T, PreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Preference.
     * @param {PreferenceCreateArgs} args - Arguments to create a Preference.
     * @example
     * // Create one Preference
     * const Preference = await prisma.preference.create({
     *   data: {
     *     // ... data to create a Preference
     *   }
     * })
     * 
     */
    create<T extends PreferenceCreateArgs>(args: SelectSubset<T, PreferenceCreateArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Preferences.
     * @param {PreferenceCreateManyArgs} args - Arguments to create many Preferences.
     * @example
     * // Create many Preferences
     * const preference = await prisma.preference.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreferenceCreateManyArgs>(args?: SelectSubset<T, PreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Preferences and returns the data saved in the database.
     * @param {PreferenceCreateManyAndReturnArgs} args - Arguments to create many Preferences.
     * @example
     * // Create many Preferences
     * const preference = await prisma.preference.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Preferences and only return the `id`
     * const preferenceWithIdOnly = await prisma.preference.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreferenceCreateManyAndReturnArgs>(args?: SelectSubset<T, PreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Preference.
     * @param {PreferenceDeleteArgs} args - Arguments to delete one Preference.
     * @example
     * // Delete one Preference
     * const Preference = await prisma.preference.delete({
     *   where: {
     *     // ... filter to delete one Preference
     *   }
     * })
     * 
     */
    delete<T extends PreferenceDeleteArgs>(args: SelectSubset<T, PreferenceDeleteArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Preference.
     * @param {PreferenceUpdateArgs} args - Arguments to update one Preference.
     * @example
     * // Update one Preference
     * const preference = await prisma.preference.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreferenceUpdateArgs>(args: SelectSubset<T, PreferenceUpdateArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Preferences.
     * @param {PreferenceDeleteManyArgs} args - Arguments to filter Preferences to delete.
     * @example
     * // Delete a few Preferences
     * const { count } = await prisma.preference.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreferenceDeleteManyArgs>(args?: SelectSubset<T, PreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Preferences
     * const preference = await prisma.preference.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreferenceUpdateManyArgs>(args: SelectSubset<T, PreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Preferences and returns the data updated in the database.
     * @param {PreferenceUpdateManyAndReturnArgs} args - Arguments to update many Preferences.
     * @example
     * // Update many Preferences
     * const preference = await prisma.preference.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Preferences and only return the `id`
     * const preferenceWithIdOnly = await prisma.preference.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PreferenceUpdateManyAndReturnArgs>(args: SelectSubset<T, PreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Preference.
     * @param {PreferenceUpsertArgs} args - Arguments to update or create a Preference.
     * @example
     * // Update or create a Preference
     * const preference = await prisma.preference.upsert({
     *   create: {
     *     // ... data to create a Preference
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Preference we want to update
     *   }
     * })
     */
    upsert<T extends PreferenceUpsertArgs>(args: SelectSubset<T, PreferenceUpsertArgs<ExtArgs>>): Prisma__PreferenceClient<$Result.GetResult<Prisma.$PreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Preferences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceCountArgs} args - Arguments to filter Preferences to count.
     * @example
     * // Count the number of Preferences
     * const count = await prisma.preference.count({
     *   where: {
     *     // ... the filter for the Preferences we want to count
     *   }
     * })
    **/
    count<T extends PreferenceCountArgs>(
      args?: Subset<T, PreferenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreferenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Preference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PreferenceAggregateArgs>(args: Subset<T, PreferenceAggregateArgs>): Prisma.PrismaPromise<GetPreferenceAggregateType<T>>

    /**
     * Group by Preference.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreferenceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PreferenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreferenceGroupByArgs['orderBy'] }
        : { orderBy?: PreferenceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Preference model
   */
  readonly fields: PreferenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Preference.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreferenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Preference model
   */
  interface PreferenceFieldRefs {
    readonly id: FieldRef<"Preference", 'String'>
    readonly userId: FieldRef<"Preference", 'String'>
    readonly key: FieldRef<"Preference", 'String'>
    readonly valueJson: FieldRef<"Preference", 'Json'>
    readonly category: FieldRef<"Preference", 'String'>
    readonly description: FieldRef<"Preference", 'String'>
    readonly isUserSet: FieldRef<"Preference", 'Boolean'>
    readonly createdAt: FieldRef<"Preference", 'DateTime'>
    readonly updatedAt: FieldRef<"Preference", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Preference findUnique
   */
  export type PreferenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference findUniqueOrThrow
   */
  export type PreferenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference findFirst
   */
  export type PreferenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preferences.
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preferences.
     */
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Preference findFirstOrThrow
   */
  export type PreferenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preference to fetch.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Preferences.
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Preferences.
     */
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Preference findMany
   */
  export type PreferenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter, which Preferences to fetch.
     */
    where?: PreferenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Preferences to fetch.
     */
    orderBy?: PreferenceOrderByWithRelationInput | PreferenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Preferences.
     */
    cursor?: PreferenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Preferences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Preferences.
     */
    skip?: number
    distinct?: PreferenceScalarFieldEnum | PreferenceScalarFieldEnum[]
  }

  /**
   * Preference create
   */
  export type PreferenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Preference.
     */
    data: XOR<PreferenceCreateInput, PreferenceUncheckedCreateInput>
  }

  /**
   * Preference createMany
   */
  export type PreferenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Preferences.
     */
    data: PreferenceCreateManyInput | PreferenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Preference createManyAndReturn
   */
  export type PreferenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * The data used to create many Preferences.
     */
    data: PreferenceCreateManyInput | PreferenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preference update
   */
  export type PreferenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Preference.
     */
    data: XOR<PreferenceUpdateInput, PreferenceUncheckedUpdateInput>
    /**
     * Choose, which Preference to update.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference updateMany
   */
  export type PreferenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Preferences.
     */
    data: XOR<PreferenceUpdateManyMutationInput, PreferenceUncheckedUpdateManyInput>
    /**
     * Filter which Preferences to update
     */
    where?: PreferenceWhereInput
    /**
     * Limit how many Preferences to update.
     */
    limit?: number
  }

  /**
   * Preference updateManyAndReturn
   */
  export type PreferenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * The data used to update Preferences.
     */
    data: XOR<PreferenceUpdateManyMutationInput, PreferenceUncheckedUpdateManyInput>
    /**
     * Filter which Preferences to update
     */
    where?: PreferenceWhereInput
    /**
     * Limit how many Preferences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Preference upsert
   */
  export type PreferenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Preference to update in case it exists.
     */
    where: PreferenceWhereUniqueInput
    /**
     * In case the Preference found by the `where` argument doesn't exist, create a new Preference with this data.
     */
    create: XOR<PreferenceCreateInput, PreferenceUncheckedCreateInput>
    /**
     * In case the Preference was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreferenceUpdateInput, PreferenceUncheckedUpdateInput>
  }

  /**
   * Preference delete
   */
  export type PreferenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
    /**
     * Filter which Preference to delete.
     */
    where: PreferenceWhereUniqueInput
  }

  /**
   * Preference deleteMany
   */
  export type PreferenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Preferences to delete
     */
    where?: PreferenceWhereInput
    /**
     * Limit how many Preferences to delete.
     */
    limit?: number
  }

  /**
   * Preference without action
   */
  export type PreferenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Preference
     */
    select?: PreferenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Preference
     */
    omit?: PreferenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreferenceInclude<ExtArgs> | null
  }


  /**
   * Model Migration
   */

  export type AggregateMigration = {
    _count: MigrationCountAggregateOutputType | null
    _min: MigrationMinAggregateOutputType | null
    _max: MigrationMaxAggregateOutputType | null
  }

  export type MigrationMinAggregateOutputType = {
    id: string | null
    name: string | null
    executedAt: Date | null
    checksum: string | null
  }

  export type MigrationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    executedAt: Date | null
    checksum: string | null
  }

  export type MigrationCountAggregateOutputType = {
    id: number
    name: number
    executedAt: number
    checksum: number
    _all: number
  }


  export type MigrationMinAggregateInputType = {
    id?: true
    name?: true
    executedAt?: true
    checksum?: true
  }

  export type MigrationMaxAggregateInputType = {
    id?: true
    name?: true
    executedAt?: true
    checksum?: true
  }

  export type MigrationCountAggregateInputType = {
    id?: true
    name?: true
    executedAt?: true
    checksum?: true
    _all?: true
  }

  export type MigrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Migration to aggregate.
     */
    where?: MigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Migrations to fetch.
     */
    orderBy?: MigrationOrderByWithRelationInput | MigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Migrations
    **/
    _count?: true | MigrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MigrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MigrationMaxAggregateInputType
  }

  export type GetMigrationAggregateType<T extends MigrationAggregateArgs> = {
        [P in keyof T & keyof AggregateMigration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMigration[P]>
      : GetScalarType<T[P], AggregateMigration[P]>
  }




  export type MigrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MigrationWhereInput
    orderBy?: MigrationOrderByWithAggregationInput | MigrationOrderByWithAggregationInput[]
    by: MigrationScalarFieldEnum[] | MigrationScalarFieldEnum
    having?: MigrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MigrationCountAggregateInputType | true
    _min?: MigrationMinAggregateInputType
    _max?: MigrationMaxAggregateInputType
  }

  export type MigrationGroupByOutputType = {
    id: string
    name: string
    executedAt: Date
    checksum: string | null
    _count: MigrationCountAggregateOutputType | null
    _min: MigrationMinAggregateOutputType | null
    _max: MigrationMaxAggregateOutputType | null
  }

  type GetMigrationGroupByPayload<T extends MigrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MigrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MigrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MigrationGroupByOutputType[P]>
            : GetScalarType<T[P], MigrationGroupByOutputType[P]>
        }
      >
    >


  export type MigrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    executedAt?: boolean
    checksum?: boolean
  }, ExtArgs["result"]["migration"]>

  export type MigrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    executedAt?: boolean
    checksum?: boolean
  }, ExtArgs["result"]["migration"]>

  export type MigrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    executedAt?: boolean
    checksum?: boolean
  }, ExtArgs["result"]["migration"]>

  export type MigrationSelectScalar = {
    id?: boolean
    name?: boolean
    executedAt?: boolean
    checksum?: boolean
  }

  export type MigrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "executedAt" | "checksum", ExtArgs["result"]["migration"]>

  export type $MigrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Migration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      executedAt: Date
      checksum: string | null
    }, ExtArgs["result"]["migration"]>
    composites: {}
  }

  type MigrationGetPayload<S extends boolean | null | undefined | MigrationDefaultArgs> = $Result.GetResult<Prisma.$MigrationPayload, S>

  type MigrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MigrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MigrationCountAggregateInputType | true
    }

  export interface MigrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Migration'], meta: { name: 'Migration' } }
    /**
     * Find zero or one Migration that matches the filter.
     * @param {MigrationFindUniqueArgs} args - Arguments to find a Migration
     * @example
     * // Get one Migration
     * const migration = await prisma.migration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MigrationFindUniqueArgs>(args: SelectSubset<T, MigrationFindUniqueArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Migration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MigrationFindUniqueOrThrowArgs} args - Arguments to find a Migration
     * @example
     * // Get one Migration
     * const migration = await prisma.migration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MigrationFindUniqueOrThrowArgs>(args: SelectSubset<T, MigrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationFindFirstArgs} args - Arguments to find a Migration
     * @example
     * // Get one Migration
     * const migration = await prisma.migration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MigrationFindFirstArgs>(args?: SelectSubset<T, MigrationFindFirstArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationFindFirstOrThrowArgs} args - Arguments to find a Migration
     * @example
     * // Get one Migration
     * const migration = await prisma.migration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MigrationFindFirstOrThrowArgs>(args?: SelectSubset<T, MigrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Migrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Migrations
     * const migrations = await prisma.migration.findMany()
     * 
     * // Get first 10 Migrations
     * const migrations = await prisma.migration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const migrationWithIdOnly = await prisma.migration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MigrationFindManyArgs>(args?: SelectSubset<T, MigrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Migration.
     * @param {MigrationCreateArgs} args - Arguments to create a Migration.
     * @example
     * // Create one Migration
     * const Migration = await prisma.migration.create({
     *   data: {
     *     // ... data to create a Migration
     *   }
     * })
     * 
     */
    create<T extends MigrationCreateArgs>(args: SelectSubset<T, MigrationCreateArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Migrations.
     * @param {MigrationCreateManyArgs} args - Arguments to create many Migrations.
     * @example
     * // Create many Migrations
     * const migration = await prisma.migration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MigrationCreateManyArgs>(args?: SelectSubset<T, MigrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Migrations and returns the data saved in the database.
     * @param {MigrationCreateManyAndReturnArgs} args - Arguments to create many Migrations.
     * @example
     * // Create many Migrations
     * const migration = await prisma.migration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Migrations and only return the `id`
     * const migrationWithIdOnly = await prisma.migration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MigrationCreateManyAndReturnArgs>(args?: SelectSubset<T, MigrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Migration.
     * @param {MigrationDeleteArgs} args - Arguments to delete one Migration.
     * @example
     * // Delete one Migration
     * const Migration = await prisma.migration.delete({
     *   where: {
     *     // ... filter to delete one Migration
     *   }
     * })
     * 
     */
    delete<T extends MigrationDeleteArgs>(args: SelectSubset<T, MigrationDeleteArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Migration.
     * @param {MigrationUpdateArgs} args - Arguments to update one Migration.
     * @example
     * // Update one Migration
     * const migration = await prisma.migration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MigrationUpdateArgs>(args: SelectSubset<T, MigrationUpdateArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Migrations.
     * @param {MigrationDeleteManyArgs} args - Arguments to filter Migrations to delete.
     * @example
     * // Delete a few Migrations
     * const { count } = await prisma.migration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MigrationDeleteManyArgs>(args?: SelectSubset<T, MigrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Migrations
     * const migration = await prisma.migration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MigrationUpdateManyArgs>(args: SelectSubset<T, MigrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations and returns the data updated in the database.
     * @param {MigrationUpdateManyAndReturnArgs} args - Arguments to update many Migrations.
     * @example
     * // Update many Migrations
     * const migration = await prisma.migration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Migrations and only return the `id`
     * const migrationWithIdOnly = await prisma.migration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MigrationUpdateManyAndReturnArgs>(args: SelectSubset<T, MigrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Migration.
     * @param {MigrationUpsertArgs} args - Arguments to update or create a Migration.
     * @example
     * // Update or create a Migration
     * const migration = await prisma.migration.upsert({
     *   create: {
     *     // ... data to create a Migration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Migration we want to update
     *   }
     * })
     */
    upsert<T extends MigrationUpsertArgs>(args: SelectSubset<T, MigrationUpsertArgs<ExtArgs>>): Prisma__MigrationClient<$Result.GetResult<Prisma.$MigrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Migrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationCountArgs} args - Arguments to filter Migrations to count.
     * @example
     * // Count the number of Migrations
     * const count = await prisma.migration.count({
     *   where: {
     *     // ... the filter for the Migrations we want to count
     *   }
     * })
    **/
    count<T extends MigrationCountArgs>(
      args?: Subset<T, MigrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MigrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Migration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MigrationAggregateArgs>(args: Subset<T, MigrationAggregateArgs>): Prisma.PrismaPromise<GetMigrationAggregateType<T>>

    /**
     * Group by Migration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MigrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MigrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MigrationGroupByArgs['orderBy'] }
        : { orderBy?: MigrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MigrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMigrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Migration model
   */
  readonly fields: MigrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Migration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MigrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Migration model
   */
  interface MigrationFieldRefs {
    readonly id: FieldRef<"Migration", 'String'>
    readonly name: FieldRef<"Migration", 'String'>
    readonly executedAt: FieldRef<"Migration", 'DateTime'>
    readonly checksum: FieldRef<"Migration", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Migration findUnique
   */
  export type MigrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * Filter, which Migration to fetch.
     */
    where: MigrationWhereUniqueInput
  }

  /**
   * Migration findUniqueOrThrow
   */
  export type MigrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * Filter, which Migration to fetch.
     */
    where: MigrationWhereUniqueInput
  }

  /**
   * Migration findFirst
   */
  export type MigrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * Filter, which Migration to fetch.
     */
    where?: MigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Migrations to fetch.
     */
    orderBy?: MigrationOrderByWithRelationInput | MigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Migrations.
     */
    cursor?: MigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Migrations.
     */
    distinct?: MigrationScalarFieldEnum | MigrationScalarFieldEnum[]
  }

  /**
   * Migration findFirstOrThrow
   */
  export type MigrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * Filter, which Migration to fetch.
     */
    where?: MigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Migrations to fetch.
     */
    orderBy?: MigrationOrderByWithRelationInput | MigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Migrations.
     */
    cursor?: MigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Migrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Migrations.
     */
    distinct?: MigrationScalarFieldEnum | MigrationScalarFieldEnum[]
  }

  /**
   * Migration findMany
   */
  export type MigrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * Filter, which Migrations to fetch.
     */
    where?: MigrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Migrations to fetch.
     */
    orderBy?: MigrationOrderByWithRelationInput | MigrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Migrations.
     */
    cursor?: MigrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Migrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Migrations.
     */
    skip?: number
    distinct?: MigrationScalarFieldEnum | MigrationScalarFieldEnum[]
  }

  /**
   * Migration create
   */
  export type MigrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * The data needed to create a Migration.
     */
    data: XOR<MigrationCreateInput, MigrationUncheckedCreateInput>
  }

  /**
   * Migration createMany
   */
  export type MigrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Migrations.
     */
    data: MigrationCreateManyInput | MigrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Migration createManyAndReturn
   */
  export type MigrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * The data used to create many Migrations.
     */
    data: MigrationCreateManyInput | MigrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Migration update
   */
  export type MigrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * The data needed to update a Migration.
     */
    data: XOR<MigrationUpdateInput, MigrationUncheckedUpdateInput>
    /**
     * Choose, which Migration to update.
     */
    where: MigrationWhereUniqueInput
  }

  /**
   * Migration updateMany
   */
  export type MigrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Migrations.
     */
    data: XOR<MigrationUpdateManyMutationInput, MigrationUncheckedUpdateManyInput>
    /**
     * Filter which Migrations to update
     */
    where?: MigrationWhereInput
    /**
     * Limit how many Migrations to update.
     */
    limit?: number
  }

  /**
   * Migration updateManyAndReturn
   */
  export type MigrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * The data used to update Migrations.
     */
    data: XOR<MigrationUpdateManyMutationInput, MigrationUncheckedUpdateManyInput>
    /**
     * Filter which Migrations to update
     */
    where?: MigrationWhereInput
    /**
     * Limit how many Migrations to update.
     */
    limit?: number
  }

  /**
   * Migration upsert
   */
  export type MigrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * The filter to search for the Migration to update in case it exists.
     */
    where: MigrationWhereUniqueInput
    /**
     * In case the Migration found by the `where` argument doesn't exist, create a new Migration with this data.
     */
    create: XOR<MigrationCreateInput, MigrationUncheckedCreateInput>
    /**
     * In case the Migration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MigrationUpdateInput, MigrationUncheckedUpdateInput>
  }

  /**
   * Migration delete
   */
  export type MigrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
    /**
     * Filter which Migration to delete.
     */
    where: MigrationWhereUniqueInput
  }

  /**
   * Migration deleteMany
   */
  export type MigrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Migrations to delete
     */
    where?: MigrationWhereInput
    /**
     * Limit how many Migrations to delete.
     */
    limit?: number
  }

  /**
   * Migration without action
   */
  export type MigrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Migration
     */
    select?: MigrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Migration
     */
    omit?: MigrationOmit<ExtArgs> | null
  }


  /**
   * Model SystemConfig
   */

  export type AggregateSystemConfig = {
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  export type SystemConfigMinAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigMaxAggregateOutputType = {
    id: string | null
    key: string | null
    description: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemConfigCountAggregateOutputType = {
    id: number
    key: number
    value: number
    description: number
    category: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemConfigMinAggregateInputType = {
    id?: true
    key?: true
    description?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigMaxAggregateInputType = {
    id?: true
    key?: true
    description?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemConfigCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfig to aggregate.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemConfigs
    **/
    _count?: true | SystemConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemConfigMaxAggregateInputType
  }

  export type GetSystemConfigAggregateType<T extends SystemConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemConfig[P]>
      : GetScalarType<T[P], AggregateSystemConfig[P]>
  }




  export type SystemConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemConfigWhereInput
    orderBy?: SystemConfigOrderByWithAggregationInput | SystemConfigOrderByWithAggregationInput[]
    by: SystemConfigScalarFieldEnum[] | SystemConfigScalarFieldEnum
    having?: SystemConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemConfigCountAggregateInputType | true
    _min?: SystemConfigMinAggregateInputType
    _max?: SystemConfigMaxAggregateInputType
  }

  export type SystemConfigGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    description: string | null
    category: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SystemConfigCountAggregateOutputType | null
    _min: SystemConfigMinAggregateOutputType | null
    _max: SystemConfigMaxAggregateOutputType | null
  }

  type GetSystemConfigGroupByPayload<T extends SystemConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
            : GetScalarType<T[P], SystemConfigGroupByOutputType[P]>
        }
      >
    >


  export type SystemConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemConfig"]>

  export type SystemConfigSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SystemConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "description" | "category" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["systemConfig"]>

  export type $SystemConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      description: string | null
      category: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemConfig"]>
    composites: {}
  }

  type SystemConfigGetPayload<S extends boolean | null | undefined | SystemConfigDefaultArgs> = $Result.GetResult<Prisma.$SystemConfigPayload, S>

  type SystemConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemConfigCountAggregateInputType | true
    }

  export interface SystemConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemConfig'], meta: { name: 'SystemConfig' } }
    /**
     * Find zero or one SystemConfig that matches the filter.
     * @param {SystemConfigFindUniqueArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemConfigFindUniqueArgs>(args: SelectSubset<T, SystemConfigFindUniqueArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemConfigFindUniqueOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemConfigFindFirstArgs>(args?: SelectSubset<T, SystemConfigFindFirstArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindFirstOrThrowArgs} args - Arguments to find a SystemConfig
     * @example
     * // Get one SystemConfig
     * const systemConfig = await prisma.systemConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany()
     * 
     * // Get first 10 SystemConfigs
     * const systemConfigs = await prisma.systemConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemConfigFindManyArgs>(args?: SelectSubset<T, SystemConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemConfig.
     * @param {SystemConfigCreateArgs} args - Arguments to create a SystemConfig.
     * @example
     * // Create one SystemConfig
     * const SystemConfig = await prisma.systemConfig.create({
     *   data: {
     *     // ... data to create a SystemConfig
     *   }
     * })
     * 
     */
    create<T extends SystemConfigCreateArgs>(args: SelectSubset<T, SystemConfigCreateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemConfigs.
     * @param {SystemConfigCreateManyArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemConfigCreateManyArgs>(args?: SelectSubset<T, SystemConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemConfigs and returns the data saved in the database.
     * @param {SystemConfigCreateManyAndReturnArgs} args - Arguments to create many SystemConfigs.
     * @example
     * // Create many SystemConfigs
     * const systemConfig = await prisma.systemConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemConfig.
     * @param {SystemConfigDeleteArgs} args - Arguments to delete one SystemConfig.
     * @example
     * // Delete one SystemConfig
     * const SystemConfig = await prisma.systemConfig.delete({
     *   where: {
     *     // ... filter to delete one SystemConfig
     *   }
     * })
     * 
     */
    delete<T extends SystemConfigDeleteArgs>(args: SelectSubset<T, SystemConfigDeleteArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemConfig.
     * @param {SystemConfigUpdateArgs} args - Arguments to update one SystemConfig.
     * @example
     * // Update one SystemConfig
     * const systemConfig = await prisma.systemConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemConfigUpdateArgs>(args: SelectSubset<T, SystemConfigUpdateArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemConfigs.
     * @param {SystemConfigDeleteManyArgs} args - Arguments to filter SystemConfigs to delete.
     * @example
     * // Delete a few SystemConfigs
     * const { count } = await prisma.systemConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemConfigDeleteManyArgs>(args?: SelectSubset<T, SystemConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemConfigUpdateManyArgs>(args: SelectSubset<T, SystemConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemConfigs and returns the data updated in the database.
     * @param {SystemConfigUpdateManyAndReturnArgs} args - Arguments to update many SystemConfigs.
     * @example
     * // Update many SystemConfigs
     * const systemConfig = await prisma.systemConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemConfigs and only return the `id`
     * const systemConfigWithIdOnly = await prisma.systemConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SystemConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemConfig.
     * @param {SystemConfigUpsertArgs} args - Arguments to update or create a SystemConfig.
     * @example
     * // Update or create a SystemConfig
     * const systemConfig = await prisma.systemConfig.upsert({
     *   create: {
     *     // ... data to create a SystemConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemConfig we want to update
     *   }
     * })
     */
    upsert<T extends SystemConfigUpsertArgs>(args: SelectSubset<T, SystemConfigUpsertArgs<ExtArgs>>): Prisma__SystemConfigClient<$Result.GetResult<Prisma.$SystemConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigCountArgs} args - Arguments to filter SystemConfigs to count.
     * @example
     * // Count the number of SystemConfigs
     * const count = await prisma.systemConfig.count({
     *   where: {
     *     // ... the filter for the SystemConfigs we want to count
     *   }
     * })
    **/
    count<T extends SystemConfigCountArgs>(
      args?: Subset<T, SystemConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemConfigAggregateArgs>(args: Subset<T, SystemConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAggregateType<T>>

    /**
     * Group by SystemConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemConfigGroupByArgs['orderBy'] }
        : { orderBy?: SystemConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemConfig model
   */
  readonly fields: SystemConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemConfig model
   */
  interface SystemConfigFieldRefs {
    readonly id: FieldRef<"SystemConfig", 'String'>
    readonly key: FieldRef<"SystemConfig", 'String'>
    readonly value: FieldRef<"SystemConfig", 'Json'>
    readonly description: FieldRef<"SystemConfig", 'String'>
    readonly category: FieldRef<"SystemConfig", 'String'>
    readonly isActive: FieldRef<"SystemConfig", 'Boolean'>
    readonly createdAt: FieldRef<"SystemConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemConfig findUnique
   */
  export type SystemConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findUniqueOrThrow
   */
  export type SystemConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig findFirst
   */
  export type SystemConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findFirstOrThrow
   */
  export type SystemConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfig to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemConfigs.
     */
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig findMany
   */
  export type SystemConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter, which SystemConfigs to fetch.
     */
    where?: SystemConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemConfigs to fetch.
     */
    orderBy?: SystemConfigOrderByWithRelationInput | SystemConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemConfigs.
     */
    cursor?: SystemConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemConfigs.
     */
    skip?: number
    distinct?: SystemConfigScalarFieldEnum | SystemConfigScalarFieldEnum[]
  }

  /**
   * SystemConfig create
   */
  export type SystemConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a SystemConfig.
     */
    data: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
  }

  /**
   * SystemConfig createMany
   */
  export type SystemConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig createManyAndReturn
   */
  export type SystemConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to create many SystemConfigs.
     */
    data: SystemConfigCreateManyInput | SystemConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemConfig update
   */
  export type SystemConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a SystemConfig.
     */
    data: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
    /**
     * Choose, which SystemConfig to update.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig updateMany
   */
  export type SystemConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig updateManyAndReturn
   */
  export type SystemConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The data used to update SystemConfigs.
     */
    data: XOR<SystemConfigUpdateManyMutationInput, SystemConfigUncheckedUpdateManyInput>
    /**
     * Filter which SystemConfigs to update
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to update.
     */
    limit?: number
  }

  /**
   * SystemConfig upsert
   */
  export type SystemConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the SystemConfig to update in case it exists.
     */
    where: SystemConfigWhereUniqueInput
    /**
     * In case the SystemConfig found by the `where` argument doesn't exist, create a new SystemConfig with this data.
     */
    create: XOR<SystemConfigCreateInput, SystemConfigUncheckedCreateInput>
    /**
     * In case the SystemConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemConfigUpdateInput, SystemConfigUncheckedUpdateInput>
  }

  /**
   * SystemConfig delete
   */
  export type SystemConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
    /**
     * Filter which SystemConfig to delete.
     */
    where: SystemConfigWhereUniqueInput
  }

  /**
   * SystemConfig deleteMany
   */
  export type SystemConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemConfigs to delete
     */
    where?: SystemConfigWhereInput
    /**
     * Limit how many SystemConfigs to delete.
     */
    limit?: number
  }

  /**
   * SystemConfig without action
   */
  export type SystemConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemConfig
     */
    select?: SystemConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemConfig
     */
    omit?: SystemConfigOmit<ExtArgs> | null
  }


  /**
   * Model VideoEmbedding
   */

  export type AggregateVideoEmbedding = {
    _count: VideoEmbeddingCountAggregateOutputType | null
    _avg: VideoEmbeddingAvgAggregateOutputType | null
    _sum: VideoEmbeddingSumAggregateOutputType | null
    _min: VideoEmbeddingMinAggregateOutputType | null
    _max: VideoEmbeddingMaxAggregateOutputType | null
  }

  export type VideoEmbeddingAvgAggregateOutputType = {
    duration: number | null
    qualityScore: number | null
  }

  export type VideoEmbeddingSumAggregateOutputType = {
    duration: number | null
    qualityScore: number | null
  }

  export type VideoEmbeddingMinAggregateOutputType = {
    id: string | null
    platformId: string | null
    platform: string | null
    title: string | null
    description: string | null
    category: string | null
    duration: number | null
    publishedAt: Date | null
    channelId: string | null
    channelName: string | null
    embeddingModel: string | null
    embeddingVersion: string | null
    processingStatus: $Enums.EmbeddingStatus | null
    qualityScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastProcessedAt: Date | null
  }

  export type VideoEmbeddingMaxAggregateOutputType = {
    id: string | null
    platformId: string | null
    platform: string | null
    title: string | null
    description: string | null
    category: string | null
    duration: number | null
    publishedAt: Date | null
    channelId: string | null
    channelName: string | null
    embeddingModel: string | null
    embeddingVersion: string | null
    processingStatus: $Enums.EmbeddingStatus | null
    qualityScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
    lastProcessedAt: Date | null
  }

  export type VideoEmbeddingCountAggregateOutputType = {
    id: number
    platformId: number
    platform: number
    title: number
    description: number
    tags: number
    category: number
    duration: number
    publishedAt: number
    channelId: number
    channelName: number
    embeddingModel: number
    embeddingVersion: number
    processingStatus: number
    qualityScore: number
    createdAt: number
    updatedAt: number
    lastProcessedAt: number
    _all: number
  }


  export type VideoEmbeddingAvgAggregateInputType = {
    duration?: true
    qualityScore?: true
  }

  export type VideoEmbeddingSumAggregateInputType = {
    duration?: true
    qualityScore?: true
  }

  export type VideoEmbeddingMinAggregateInputType = {
    id?: true
    platformId?: true
    platform?: true
    title?: true
    description?: true
    category?: true
    duration?: true
    publishedAt?: true
    channelId?: true
    channelName?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    qualityScore?: true
    createdAt?: true
    updatedAt?: true
    lastProcessedAt?: true
  }

  export type VideoEmbeddingMaxAggregateInputType = {
    id?: true
    platformId?: true
    platform?: true
    title?: true
    description?: true
    category?: true
    duration?: true
    publishedAt?: true
    channelId?: true
    channelName?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    qualityScore?: true
    createdAt?: true
    updatedAt?: true
    lastProcessedAt?: true
  }

  export type VideoEmbeddingCountAggregateInputType = {
    id?: true
    platformId?: true
    platform?: true
    title?: true
    description?: true
    tags?: true
    category?: true
    duration?: true
    publishedAt?: true
    channelId?: true
    channelName?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    qualityScore?: true
    createdAt?: true
    updatedAt?: true
    lastProcessedAt?: true
    _all?: true
  }

  export type VideoEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoEmbedding to aggregate.
     */
    where?: VideoEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoEmbeddings to fetch.
     */
    orderBy?: VideoEmbeddingOrderByWithRelationInput | VideoEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VideoEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VideoEmbeddings
    **/
    _count?: true | VideoEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VideoEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VideoEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VideoEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VideoEmbeddingMaxAggregateInputType
  }

  export type GetVideoEmbeddingAggregateType<T extends VideoEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateVideoEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVideoEmbedding[P]>
      : GetScalarType<T[P], AggregateVideoEmbedding[P]>
  }




  export type VideoEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VideoEmbeddingWhereInput
    orderBy?: VideoEmbeddingOrderByWithAggregationInput | VideoEmbeddingOrderByWithAggregationInput[]
    by: VideoEmbeddingScalarFieldEnum[] | VideoEmbeddingScalarFieldEnum
    having?: VideoEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VideoEmbeddingCountAggregateInputType | true
    _avg?: VideoEmbeddingAvgAggregateInputType
    _sum?: VideoEmbeddingSumAggregateInputType
    _min?: VideoEmbeddingMinAggregateInputType
    _max?: VideoEmbeddingMaxAggregateInputType
  }

  export type VideoEmbeddingGroupByOutputType = {
    id: string
    platformId: string
    platform: string
    title: string | null
    description: string | null
    tags: string[]
    category: string | null
    duration: number | null
    publishedAt: Date | null
    channelId: string | null
    channelName: string | null
    embeddingModel: string
    embeddingVersion: string
    processingStatus: $Enums.EmbeddingStatus
    qualityScore: number | null
    createdAt: Date
    updatedAt: Date
    lastProcessedAt: Date | null
    _count: VideoEmbeddingCountAggregateOutputType | null
    _avg: VideoEmbeddingAvgAggregateOutputType | null
    _sum: VideoEmbeddingSumAggregateOutputType | null
    _min: VideoEmbeddingMinAggregateOutputType | null
    _max: VideoEmbeddingMaxAggregateOutputType | null
  }

  type GetVideoEmbeddingGroupByPayload<T extends VideoEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VideoEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VideoEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VideoEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], VideoEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type VideoEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformId?: boolean
    platform?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    category?: boolean
    duration?: boolean
    publishedAt?: boolean
    channelId?: boolean
    channelName?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    qualityScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastProcessedAt?: boolean
  }, ExtArgs["result"]["videoEmbedding"]>


  export type VideoEmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformId?: boolean
    platform?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    category?: boolean
    duration?: boolean
    publishedAt?: boolean
    channelId?: boolean
    channelName?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    qualityScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastProcessedAt?: boolean
  }, ExtArgs["result"]["videoEmbedding"]>

  export type VideoEmbeddingSelectScalar = {
    id?: boolean
    platformId?: boolean
    platform?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    category?: boolean
    duration?: boolean
    publishedAt?: boolean
    channelId?: boolean
    channelName?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    qualityScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastProcessedAt?: boolean
  }

  export type VideoEmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "platformId" | "platform" | "title" | "description" | "tags" | "category" | "duration" | "publishedAt" | "channelId" | "channelName" | "embeddingModel" | "embeddingVersion" | "processingStatus" | "qualityScore" | "createdAt" | "updatedAt" | "lastProcessedAt", ExtArgs["result"]["videoEmbedding"]>

  export type $VideoEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VideoEmbedding"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      platformId: string
      platform: string
      title: string | null
      description: string | null
      tags: string[]
      category: string | null
      duration: number | null
      publishedAt: Date | null
      channelId: string | null
      channelName: string | null
      embeddingModel: string
      embeddingVersion: string
      processingStatus: $Enums.EmbeddingStatus
      qualityScore: number | null
      createdAt: Date
      updatedAt: Date
      lastProcessedAt: Date | null
    }, ExtArgs["result"]["videoEmbedding"]>
    composites: {}
  }

  type VideoEmbeddingGetPayload<S extends boolean | null | undefined | VideoEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$VideoEmbeddingPayload, S>

  type VideoEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VideoEmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VideoEmbeddingCountAggregateInputType | true
    }

  export interface VideoEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VideoEmbedding'], meta: { name: 'VideoEmbedding' } }
    /**
     * Find zero or one VideoEmbedding that matches the filter.
     * @param {VideoEmbeddingFindUniqueArgs} args - Arguments to find a VideoEmbedding
     * @example
     * // Get one VideoEmbedding
     * const videoEmbedding = await prisma.videoEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VideoEmbeddingFindUniqueArgs>(args: SelectSubset<T, VideoEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__VideoEmbeddingClient<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VideoEmbedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VideoEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a VideoEmbedding
     * @example
     * // Get one VideoEmbedding
     * const videoEmbedding = await prisma.videoEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VideoEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, VideoEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VideoEmbeddingClient<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoEmbeddingFindFirstArgs} args - Arguments to find a VideoEmbedding
     * @example
     * // Get one VideoEmbedding
     * const videoEmbedding = await prisma.videoEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VideoEmbeddingFindFirstArgs>(args?: SelectSubset<T, VideoEmbeddingFindFirstArgs<ExtArgs>>): Prisma__VideoEmbeddingClient<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VideoEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoEmbeddingFindFirstOrThrowArgs} args - Arguments to find a VideoEmbedding
     * @example
     * // Get one VideoEmbedding
     * const videoEmbedding = await prisma.videoEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VideoEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, VideoEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__VideoEmbeddingClient<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VideoEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VideoEmbeddings
     * const videoEmbeddings = await prisma.videoEmbedding.findMany()
     * 
     * // Get first 10 VideoEmbeddings
     * const videoEmbeddings = await prisma.videoEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const videoEmbeddingWithIdOnly = await prisma.videoEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VideoEmbeddingFindManyArgs>(args?: SelectSubset<T, VideoEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a VideoEmbedding.
     * @param {VideoEmbeddingDeleteArgs} args - Arguments to delete one VideoEmbedding.
     * @example
     * // Delete one VideoEmbedding
     * const VideoEmbedding = await prisma.videoEmbedding.delete({
     *   where: {
     *     // ... filter to delete one VideoEmbedding
     *   }
     * })
     * 
     */
    delete<T extends VideoEmbeddingDeleteArgs>(args: SelectSubset<T, VideoEmbeddingDeleteArgs<ExtArgs>>): Prisma__VideoEmbeddingClient<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VideoEmbedding.
     * @param {VideoEmbeddingUpdateArgs} args - Arguments to update one VideoEmbedding.
     * @example
     * // Update one VideoEmbedding
     * const videoEmbedding = await prisma.videoEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VideoEmbeddingUpdateArgs>(args: SelectSubset<T, VideoEmbeddingUpdateArgs<ExtArgs>>): Prisma__VideoEmbeddingClient<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VideoEmbeddings.
     * @param {VideoEmbeddingDeleteManyArgs} args - Arguments to filter VideoEmbeddings to delete.
     * @example
     * // Delete a few VideoEmbeddings
     * const { count } = await prisma.videoEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VideoEmbeddingDeleteManyArgs>(args?: SelectSubset<T, VideoEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VideoEmbeddings
     * const videoEmbedding = await prisma.videoEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VideoEmbeddingUpdateManyArgs>(args: SelectSubset<T, VideoEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VideoEmbeddings and returns the data updated in the database.
     * @param {VideoEmbeddingUpdateManyAndReturnArgs} args - Arguments to update many VideoEmbeddings.
     * @example
     * // Update many VideoEmbeddings
     * const videoEmbedding = await prisma.videoEmbedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VideoEmbeddings and only return the `id`
     * const videoEmbeddingWithIdOnly = await prisma.videoEmbedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VideoEmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, VideoEmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VideoEmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of VideoEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoEmbeddingCountArgs} args - Arguments to filter VideoEmbeddings to count.
     * @example
     * // Count the number of VideoEmbeddings
     * const count = await prisma.videoEmbedding.count({
     *   where: {
     *     // ... the filter for the VideoEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends VideoEmbeddingCountArgs>(
      args?: Subset<T, VideoEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VideoEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VideoEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VideoEmbeddingAggregateArgs>(args: Subset<T, VideoEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetVideoEmbeddingAggregateType<T>>

    /**
     * Group by VideoEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VideoEmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VideoEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VideoEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: VideoEmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VideoEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVideoEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VideoEmbedding model
   */
  readonly fields: VideoEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VideoEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VideoEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VideoEmbedding model
   */
  interface VideoEmbeddingFieldRefs {
    readonly id: FieldRef<"VideoEmbedding", 'String'>
    readonly platformId: FieldRef<"VideoEmbedding", 'String'>
    readonly platform: FieldRef<"VideoEmbedding", 'String'>
    readonly title: FieldRef<"VideoEmbedding", 'String'>
    readonly description: FieldRef<"VideoEmbedding", 'String'>
    readonly tags: FieldRef<"VideoEmbedding", 'String[]'>
    readonly category: FieldRef<"VideoEmbedding", 'String'>
    readonly duration: FieldRef<"VideoEmbedding", 'Int'>
    readonly publishedAt: FieldRef<"VideoEmbedding", 'DateTime'>
    readonly channelId: FieldRef<"VideoEmbedding", 'String'>
    readonly channelName: FieldRef<"VideoEmbedding", 'String'>
    readonly embeddingModel: FieldRef<"VideoEmbedding", 'String'>
    readonly embeddingVersion: FieldRef<"VideoEmbedding", 'String'>
    readonly processingStatus: FieldRef<"VideoEmbedding", 'EmbeddingStatus'>
    readonly qualityScore: FieldRef<"VideoEmbedding", 'Float'>
    readonly createdAt: FieldRef<"VideoEmbedding", 'DateTime'>
    readonly updatedAt: FieldRef<"VideoEmbedding", 'DateTime'>
    readonly lastProcessedAt: FieldRef<"VideoEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VideoEmbedding findUnique
   */
  export type VideoEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which VideoEmbedding to fetch.
     */
    where: VideoEmbeddingWhereUniqueInput
  }

  /**
   * VideoEmbedding findUniqueOrThrow
   */
  export type VideoEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which VideoEmbedding to fetch.
     */
    where: VideoEmbeddingWhereUniqueInput
  }

  /**
   * VideoEmbedding findFirst
   */
  export type VideoEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which VideoEmbedding to fetch.
     */
    where?: VideoEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoEmbeddings to fetch.
     */
    orderBy?: VideoEmbeddingOrderByWithRelationInput | VideoEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoEmbeddings.
     */
    cursor?: VideoEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoEmbeddings.
     */
    distinct?: VideoEmbeddingScalarFieldEnum | VideoEmbeddingScalarFieldEnum[]
  }

  /**
   * VideoEmbedding findFirstOrThrow
   */
  export type VideoEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which VideoEmbedding to fetch.
     */
    where?: VideoEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoEmbeddings to fetch.
     */
    orderBy?: VideoEmbeddingOrderByWithRelationInput | VideoEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VideoEmbeddings.
     */
    cursor?: VideoEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VideoEmbeddings.
     */
    distinct?: VideoEmbeddingScalarFieldEnum | VideoEmbeddingScalarFieldEnum[]
  }

  /**
   * VideoEmbedding findMany
   */
  export type VideoEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which VideoEmbeddings to fetch.
     */
    where?: VideoEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VideoEmbeddings to fetch.
     */
    orderBy?: VideoEmbeddingOrderByWithRelationInput | VideoEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VideoEmbeddings.
     */
    cursor?: VideoEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VideoEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VideoEmbeddings.
     */
    skip?: number
    distinct?: VideoEmbeddingScalarFieldEnum | VideoEmbeddingScalarFieldEnum[]
  }

  /**
   * VideoEmbedding update
   */
  export type VideoEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * The data needed to update a VideoEmbedding.
     */
    data: XOR<VideoEmbeddingUpdateInput, VideoEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which VideoEmbedding to update.
     */
    where: VideoEmbeddingWhereUniqueInput
  }

  /**
   * VideoEmbedding updateMany
   */
  export type VideoEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VideoEmbeddings.
     */
    data: XOR<VideoEmbeddingUpdateManyMutationInput, VideoEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which VideoEmbeddings to update
     */
    where?: VideoEmbeddingWhereInput
    /**
     * Limit how many VideoEmbeddings to update.
     */
    limit?: number
  }

  /**
   * VideoEmbedding updateManyAndReturn
   */
  export type VideoEmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update VideoEmbeddings.
     */
    data: XOR<VideoEmbeddingUpdateManyMutationInput, VideoEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which VideoEmbeddings to update
     */
    where?: VideoEmbeddingWhereInput
    /**
     * Limit how many VideoEmbeddings to update.
     */
    limit?: number
  }

  /**
   * VideoEmbedding delete
   */
  export type VideoEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
    /**
     * Filter which VideoEmbedding to delete.
     */
    where: VideoEmbeddingWhereUniqueInput
  }

  /**
   * VideoEmbedding deleteMany
   */
  export type VideoEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VideoEmbeddings to delete
     */
    where?: VideoEmbeddingWhereInput
    /**
     * Limit how many VideoEmbeddings to delete.
     */
    limit?: number
  }

  /**
   * VideoEmbedding without action
   */
  export type VideoEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VideoEmbedding
     */
    select?: VideoEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VideoEmbedding
     */
    omit?: VideoEmbeddingOmit<ExtArgs> | null
  }


  /**
   * Model UserEmbedding
   */

  export type AggregateUserEmbedding = {
    _count: UserEmbeddingCountAggregateOutputType | null
    _avg: UserEmbeddingAvgAggregateOutputType | null
    _sum: UserEmbeddingSumAggregateOutputType | null
    _min: UserEmbeddingMinAggregateOutputType | null
    _max: UserEmbeddingMaxAggregateOutputType | null
  }

  export type UserEmbeddingAvgAggregateOutputType = {
    confidenceScore: number | null
    interactionCount: number | null
    lastUpdateThreshold: number | null
  }

  export type UserEmbeddingSumAggregateOutputType = {
    confidenceScore: number | null
    interactionCount: number | null
    lastUpdateThreshold: number | null
  }

  export type UserEmbeddingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    confidenceScore: number | null
    interactionCount: number | null
    lastUpdateThreshold: number | null
    embeddingModel: string | null
    embeddingVersion: string | null
    processingStatus: $Enums.EmbeddingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    lastCalculatedAt: Date | null
  }

  export type UserEmbeddingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    confidenceScore: number | null
    interactionCount: number | null
    lastUpdateThreshold: number | null
    embeddingModel: string | null
    embeddingVersion: string | null
    processingStatus: $Enums.EmbeddingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    lastCalculatedAt: Date | null
  }

  export type UserEmbeddingCountAggregateOutputType = {
    id: number
    userId: number
    confidenceScore: number
    interactionCount: number
    lastUpdateThreshold: number
    embeddingModel: number
    embeddingVersion: number
    processingStatus: number
    createdAt: number
    updatedAt: number
    lastCalculatedAt: number
    _all: number
  }


  export type UserEmbeddingAvgAggregateInputType = {
    confidenceScore?: true
    interactionCount?: true
    lastUpdateThreshold?: true
  }

  export type UserEmbeddingSumAggregateInputType = {
    confidenceScore?: true
    interactionCount?: true
    lastUpdateThreshold?: true
  }

  export type UserEmbeddingMinAggregateInputType = {
    id?: true
    userId?: true
    confidenceScore?: true
    interactionCount?: true
    lastUpdateThreshold?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    createdAt?: true
    updatedAt?: true
    lastCalculatedAt?: true
  }

  export type UserEmbeddingMaxAggregateInputType = {
    id?: true
    userId?: true
    confidenceScore?: true
    interactionCount?: true
    lastUpdateThreshold?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    createdAt?: true
    updatedAt?: true
    lastCalculatedAt?: true
  }

  export type UserEmbeddingCountAggregateInputType = {
    id?: true
    userId?: true
    confidenceScore?: true
    interactionCount?: true
    lastUpdateThreshold?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    createdAt?: true
    updatedAt?: true
    lastCalculatedAt?: true
    _all?: true
  }

  export type UserEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEmbedding to aggregate.
     */
    where?: UserEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmbeddings to fetch.
     */
    orderBy?: UserEmbeddingOrderByWithRelationInput | UserEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserEmbeddings
    **/
    _count?: true | UserEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserEmbeddingMaxAggregateInputType
  }

  export type GetUserEmbeddingAggregateType<T extends UserEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateUserEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserEmbedding[P]>
      : GetScalarType<T[P], AggregateUserEmbedding[P]>
  }




  export type UserEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEmbeddingWhereInput
    orderBy?: UserEmbeddingOrderByWithAggregationInput | UserEmbeddingOrderByWithAggregationInput[]
    by: UserEmbeddingScalarFieldEnum[] | UserEmbeddingScalarFieldEnum
    having?: UserEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserEmbeddingCountAggregateInputType | true
    _avg?: UserEmbeddingAvgAggregateInputType
    _sum?: UserEmbeddingSumAggregateInputType
    _min?: UserEmbeddingMinAggregateInputType
    _max?: UserEmbeddingMaxAggregateInputType
  }

  export type UserEmbeddingGroupByOutputType = {
    id: string
    userId: string
    confidenceScore: number
    interactionCount: number
    lastUpdateThreshold: number
    embeddingModel: string
    embeddingVersion: string
    processingStatus: $Enums.EmbeddingStatus
    createdAt: Date
    updatedAt: Date
    lastCalculatedAt: Date | null
    _count: UserEmbeddingCountAggregateOutputType | null
    _avg: UserEmbeddingAvgAggregateOutputType | null
    _sum: UserEmbeddingSumAggregateOutputType | null
    _min: UserEmbeddingMinAggregateOutputType | null
    _max: UserEmbeddingMaxAggregateOutputType | null
  }

  type GetUserEmbeddingGroupByPayload<T extends UserEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], UserEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type UserEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    confidenceScore?: boolean
    interactionCount?: boolean
    lastUpdateThreshold?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastCalculatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEmbedding"]>


  export type UserEmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    confidenceScore?: boolean
    interactionCount?: boolean
    lastUpdateThreshold?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastCalculatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEmbedding"]>

  export type UserEmbeddingSelectScalar = {
    id?: boolean
    userId?: boolean
    confidenceScore?: boolean
    interactionCount?: boolean
    lastUpdateThreshold?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastCalculatedAt?: boolean
  }

  export type UserEmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "confidenceScore" | "interactionCount" | "lastUpdateThreshold" | "embeddingModel" | "embeddingVersion" | "processingStatus" | "createdAt" | "updatedAt" | "lastCalculatedAt", ExtArgs["result"]["userEmbedding"]>
  export type UserEmbeddingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserEmbeddingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserEmbedding"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      confidenceScore: number
      interactionCount: number
      lastUpdateThreshold: number
      embeddingModel: string
      embeddingVersion: string
      processingStatus: $Enums.EmbeddingStatus
      createdAt: Date
      updatedAt: Date
      lastCalculatedAt: Date | null
    }, ExtArgs["result"]["userEmbedding"]>
    composites: {}
  }

  type UserEmbeddingGetPayload<S extends boolean | null | undefined | UserEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$UserEmbeddingPayload, S>

  type UserEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserEmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserEmbeddingCountAggregateInputType | true
    }

  export interface UserEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserEmbedding'], meta: { name: 'UserEmbedding' } }
    /**
     * Find zero or one UserEmbedding that matches the filter.
     * @param {UserEmbeddingFindUniqueArgs} args - Arguments to find a UserEmbedding
     * @example
     * // Get one UserEmbedding
     * const userEmbedding = await prisma.userEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserEmbeddingFindUniqueArgs>(args: SelectSubset<T, UserEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__UserEmbeddingClient<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserEmbedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a UserEmbedding
     * @example
     * // Get one UserEmbedding
     * const userEmbedding = await prisma.userEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, UserEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserEmbeddingClient<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmbeddingFindFirstArgs} args - Arguments to find a UserEmbedding
     * @example
     * // Get one UserEmbedding
     * const userEmbedding = await prisma.userEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserEmbeddingFindFirstArgs>(args?: SelectSubset<T, UserEmbeddingFindFirstArgs<ExtArgs>>): Prisma__UserEmbeddingClient<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmbeddingFindFirstOrThrowArgs} args - Arguments to find a UserEmbedding
     * @example
     * // Get one UserEmbedding
     * const userEmbedding = await prisma.userEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, UserEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserEmbeddingClient<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserEmbeddings
     * const userEmbeddings = await prisma.userEmbedding.findMany()
     * 
     * // Get first 10 UserEmbeddings
     * const userEmbeddings = await prisma.userEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userEmbeddingWithIdOnly = await prisma.userEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserEmbeddingFindManyArgs>(args?: SelectSubset<T, UserEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a UserEmbedding.
     * @param {UserEmbeddingDeleteArgs} args - Arguments to delete one UserEmbedding.
     * @example
     * // Delete one UserEmbedding
     * const UserEmbedding = await prisma.userEmbedding.delete({
     *   where: {
     *     // ... filter to delete one UserEmbedding
     *   }
     * })
     * 
     */
    delete<T extends UserEmbeddingDeleteArgs>(args: SelectSubset<T, UserEmbeddingDeleteArgs<ExtArgs>>): Prisma__UserEmbeddingClient<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserEmbedding.
     * @param {UserEmbeddingUpdateArgs} args - Arguments to update one UserEmbedding.
     * @example
     * // Update one UserEmbedding
     * const userEmbedding = await prisma.userEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserEmbeddingUpdateArgs>(args: SelectSubset<T, UserEmbeddingUpdateArgs<ExtArgs>>): Prisma__UserEmbeddingClient<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserEmbeddings.
     * @param {UserEmbeddingDeleteManyArgs} args - Arguments to filter UserEmbeddings to delete.
     * @example
     * // Delete a few UserEmbeddings
     * const { count } = await prisma.userEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserEmbeddingDeleteManyArgs>(args?: SelectSubset<T, UserEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserEmbeddings
     * const userEmbedding = await prisma.userEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserEmbeddingUpdateManyArgs>(args: SelectSubset<T, UserEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEmbeddings and returns the data updated in the database.
     * @param {UserEmbeddingUpdateManyAndReturnArgs} args - Arguments to update many UserEmbeddings.
     * @example
     * // Update many UserEmbeddings
     * const userEmbedding = await prisma.userEmbedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserEmbeddings and only return the `id`
     * const userEmbeddingWithIdOnly = await prisma.userEmbedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserEmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, UserEmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of UserEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmbeddingCountArgs} args - Arguments to filter UserEmbeddings to count.
     * @example
     * // Count the number of UserEmbeddings
     * const count = await prisma.userEmbedding.count({
     *   where: {
     *     // ... the filter for the UserEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends UserEmbeddingCountArgs>(
      args?: Subset<T, UserEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserEmbeddingAggregateArgs>(args: Subset<T, UserEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetUserEmbeddingAggregateType<T>>

    /**
     * Group by UserEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: UserEmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserEmbedding model
   */
  readonly fields: UserEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserEmbedding model
   */
  interface UserEmbeddingFieldRefs {
    readonly id: FieldRef<"UserEmbedding", 'String'>
    readonly userId: FieldRef<"UserEmbedding", 'String'>
    readonly confidenceScore: FieldRef<"UserEmbedding", 'Float'>
    readonly interactionCount: FieldRef<"UserEmbedding", 'Int'>
    readonly lastUpdateThreshold: FieldRef<"UserEmbedding", 'Int'>
    readonly embeddingModel: FieldRef<"UserEmbedding", 'String'>
    readonly embeddingVersion: FieldRef<"UserEmbedding", 'String'>
    readonly processingStatus: FieldRef<"UserEmbedding", 'EmbeddingStatus'>
    readonly createdAt: FieldRef<"UserEmbedding", 'DateTime'>
    readonly updatedAt: FieldRef<"UserEmbedding", 'DateTime'>
    readonly lastCalculatedAt: FieldRef<"UserEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserEmbedding findUnique
   */
  export type UserEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which UserEmbedding to fetch.
     */
    where: UserEmbeddingWhereUniqueInput
  }

  /**
   * UserEmbedding findUniqueOrThrow
   */
  export type UserEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which UserEmbedding to fetch.
     */
    where: UserEmbeddingWhereUniqueInput
  }

  /**
   * UserEmbedding findFirst
   */
  export type UserEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which UserEmbedding to fetch.
     */
    where?: UserEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmbeddings to fetch.
     */
    orderBy?: UserEmbeddingOrderByWithRelationInput | UserEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEmbeddings.
     */
    cursor?: UserEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEmbeddings.
     */
    distinct?: UserEmbeddingScalarFieldEnum | UserEmbeddingScalarFieldEnum[]
  }

  /**
   * UserEmbedding findFirstOrThrow
   */
  export type UserEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which UserEmbedding to fetch.
     */
    where?: UserEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmbeddings to fetch.
     */
    orderBy?: UserEmbeddingOrderByWithRelationInput | UserEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEmbeddings.
     */
    cursor?: UserEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEmbeddings.
     */
    distinct?: UserEmbeddingScalarFieldEnum | UserEmbeddingScalarFieldEnum[]
  }

  /**
   * UserEmbedding findMany
   */
  export type UserEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which UserEmbeddings to fetch.
     */
    where?: UserEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmbeddings to fetch.
     */
    orderBy?: UserEmbeddingOrderByWithRelationInput | UserEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserEmbeddings.
     */
    cursor?: UserEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmbeddings.
     */
    skip?: number
    distinct?: UserEmbeddingScalarFieldEnum | UserEmbeddingScalarFieldEnum[]
  }

  /**
   * UserEmbedding update
   */
  export type UserEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to update a UserEmbedding.
     */
    data: XOR<UserEmbeddingUpdateInput, UserEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which UserEmbedding to update.
     */
    where: UserEmbeddingWhereUniqueInput
  }

  /**
   * UserEmbedding updateMany
   */
  export type UserEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserEmbeddings.
     */
    data: XOR<UserEmbeddingUpdateManyMutationInput, UserEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which UserEmbeddings to update
     */
    where?: UserEmbeddingWhereInput
    /**
     * Limit how many UserEmbeddings to update.
     */
    limit?: number
  }

  /**
   * UserEmbedding updateManyAndReturn
   */
  export type UserEmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update UserEmbeddings.
     */
    data: XOR<UserEmbeddingUpdateManyMutationInput, UserEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which UserEmbeddings to update
     */
    where?: UserEmbeddingWhereInput
    /**
     * Limit how many UserEmbeddings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserEmbedding delete
   */
  export type UserEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
    /**
     * Filter which UserEmbedding to delete.
     */
    where: UserEmbeddingWhereUniqueInput
  }

  /**
   * UserEmbedding deleteMany
   */
  export type UserEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEmbeddings to delete
     */
    where?: UserEmbeddingWhereInput
    /**
     * Limit how many UserEmbeddings to delete.
     */
    limit?: number
  }

  /**
   * UserEmbedding without action
   */
  export type UserEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmbedding
     */
    select?: UserEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEmbedding
     */
    omit?: UserEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEmbeddingInclude<ExtArgs> | null
  }


  /**
   * Model CommentEmbedding
   */

  export type AggregateCommentEmbedding = {
    _count: CommentEmbeddingCountAggregateOutputType | null
    _avg: CommentEmbeddingAvgAggregateOutputType | null
    _sum: CommentEmbeddingSumAggregateOutputType | null
    _min: CommentEmbeddingMinAggregateOutputType | null
    _max: CommentEmbeddingMaxAggregateOutputType | null
  }

  export type CommentEmbeddingAvgAggregateOutputType = {
    toxicityScore: number | null
    relevanceScore: number | null
    sentimentScore: number | null
  }

  export type CommentEmbeddingSumAggregateOutputType = {
    toxicityScore: number | null
    relevanceScore: number | null
    sentimentScore: number | null
  }

  export type CommentEmbeddingMinAggregateOutputType = {
    id: string | null
    platformId: string | null
    platform: string | null
    videoId: string | null
    content: string | null
    authorName: string | null
    publishedAt: Date | null
    toxicityScore: number | null
    relevanceScore: number | null
    sentimentScore: number | null
    embeddingModel: string | null
    embeddingVersion: string | null
    processingStatus: $Enums.EmbeddingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentEmbeddingMaxAggregateOutputType = {
    id: string | null
    platformId: string | null
    platform: string | null
    videoId: string | null
    content: string | null
    authorName: string | null
    publishedAt: Date | null
    toxicityScore: number | null
    relevanceScore: number | null
    sentimentScore: number | null
    embeddingModel: string | null
    embeddingVersion: string | null
    processingStatus: $Enums.EmbeddingStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentEmbeddingCountAggregateOutputType = {
    id: number
    platformId: number
    platform: number
    videoId: number
    content: number
    authorName: number
    publishedAt: number
    toxicityScore: number
    relevanceScore: number
    sentimentScore: number
    embeddingModel: number
    embeddingVersion: number
    processingStatus: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommentEmbeddingAvgAggregateInputType = {
    toxicityScore?: true
    relevanceScore?: true
    sentimentScore?: true
  }

  export type CommentEmbeddingSumAggregateInputType = {
    toxicityScore?: true
    relevanceScore?: true
    sentimentScore?: true
  }

  export type CommentEmbeddingMinAggregateInputType = {
    id?: true
    platformId?: true
    platform?: true
    videoId?: true
    content?: true
    authorName?: true
    publishedAt?: true
    toxicityScore?: true
    relevanceScore?: true
    sentimentScore?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentEmbeddingMaxAggregateInputType = {
    id?: true
    platformId?: true
    platform?: true
    videoId?: true
    content?: true
    authorName?: true
    publishedAt?: true
    toxicityScore?: true
    relevanceScore?: true
    sentimentScore?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentEmbeddingCountAggregateInputType = {
    id?: true
    platformId?: true
    platform?: true
    videoId?: true
    content?: true
    authorName?: true
    publishedAt?: true
    toxicityScore?: true
    relevanceScore?: true
    sentimentScore?: true
    embeddingModel?: true
    embeddingVersion?: true
    processingStatus?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommentEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentEmbedding to aggregate.
     */
    where?: CommentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentEmbeddings to fetch.
     */
    orderBy?: CommentEmbeddingOrderByWithRelationInput | CommentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommentEmbeddings
    **/
    _count?: true | CommentEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentEmbeddingMaxAggregateInputType
  }

  export type GetCommentEmbeddingAggregateType<T extends CommentEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentEmbedding[P]>
      : GetScalarType<T[P], AggregateCommentEmbedding[P]>
  }




  export type CommentEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentEmbeddingWhereInput
    orderBy?: CommentEmbeddingOrderByWithAggregationInput | CommentEmbeddingOrderByWithAggregationInput[]
    by: CommentEmbeddingScalarFieldEnum[] | CommentEmbeddingScalarFieldEnum
    having?: CommentEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentEmbeddingCountAggregateInputType | true
    _avg?: CommentEmbeddingAvgAggregateInputType
    _sum?: CommentEmbeddingSumAggregateInputType
    _min?: CommentEmbeddingMinAggregateInputType
    _max?: CommentEmbeddingMaxAggregateInputType
  }

  export type CommentEmbeddingGroupByOutputType = {
    id: string
    platformId: string
    platform: string
    videoId: string
    content: string
    authorName: string | null
    publishedAt: Date | null
    toxicityScore: number | null
    relevanceScore: number | null
    sentimentScore: number | null
    embeddingModel: string
    embeddingVersion: string
    processingStatus: $Enums.EmbeddingStatus
    createdAt: Date
    updatedAt: Date
    _count: CommentEmbeddingCountAggregateOutputType | null
    _avg: CommentEmbeddingAvgAggregateOutputType | null
    _sum: CommentEmbeddingSumAggregateOutputType | null
    _min: CommentEmbeddingMinAggregateOutputType | null
    _max: CommentEmbeddingMaxAggregateOutputType | null
  }

  type GetCommentEmbeddingGroupByPayload<T extends CommentEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], CommentEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type CommentEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformId?: boolean
    platform?: boolean
    videoId?: boolean
    content?: boolean
    authorName?: boolean
    publishedAt?: boolean
    toxicityScore?: boolean
    relevanceScore?: boolean
    sentimentScore?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commentEmbedding"]>


  export type CommentEmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformId?: boolean
    platform?: boolean
    videoId?: boolean
    content?: boolean
    authorName?: boolean
    publishedAt?: boolean
    toxicityScore?: boolean
    relevanceScore?: boolean
    sentimentScore?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["commentEmbedding"]>

  export type CommentEmbeddingSelectScalar = {
    id?: boolean
    platformId?: boolean
    platform?: boolean
    videoId?: boolean
    content?: boolean
    authorName?: boolean
    publishedAt?: boolean
    toxicityScore?: boolean
    relevanceScore?: boolean
    sentimentScore?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    processingStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommentEmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "platformId" | "platform" | "videoId" | "content" | "authorName" | "publishedAt" | "toxicityScore" | "relevanceScore" | "sentimentScore" | "embeddingModel" | "embeddingVersion" | "processingStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["commentEmbedding"]>

  export type $CommentEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommentEmbedding"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      platformId: string
      platform: string
      videoId: string
      content: string
      authorName: string | null
      publishedAt: Date | null
      toxicityScore: number | null
      relevanceScore: number | null
      sentimentScore: number | null
      embeddingModel: string
      embeddingVersion: string
      processingStatus: $Enums.EmbeddingStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["commentEmbedding"]>
    composites: {}
  }

  type CommentEmbeddingGetPayload<S extends boolean | null | undefined | CommentEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$CommentEmbeddingPayload, S>

  type CommentEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentEmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentEmbeddingCountAggregateInputType | true
    }

  export interface CommentEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommentEmbedding'], meta: { name: 'CommentEmbedding' } }
    /**
     * Find zero or one CommentEmbedding that matches the filter.
     * @param {CommentEmbeddingFindUniqueArgs} args - Arguments to find a CommentEmbedding
     * @example
     * // Get one CommentEmbedding
     * const commentEmbedding = await prisma.commentEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentEmbeddingFindUniqueArgs>(args: SelectSubset<T, CommentEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__CommentEmbeddingClient<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommentEmbedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a CommentEmbedding
     * @example
     * // Get one CommentEmbedding
     * const commentEmbedding = await prisma.commentEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentEmbeddingClient<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentEmbeddingFindFirstArgs} args - Arguments to find a CommentEmbedding
     * @example
     * // Get one CommentEmbedding
     * const commentEmbedding = await prisma.commentEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentEmbeddingFindFirstArgs>(args?: SelectSubset<T, CommentEmbeddingFindFirstArgs<ExtArgs>>): Prisma__CommentEmbeddingClient<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommentEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentEmbeddingFindFirstOrThrowArgs} args - Arguments to find a CommentEmbedding
     * @example
     * // Get one CommentEmbedding
     * const commentEmbedding = await prisma.commentEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentEmbeddingClient<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommentEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommentEmbeddings
     * const commentEmbeddings = await prisma.commentEmbedding.findMany()
     * 
     * // Get first 10 CommentEmbeddings
     * const commentEmbeddings = await prisma.commentEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentEmbeddingWithIdOnly = await prisma.commentEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentEmbeddingFindManyArgs>(args?: SelectSubset<T, CommentEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a CommentEmbedding.
     * @param {CommentEmbeddingDeleteArgs} args - Arguments to delete one CommentEmbedding.
     * @example
     * // Delete one CommentEmbedding
     * const CommentEmbedding = await prisma.commentEmbedding.delete({
     *   where: {
     *     // ... filter to delete one CommentEmbedding
     *   }
     * })
     * 
     */
    delete<T extends CommentEmbeddingDeleteArgs>(args: SelectSubset<T, CommentEmbeddingDeleteArgs<ExtArgs>>): Prisma__CommentEmbeddingClient<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommentEmbedding.
     * @param {CommentEmbeddingUpdateArgs} args - Arguments to update one CommentEmbedding.
     * @example
     * // Update one CommentEmbedding
     * const commentEmbedding = await prisma.commentEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentEmbeddingUpdateArgs>(args: SelectSubset<T, CommentEmbeddingUpdateArgs<ExtArgs>>): Prisma__CommentEmbeddingClient<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommentEmbeddings.
     * @param {CommentEmbeddingDeleteManyArgs} args - Arguments to filter CommentEmbeddings to delete.
     * @example
     * // Delete a few CommentEmbeddings
     * const { count } = await prisma.commentEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentEmbeddingDeleteManyArgs>(args?: SelectSubset<T, CommentEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommentEmbeddings
     * const commentEmbedding = await prisma.commentEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentEmbeddingUpdateManyArgs>(args: SelectSubset<T, CommentEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentEmbeddings and returns the data updated in the database.
     * @param {CommentEmbeddingUpdateManyAndReturnArgs} args - Arguments to update many CommentEmbeddings.
     * @example
     * // Update many CommentEmbeddings
     * const commentEmbedding = await prisma.commentEmbedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommentEmbeddings and only return the `id`
     * const commentEmbeddingWithIdOnly = await prisma.commentEmbedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentEmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentEmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentEmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of CommentEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentEmbeddingCountArgs} args - Arguments to filter CommentEmbeddings to count.
     * @example
     * // Count the number of CommentEmbeddings
     * const count = await prisma.commentEmbedding.count({
     *   where: {
     *     // ... the filter for the CommentEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends CommentEmbeddingCountArgs>(
      args?: Subset<T, CommentEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommentEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentEmbeddingAggregateArgs>(args: Subset<T, CommentEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetCommentEmbeddingAggregateType<T>>

    /**
     * Group by CommentEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentEmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: CommentEmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommentEmbedding model
   */
  readonly fields: CommentEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommentEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommentEmbedding model
   */
  interface CommentEmbeddingFieldRefs {
    readonly id: FieldRef<"CommentEmbedding", 'String'>
    readonly platformId: FieldRef<"CommentEmbedding", 'String'>
    readonly platform: FieldRef<"CommentEmbedding", 'String'>
    readonly videoId: FieldRef<"CommentEmbedding", 'String'>
    readonly content: FieldRef<"CommentEmbedding", 'String'>
    readonly authorName: FieldRef<"CommentEmbedding", 'String'>
    readonly publishedAt: FieldRef<"CommentEmbedding", 'DateTime'>
    readonly toxicityScore: FieldRef<"CommentEmbedding", 'Float'>
    readonly relevanceScore: FieldRef<"CommentEmbedding", 'Float'>
    readonly sentimentScore: FieldRef<"CommentEmbedding", 'Float'>
    readonly embeddingModel: FieldRef<"CommentEmbedding", 'String'>
    readonly embeddingVersion: FieldRef<"CommentEmbedding", 'String'>
    readonly processingStatus: FieldRef<"CommentEmbedding", 'EmbeddingStatus'>
    readonly createdAt: FieldRef<"CommentEmbedding", 'DateTime'>
    readonly updatedAt: FieldRef<"CommentEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommentEmbedding findUnique
   */
  export type CommentEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which CommentEmbedding to fetch.
     */
    where: CommentEmbeddingWhereUniqueInput
  }

  /**
   * CommentEmbedding findUniqueOrThrow
   */
  export type CommentEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which CommentEmbedding to fetch.
     */
    where: CommentEmbeddingWhereUniqueInput
  }

  /**
   * CommentEmbedding findFirst
   */
  export type CommentEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which CommentEmbedding to fetch.
     */
    where?: CommentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentEmbeddings to fetch.
     */
    orderBy?: CommentEmbeddingOrderByWithRelationInput | CommentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentEmbeddings.
     */
    cursor?: CommentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentEmbeddings.
     */
    distinct?: CommentEmbeddingScalarFieldEnum | CommentEmbeddingScalarFieldEnum[]
  }

  /**
   * CommentEmbedding findFirstOrThrow
   */
  export type CommentEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which CommentEmbedding to fetch.
     */
    where?: CommentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentEmbeddings to fetch.
     */
    orderBy?: CommentEmbeddingOrderByWithRelationInput | CommentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentEmbeddings.
     */
    cursor?: CommentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentEmbeddings.
     */
    distinct?: CommentEmbeddingScalarFieldEnum | CommentEmbeddingScalarFieldEnum[]
  }

  /**
   * CommentEmbedding findMany
   */
  export type CommentEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * Filter, which CommentEmbeddings to fetch.
     */
    where?: CommentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentEmbeddings to fetch.
     */
    orderBy?: CommentEmbeddingOrderByWithRelationInput | CommentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommentEmbeddings.
     */
    cursor?: CommentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentEmbeddings.
     */
    skip?: number
    distinct?: CommentEmbeddingScalarFieldEnum | CommentEmbeddingScalarFieldEnum[]
  }

  /**
   * CommentEmbedding update
   */
  export type CommentEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * The data needed to update a CommentEmbedding.
     */
    data: XOR<CommentEmbeddingUpdateInput, CommentEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which CommentEmbedding to update.
     */
    where: CommentEmbeddingWhereUniqueInput
  }

  /**
   * CommentEmbedding updateMany
   */
  export type CommentEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommentEmbeddings.
     */
    data: XOR<CommentEmbeddingUpdateManyMutationInput, CommentEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which CommentEmbeddings to update
     */
    where?: CommentEmbeddingWhereInput
    /**
     * Limit how many CommentEmbeddings to update.
     */
    limit?: number
  }

  /**
   * CommentEmbedding updateManyAndReturn
   */
  export type CommentEmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update CommentEmbeddings.
     */
    data: XOR<CommentEmbeddingUpdateManyMutationInput, CommentEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which CommentEmbeddings to update
     */
    where?: CommentEmbeddingWhereInput
    /**
     * Limit how many CommentEmbeddings to update.
     */
    limit?: number
  }

  /**
   * CommentEmbedding delete
   */
  export type CommentEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
    /**
     * Filter which CommentEmbedding to delete.
     */
    where: CommentEmbeddingWhereUniqueInput
  }

  /**
   * CommentEmbedding deleteMany
   */
  export type CommentEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentEmbeddings to delete
     */
    where?: CommentEmbeddingWhereInput
    /**
     * Limit how many CommentEmbeddings to delete.
     */
    limit?: number
  }

  /**
   * CommentEmbedding without action
   */
  export type CommentEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentEmbedding
     */
    select?: CommentEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommentEmbedding
     */
    omit?: CommentEmbeddingOmit<ExtArgs> | null
  }


  /**
   * Model SearchEmbedding
   */

  export type AggregateSearchEmbedding = {
    _count: SearchEmbeddingCountAggregateOutputType | null
    _avg: SearchEmbeddingAvgAggregateOutputType | null
    _sum: SearchEmbeddingSumAggregateOutputType | null
    _min: SearchEmbeddingMinAggregateOutputType | null
    _max: SearchEmbeddingMaxAggregateOutputType | null
  }

  export type SearchEmbeddingAvgAggregateOutputType = {
    searchCount: number | null
    clickThrough: number | null
    avgWatchTime: number | null
  }

  export type SearchEmbeddingSumAggregateOutputType = {
    searchCount: number | null
    clickThrough: number | null
    avgWatchTime: number | null
  }

  export type SearchEmbeddingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    query: string | null
    intent: string | null
    searchCount: number | null
    clickThrough: number | null
    avgWatchTime: number | null
    embeddingModel: string | null
    embeddingVersion: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSearchedAt: Date | null
  }

  export type SearchEmbeddingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    query: string | null
    intent: string | null
    searchCount: number | null
    clickThrough: number | null
    avgWatchTime: number | null
    embeddingModel: string | null
    embeddingVersion: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastSearchedAt: Date | null
  }

  export type SearchEmbeddingCountAggregateOutputType = {
    id: number
    userId: number
    query: number
    intent: number
    entities: number
    searchCount: number
    clickThrough: number
    avgWatchTime: number
    embeddingModel: number
    embeddingVersion: number
    createdAt: number
    updatedAt: number
    lastSearchedAt: number
    _all: number
  }


  export type SearchEmbeddingAvgAggregateInputType = {
    searchCount?: true
    clickThrough?: true
    avgWatchTime?: true
  }

  export type SearchEmbeddingSumAggregateInputType = {
    searchCount?: true
    clickThrough?: true
    avgWatchTime?: true
  }

  export type SearchEmbeddingMinAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    intent?: true
    searchCount?: true
    clickThrough?: true
    avgWatchTime?: true
    embeddingModel?: true
    embeddingVersion?: true
    createdAt?: true
    updatedAt?: true
    lastSearchedAt?: true
  }

  export type SearchEmbeddingMaxAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    intent?: true
    searchCount?: true
    clickThrough?: true
    avgWatchTime?: true
    embeddingModel?: true
    embeddingVersion?: true
    createdAt?: true
    updatedAt?: true
    lastSearchedAt?: true
  }

  export type SearchEmbeddingCountAggregateInputType = {
    id?: true
    userId?: true
    query?: true
    intent?: true
    entities?: true
    searchCount?: true
    clickThrough?: true
    avgWatchTime?: true
    embeddingModel?: true
    embeddingVersion?: true
    createdAt?: true
    updatedAt?: true
    lastSearchedAt?: true
    _all?: true
  }

  export type SearchEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchEmbedding to aggregate.
     */
    where?: SearchEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEmbeddings to fetch.
     */
    orderBy?: SearchEmbeddingOrderByWithRelationInput | SearchEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SearchEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SearchEmbeddings
    **/
    _count?: true | SearchEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SearchEmbeddingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SearchEmbeddingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SearchEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SearchEmbeddingMaxAggregateInputType
  }

  export type GetSearchEmbeddingAggregateType<T extends SearchEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateSearchEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSearchEmbedding[P]>
      : GetScalarType<T[P], AggregateSearchEmbedding[P]>
  }




  export type SearchEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SearchEmbeddingWhereInput
    orderBy?: SearchEmbeddingOrderByWithAggregationInput | SearchEmbeddingOrderByWithAggregationInput[]
    by: SearchEmbeddingScalarFieldEnum[] | SearchEmbeddingScalarFieldEnum
    having?: SearchEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SearchEmbeddingCountAggregateInputType | true
    _avg?: SearchEmbeddingAvgAggregateInputType
    _sum?: SearchEmbeddingSumAggregateInputType
    _min?: SearchEmbeddingMinAggregateInputType
    _max?: SearchEmbeddingMaxAggregateInputType
  }

  export type SearchEmbeddingGroupByOutputType = {
    id: string
    userId: string | null
    query: string
    intent: string | null
    entities: string[]
    searchCount: number
    clickThrough: number
    avgWatchTime: number | null
    embeddingModel: string
    embeddingVersion: string
    createdAt: Date
    updatedAt: Date
    lastSearchedAt: Date
    _count: SearchEmbeddingCountAggregateOutputType | null
    _avg: SearchEmbeddingAvgAggregateOutputType | null
    _sum: SearchEmbeddingSumAggregateOutputType | null
    _min: SearchEmbeddingMinAggregateOutputType | null
    _max: SearchEmbeddingMaxAggregateOutputType | null
  }

  type GetSearchEmbeddingGroupByPayload<T extends SearchEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SearchEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SearchEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SearchEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], SearchEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type SearchEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    query?: boolean
    intent?: boolean
    entities?: boolean
    searchCount?: boolean
    clickThrough?: boolean
    avgWatchTime?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSearchedAt?: boolean
    user?: boolean | SearchEmbedding$userArgs<ExtArgs>
  }, ExtArgs["result"]["searchEmbedding"]>


  export type SearchEmbeddingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    query?: boolean
    intent?: boolean
    entities?: boolean
    searchCount?: boolean
    clickThrough?: boolean
    avgWatchTime?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSearchedAt?: boolean
    user?: boolean | SearchEmbedding$userArgs<ExtArgs>
  }, ExtArgs["result"]["searchEmbedding"]>

  export type SearchEmbeddingSelectScalar = {
    id?: boolean
    userId?: boolean
    query?: boolean
    intent?: boolean
    entities?: boolean
    searchCount?: boolean
    clickThrough?: boolean
    avgWatchTime?: boolean
    embeddingModel?: boolean
    embeddingVersion?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastSearchedAt?: boolean
  }

  export type SearchEmbeddingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "query" | "intent" | "entities" | "searchCount" | "clickThrough" | "avgWatchTime" | "embeddingModel" | "embeddingVersion" | "createdAt" | "updatedAt" | "lastSearchedAt", ExtArgs["result"]["searchEmbedding"]>
  export type SearchEmbeddingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | SearchEmbedding$userArgs<ExtArgs>
  }
  export type SearchEmbeddingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | SearchEmbedding$userArgs<ExtArgs>
  }

  export type $SearchEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SearchEmbedding"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      query: string
      intent: string | null
      entities: string[]
      searchCount: number
      clickThrough: number
      avgWatchTime: number | null
      embeddingModel: string
      embeddingVersion: string
      createdAt: Date
      updatedAt: Date
      lastSearchedAt: Date
    }, ExtArgs["result"]["searchEmbedding"]>
    composites: {}
  }

  type SearchEmbeddingGetPayload<S extends boolean | null | undefined | SearchEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$SearchEmbeddingPayload, S>

  type SearchEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SearchEmbeddingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SearchEmbeddingCountAggregateInputType | true
    }

  export interface SearchEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SearchEmbedding'], meta: { name: 'SearchEmbedding' } }
    /**
     * Find zero or one SearchEmbedding that matches the filter.
     * @param {SearchEmbeddingFindUniqueArgs} args - Arguments to find a SearchEmbedding
     * @example
     * // Get one SearchEmbedding
     * const searchEmbedding = await prisma.searchEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SearchEmbeddingFindUniqueArgs>(args: SelectSubset<T, SearchEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__SearchEmbeddingClient<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SearchEmbedding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SearchEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a SearchEmbedding
     * @example
     * // Get one SearchEmbedding
     * const searchEmbedding = await prisma.searchEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SearchEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, SearchEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SearchEmbeddingClient<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEmbeddingFindFirstArgs} args - Arguments to find a SearchEmbedding
     * @example
     * // Get one SearchEmbedding
     * const searchEmbedding = await prisma.searchEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SearchEmbeddingFindFirstArgs>(args?: SelectSubset<T, SearchEmbeddingFindFirstArgs<ExtArgs>>): Prisma__SearchEmbeddingClient<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SearchEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEmbeddingFindFirstOrThrowArgs} args - Arguments to find a SearchEmbedding
     * @example
     * // Get one SearchEmbedding
     * const searchEmbedding = await prisma.searchEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SearchEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, SearchEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SearchEmbeddingClient<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SearchEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SearchEmbeddings
     * const searchEmbeddings = await prisma.searchEmbedding.findMany()
     * 
     * // Get first 10 SearchEmbeddings
     * const searchEmbeddings = await prisma.searchEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const searchEmbeddingWithIdOnly = await prisma.searchEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SearchEmbeddingFindManyArgs>(args?: SelectSubset<T, SearchEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a SearchEmbedding.
     * @param {SearchEmbeddingDeleteArgs} args - Arguments to delete one SearchEmbedding.
     * @example
     * // Delete one SearchEmbedding
     * const SearchEmbedding = await prisma.searchEmbedding.delete({
     *   where: {
     *     // ... filter to delete one SearchEmbedding
     *   }
     * })
     * 
     */
    delete<T extends SearchEmbeddingDeleteArgs>(args: SelectSubset<T, SearchEmbeddingDeleteArgs<ExtArgs>>): Prisma__SearchEmbeddingClient<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SearchEmbedding.
     * @param {SearchEmbeddingUpdateArgs} args - Arguments to update one SearchEmbedding.
     * @example
     * // Update one SearchEmbedding
     * const searchEmbedding = await prisma.searchEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SearchEmbeddingUpdateArgs>(args: SelectSubset<T, SearchEmbeddingUpdateArgs<ExtArgs>>): Prisma__SearchEmbeddingClient<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SearchEmbeddings.
     * @param {SearchEmbeddingDeleteManyArgs} args - Arguments to filter SearchEmbeddings to delete.
     * @example
     * // Delete a few SearchEmbeddings
     * const { count } = await prisma.searchEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SearchEmbeddingDeleteManyArgs>(args?: SelectSubset<T, SearchEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SearchEmbeddings
     * const searchEmbedding = await prisma.searchEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SearchEmbeddingUpdateManyArgs>(args: SelectSubset<T, SearchEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SearchEmbeddings and returns the data updated in the database.
     * @param {SearchEmbeddingUpdateManyAndReturnArgs} args - Arguments to update many SearchEmbeddings.
     * @example
     * // Update many SearchEmbeddings
     * const searchEmbedding = await prisma.searchEmbedding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SearchEmbeddings and only return the `id`
     * const searchEmbeddingWithIdOnly = await prisma.searchEmbedding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SearchEmbeddingUpdateManyAndReturnArgs>(args: SelectSubset<T, SearchEmbeddingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SearchEmbeddingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of SearchEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEmbeddingCountArgs} args - Arguments to filter SearchEmbeddings to count.
     * @example
     * // Count the number of SearchEmbeddings
     * const count = await prisma.searchEmbedding.count({
     *   where: {
     *     // ... the filter for the SearchEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends SearchEmbeddingCountArgs>(
      args?: Subset<T, SearchEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SearchEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SearchEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SearchEmbeddingAggregateArgs>(args: Subset<T, SearchEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetSearchEmbeddingAggregateType<T>>

    /**
     * Group by SearchEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SearchEmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SearchEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SearchEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: SearchEmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SearchEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSearchEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SearchEmbedding model
   */
  readonly fields: SearchEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SearchEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SearchEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends SearchEmbedding$userArgs<ExtArgs> = {}>(args?: Subset<T, SearchEmbedding$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SearchEmbedding model
   */
  interface SearchEmbeddingFieldRefs {
    readonly id: FieldRef<"SearchEmbedding", 'String'>
    readonly userId: FieldRef<"SearchEmbedding", 'String'>
    readonly query: FieldRef<"SearchEmbedding", 'String'>
    readonly intent: FieldRef<"SearchEmbedding", 'String'>
    readonly entities: FieldRef<"SearchEmbedding", 'String[]'>
    readonly searchCount: FieldRef<"SearchEmbedding", 'Int'>
    readonly clickThrough: FieldRef<"SearchEmbedding", 'Float'>
    readonly avgWatchTime: FieldRef<"SearchEmbedding", 'Float'>
    readonly embeddingModel: FieldRef<"SearchEmbedding", 'String'>
    readonly embeddingVersion: FieldRef<"SearchEmbedding", 'String'>
    readonly createdAt: FieldRef<"SearchEmbedding", 'DateTime'>
    readonly updatedAt: FieldRef<"SearchEmbedding", 'DateTime'>
    readonly lastSearchedAt: FieldRef<"SearchEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SearchEmbedding findUnique
   */
  export type SearchEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which SearchEmbedding to fetch.
     */
    where: SearchEmbeddingWhereUniqueInput
  }

  /**
   * SearchEmbedding findUniqueOrThrow
   */
  export type SearchEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which SearchEmbedding to fetch.
     */
    where: SearchEmbeddingWhereUniqueInput
  }

  /**
   * SearchEmbedding findFirst
   */
  export type SearchEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which SearchEmbedding to fetch.
     */
    where?: SearchEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEmbeddings to fetch.
     */
    orderBy?: SearchEmbeddingOrderByWithRelationInput | SearchEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchEmbeddings.
     */
    cursor?: SearchEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchEmbeddings.
     */
    distinct?: SearchEmbeddingScalarFieldEnum | SearchEmbeddingScalarFieldEnum[]
  }

  /**
   * SearchEmbedding findFirstOrThrow
   */
  export type SearchEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which SearchEmbedding to fetch.
     */
    where?: SearchEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEmbeddings to fetch.
     */
    orderBy?: SearchEmbeddingOrderByWithRelationInput | SearchEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SearchEmbeddings.
     */
    cursor?: SearchEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SearchEmbeddings.
     */
    distinct?: SearchEmbeddingScalarFieldEnum | SearchEmbeddingScalarFieldEnum[]
  }

  /**
   * SearchEmbedding findMany
   */
  export type SearchEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which SearchEmbeddings to fetch.
     */
    where?: SearchEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SearchEmbeddings to fetch.
     */
    orderBy?: SearchEmbeddingOrderByWithRelationInput | SearchEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SearchEmbeddings.
     */
    cursor?: SearchEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SearchEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SearchEmbeddings.
     */
    skip?: number
    distinct?: SearchEmbeddingScalarFieldEnum | SearchEmbeddingScalarFieldEnum[]
  }

  /**
   * SearchEmbedding update
   */
  export type SearchEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to update a SearchEmbedding.
     */
    data: XOR<SearchEmbeddingUpdateInput, SearchEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which SearchEmbedding to update.
     */
    where: SearchEmbeddingWhereUniqueInput
  }

  /**
   * SearchEmbedding updateMany
   */
  export type SearchEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SearchEmbeddings.
     */
    data: XOR<SearchEmbeddingUpdateManyMutationInput, SearchEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which SearchEmbeddings to update
     */
    where?: SearchEmbeddingWhereInput
    /**
     * Limit how many SearchEmbeddings to update.
     */
    limit?: number
  }

  /**
   * SearchEmbedding updateManyAndReturn
   */
  export type SearchEmbeddingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * The data used to update SearchEmbeddings.
     */
    data: XOR<SearchEmbeddingUpdateManyMutationInput, SearchEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which SearchEmbeddings to update
     */
    where?: SearchEmbeddingWhereInput
    /**
     * Limit how many SearchEmbeddings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SearchEmbedding delete
   */
  export type SearchEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
    /**
     * Filter which SearchEmbedding to delete.
     */
    where: SearchEmbeddingWhereUniqueInput
  }

  /**
   * SearchEmbedding deleteMany
   */
  export type SearchEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SearchEmbeddings to delete
     */
    where?: SearchEmbeddingWhereInput
    /**
     * Limit how many SearchEmbeddings to delete.
     */
    limit?: number
  }

  /**
   * SearchEmbedding.user
   */
  export type SearchEmbedding$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * SearchEmbedding without action
   */
  export type SearchEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SearchEmbedding
     */
    select?: SearchEmbeddingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SearchEmbedding
     */
    omit?: SearchEmbeddingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SearchEmbeddingInclude<ExtArgs> | null
  }


  /**
   * Model EmbeddingJob
   */

  export type AggregateEmbeddingJob = {
    _count: EmbeddingJobCountAggregateOutputType | null
    _avg: EmbeddingJobAvgAggregateOutputType | null
    _sum: EmbeddingJobSumAggregateOutputType | null
    _min: EmbeddingJobMinAggregateOutputType | null
    _max: EmbeddingJobMaxAggregateOutputType | null
  }

  export type EmbeddingJobAvgAggregateOutputType = {
    batchSize: number | null
    priority: number | null
    totalItems: number | null
    processedItems: number | null
    failedItems: number | null
    successItems: number | null
    retryCount: number | null
    maxRetries: number | null
    avgProcessingTime: number | null
  }

  export type EmbeddingJobSumAggregateOutputType = {
    batchSize: number | null
    priority: number | null
    totalItems: number | null
    processedItems: number | null
    failedItems: number | null
    successItems: number | null
    retryCount: number | null
    maxRetries: number | null
    avgProcessingTime: number | null
  }

  export type EmbeddingJobMinAggregateOutputType = {
    id: string | null
    type: $Enums.JobType | null
    status: $Enums.JobStatus | null
    batchSize: number | null
    priority: number | null
    totalItems: number | null
    processedItems: number | null
    failedItems: number | null
    successItems: number | null
    errorMessage: string | null
    retryCount: number | null
    maxRetries: number | null
    startedAt: Date | null
    completedAt: Date | null
    avgProcessingTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmbeddingJobMaxAggregateOutputType = {
    id: string | null
    type: $Enums.JobType | null
    status: $Enums.JobStatus | null
    batchSize: number | null
    priority: number | null
    totalItems: number | null
    processedItems: number | null
    failedItems: number | null
    successItems: number | null
    errorMessage: string | null
    retryCount: number | null
    maxRetries: number | null
    startedAt: Date | null
    completedAt: Date | null
    avgProcessingTime: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmbeddingJobCountAggregateOutputType = {
    id: number
    type: number
    status: number
    batchSize: number
    priority: number
    configJson: number
    totalItems: number
    processedItems: number
    failedItems: number
    successItems: number
    errorMessage: number
    retryCount: number
    maxRetries: number
    startedAt: number
    completedAt: number
    avgProcessingTime: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmbeddingJobAvgAggregateInputType = {
    batchSize?: true
    priority?: true
    totalItems?: true
    processedItems?: true
    failedItems?: true
    successItems?: true
    retryCount?: true
    maxRetries?: true
    avgProcessingTime?: true
  }

  export type EmbeddingJobSumAggregateInputType = {
    batchSize?: true
    priority?: true
    totalItems?: true
    processedItems?: true
    failedItems?: true
    successItems?: true
    retryCount?: true
    maxRetries?: true
    avgProcessingTime?: true
  }

  export type EmbeddingJobMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    batchSize?: true
    priority?: true
    totalItems?: true
    processedItems?: true
    failedItems?: true
    successItems?: true
    errorMessage?: true
    retryCount?: true
    maxRetries?: true
    startedAt?: true
    completedAt?: true
    avgProcessingTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmbeddingJobMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    batchSize?: true
    priority?: true
    totalItems?: true
    processedItems?: true
    failedItems?: true
    successItems?: true
    errorMessage?: true
    retryCount?: true
    maxRetries?: true
    startedAt?: true
    completedAt?: true
    avgProcessingTime?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmbeddingJobCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    batchSize?: true
    priority?: true
    configJson?: true
    totalItems?: true
    processedItems?: true
    failedItems?: true
    successItems?: true
    errorMessage?: true
    retryCount?: true
    maxRetries?: true
    startedAt?: true
    completedAt?: true
    avgProcessingTime?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmbeddingJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmbeddingJob to aggregate.
     */
    where?: EmbeddingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingJobs to fetch.
     */
    orderBy?: EmbeddingJobOrderByWithRelationInput | EmbeddingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmbeddingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmbeddingJobs
    **/
    _count?: true | EmbeddingJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EmbeddingJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EmbeddingJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmbeddingJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmbeddingJobMaxAggregateInputType
  }

  export type GetEmbeddingJobAggregateType<T extends EmbeddingJobAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbeddingJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbeddingJob[P]>
      : GetScalarType<T[P], AggregateEmbeddingJob[P]>
  }




  export type EmbeddingJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbeddingJobWhereInput
    orderBy?: EmbeddingJobOrderByWithAggregationInput | EmbeddingJobOrderByWithAggregationInput[]
    by: EmbeddingJobScalarFieldEnum[] | EmbeddingJobScalarFieldEnum
    having?: EmbeddingJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmbeddingJobCountAggregateInputType | true
    _avg?: EmbeddingJobAvgAggregateInputType
    _sum?: EmbeddingJobSumAggregateInputType
    _min?: EmbeddingJobMinAggregateInputType
    _max?: EmbeddingJobMaxAggregateInputType
  }

  export type EmbeddingJobGroupByOutputType = {
    id: string
    type: $Enums.JobType
    status: $Enums.JobStatus
    batchSize: number
    priority: number
    configJson: JsonValue
    totalItems: number
    processedItems: number
    failedItems: number
    successItems: number
    errorMessage: string | null
    retryCount: number
    maxRetries: number
    startedAt: Date | null
    completedAt: Date | null
    avgProcessingTime: number | null
    createdAt: Date
    updatedAt: Date
    _count: EmbeddingJobCountAggregateOutputType | null
    _avg: EmbeddingJobAvgAggregateOutputType | null
    _sum: EmbeddingJobSumAggregateOutputType | null
    _min: EmbeddingJobMinAggregateOutputType | null
    _max: EmbeddingJobMaxAggregateOutputType | null
  }

  type GetEmbeddingJobGroupByPayload<T extends EmbeddingJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmbeddingJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmbeddingJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmbeddingJobGroupByOutputType[P]>
            : GetScalarType<T[P], EmbeddingJobGroupByOutputType[P]>
        }
      >
    >


  export type EmbeddingJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    batchSize?: boolean
    priority?: boolean
    configJson?: boolean
    totalItems?: boolean
    processedItems?: boolean
    failedItems?: boolean
    successItems?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    startedAt?: boolean
    completedAt?: boolean
    avgProcessingTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["embeddingJob"]>

  export type EmbeddingJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    batchSize?: boolean
    priority?: boolean
    configJson?: boolean
    totalItems?: boolean
    processedItems?: boolean
    failedItems?: boolean
    successItems?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    startedAt?: boolean
    completedAt?: boolean
    avgProcessingTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["embeddingJob"]>

  export type EmbeddingJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    batchSize?: boolean
    priority?: boolean
    configJson?: boolean
    totalItems?: boolean
    processedItems?: boolean
    failedItems?: boolean
    successItems?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    startedAt?: boolean
    completedAt?: boolean
    avgProcessingTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["embeddingJob"]>

  export type EmbeddingJobSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    batchSize?: boolean
    priority?: boolean
    configJson?: boolean
    totalItems?: boolean
    processedItems?: boolean
    failedItems?: boolean
    successItems?: boolean
    errorMessage?: boolean
    retryCount?: boolean
    maxRetries?: boolean
    startedAt?: boolean
    completedAt?: boolean
    avgProcessingTime?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmbeddingJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "status" | "batchSize" | "priority" | "configJson" | "totalItems" | "processedItems" | "failedItems" | "successItems" | "errorMessage" | "retryCount" | "maxRetries" | "startedAt" | "completedAt" | "avgProcessingTime" | "createdAt" | "updatedAt", ExtArgs["result"]["embeddingJob"]>

  export type $EmbeddingJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmbeddingJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.JobType
      status: $Enums.JobStatus
      batchSize: number
      priority: number
      configJson: Prisma.JsonValue
      totalItems: number
      processedItems: number
      failedItems: number
      successItems: number
      errorMessage: string | null
      retryCount: number
      maxRetries: number
      startedAt: Date | null
      completedAt: Date | null
      avgProcessingTime: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["embeddingJob"]>
    composites: {}
  }

  type EmbeddingJobGetPayload<S extends boolean | null | undefined | EmbeddingJobDefaultArgs> = $Result.GetResult<Prisma.$EmbeddingJobPayload, S>

  type EmbeddingJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmbeddingJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmbeddingJobCountAggregateInputType | true
    }

  export interface EmbeddingJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmbeddingJob'], meta: { name: 'EmbeddingJob' } }
    /**
     * Find zero or one EmbeddingJob that matches the filter.
     * @param {EmbeddingJobFindUniqueArgs} args - Arguments to find a EmbeddingJob
     * @example
     * // Get one EmbeddingJob
     * const embeddingJob = await prisma.embeddingJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmbeddingJobFindUniqueArgs>(args: SelectSubset<T, EmbeddingJobFindUniqueArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmbeddingJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmbeddingJobFindUniqueOrThrowArgs} args - Arguments to find a EmbeddingJob
     * @example
     * // Get one EmbeddingJob
     * const embeddingJob = await prisma.embeddingJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmbeddingJobFindUniqueOrThrowArgs>(args: SelectSubset<T, EmbeddingJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmbeddingJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingJobFindFirstArgs} args - Arguments to find a EmbeddingJob
     * @example
     * // Get one EmbeddingJob
     * const embeddingJob = await prisma.embeddingJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmbeddingJobFindFirstArgs>(args?: SelectSubset<T, EmbeddingJobFindFirstArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmbeddingJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingJobFindFirstOrThrowArgs} args - Arguments to find a EmbeddingJob
     * @example
     * // Get one EmbeddingJob
     * const embeddingJob = await prisma.embeddingJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmbeddingJobFindFirstOrThrowArgs>(args?: SelectSubset<T, EmbeddingJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmbeddingJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmbeddingJobs
     * const embeddingJobs = await prisma.embeddingJob.findMany()
     * 
     * // Get first 10 EmbeddingJobs
     * const embeddingJobs = await prisma.embeddingJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embeddingJobWithIdOnly = await prisma.embeddingJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmbeddingJobFindManyArgs>(args?: SelectSubset<T, EmbeddingJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmbeddingJob.
     * @param {EmbeddingJobCreateArgs} args - Arguments to create a EmbeddingJob.
     * @example
     * // Create one EmbeddingJob
     * const EmbeddingJob = await prisma.embeddingJob.create({
     *   data: {
     *     // ... data to create a EmbeddingJob
     *   }
     * })
     * 
     */
    create<T extends EmbeddingJobCreateArgs>(args: SelectSubset<T, EmbeddingJobCreateArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmbeddingJobs.
     * @param {EmbeddingJobCreateManyArgs} args - Arguments to create many EmbeddingJobs.
     * @example
     * // Create many EmbeddingJobs
     * const embeddingJob = await prisma.embeddingJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmbeddingJobCreateManyArgs>(args?: SelectSubset<T, EmbeddingJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmbeddingJobs and returns the data saved in the database.
     * @param {EmbeddingJobCreateManyAndReturnArgs} args - Arguments to create many EmbeddingJobs.
     * @example
     * // Create many EmbeddingJobs
     * const embeddingJob = await prisma.embeddingJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmbeddingJobs and only return the `id`
     * const embeddingJobWithIdOnly = await prisma.embeddingJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmbeddingJobCreateManyAndReturnArgs>(args?: SelectSubset<T, EmbeddingJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmbeddingJob.
     * @param {EmbeddingJobDeleteArgs} args - Arguments to delete one EmbeddingJob.
     * @example
     * // Delete one EmbeddingJob
     * const EmbeddingJob = await prisma.embeddingJob.delete({
     *   where: {
     *     // ... filter to delete one EmbeddingJob
     *   }
     * })
     * 
     */
    delete<T extends EmbeddingJobDeleteArgs>(args: SelectSubset<T, EmbeddingJobDeleteArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmbeddingJob.
     * @param {EmbeddingJobUpdateArgs} args - Arguments to update one EmbeddingJob.
     * @example
     * // Update one EmbeddingJob
     * const embeddingJob = await prisma.embeddingJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmbeddingJobUpdateArgs>(args: SelectSubset<T, EmbeddingJobUpdateArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmbeddingJobs.
     * @param {EmbeddingJobDeleteManyArgs} args - Arguments to filter EmbeddingJobs to delete.
     * @example
     * // Delete a few EmbeddingJobs
     * const { count } = await prisma.embeddingJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmbeddingJobDeleteManyArgs>(args?: SelectSubset<T, EmbeddingJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmbeddingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmbeddingJobs
     * const embeddingJob = await prisma.embeddingJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmbeddingJobUpdateManyArgs>(args: SelectSubset<T, EmbeddingJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmbeddingJobs and returns the data updated in the database.
     * @param {EmbeddingJobUpdateManyAndReturnArgs} args - Arguments to update many EmbeddingJobs.
     * @example
     * // Update many EmbeddingJobs
     * const embeddingJob = await prisma.embeddingJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmbeddingJobs and only return the `id`
     * const embeddingJobWithIdOnly = await prisma.embeddingJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmbeddingJobUpdateManyAndReturnArgs>(args: SelectSubset<T, EmbeddingJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmbeddingJob.
     * @param {EmbeddingJobUpsertArgs} args - Arguments to update or create a EmbeddingJob.
     * @example
     * // Update or create a EmbeddingJob
     * const embeddingJob = await prisma.embeddingJob.upsert({
     *   create: {
     *     // ... data to create a EmbeddingJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmbeddingJob we want to update
     *   }
     * })
     */
    upsert<T extends EmbeddingJobUpsertArgs>(args: SelectSubset<T, EmbeddingJobUpsertArgs<ExtArgs>>): Prisma__EmbeddingJobClient<$Result.GetResult<Prisma.$EmbeddingJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmbeddingJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingJobCountArgs} args - Arguments to filter EmbeddingJobs to count.
     * @example
     * // Count the number of EmbeddingJobs
     * const count = await prisma.embeddingJob.count({
     *   where: {
     *     // ... the filter for the EmbeddingJobs we want to count
     *   }
     * })
    **/
    count<T extends EmbeddingJobCountArgs>(
      args?: Subset<T, EmbeddingJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmbeddingJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmbeddingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmbeddingJobAggregateArgs>(args: Subset<T, EmbeddingJobAggregateArgs>): Prisma.PrismaPromise<GetEmbeddingJobAggregateType<T>>

    /**
     * Group by EmbeddingJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbeddingJobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmbeddingJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmbeddingJobGroupByArgs['orderBy'] }
        : { orderBy?: EmbeddingJobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmbeddingJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbeddingJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmbeddingJob model
   */
  readonly fields: EmbeddingJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmbeddingJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmbeddingJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EmbeddingJob model
   */
  interface EmbeddingJobFieldRefs {
    readonly id: FieldRef<"EmbeddingJob", 'String'>
    readonly type: FieldRef<"EmbeddingJob", 'JobType'>
    readonly status: FieldRef<"EmbeddingJob", 'JobStatus'>
    readonly batchSize: FieldRef<"EmbeddingJob", 'Int'>
    readonly priority: FieldRef<"EmbeddingJob", 'Int'>
    readonly configJson: FieldRef<"EmbeddingJob", 'Json'>
    readonly totalItems: FieldRef<"EmbeddingJob", 'Int'>
    readonly processedItems: FieldRef<"EmbeddingJob", 'Int'>
    readonly failedItems: FieldRef<"EmbeddingJob", 'Int'>
    readonly successItems: FieldRef<"EmbeddingJob", 'Int'>
    readonly errorMessage: FieldRef<"EmbeddingJob", 'String'>
    readonly retryCount: FieldRef<"EmbeddingJob", 'Int'>
    readonly maxRetries: FieldRef<"EmbeddingJob", 'Int'>
    readonly startedAt: FieldRef<"EmbeddingJob", 'DateTime'>
    readonly completedAt: FieldRef<"EmbeddingJob", 'DateTime'>
    readonly avgProcessingTime: FieldRef<"EmbeddingJob", 'Float'>
    readonly createdAt: FieldRef<"EmbeddingJob", 'DateTime'>
    readonly updatedAt: FieldRef<"EmbeddingJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmbeddingJob findUnique
   */
  export type EmbeddingJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * Filter, which EmbeddingJob to fetch.
     */
    where: EmbeddingJobWhereUniqueInput
  }

  /**
   * EmbeddingJob findUniqueOrThrow
   */
  export type EmbeddingJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * Filter, which EmbeddingJob to fetch.
     */
    where: EmbeddingJobWhereUniqueInput
  }

  /**
   * EmbeddingJob findFirst
   */
  export type EmbeddingJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * Filter, which EmbeddingJob to fetch.
     */
    where?: EmbeddingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingJobs to fetch.
     */
    orderBy?: EmbeddingJobOrderByWithRelationInput | EmbeddingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmbeddingJobs.
     */
    cursor?: EmbeddingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmbeddingJobs.
     */
    distinct?: EmbeddingJobScalarFieldEnum | EmbeddingJobScalarFieldEnum[]
  }

  /**
   * EmbeddingJob findFirstOrThrow
   */
  export type EmbeddingJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * Filter, which EmbeddingJob to fetch.
     */
    where?: EmbeddingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingJobs to fetch.
     */
    orderBy?: EmbeddingJobOrderByWithRelationInput | EmbeddingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmbeddingJobs.
     */
    cursor?: EmbeddingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmbeddingJobs.
     */
    distinct?: EmbeddingJobScalarFieldEnum | EmbeddingJobScalarFieldEnum[]
  }

  /**
   * EmbeddingJob findMany
   */
  export type EmbeddingJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * Filter, which EmbeddingJobs to fetch.
     */
    where?: EmbeddingJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbeddingJobs to fetch.
     */
    orderBy?: EmbeddingJobOrderByWithRelationInput | EmbeddingJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmbeddingJobs.
     */
    cursor?: EmbeddingJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbeddingJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbeddingJobs.
     */
    skip?: number
    distinct?: EmbeddingJobScalarFieldEnum | EmbeddingJobScalarFieldEnum[]
  }

  /**
   * EmbeddingJob create
   */
  export type EmbeddingJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * The data needed to create a EmbeddingJob.
     */
    data: XOR<EmbeddingJobCreateInput, EmbeddingJobUncheckedCreateInput>
  }

  /**
   * EmbeddingJob createMany
   */
  export type EmbeddingJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmbeddingJobs.
     */
    data: EmbeddingJobCreateManyInput | EmbeddingJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmbeddingJob createManyAndReturn
   */
  export type EmbeddingJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * The data used to create many EmbeddingJobs.
     */
    data: EmbeddingJobCreateManyInput | EmbeddingJobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmbeddingJob update
   */
  export type EmbeddingJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * The data needed to update a EmbeddingJob.
     */
    data: XOR<EmbeddingJobUpdateInput, EmbeddingJobUncheckedUpdateInput>
    /**
     * Choose, which EmbeddingJob to update.
     */
    where: EmbeddingJobWhereUniqueInput
  }

  /**
   * EmbeddingJob updateMany
   */
  export type EmbeddingJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmbeddingJobs.
     */
    data: XOR<EmbeddingJobUpdateManyMutationInput, EmbeddingJobUncheckedUpdateManyInput>
    /**
     * Filter which EmbeddingJobs to update
     */
    where?: EmbeddingJobWhereInput
    /**
     * Limit how many EmbeddingJobs to update.
     */
    limit?: number
  }

  /**
   * EmbeddingJob updateManyAndReturn
   */
  export type EmbeddingJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * The data used to update EmbeddingJobs.
     */
    data: XOR<EmbeddingJobUpdateManyMutationInput, EmbeddingJobUncheckedUpdateManyInput>
    /**
     * Filter which EmbeddingJobs to update
     */
    where?: EmbeddingJobWhereInput
    /**
     * Limit how many EmbeddingJobs to update.
     */
    limit?: number
  }

  /**
   * EmbeddingJob upsert
   */
  export type EmbeddingJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * The filter to search for the EmbeddingJob to update in case it exists.
     */
    where: EmbeddingJobWhereUniqueInput
    /**
     * In case the EmbeddingJob found by the `where` argument doesn't exist, create a new EmbeddingJob with this data.
     */
    create: XOR<EmbeddingJobCreateInput, EmbeddingJobUncheckedCreateInput>
    /**
     * In case the EmbeddingJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmbeddingJobUpdateInput, EmbeddingJobUncheckedUpdateInput>
  }

  /**
   * EmbeddingJob delete
   */
  export type EmbeddingJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
    /**
     * Filter which EmbeddingJob to delete.
     */
    where: EmbeddingJobWhereUniqueInput
  }

  /**
   * EmbeddingJob deleteMany
   */
  export type EmbeddingJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmbeddingJobs to delete
     */
    where?: EmbeddingJobWhereInput
    /**
     * Limit how many EmbeddingJobs to delete.
     */
    limit?: number
  }

  /**
   * EmbeddingJob without action
   */
  export type EmbeddingJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbeddingJob
     */
    select?: EmbeddingJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbeddingJob
     */
    omit?: EmbeddingJobOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    clerkId: 'clerkId',
    username: 'username',
    displayName: 'displayName',
    avatar: 'avatar',
    settingsJson: 'settingsJson',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLoginAt: 'lastLoginAt',
    isActive: 'isActive',
    isVerified: 'isVerified'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConnectionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    accessTokenEnc: 'accessTokenEnc',
    refreshTokenEnc: 'refreshTokenEnc',
    expiresAt: 'expiresAt',
    scopes: 'scopes',
    status: 'status',
    lastSyncAt: 'lastSyncAt',
    providerUserId: 'providerUserId',
    providerUsername: 'providerUsername',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConnectionScalarFieldEnum = (typeof ConnectionScalarFieldEnum)[keyof typeof ConnectionScalarFieldEnum]


  export const LayoutScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    theme: 'theme',
    gridSpecJson: 'gridSpecJson',
    isDefault: 'isDefault',
    isPublic: 'isPublic',
    description: 'description',
    tags: 'tags',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LayoutScalarFieldEnum = (typeof LayoutScalarFieldEnum)[keyof typeof LayoutScalarFieldEnum]


  export const PanelScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    description: 'description',
    propsJson: 'propsJson',
    category: 'category',
    tags: 'tags',
    isBuiltIn: 'isBuiltIn',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PanelScalarFieldEnum = (typeof PanelScalarFieldEnum)[keyof typeof PanelScalarFieldEnum]


  export const LayoutPanelScalarFieldEnum: {
    id: 'id',
    layoutId: 'layoutId',
    panelId: 'panelId',
    propsJson: 'propsJson',
    gridX: 'gridX',
    gridY: 'gridY',
    gridWidth: 'gridWidth',
    gridHeight: 'gridHeight',
    isVisible: 'isVisible',
    zIndex: 'zIndex',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LayoutPanelScalarFieldEnum = (typeof LayoutPanelScalarFieldEnum)[keyof typeof LayoutPanelScalarFieldEnum]


  export const ListScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    type: 'type',
    description: 'description',
    isPublic: 'isPublic',
    rulesJson: 'rulesJson',
    tags: 'tags',
    thumbnail: 'thumbnail',
    itemCount: 'itemCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastSyncAt: 'lastSyncAt'
  };

  export type ListScalarFieldEnum = (typeof ListScalarFieldEnum)[keyof typeof ListScalarFieldEnum]


  export const ListItemScalarFieldEnum: {
    id: 'id',
    listId: 'listId',
    platformId: 'platformId',
    platform: 'platform',
    contentType: 'contentType',
    title: 'title',
    description: 'description',
    thumbnailUrl: 'thumbnailUrl',
    duration: 'duration',
    publishedAt: 'publishedAt',
    position: 'position',
    addedAt: 'addedAt',
    notes: 'notes',
    watchProgress: 'watchProgress',
    rating: 'rating',
    isFavorite: 'isFavorite'
  };

  export type ListItemScalarFieldEnum = (typeof ListItemScalarFieldEnum)[keyof typeof ListItemScalarFieldEnum]


  export const PreferenceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    key: 'key',
    valueJson: 'valueJson',
    category: 'category',
    description: 'description',
    isUserSet: 'isUserSet',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PreferenceScalarFieldEnum = (typeof PreferenceScalarFieldEnum)[keyof typeof PreferenceScalarFieldEnum]


  export const MigrationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    executedAt: 'executedAt',
    checksum: 'checksum'
  };

  export type MigrationScalarFieldEnum = (typeof MigrationScalarFieldEnum)[keyof typeof MigrationScalarFieldEnum]


  export const SystemConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    category: 'category',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemConfigScalarFieldEnum = (typeof SystemConfigScalarFieldEnum)[keyof typeof SystemConfigScalarFieldEnum]


  export const VideoEmbeddingScalarFieldEnum: {
    id: 'id',
    platformId: 'platformId',
    platform: 'platform',
    title: 'title',
    description: 'description',
    tags: 'tags',
    category: 'category',
    duration: 'duration',
    publishedAt: 'publishedAt',
    channelId: 'channelId',
    channelName: 'channelName',
    embeddingModel: 'embeddingModel',
    embeddingVersion: 'embeddingVersion',
    processingStatus: 'processingStatus',
    qualityScore: 'qualityScore',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastProcessedAt: 'lastProcessedAt'
  };

  export type VideoEmbeddingScalarFieldEnum = (typeof VideoEmbeddingScalarFieldEnum)[keyof typeof VideoEmbeddingScalarFieldEnum]


  export const UserEmbeddingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    confidenceScore: 'confidenceScore',
    interactionCount: 'interactionCount',
    lastUpdateThreshold: 'lastUpdateThreshold',
    embeddingModel: 'embeddingModel',
    embeddingVersion: 'embeddingVersion',
    processingStatus: 'processingStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastCalculatedAt: 'lastCalculatedAt'
  };

  export type UserEmbeddingScalarFieldEnum = (typeof UserEmbeddingScalarFieldEnum)[keyof typeof UserEmbeddingScalarFieldEnum]


  export const CommentEmbeddingScalarFieldEnum: {
    id: 'id',
    platformId: 'platformId',
    platform: 'platform',
    videoId: 'videoId',
    content: 'content',
    authorName: 'authorName',
    publishedAt: 'publishedAt',
    toxicityScore: 'toxicityScore',
    relevanceScore: 'relevanceScore',
    sentimentScore: 'sentimentScore',
    embeddingModel: 'embeddingModel',
    embeddingVersion: 'embeddingVersion',
    processingStatus: 'processingStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommentEmbeddingScalarFieldEnum = (typeof CommentEmbeddingScalarFieldEnum)[keyof typeof CommentEmbeddingScalarFieldEnum]


  export const SearchEmbeddingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    query: 'query',
    intent: 'intent',
    entities: 'entities',
    searchCount: 'searchCount',
    clickThrough: 'clickThrough',
    avgWatchTime: 'avgWatchTime',
    embeddingModel: 'embeddingModel',
    embeddingVersion: 'embeddingVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastSearchedAt: 'lastSearchedAt'
  };

  export type SearchEmbeddingScalarFieldEnum = (typeof SearchEmbeddingScalarFieldEnum)[keyof typeof SearchEmbeddingScalarFieldEnum]


  export const EmbeddingJobScalarFieldEnum: {
    id: 'id',
    type: 'type',
    status: 'status',
    batchSize: 'batchSize',
    priority: 'priority',
    configJson: 'configJson',
    totalItems: 'totalItems',
    processedItems: 'processedItems',
    failedItems: 'failedItems',
    successItems: 'successItems',
    errorMessage: 'errorMessage',
    retryCount: 'retryCount',
    maxRetries: 'maxRetries',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    avgProcessingTime: 'avgProcessingTime',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmbeddingJobScalarFieldEnum = (typeof EmbeddingJobScalarFieldEnum)[keyof typeof EmbeddingJobScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ConnectionStatus'
   */
  export type EnumConnectionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConnectionStatus'>
    


  /**
   * Reference to a field of type 'ConnectionStatus[]'
   */
  export type ListEnumConnectionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConnectionStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PanelType'
   */
  export type EnumPanelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PanelType'>
    


  /**
   * Reference to a field of type 'PanelType[]'
   */
  export type ListEnumPanelTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PanelType[]'>
    


  /**
   * Reference to a field of type 'ListType'
   */
  export type EnumListTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListType'>
    


  /**
   * Reference to a field of type 'ListType[]'
   */
  export type ListEnumListTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ListType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'EmbeddingStatus'
   */
  export type EnumEmbeddingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmbeddingStatus'>
    


  /**
   * Reference to a field of type 'EmbeddingStatus[]'
   */
  export type ListEnumEmbeddingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmbeddingStatus[]'>
    


  /**
   * Reference to a field of type 'JobType'
   */
  export type EnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType'>
    


  /**
   * Reference to a field of type 'JobType[]'
   */
  export type ListEnumJobTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobType[]'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    clerkId?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    settingsJson?: JsonFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    connections?: ConnectionListRelationFilter
    layouts?: LayoutListRelationFilter
    lists?: ListListRelationFilter
    preferences?: PreferenceListRelationFilter
    userEmbedding?: XOR<UserEmbeddingNullableScalarRelationFilter, UserEmbeddingWhereInput> | null
    searchEmbeddings?: SearchEmbeddingListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    settingsJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    connections?: ConnectionOrderByRelationAggregateInput
    layouts?: LayoutOrderByRelationAggregateInput
    lists?: ListOrderByRelationAggregateInput
    preferences?: PreferenceOrderByRelationAggregateInput
    userEmbedding?: UserEmbeddingOrderByWithRelationInput
    searchEmbeddings?: SearchEmbeddingOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    clerkId?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    displayName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    settingsJson?: JsonFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    isVerified?: BoolFilter<"User"> | boolean
    connections?: ConnectionListRelationFilter
    layouts?: LayoutListRelationFilter
    lists?: ListListRelationFilter
    preferences?: PreferenceListRelationFilter
    userEmbedding?: XOR<UserEmbeddingNullableScalarRelationFilter, UserEmbeddingWhereInput> | null
    searchEmbeddings?: SearchEmbeddingListRelationFilter
  }, "id" | "email" | "clerkId" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    settingsJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    settingsJson?: JsonWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type ConnectionWhereInput = {
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    id?: StringFilter<"Connection"> | string
    userId?: StringFilter<"Connection"> | string
    provider?: StringFilter<"Connection"> | string
    accessTokenEnc?: StringFilter<"Connection"> | string
    refreshTokenEnc?: StringNullableFilter<"Connection"> | string | null
    expiresAt?: DateTimeNullableFilter<"Connection"> | Date | string | null
    scopes?: StringNullableListFilter<"Connection">
    status?: EnumConnectionStatusFilter<"Connection"> | $Enums.ConnectionStatus
    lastSyncAt?: DateTimeNullableFilter<"Connection"> | Date | string | null
    providerUserId?: StringNullableFilter<"Connection"> | string | null
    providerUsername?: StringNullableFilter<"Connection"> | string | null
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ConnectionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessTokenEnc?: SortOrder
    refreshTokenEnc?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    scopes?: SortOrder
    status?: SortOrder
    lastSyncAt?: SortOrderInput | SortOrder
    providerUserId?: SortOrderInput | SortOrder
    providerUsername?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_provider?: ConnectionUserIdProviderCompoundUniqueInput
    AND?: ConnectionWhereInput | ConnectionWhereInput[]
    OR?: ConnectionWhereInput[]
    NOT?: ConnectionWhereInput | ConnectionWhereInput[]
    userId?: StringFilter<"Connection"> | string
    provider?: StringFilter<"Connection"> | string
    accessTokenEnc?: StringFilter<"Connection"> | string
    refreshTokenEnc?: StringNullableFilter<"Connection"> | string | null
    expiresAt?: DateTimeNullableFilter<"Connection"> | Date | string | null
    scopes?: StringNullableListFilter<"Connection">
    status?: EnumConnectionStatusFilter<"Connection"> | $Enums.ConnectionStatus
    lastSyncAt?: DateTimeNullableFilter<"Connection"> | Date | string | null
    providerUserId?: StringNullableFilter<"Connection"> | string | null
    providerUsername?: StringNullableFilter<"Connection"> | string | null
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_provider">

  export type ConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessTokenEnc?: SortOrder
    refreshTokenEnc?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    scopes?: SortOrder
    status?: SortOrder
    lastSyncAt?: SortOrderInput | SortOrder
    providerUserId?: SortOrderInput | SortOrder
    providerUsername?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConnectionCountOrderByAggregateInput
    _max?: ConnectionMaxOrderByAggregateInput
    _min?: ConnectionMinOrderByAggregateInput
  }

  export type ConnectionScalarWhereWithAggregatesInput = {
    AND?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    OR?: ConnectionScalarWhereWithAggregatesInput[]
    NOT?: ConnectionScalarWhereWithAggregatesInput | ConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Connection"> | string
    userId?: StringWithAggregatesFilter<"Connection"> | string
    provider?: StringWithAggregatesFilter<"Connection"> | string
    accessTokenEnc?: StringWithAggregatesFilter<"Connection"> | string
    refreshTokenEnc?: StringNullableWithAggregatesFilter<"Connection"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Connection"> | Date | string | null
    scopes?: StringNullableListFilter<"Connection">
    status?: EnumConnectionStatusWithAggregatesFilter<"Connection"> | $Enums.ConnectionStatus
    lastSyncAt?: DateTimeNullableWithAggregatesFilter<"Connection"> | Date | string | null
    providerUserId?: StringNullableWithAggregatesFilter<"Connection"> | string | null
    providerUsername?: StringNullableWithAggregatesFilter<"Connection"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Connection"> | Date | string
  }

  export type LayoutWhereInput = {
    AND?: LayoutWhereInput | LayoutWhereInput[]
    OR?: LayoutWhereInput[]
    NOT?: LayoutWhereInput | LayoutWhereInput[]
    id?: StringFilter<"Layout"> | string
    userId?: StringFilter<"Layout"> | string
    name?: StringFilter<"Layout"> | string
    theme?: StringNullableFilter<"Layout"> | string | null
    gridSpecJson?: JsonFilter<"Layout">
    isDefault?: BoolFilter<"Layout"> | boolean
    isPublic?: BoolFilter<"Layout"> | boolean
    description?: StringNullableFilter<"Layout"> | string | null
    tags?: StringNullableListFilter<"Layout">
    version?: IntFilter<"Layout"> | number
    createdAt?: DateTimeFilter<"Layout"> | Date | string
    updatedAt?: DateTimeFilter<"Layout"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    layoutPanels?: LayoutPanelListRelationFilter
  }

  export type LayoutOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    theme?: SortOrderInput | SortOrder
    gridSpecJson?: SortOrder
    isDefault?: SortOrder
    isPublic?: SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    layoutPanels?: LayoutPanelOrderByRelationAggregateInput
  }

  export type LayoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LayoutWhereInput | LayoutWhereInput[]
    OR?: LayoutWhereInput[]
    NOT?: LayoutWhereInput | LayoutWhereInput[]
    userId?: StringFilter<"Layout"> | string
    name?: StringFilter<"Layout"> | string
    theme?: StringNullableFilter<"Layout"> | string | null
    gridSpecJson?: JsonFilter<"Layout">
    isDefault?: BoolFilter<"Layout"> | boolean
    isPublic?: BoolFilter<"Layout"> | boolean
    description?: StringNullableFilter<"Layout"> | string | null
    tags?: StringNullableListFilter<"Layout">
    version?: IntFilter<"Layout"> | number
    createdAt?: DateTimeFilter<"Layout"> | Date | string
    updatedAt?: DateTimeFilter<"Layout"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    layoutPanels?: LayoutPanelListRelationFilter
  }, "id">

  export type LayoutOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    theme?: SortOrderInput | SortOrder
    gridSpecJson?: SortOrder
    isDefault?: SortOrder
    isPublic?: SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LayoutCountOrderByAggregateInput
    _avg?: LayoutAvgOrderByAggregateInput
    _max?: LayoutMaxOrderByAggregateInput
    _min?: LayoutMinOrderByAggregateInput
    _sum?: LayoutSumOrderByAggregateInput
  }

  export type LayoutScalarWhereWithAggregatesInput = {
    AND?: LayoutScalarWhereWithAggregatesInput | LayoutScalarWhereWithAggregatesInput[]
    OR?: LayoutScalarWhereWithAggregatesInput[]
    NOT?: LayoutScalarWhereWithAggregatesInput | LayoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Layout"> | string
    userId?: StringWithAggregatesFilter<"Layout"> | string
    name?: StringWithAggregatesFilter<"Layout"> | string
    theme?: StringNullableWithAggregatesFilter<"Layout"> | string | null
    gridSpecJson?: JsonWithAggregatesFilter<"Layout">
    isDefault?: BoolWithAggregatesFilter<"Layout"> | boolean
    isPublic?: BoolWithAggregatesFilter<"Layout"> | boolean
    description?: StringNullableWithAggregatesFilter<"Layout"> | string | null
    tags?: StringNullableListFilter<"Layout">
    version?: IntWithAggregatesFilter<"Layout"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Layout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Layout"> | Date | string
  }

  export type PanelWhereInput = {
    AND?: PanelWhereInput | PanelWhereInput[]
    OR?: PanelWhereInput[]
    NOT?: PanelWhereInput | PanelWhereInput[]
    id?: StringFilter<"Panel"> | string
    type?: EnumPanelTypeFilter<"Panel"> | $Enums.PanelType
    name?: StringFilter<"Panel"> | string
    description?: StringNullableFilter<"Panel"> | string | null
    propsJson?: JsonFilter<"Panel">
    category?: StringNullableFilter<"Panel"> | string | null
    tags?: StringNullableListFilter<"Panel">
    isBuiltIn?: BoolFilter<"Panel"> | boolean
    version?: IntFilter<"Panel"> | number
    createdAt?: DateTimeFilter<"Panel"> | Date | string
    updatedAt?: DateTimeFilter<"Panel"> | Date | string
    layoutPanels?: LayoutPanelListRelationFilter
  }

  export type PanelOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    propsJson?: SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrder
    isBuiltIn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    layoutPanels?: LayoutPanelOrderByRelationAggregateInput
  }

  export type PanelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PanelWhereInput | PanelWhereInput[]
    OR?: PanelWhereInput[]
    NOT?: PanelWhereInput | PanelWhereInput[]
    type?: EnumPanelTypeFilter<"Panel"> | $Enums.PanelType
    name?: StringFilter<"Panel"> | string
    description?: StringNullableFilter<"Panel"> | string | null
    propsJson?: JsonFilter<"Panel">
    category?: StringNullableFilter<"Panel"> | string | null
    tags?: StringNullableListFilter<"Panel">
    isBuiltIn?: BoolFilter<"Panel"> | boolean
    version?: IntFilter<"Panel"> | number
    createdAt?: DateTimeFilter<"Panel"> | Date | string
    updatedAt?: DateTimeFilter<"Panel"> | Date | string
    layoutPanels?: LayoutPanelListRelationFilter
  }, "id">

  export type PanelOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    propsJson?: SortOrder
    category?: SortOrderInput | SortOrder
    tags?: SortOrder
    isBuiltIn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PanelCountOrderByAggregateInput
    _avg?: PanelAvgOrderByAggregateInput
    _max?: PanelMaxOrderByAggregateInput
    _min?: PanelMinOrderByAggregateInput
    _sum?: PanelSumOrderByAggregateInput
  }

  export type PanelScalarWhereWithAggregatesInput = {
    AND?: PanelScalarWhereWithAggregatesInput | PanelScalarWhereWithAggregatesInput[]
    OR?: PanelScalarWhereWithAggregatesInput[]
    NOT?: PanelScalarWhereWithAggregatesInput | PanelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Panel"> | string
    type?: EnumPanelTypeWithAggregatesFilter<"Panel"> | $Enums.PanelType
    name?: StringWithAggregatesFilter<"Panel"> | string
    description?: StringNullableWithAggregatesFilter<"Panel"> | string | null
    propsJson?: JsonWithAggregatesFilter<"Panel">
    category?: StringNullableWithAggregatesFilter<"Panel"> | string | null
    tags?: StringNullableListFilter<"Panel">
    isBuiltIn?: BoolWithAggregatesFilter<"Panel"> | boolean
    version?: IntWithAggregatesFilter<"Panel"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Panel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Panel"> | Date | string
  }

  export type LayoutPanelWhereInput = {
    AND?: LayoutPanelWhereInput | LayoutPanelWhereInput[]
    OR?: LayoutPanelWhereInput[]
    NOT?: LayoutPanelWhereInput | LayoutPanelWhereInput[]
    id?: StringFilter<"LayoutPanel"> | string
    layoutId?: StringFilter<"LayoutPanel"> | string
    panelId?: StringFilter<"LayoutPanel"> | string
    propsJson?: JsonFilter<"LayoutPanel">
    gridX?: IntFilter<"LayoutPanel"> | number
    gridY?: IntFilter<"LayoutPanel"> | number
    gridWidth?: IntFilter<"LayoutPanel"> | number
    gridHeight?: IntFilter<"LayoutPanel"> | number
    isVisible?: BoolFilter<"LayoutPanel"> | boolean
    zIndex?: IntFilter<"LayoutPanel"> | number
    createdAt?: DateTimeFilter<"LayoutPanel"> | Date | string
    updatedAt?: DateTimeFilter<"LayoutPanel"> | Date | string
    layout?: XOR<LayoutScalarRelationFilter, LayoutWhereInput>
    panel?: XOR<PanelScalarRelationFilter, PanelWhereInput>
  }

  export type LayoutPanelOrderByWithRelationInput = {
    id?: SortOrder
    layoutId?: SortOrder
    panelId?: SortOrder
    propsJson?: SortOrder
    gridX?: SortOrder
    gridY?: SortOrder
    gridWidth?: SortOrder
    gridHeight?: SortOrder
    isVisible?: SortOrder
    zIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    layout?: LayoutOrderByWithRelationInput
    panel?: PanelOrderByWithRelationInput
  }

  export type LayoutPanelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    layoutId_panelId?: LayoutPanelLayoutIdPanelIdCompoundUniqueInput
    AND?: LayoutPanelWhereInput | LayoutPanelWhereInput[]
    OR?: LayoutPanelWhereInput[]
    NOT?: LayoutPanelWhereInput | LayoutPanelWhereInput[]
    layoutId?: StringFilter<"LayoutPanel"> | string
    panelId?: StringFilter<"LayoutPanel"> | string
    propsJson?: JsonFilter<"LayoutPanel">
    gridX?: IntFilter<"LayoutPanel"> | number
    gridY?: IntFilter<"LayoutPanel"> | number
    gridWidth?: IntFilter<"LayoutPanel"> | number
    gridHeight?: IntFilter<"LayoutPanel"> | number
    isVisible?: BoolFilter<"LayoutPanel"> | boolean
    zIndex?: IntFilter<"LayoutPanel"> | number
    createdAt?: DateTimeFilter<"LayoutPanel"> | Date | string
    updatedAt?: DateTimeFilter<"LayoutPanel"> | Date | string
    layout?: XOR<LayoutScalarRelationFilter, LayoutWhereInput>
    panel?: XOR<PanelScalarRelationFilter, PanelWhereInput>
  }, "id" | "layoutId_panelId">

  export type LayoutPanelOrderByWithAggregationInput = {
    id?: SortOrder
    layoutId?: SortOrder
    panelId?: SortOrder
    propsJson?: SortOrder
    gridX?: SortOrder
    gridY?: SortOrder
    gridWidth?: SortOrder
    gridHeight?: SortOrder
    isVisible?: SortOrder
    zIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LayoutPanelCountOrderByAggregateInput
    _avg?: LayoutPanelAvgOrderByAggregateInput
    _max?: LayoutPanelMaxOrderByAggregateInput
    _min?: LayoutPanelMinOrderByAggregateInput
    _sum?: LayoutPanelSumOrderByAggregateInput
  }

  export type LayoutPanelScalarWhereWithAggregatesInput = {
    AND?: LayoutPanelScalarWhereWithAggregatesInput | LayoutPanelScalarWhereWithAggregatesInput[]
    OR?: LayoutPanelScalarWhereWithAggregatesInput[]
    NOT?: LayoutPanelScalarWhereWithAggregatesInput | LayoutPanelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LayoutPanel"> | string
    layoutId?: StringWithAggregatesFilter<"LayoutPanel"> | string
    panelId?: StringWithAggregatesFilter<"LayoutPanel"> | string
    propsJson?: JsonWithAggregatesFilter<"LayoutPanel">
    gridX?: IntWithAggregatesFilter<"LayoutPanel"> | number
    gridY?: IntWithAggregatesFilter<"LayoutPanel"> | number
    gridWidth?: IntWithAggregatesFilter<"LayoutPanel"> | number
    gridHeight?: IntWithAggregatesFilter<"LayoutPanel"> | number
    isVisible?: BoolWithAggregatesFilter<"LayoutPanel"> | boolean
    zIndex?: IntWithAggregatesFilter<"LayoutPanel"> | number
    createdAt?: DateTimeWithAggregatesFilter<"LayoutPanel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LayoutPanel"> | Date | string
  }

  export type ListWhereInput = {
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    id?: StringFilter<"List"> | string
    userId?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    type?: EnumListTypeFilter<"List"> | $Enums.ListType
    description?: StringNullableFilter<"List"> | string | null
    isPublic?: BoolFilter<"List"> | boolean
    rulesJson?: JsonFilter<"List">
    tags?: StringNullableListFilter<"List">
    thumbnail?: StringNullableFilter<"List"> | string | null
    itemCount?: IntFilter<"List"> | number
    createdAt?: DateTimeFilter<"List"> | Date | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
    lastSyncAt?: DateTimeNullableFilter<"List"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listItems?: ListItemListRelationFilter
  }

  export type ListOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    rulesJson?: SortOrder
    tags?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    itemCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    listItems?: ListItemOrderByRelationAggregateInput
  }

  export type ListWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ListWhereInput | ListWhereInput[]
    OR?: ListWhereInput[]
    NOT?: ListWhereInput | ListWhereInput[]
    userId?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    type?: EnumListTypeFilter<"List"> | $Enums.ListType
    description?: StringNullableFilter<"List"> | string | null
    isPublic?: BoolFilter<"List"> | boolean
    rulesJson?: JsonFilter<"List">
    tags?: StringNullableListFilter<"List">
    thumbnail?: StringNullableFilter<"List"> | string | null
    itemCount?: IntFilter<"List"> | number
    createdAt?: DateTimeFilter<"List"> | Date | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
    lastSyncAt?: DateTimeNullableFilter<"List"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    listItems?: ListItemListRelationFilter
  }, "id">

  export type ListOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    rulesJson?: SortOrder
    tags?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    itemCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncAt?: SortOrderInput | SortOrder
    _count?: ListCountOrderByAggregateInput
    _avg?: ListAvgOrderByAggregateInput
    _max?: ListMaxOrderByAggregateInput
    _min?: ListMinOrderByAggregateInput
    _sum?: ListSumOrderByAggregateInput
  }

  export type ListScalarWhereWithAggregatesInput = {
    AND?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    OR?: ListScalarWhereWithAggregatesInput[]
    NOT?: ListScalarWhereWithAggregatesInput | ListScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"List"> | string
    userId?: StringWithAggregatesFilter<"List"> | string
    name?: StringWithAggregatesFilter<"List"> | string
    type?: EnumListTypeWithAggregatesFilter<"List"> | $Enums.ListType
    description?: StringNullableWithAggregatesFilter<"List"> | string | null
    isPublic?: BoolWithAggregatesFilter<"List"> | boolean
    rulesJson?: JsonWithAggregatesFilter<"List">
    tags?: StringNullableListFilter<"List">
    thumbnail?: StringNullableWithAggregatesFilter<"List"> | string | null
    itemCount?: IntWithAggregatesFilter<"List"> | number
    createdAt?: DateTimeWithAggregatesFilter<"List"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"List"> | Date | string
    lastSyncAt?: DateTimeNullableWithAggregatesFilter<"List"> | Date | string | null
  }

  export type ListItemWhereInput = {
    AND?: ListItemWhereInput | ListItemWhereInput[]
    OR?: ListItemWhereInput[]
    NOT?: ListItemWhereInput | ListItemWhereInput[]
    id?: StringFilter<"ListItem"> | string
    listId?: StringFilter<"ListItem"> | string
    platformId?: StringFilter<"ListItem"> | string
    platform?: StringFilter<"ListItem"> | string
    contentType?: StringFilter<"ListItem"> | string
    title?: StringNullableFilter<"ListItem"> | string | null
    description?: StringNullableFilter<"ListItem"> | string | null
    thumbnailUrl?: StringNullableFilter<"ListItem"> | string | null
    duration?: IntNullableFilter<"ListItem"> | number | null
    publishedAt?: DateTimeNullableFilter<"ListItem"> | Date | string | null
    position?: IntFilter<"ListItem"> | number
    addedAt?: DateTimeFilter<"ListItem"> | Date | string
    notes?: StringNullableFilter<"ListItem"> | string | null
    watchProgress?: FloatNullableFilter<"ListItem"> | number | null
    rating?: IntNullableFilter<"ListItem"> | number | null
    isFavorite?: BoolFilter<"ListItem"> | boolean
    list?: XOR<ListScalarRelationFilter, ListWhereInput>
  }

  export type ListItemOrderByWithRelationInput = {
    id?: SortOrder
    listId?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    contentType?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    position?: SortOrder
    addedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    watchProgress?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    isFavorite?: SortOrder
    list?: ListOrderByWithRelationInput
  }

  export type ListItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    listId_platformId_platform?: ListItemListIdPlatformIdPlatformCompoundUniqueInput
    AND?: ListItemWhereInput | ListItemWhereInput[]
    OR?: ListItemWhereInput[]
    NOT?: ListItemWhereInput | ListItemWhereInput[]
    listId?: StringFilter<"ListItem"> | string
    platformId?: StringFilter<"ListItem"> | string
    platform?: StringFilter<"ListItem"> | string
    contentType?: StringFilter<"ListItem"> | string
    title?: StringNullableFilter<"ListItem"> | string | null
    description?: StringNullableFilter<"ListItem"> | string | null
    thumbnailUrl?: StringNullableFilter<"ListItem"> | string | null
    duration?: IntNullableFilter<"ListItem"> | number | null
    publishedAt?: DateTimeNullableFilter<"ListItem"> | Date | string | null
    position?: IntFilter<"ListItem"> | number
    addedAt?: DateTimeFilter<"ListItem"> | Date | string
    notes?: StringNullableFilter<"ListItem"> | string | null
    watchProgress?: FloatNullableFilter<"ListItem"> | number | null
    rating?: IntNullableFilter<"ListItem"> | number | null
    isFavorite?: BoolFilter<"ListItem"> | boolean
    list?: XOR<ListScalarRelationFilter, ListWhereInput>
  }, "id" | "listId_platformId_platform">

  export type ListItemOrderByWithAggregationInput = {
    id?: SortOrder
    listId?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    contentType?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    position?: SortOrder
    addedAt?: SortOrder
    notes?: SortOrderInput | SortOrder
    watchProgress?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    isFavorite?: SortOrder
    _count?: ListItemCountOrderByAggregateInput
    _avg?: ListItemAvgOrderByAggregateInput
    _max?: ListItemMaxOrderByAggregateInput
    _min?: ListItemMinOrderByAggregateInput
    _sum?: ListItemSumOrderByAggregateInput
  }

  export type ListItemScalarWhereWithAggregatesInput = {
    AND?: ListItemScalarWhereWithAggregatesInput | ListItemScalarWhereWithAggregatesInput[]
    OR?: ListItemScalarWhereWithAggregatesInput[]
    NOT?: ListItemScalarWhereWithAggregatesInput | ListItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ListItem"> | string
    listId?: StringWithAggregatesFilter<"ListItem"> | string
    platformId?: StringWithAggregatesFilter<"ListItem"> | string
    platform?: StringWithAggregatesFilter<"ListItem"> | string
    contentType?: StringWithAggregatesFilter<"ListItem"> | string
    title?: StringNullableWithAggregatesFilter<"ListItem"> | string | null
    description?: StringNullableWithAggregatesFilter<"ListItem"> | string | null
    thumbnailUrl?: StringNullableWithAggregatesFilter<"ListItem"> | string | null
    duration?: IntNullableWithAggregatesFilter<"ListItem"> | number | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"ListItem"> | Date | string | null
    position?: IntWithAggregatesFilter<"ListItem"> | number
    addedAt?: DateTimeWithAggregatesFilter<"ListItem"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"ListItem"> | string | null
    watchProgress?: FloatNullableWithAggregatesFilter<"ListItem"> | number | null
    rating?: IntNullableWithAggregatesFilter<"ListItem"> | number | null
    isFavorite?: BoolWithAggregatesFilter<"ListItem"> | boolean
  }

  export type PreferenceWhereInput = {
    AND?: PreferenceWhereInput | PreferenceWhereInput[]
    OR?: PreferenceWhereInput[]
    NOT?: PreferenceWhereInput | PreferenceWhereInput[]
    id?: StringFilter<"Preference"> | string
    userId?: StringFilter<"Preference"> | string
    key?: StringFilter<"Preference"> | string
    valueJson?: JsonFilter<"Preference">
    category?: StringNullableFilter<"Preference"> | string | null
    description?: StringNullableFilter<"Preference"> | string | null
    isUserSet?: BoolFilter<"Preference"> | boolean
    createdAt?: DateTimeFilter<"Preference"> | Date | string
    updatedAt?: DateTimeFilter<"Preference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PreferenceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    valueJson?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isUserSet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_key?: PreferenceUserIdKeyCompoundUniqueInput
    AND?: PreferenceWhereInput | PreferenceWhereInput[]
    OR?: PreferenceWhereInput[]
    NOT?: PreferenceWhereInput | PreferenceWhereInput[]
    userId?: StringFilter<"Preference"> | string
    key?: StringFilter<"Preference"> | string
    valueJson?: JsonFilter<"Preference">
    category?: StringNullableFilter<"Preference"> | string | null
    description?: StringNullableFilter<"Preference"> | string | null
    isUserSet?: BoolFilter<"Preference"> | boolean
    createdAt?: DateTimeFilter<"Preference"> | Date | string
    updatedAt?: DateTimeFilter<"Preference"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_key">

  export type PreferenceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    valueJson?: SortOrder
    category?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isUserSet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PreferenceCountOrderByAggregateInput
    _max?: PreferenceMaxOrderByAggregateInput
    _min?: PreferenceMinOrderByAggregateInput
  }

  export type PreferenceScalarWhereWithAggregatesInput = {
    AND?: PreferenceScalarWhereWithAggregatesInput | PreferenceScalarWhereWithAggregatesInput[]
    OR?: PreferenceScalarWhereWithAggregatesInput[]
    NOT?: PreferenceScalarWhereWithAggregatesInput | PreferenceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Preference"> | string
    userId?: StringWithAggregatesFilter<"Preference"> | string
    key?: StringWithAggregatesFilter<"Preference"> | string
    valueJson?: JsonWithAggregatesFilter<"Preference">
    category?: StringNullableWithAggregatesFilter<"Preference"> | string | null
    description?: StringNullableWithAggregatesFilter<"Preference"> | string | null
    isUserSet?: BoolWithAggregatesFilter<"Preference"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Preference"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Preference"> | Date | string
  }

  export type MigrationWhereInput = {
    AND?: MigrationWhereInput | MigrationWhereInput[]
    OR?: MigrationWhereInput[]
    NOT?: MigrationWhereInput | MigrationWhereInput[]
    id?: StringFilter<"Migration"> | string
    name?: StringFilter<"Migration"> | string
    executedAt?: DateTimeFilter<"Migration"> | Date | string
    checksum?: StringNullableFilter<"Migration"> | string | null
  }

  export type MigrationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    executedAt?: SortOrder
    checksum?: SortOrderInput | SortOrder
  }

  export type MigrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: MigrationWhereInput | MigrationWhereInput[]
    OR?: MigrationWhereInput[]
    NOT?: MigrationWhereInput | MigrationWhereInput[]
    executedAt?: DateTimeFilter<"Migration"> | Date | string
    checksum?: StringNullableFilter<"Migration"> | string | null
  }, "id" | "name">

  export type MigrationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    executedAt?: SortOrder
    checksum?: SortOrderInput | SortOrder
    _count?: MigrationCountOrderByAggregateInput
    _max?: MigrationMaxOrderByAggregateInput
    _min?: MigrationMinOrderByAggregateInput
  }

  export type MigrationScalarWhereWithAggregatesInput = {
    AND?: MigrationScalarWhereWithAggregatesInput | MigrationScalarWhereWithAggregatesInput[]
    OR?: MigrationScalarWhereWithAggregatesInput[]
    NOT?: MigrationScalarWhereWithAggregatesInput | MigrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Migration"> | string
    name?: StringWithAggregatesFilter<"Migration"> | string
    executedAt?: DateTimeWithAggregatesFilter<"Migration"> | Date | string
    checksum?: StringNullableWithAggregatesFilter<"Migration"> | string | null
  }

  export type SystemConfigWhereInput = {
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    id?: StringFilter<"SystemConfig"> | string
    key?: StringFilter<"SystemConfig"> | string
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    category?: StringNullableFilter<"SystemConfig"> | string | null
    isActive?: BoolFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }

  export type SystemConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SystemConfigWhereInput | SystemConfigWhereInput[]
    OR?: SystemConfigWhereInput[]
    NOT?: SystemConfigWhereInput | SystemConfigWhereInput[]
    value?: JsonFilter<"SystemConfig">
    description?: StringNullableFilter<"SystemConfig"> | string | null
    category?: StringNullableFilter<"SystemConfig"> | string | null
    isActive?: BoolFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeFilter<"SystemConfig"> | Date | string
  }, "id" | "key">

  export type SystemConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemConfigCountOrderByAggregateInput
    _max?: SystemConfigMaxOrderByAggregateInput
    _min?: SystemConfigMinOrderByAggregateInput
  }

  export type SystemConfigScalarWhereWithAggregatesInput = {
    AND?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    OR?: SystemConfigScalarWhereWithAggregatesInput[]
    NOT?: SystemConfigScalarWhereWithAggregatesInput | SystemConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemConfig"> | string
    key?: StringWithAggregatesFilter<"SystemConfig"> | string
    value?: JsonWithAggregatesFilter<"SystemConfig">
    description?: StringNullableWithAggregatesFilter<"SystemConfig"> | string | null
    category?: StringNullableWithAggregatesFilter<"SystemConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"SystemConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemConfig"> | Date | string
  }

  export type VideoEmbeddingWhereInput = {
    AND?: VideoEmbeddingWhereInput | VideoEmbeddingWhereInput[]
    OR?: VideoEmbeddingWhereInput[]
    NOT?: VideoEmbeddingWhereInput | VideoEmbeddingWhereInput[]
    id?: StringFilter<"VideoEmbedding"> | string
    platformId?: StringFilter<"VideoEmbedding"> | string
    platform?: StringFilter<"VideoEmbedding"> | string
    title?: StringNullableFilter<"VideoEmbedding"> | string | null
    description?: StringNullableFilter<"VideoEmbedding"> | string | null
    tags?: StringNullableListFilter<"VideoEmbedding">
    category?: StringNullableFilter<"VideoEmbedding"> | string | null
    duration?: IntNullableFilter<"VideoEmbedding"> | number | null
    publishedAt?: DateTimeNullableFilter<"VideoEmbedding"> | Date | string | null
    channelId?: StringNullableFilter<"VideoEmbedding"> | string | null
    channelName?: StringNullableFilter<"VideoEmbedding"> | string | null
    embeddingModel?: StringFilter<"VideoEmbedding"> | string
    embeddingVersion?: StringFilter<"VideoEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusFilter<"VideoEmbedding"> | $Enums.EmbeddingStatus
    qualityScore?: FloatNullableFilter<"VideoEmbedding"> | number | null
    createdAt?: DateTimeFilter<"VideoEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"VideoEmbedding"> | Date | string
    lastProcessedAt?: DateTimeNullableFilter<"VideoEmbedding"> | Date | string | null
  }

  export type VideoEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    category?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    channelId?: SortOrderInput | SortOrder
    channelName?: SortOrderInput | SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    qualityScore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastProcessedAt?: SortOrderInput | SortOrder
  }

  export type VideoEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    platformId_platform?: VideoEmbeddingPlatformIdPlatformCompoundUniqueInput
    AND?: VideoEmbeddingWhereInput | VideoEmbeddingWhereInput[]
    OR?: VideoEmbeddingWhereInput[]
    NOT?: VideoEmbeddingWhereInput | VideoEmbeddingWhereInput[]
    platformId?: StringFilter<"VideoEmbedding"> | string
    platform?: StringFilter<"VideoEmbedding"> | string
    title?: StringNullableFilter<"VideoEmbedding"> | string | null
    description?: StringNullableFilter<"VideoEmbedding"> | string | null
    tags?: StringNullableListFilter<"VideoEmbedding">
    category?: StringNullableFilter<"VideoEmbedding"> | string | null
    duration?: IntNullableFilter<"VideoEmbedding"> | number | null
    publishedAt?: DateTimeNullableFilter<"VideoEmbedding"> | Date | string | null
    channelId?: StringNullableFilter<"VideoEmbedding"> | string | null
    channelName?: StringNullableFilter<"VideoEmbedding"> | string | null
    embeddingModel?: StringFilter<"VideoEmbedding"> | string
    embeddingVersion?: StringFilter<"VideoEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusFilter<"VideoEmbedding"> | $Enums.EmbeddingStatus
    qualityScore?: FloatNullableFilter<"VideoEmbedding"> | number | null
    createdAt?: DateTimeFilter<"VideoEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"VideoEmbedding"> | Date | string
    lastProcessedAt?: DateTimeNullableFilter<"VideoEmbedding"> | Date | string | null
  }, "id" | "platformId_platform">

  export type VideoEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    category?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    channelId?: SortOrderInput | SortOrder
    channelName?: SortOrderInput | SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    qualityScore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastProcessedAt?: SortOrderInput | SortOrder
    _count?: VideoEmbeddingCountOrderByAggregateInput
    _avg?: VideoEmbeddingAvgOrderByAggregateInput
    _max?: VideoEmbeddingMaxOrderByAggregateInput
    _min?: VideoEmbeddingMinOrderByAggregateInput
    _sum?: VideoEmbeddingSumOrderByAggregateInput
  }

  export type VideoEmbeddingScalarWhereWithAggregatesInput = {
    AND?: VideoEmbeddingScalarWhereWithAggregatesInput | VideoEmbeddingScalarWhereWithAggregatesInput[]
    OR?: VideoEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: VideoEmbeddingScalarWhereWithAggregatesInput | VideoEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VideoEmbedding"> | string
    platformId?: StringWithAggregatesFilter<"VideoEmbedding"> | string
    platform?: StringWithAggregatesFilter<"VideoEmbedding"> | string
    title?: StringNullableWithAggregatesFilter<"VideoEmbedding"> | string | null
    description?: StringNullableWithAggregatesFilter<"VideoEmbedding"> | string | null
    tags?: StringNullableListFilter<"VideoEmbedding">
    category?: StringNullableWithAggregatesFilter<"VideoEmbedding"> | string | null
    duration?: IntNullableWithAggregatesFilter<"VideoEmbedding"> | number | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"VideoEmbedding"> | Date | string | null
    channelId?: StringNullableWithAggregatesFilter<"VideoEmbedding"> | string | null
    channelName?: StringNullableWithAggregatesFilter<"VideoEmbedding"> | string | null
    embeddingModel?: StringWithAggregatesFilter<"VideoEmbedding"> | string
    embeddingVersion?: StringWithAggregatesFilter<"VideoEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusWithAggregatesFilter<"VideoEmbedding"> | $Enums.EmbeddingStatus
    qualityScore?: FloatNullableWithAggregatesFilter<"VideoEmbedding"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"VideoEmbedding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"VideoEmbedding"> | Date | string
    lastProcessedAt?: DateTimeNullableWithAggregatesFilter<"VideoEmbedding"> | Date | string | null
  }

  export type UserEmbeddingWhereInput = {
    AND?: UserEmbeddingWhereInput | UserEmbeddingWhereInput[]
    OR?: UserEmbeddingWhereInput[]
    NOT?: UserEmbeddingWhereInput | UserEmbeddingWhereInput[]
    id?: StringFilter<"UserEmbedding"> | string
    userId?: StringFilter<"UserEmbedding"> | string
    confidenceScore?: FloatFilter<"UserEmbedding"> | number
    interactionCount?: IntFilter<"UserEmbedding"> | number
    lastUpdateThreshold?: IntFilter<"UserEmbedding"> | number
    embeddingModel?: StringFilter<"UserEmbedding"> | string
    embeddingVersion?: StringFilter<"UserEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusFilter<"UserEmbedding"> | $Enums.EmbeddingStatus
    createdAt?: DateTimeFilter<"UserEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"UserEmbedding"> | Date | string
    lastCalculatedAt?: DateTimeNullableFilter<"UserEmbedding"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    confidenceScore?: SortOrder
    interactionCount?: SortOrder
    lastUpdateThreshold?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastCalculatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserEmbeddingWhereInput | UserEmbeddingWhereInput[]
    OR?: UserEmbeddingWhereInput[]
    NOT?: UserEmbeddingWhereInput | UserEmbeddingWhereInput[]
    confidenceScore?: FloatFilter<"UserEmbedding"> | number
    interactionCount?: IntFilter<"UserEmbedding"> | number
    lastUpdateThreshold?: IntFilter<"UserEmbedding"> | number
    embeddingModel?: StringFilter<"UserEmbedding"> | string
    embeddingVersion?: StringFilter<"UserEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusFilter<"UserEmbedding"> | $Enums.EmbeddingStatus
    createdAt?: DateTimeFilter<"UserEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"UserEmbedding"> | Date | string
    lastCalculatedAt?: DateTimeNullableFilter<"UserEmbedding"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    confidenceScore?: SortOrder
    interactionCount?: SortOrder
    lastUpdateThreshold?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastCalculatedAt?: SortOrderInput | SortOrder
    _count?: UserEmbeddingCountOrderByAggregateInput
    _avg?: UserEmbeddingAvgOrderByAggregateInput
    _max?: UserEmbeddingMaxOrderByAggregateInput
    _min?: UserEmbeddingMinOrderByAggregateInput
    _sum?: UserEmbeddingSumOrderByAggregateInput
  }

  export type UserEmbeddingScalarWhereWithAggregatesInput = {
    AND?: UserEmbeddingScalarWhereWithAggregatesInput | UserEmbeddingScalarWhereWithAggregatesInput[]
    OR?: UserEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: UserEmbeddingScalarWhereWithAggregatesInput | UserEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserEmbedding"> | string
    userId?: StringWithAggregatesFilter<"UserEmbedding"> | string
    confidenceScore?: FloatWithAggregatesFilter<"UserEmbedding"> | number
    interactionCount?: IntWithAggregatesFilter<"UserEmbedding"> | number
    lastUpdateThreshold?: IntWithAggregatesFilter<"UserEmbedding"> | number
    embeddingModel?: StringWithAggregatesFilter<"UserEmbedding"> | string
    embeddingVersion?: StringWithAggregatesFilter<"UserEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusWithAggregatesFilter<"UserEmbedding"> | $Enums.EmbeddingStatus
    createdAt?: DateTimeWithAggregatesFilter<"UserEmbedding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserEmbedding"> | Date | string
    lastCalculatedAt?: DateTimeNullableWithAggregatesFilter<"UserEmbedding"> | Date | string | null
  }

  export type CommentEmbeddingWhereInput = {
    AND?: CommentEmbeddingWhereInput | CommentEmbeddingWhereInput[]
    OR?: CommentEmbeddingWhereInput[]
    NOT?: CommentEmbeddingWhereInput | CommentEmbeddingWhereInput[]
    id?: StringFilter<"CommentEmbedding"> | string
    platformId?: StringFilter<"CommentEmbedding"> | string
    platform?: StringFilter<"CommentEmbedding"> | string
    videoId?: StringFilter<"CommentEmbedding"> | string
    content?: StringFilter<"CommentEmbedding"> | string
    authorName?: StringNullableFilter<"CommentEmbedding"> | string | null
    publishedAt?: DateTimeNullableFilter<"CommentEmbedding"> | Date | string | null
    toxicityScore?: FloatNullableFilter<"CommentEmbedding"> | number | null
    relevanceScore?: FloatNullableFilter<"CommentEmbedding"> | number | null
    sentimentScore?: FloatNullableFilter<"CommentEmbedding"> | number | null
    embeddingModel?: StringFilter<"CommentEmbedding"> | string
    embeddingVersion?: StringFilter<"CommentEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusFilter<"CommentEmbedding"> | $Enums.EmbeddingStatus
    createdAt?: DateTimeFilter<"CommentEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"CommentEmbedding"> | Date | string
  }

  export type CommentEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    videoId?: SortOrder
    content?: SortOrder
    authorName?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    toxicityScore?: SortOrderInput | SortOrder
    relevanceScore?: SortOrderInput | SortOrder
    sentimentScore?: SortOrderInput | SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    platformId_platform?: CommentEmbeddingPlatformIdPlatformCompoundUniqueInput
    AND?: CommentEmbeddingWhereInput | CommentEmbeddingWhereInput[]
    OR?: CommentEmbeddingWhereInput[]
    NOT?: CommentEmbeddingWhereInput | CommentEmbeddingWhereInput[]
    platformId?: StringFilter<"CommentEmbedding"> | string
    platform?: StringFilter<"CommentEmbedding"> | string
    videoId?: StringFilter<"CommentEmbedding"> | string
    content?: StringFilter<"CommentEmbedding"> | string
    authorName?: StringNullableFilter<"CommentEmbedding"> | string | null
    publishedAt?: DateTimeNullableFilter<"CommentEmbedding"> | Date | string | null
    toxicityScore?: FloatNullableFilter<"CommentEmbedding"> | number | null
    relevanceScore?: FloatNullableFilter<"CommentEmbedding"> | number | null
    sentimentScore?: FloatNullableFilter<"CommentEmbedding"> | number | null
    embeddingModel?: StringFilter<"CommentEmbedding"> | string
    embeddingVersion?: StringFilter<"CommentEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusFilter<"CommentEmbedding"> | $Enums.EmbeddingStatus
    createdAt?: DateTimeFilter<"CommentEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"CommentEmbedding"> | Date | string
  }, "id" | "platformId_platform">

  export type CommentEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    videoId?: SortOrder
    content?: SortOrder
    authorName?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    toxicityScore?: SortOrderInput | SortOrder
    relevanceScore?: SortOrderInput | SortOrder
    sentimentScore?: SortOrderInput | SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommentEmbeddingCountOrderByAggregateInput
    _avg?: CommentEmbeddingAvgOrderByAggregateInput
    _max?: CommentEmbeddingMaxOrderByAggregateInput
    _min?: CommentEmbeddingMinOrderByAggregateInput
    _sum?: CommentEmbeddingSumOrderByAggregateInput
  }

  export type CommentEmbeddingScalarWhereWithAggregatesInput = {
    AND?: CommentEmbeddingScalarWhereWithAggregatesInput | CommentEmbeddingScalarWhereWithAggregatesInput[]
    OR?: CommentEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: CommentEmbeddingScalarWhereWithAggregatesInput | CommentEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommentEmbedding"> | string
    platformId?: StringWithAggregatesFilter<"CommentEmbedding"> | string
    platform?: StringWithAggregatesFilter<"CommentEmbedding"> | string
    videoId?: StringWithAggregatesFilter<"CommentEmbedding"> | string
    content?: StringWithAggregatesFilter<"CommentEmbedding"> | string
    authorName?: StringNullableWithAggregatesFilter<"CommentEmbedding"> | string | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"CommentEmbedding"> | Date | string | null
    toxicityScore?: FloatNullableWithAggregatesFilter<"CommentEmbedding"> | number | null
    relevanceScore?: FloatNullableWithAggregatesFilter<"CommentEmbedding"> | number | null
    sentimentScore?: FloatNullableWithAggregatesFilter<"CommentEmbedding"> | number | null
    embeddingModel?: StringWithAggregatesFilter<"CommentEmbedding"> | string
    embeddingVersion?: StringWithAggregatesFilter<"CommentEmbedding"> | string
    processingStatus?: EnumEmbeddingStatusWithAggregatesFilter<"CommentEmbedding"> | $Enums.EmbeddingStatus
    createdAt?: DateTimeWithAggregatesFilter<"CommentEmbedding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CommentEmbedding"> | Date | string
  }

  export type SearchEmbeddingWhereInput = {
    AND?: SearchEmbeddingWhereInput | SearchEmbeddingWhereInput[]
    OR?: SearchEmbeddingWhereInput[]
    NOT?: SearchEmbeddingWhereInput | SearchEmbeddingWhereInput[]
    id?: StringFilter<"SearchEmbedding"> | string
    userId?: StringNullableFilter<"SearchEmbedding"> | string | null
    query?: StringFilter<"SearchEmbedding"> | string
    intent?: StringNullableFilter<"SearchEmbedding"> | string | null
    entities?: StringNullableListFilter<"SearchEmbedding">
    searchCount?: IntFilter<"SearchEmbedding"> | number
    clickThrough?: FloatFilter<"SearchEmbedding"> | number
    avgWatchTime?: FloatNullableFilter<"SearchEmbedding"> | number | null
    embeddingModel?: StringFilter<"SearchEmbedding"> | string
    embeddingVersion?: StringFilter<"SearchEmbedding"> | string
    createdAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    lastSearchedAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type SearchEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    query?: SortOrder
    intent?: SortOrderInput | SortOrder
    entities?: SortOrder
    searchCount?: SortOrder
    clickThrough?: SortOrder
    avgWatchTime?: SortOrderInput | SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSearchedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SearchEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    query_userId?: SearchEmbeddingQueryUserIdCompoundUniqueInput
    AND?: SearchEmbeddingWhereInput | SearchEmbeddingWhereInput[]
    OR?: SearchEmbeddingWhereInput[]
    NOT?: SearchEmbeddingWhereInput | SearchEmbeddingWhereInput[]
    userId?: StringNullableFilter<"SearchEmbedding"> | string | null
    query?: StringFilter<"SearchEmbedding"> | string
    intent?: StringNullableFilter<"SearchEmbedding"> | string | null
    entities?: StringNullableListFilter<"SearchEmbedding">
    searchCount?: IntFilter<"SearchEmbedding"> | number
    clickThrough?: FloatFilter<"SearchEmbedding"> | number
    avgWatchTime?: FloatNullableFilter<"SearchEmbedding"> | number | null
    embeddingModel?: StringFilter<"SearchEmbedding"> | string
    embeddingVersion?: StringFilter<"SearchEmbedding"> | string
    createdAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    lastSearchedAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "query_userId">

  export type SearchEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    query?: SortOrder
    intent?: SortOrderInput | SortOrder
    entities?: SortOrder
    searchCount?: SortOrder
    clickThrough?: SortOrder
    avgWatchTime?: SortOrderInput | SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSearchedAt?: SortOrder
    _count?: SearchEmbeddingCountOrderByAggregateInput
    _avg?: SearchEmbeddingAvgOrderByAggregateInput
    _max?: SearchEmbeddingMaxOrderByAggregateInput
    _min?: SearchEmbeddingMinOrderByAggregateInput
    _sum?: SearchEmbeddingSumOrderByAggregateInput
  }

  export type SearchEmbeddingScalarWhereWithAggregatesInput = {
    AND?: SearchEmbeddingScalarWhereWithAggregatesInput | SearchEmbeddingScalarWhereWithAggregatesInput[]
    OR?: SearchEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: SearchEmbeddingScalarWhereWithAggregatesInput | SearchEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SearchEmbedding"> | string
    userId?: StringNullableWithAggregatesFilter<"SearchEmbedding"> | string | null
    query?: StringWithAggregatesFilter<"SearchEmbedding"> | string
    intent?: StringNullableWithAggregatesFilter<"SearchEmbedding"> | string | null
    entities?: StringNullableListFilter<"SearchEmbedding">
    searchCount?: IntWithAggregatesFilter<"SearchEmbedding"> | number
    clickThrough?: FloatWithAggregatesFilter<"SearchEmbedding"> | number
    avgWatchTime?: FloatNullableWithAggregatesFilter<"SearchEmbedding"> | number | null
    embeddingModel?: StringWithAggregatesFilter<"SearchEmbedding"> | string
    embeddingVersion?: StringWithAggregatesFilter<"SearchEmbedding"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SearchEmbedding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SearchEmbedding"> | Date | string
    lastSearchedAt?: DateTimeWithAggregatesFilter<"SearchEmbedding"> | Date | string
  }

  export type EmbeddingJobWhereInput = {
    AND?: EmbeddingJobWhereInput | EmbeddingJobWhereInput[]
    OR?: EmbeddingJobWhereInput[]
    NOT?: EmbeddingJobWhereInput | EmbeddingJobWhereInput[]
    id?: StringFilter<"EmbeddingJob"> | string
    type?: EnumJobTypeFilter<"EmbeddingJob"> | $Enums.JobType
    status?: EnumJobStatusFilter<"EmbeddingJob"> | $Enums.JobStatus
    batchSize?: IntFilter<"EmbeddingJob"> | number
    priority?: IntFilter<"EmbeddingJob"> | number
    configJson?: JsonFilter<"EmbeddingJob">
    totalItems?: IntFilter<"EmbeddingJob"> | number
    processedItems?: IntFilter<"EmbeddingJob"> | number
    failedItems?: IntFilter<"EmbeddingJob"> | number
    successItems?: IntFilter<"EmbeddingJob"> | number
    errorMessage?: StringNullableFilter<"EmbeddingJob"> | string | null
    retryCount?: IntFilter<"EmbeddingJob"> | number
    maxRetries?: IntFilter<"EmbeddingJob"> | number
    startedAt?: DateTimeNullableFilter<"EmbeddingJob"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"EmbeddingJob"> | Date | string | null
    avgProcessingTime?: FloatNullableFilter<"EmbeddingJob"> | number | null
    createdAt?: DateTimeFilter<"EmbeddingJob"> | Date | string
    updatedAt?: DateTimeFilter<"EmbeddingJob"> | Date | string
  }

  export type EmbeddingJobOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    batchSize?: SortOrder
    priority?: SortOrder
    configJson?: SortOrder
    totalItems?: SortOrder
    processedItems?: SortOrder
    failedItems?: SortOrder
    successItems?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    avgProcessingTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmbeddingJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmbeddingJobWhereInput | EmbeddingJobWhereInput[]
    OR?: EmbeddingJobWhereInput[]
    NOT?: EmbeddingJobWhereInput | EmbeddingJobWhereInput[]
    type?: EnumJobTypeFilter<"EmbeddingJob"> | $Enums.JobType
    status?: EnumJobStatusFilter<"EmbeddingJob"> | $Enums.JobStatus
    batchSize?: IntFilter<"EmbeddingJob"> | number
    priority?: IntFilter<"EmbeddingJob"> | number
    configJson?: JsonFilter<"EmbeddingJob">
    totalItems?: IntFilter<"EmbeddingJob"> | number
    processedItems?: IntFilter<"EmbeddingJob"> | number
    failedItems?: IntFilter<"EmbeddingJob"> | number
    successItems?: IntFilter<"EmbeddingJob"> | number
    errorMessage?: StringNullableFilter<"EmbeddingJob"> | string | null
    retryCount?: IntFilter<"EmbeddingJob"> | number
    maxRetries?: IntFilter<"EmbeddingJob"> | number
    startedAt?: DateTimeNullableFilter<"EmbeddingJob"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"EmbeddingJob"> | Date | string | null
    avgProcessingTime?: FloatNullableFilter<"EmbeddingJob"> | number | null
    createdAt?: DateTimeFilter<"EmbeddingJob"> | Date | string
    updatedAt?: DateTimeFilter<"EmbeddingJob"> | Date | string
  }, "id">

  export type EmbeddingJobOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    batchSize?: SortOrder
    priority?: SortOrder
    configJson?: SortOrder
    totalItems?: SortOrder
    processedItems?: SortOrder
    failedItems?: SortOrder
    successItems?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    startedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    avgProcessingTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmbeddingJobCountOrderByAggregateInput
    _avg?: EmbeddingJobAvgOrderByAggregateInput
    _max?: EmbeddingJobMaxOrderByAggregateInput
    _min?: EmbeddingJobMinOrderByAggregateInput
    _sum?: EmbeddingJobSumOrderByAggregateInput
  }

  export type EmbeddingJobScalarWhereWithAggregatesInput = {
    AND?: EmbeddingJobScalarWhereWithAggregatesInput | EmbeddingJobScalarWhereWithAggregatesInput[]
    OR?: EmbeddingJobScalarWhereWithAggregatesInput[]
    NOT?: EmbeddingJobScalarWhereWithAggregatesInput | EmbeddingJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmbeddingJob"> | string
    type?: EnumJobTypeWithAggregatesFilter<"EmbeddingJob"> | $Enums.JobType
    status?: EnumJobStatusWithAggregatesFilter<"EmbeddingJob"> | $Enums.JobStatus
    batchSize?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    priority?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    configJson?: JsonWithAggregatesFilter<"EmbeddingJob">
    totalItems?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    processedItems?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    failedItems?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    successItems?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"EmbeddingJob"> | string | null
    retryCount?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    maxRetries?: IntWithAggregatesFilter<"EmbeddingJob"> | number
    startedAt?: DateTimeNullableWithAggregatesFilter<"EmbeddingJob"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"EmbeddingJob"> | Date | string | null
    avgProcessingTime?: FloatNullableWithAggregatesFilter<"EmbeddingJob"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"EmbeddingJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmbeddingJob"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionCreateNestedManyWithoutUserInput
    layouts?: LayoutCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    preferences?: PreferenceCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
    layouts?: LayoutUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    preferences?: PreferenceUncheckedCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingUncheckedCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUpdateManyWithoutUserNestedInput
    layouts?: LayoutUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
    layouts?: LayoutUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUncheckedUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUncheckedUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ConnectionCreateInput = {
    id?: string
    provider: string
    accessTokenEnc: string
    refreshTokenEnc?: string | null
    expiresAt?: Date | string | null
    scopes?: ConnectionCreatescopesInput | string[]
    status?: $Enums.ConnectionStatus
    lastSyncAt?: Date | string | null
    providerUserId?: string | null
    providerUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConnectionsInput
  }

  export type ConnectionUncheckedCreateInput = {
    id?: string
    userId: string
    provider: string
    accessTokenEnc: string
    refreshTokenEnc?: string | null
    expiresAt?: Date | string | null
    scopes?: ConnectionCreatescopesInput | string[]
    status?: $Enums.ConnectionStatus
    lastSyncAt?: Date | string | null
    providerUserId?: string | null
    providerUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessTokenEnc?: StringFieldUpdateOperationsInput | string
    refreshTokenEnc?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ConnectionUpdatescopesInput | string[]
    status?: EnumConnectionStatusFieldUpdateOperationsInput | $Enums.ConnectionStatus
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    providerUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConnectionsNestedInput
  }

  export type ConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessTokenEnc?: StringFieldUpdateOperationsInput | string
    refreshTokenEnc?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ConnectionUpdatescopesInput | string[]
    status?: EnumConnectionStatusFieldUpdateOperationsInput | $Enums.ConnectionStatus
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    providerUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionCreateManyInput = {
    id?: string
    userId: string
    provider: string
    accessTokenEnc: string
    refreshTokenEnc?: string | null
    expiresAt?: Date | string | null
    scopes?: ConnectionCreatescopesInput | string[]
    status?: $Enums.ConnectionStatus
    lastSyncAt?: Date | string | null
    providerUserId?: string | null
    providerUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessTokenEnc?: StringFieldUpdateOperationsInput | string
    refreshTokenEnc?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ConnectionUpdatescopesInput | string[]
    status?: EnumConnectionStatusFieldUpdateOperationsInput | $Enums.ConnectionStatus
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    providerUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessTokenEnc?: StringFieldUpdateOperationsInput | string
    refreshTokenEnc?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ConnectionUpdatescopesInput | string[]
    status?: EnumConnectionStatusFieldUpdateOperationsInput | $Enums.ConnectionStatus
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    providerUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutCreateInput = {
    id?: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLayoutsInput
    layoutPanels?: LayoutPanelCreateNestedManyWithoutLayoutInput
  }

  export type LayoutUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    layoutPanels?: LayoutPanelUncheckedCreateNestedManyWithoutLayoutInput
  }

  export type LayoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLayoutsNestedInput
    layoutPanels?: LayoutPanelUpdateManyWithoutLayoutNestedInput
  }

  export type LayoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    layoutPanels?: LayoutPanelUncheckedUpdateManyWithoutLayoutNestedInput
  }

  export type LayoutCreateManyInput = {
    id?: string
    userId: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PanelCreateInput = {
    id?: string
    type: $Enums.PanelType
    name: string
    description?: string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: string | null
    tags?: PanelCreatetagsInput | string[]
    isBuiltIn?: boolean
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    layoutPanels?: LayoutPanelCreateNestedManyWithoutPanelInput
  }

  export type PanelUncheckedCreateInput = {
    id?: string
    type: $Enums.PanelType
    name: string
    description?: string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: string | null
    tags?: PanelCreatetagsInput | string[]
    isBuiltIn?: boolean
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    layoutPanels?: LayoutPanelUncheckedCreateNestedManyWithoutPanelInput
  }

  export type PanelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPanelTypeFieldUpdateOperationsInput | $Enums.PanelType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PanelUpdatetagsInput | string[]
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    layoutPanels?: LayoutPanelUpdateManyWithoutPanelNestedInput
  }

  export type PanelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPanelTypeFieldUpdateOperationsInput | $Enums.PanelType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PanelUpdatetagsInput | string[]
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    layoutPanels?: LayoutPanelUncheckedUpdateManyWithoutPanelNestedInput
  }

  export type PanelCreateManyInput = {
    id?: string
    type: $Enums.PanelType
    name: string
    description?: string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: string | null
    tags?: PanelCreatetagsInput | string[]
    isBuiltIn?: boolean
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PanelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPanelTypeFieldUpdateOperationsInput | $Enums.PanelType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PanelUpdatetagsInput | string[]
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PanelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPanelTypeFieldUpdateOperationsInput | $Enums.PanelType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PanelUpdatetagsInput | string[]
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutPanelCreateInput = {
    id?: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    layout: LayoutCreateNestedOneWithoutLayoutPanelsInput
    panel: PanelCreateNestedOneWithoutLayoutPanelsInput
  }

  export type LayoutPanelUncheckedCreateInput = {
    id?: string
    layoutId: string
    panelId: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutPanelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    layout?: LayoutUpdateOneRequiredWithoutLayoutPanelsNestedInput
    panel?: PanelUpdateOneRequiredWithoutLayoutPanelsNestedInput
  }

  export type LayoutPanelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    layoutId?: StringFieldUpdateOperationsInput | string
    panelId?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutPanelCreateManyInput = {
    id?: string
    layoutId: string
    panelId: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutPanelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutPanelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    layoutId?: StringFieldUpdateOperationsInput | string
    panelId?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListCreateInput = {
    id?: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
    user: UserCreateNestedOneWithoutListsInput
    listItems?: ListItemCreateNestedManyWithoutListInput
  }

  export type ListUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
    listItems?: ListItemUncheckedCreateNestedManyWithoutListInput
  }

  export type ListUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutListsNestedInput
    listItems?: ListItemUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listItems?: ListItemUncheckedUpdateManyWithoutListNestedInput
  }

  export type ListCreateManyInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
  }

  export type ListUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ListItemCreateInput = {
    id?: string
    platformId: string
    platform: string
    contentType?: string
    title?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    publishedAt?: Date | string | null
    position?: number
    addedAt?: Date | string
    notes?: string | null
    watchProgress?: number | null
    rating?: number | null
    isFavorite?: boolean
    list: ListCreateNestedOneWithoutListItemsInput
  }

  export type ListItemUncheckedCreateInput = {
    id?: string
    listId: string
    platformId: string
    platform: string
    contentType?: string
    title?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    publishedAt?: Date | string | null
    position?: number
    addedAt?: Date | string
    notes?: string | null
    watchProgress?: number | null
    rating?: number | null
    isFavorite?: boolean
  }

  export type ListItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    watchProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    list?: ListUpdateOneRequiredWithoutListItemsNestedInput
  }

  export type ListItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    watchProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListItemCreateManyInput = {
    id?: string
    listId: string
    platformId: string
    platform: string
    contentType?: string
    title?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    publishedAt?: Date | string | null
    position?: number
    addedAt?: Date | string
    notes?: string | null
    watchProgress?: number | null
    rating?: number | null
    isFavorite?: boolean
  }

  export type ListItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    watchProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    listId?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    watchProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PreferenceCreateInput = {
    id?: string
    key: string
    valueJson: JsonNullValueInput | InputJsonValue
    category?: string | null
    description?: string | null
    isUserSet?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPreferencesInput
  }

  export type PreferenceUncheckedCreateInput = {
    id?: string
    userId: string
    key: string
    valueJson: JsonNullValueInput | InputJsonValue
    category?: string | null
    description?: string | null
    isUserSet?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreferenceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    valueJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSet?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPreferencesNestedInput
  }

  export type PreferenceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    valueJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSet?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenceCreateManyInput = {
    id?: string
    userId: string
    key: string
    valueJson: JsonNullValueInput | InputJsonValue
    category?: string | null
    description?: string | null
    isUserSet?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreferenceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    valueJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSet?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    valueJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSet?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MigrationCreateInput = {
    id?: string
    name: string
    executedAt?: Date | string
    checksum?: string | null
  }

  export type MigrationUncheckedCreateInput = {
    id?: string
    name: string
    executedAt?: Date | string
    checksum?: string | null
  }

  export type MigrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MigrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MigrationCreateManyInput = {
    id?: string
    name: string
    executedAt?: Date | string
    checksum?: string | null
  }

  export type MigrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MigrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SystemConfigCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    category?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUncheckedCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    category?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigCreateManyInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    description?: string | null
    category?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VideoEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: VideoEmbeddingUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VideoEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: VideoEmbeddingUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VideoEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: VideoEmbeddingUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VideoEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: VideoEmbeddingUpdatetagsInput | string[]
    category?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    channelName?: NullableStringFieldUpdateOperationsInput | string | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    qualityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    interactionCount?: IntFieldUpdateOperationsInput | number
    lastUpdateThreshold?: IntFieldUpdateOperationsInput | number
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutUserEmbeddingNestedInput
  }

  export type UserEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    interactionCount?: IntFieldUpdateOperationsInput | number
    lastUpdateThreshold?: IntFieldUpdateOperationsInput | number
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    interactionCount?: IntFieldUpdateOperationsInput | number
    lastUpdateThreshold?: IntFieldUpdateOperationsInput | number
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    interactionCount?: IntFieldUpdateOperationsInput | number
    lastUpdateThreshold?: IntFieldUpdateOperationsInput | number
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CommentEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toxicityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toxicityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toxicityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    videoId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    toxicityScore?: NullableFloatFieldUpdateOperationsInput | number | null
    relevanceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: SearchEmbeddingUpdateentitiesInput | string[]
    searchCount?: IntFieldUpdateOperationsInput | number
    clickThrough?: FloatFieldUpdateOperationsInput | number
    avgWatchTime?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSearchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSearchEmbeddingsNestedInput
  }

  export type SearchEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    query?: StringFieldUpdateOperationsInput | string
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: SearchEmbeddingUpdateentitiesInput | string[]
    searchCount?: IntFieldUpdateOperationsInput | number
    clickThrough?: FloatFieldUpdateOperationsInput | number
    avgWatchTime?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSearchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: SearchEmbeddingUpdateentitiesInput | string[]
    searchCount?: IntFieldUpdateOperationsInput | number
    clickThrough?: FloatFieldUpdateOperationsInput | number
    avgWatchTime?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSearchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    query?: StringFieldUpdateOperationsInput | string
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: SearchEmbeddingUpdateentitiesInput | string[]
    searchCount?: IntFieldUpdateOperationsInput | number
    clickThrough?: FloatFieldUpdateOperationsInput | number
    avgWatchTime?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSearchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingJobCreateInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    batchSize?: number
    priority?: number
    configJson?: JsonNullValueInput | InputJsonValue
    totalItems?: number
    processedItems?: number
    failedItems?: number
    successItems?: number
    errorMessage?: string | null
    retryCount?: number
    maxRetries?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    avgProcessingTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmbeddingJobUncheckedCreateInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    batchSize?: number
    priority?: number
    configJson?: JsonNullValueInput | InputJsonValue
    totalItems?: number
    processedItems?: number
    failedItems?: number
    successItems?: number
    errorMessage?: string | null
    retryCount?: number
    maxRetries?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    avgProcessingTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmbeddingJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    batchSize?: IntFieldUpdateOperationsInput | number
    priority?: IntFieldUpdateOperationsInput | number
    configJson?: JsonNullValueInput | InputJsonValue
    totalItems?: IntFieldUpdateOperationsInput | number
    processedItems?: IntFieldUpdateOperationsInput | number
    failedItems?: IntFieldUpdateOperationsInput | number
    successItems?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avgProcessingTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    batchSize?: IntFieldUpdateOperationsInput | number
    priority?: IntFieldUpdateOperationsInput | number
    configJson?: JsonNullValueInput | InputJsonValue
    totalItems?: IntFieldUpdateOperationsInput | number
    processedItems?: IntFieldUpdateOperationsInput | number
    failedItems?: IntFieldUpdateOperationsInput | number
    successItems?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avgProcessingTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingJobCreateManyInput = {
    id?: string
    type: $Enums.JobType
    status?: $Enums.JobStatus
    batchSize?: number
    priority?: number
    configJson?: JsonNullValueInput | InputJsonValue
    totalItems?: number
    processedItems?: number
    failedItems?: number
    successItems?: number
    errorMessage?: string | null
    retryCount?: number
    maxRetries?: number
    startedAt?: Date | string | null
    completedAt?: Date | string | null
    avgProcessingTime?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmbeddingJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    batchSize?: IntFieldUpdateOperationsInput | number
    priority?: IntFieldUpdateOperationsInput | number
    configJson?: JsonNullValueInput | InputJsonValue
    totalItems?: IntFieldUpdateOperationsInput | number
    processedItems?: IntFieldUpdateOperationsInput | number
    failedItems?: IntFieldUpdateOperationsInput | number
    successItems?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avgProcessingTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbeddingJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumJobTypeFieldUpdateOperationsInput | $Enums.JobType
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    batchSize?: IntFieldUpdateOperationsInput | number
    priority?: IntFieldUpdateOperationsInput | number
    configJson?: JsonNullValueInput | InputJsonValue
    totalItems?: IntFieldUpdateOperationsInput | number
    processedItems?: IntFieldUpdateOperationsInput | number
    failedItems?: IntFieldUpdateOperationsInput | number
    successItems?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    retryCount?: IntFieldUpdateOperationsInput | number
    maxRetries?: IntFieldUpdateOperationsInput | number
    startedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avgProcessingTime?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ConnectionListRelationFilter = {
    every?: ConnectionWhereInput
    some?: ConnectionWhereInput
    none?: ConnectionWhereInput
  }

  export type LayoutListRelationFilter = {
    every?: LayoutWhereInput
    some?: LayoutWhereInput
    none?: LayoutWhereInput
  }

  export type ListListRelationFilter = {
    every?: ListWhereInput
    some?: ListWhereInput
    none?: ListWhereInput
  }

  export type PreferenceListRelationFilter = {
    every?: PreferenceWhereInput
    some?: PreferenceWhereInput
    none?: PreferenceWhereInput
  }

  export type UserEmbeddingNullableScalarRelationFilter = {
    is?: UserEmbeddingWhereInput | null
    isNot?: UserEmbeddingWhereInput | null
  }

  export type SearchEmbeddingListRelationFilter = {
    every?: SearchEmbeddingWhereInput
    some?: SearchEmbeddingWhereInput
    none?: SearchEmbeddingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LayoutOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PreferenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SearchEmbeddingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    settingsJson?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    clerkId?: SortOrder
    username?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
    isActive?: SortOrder
    isVerified?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumConnectionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionStatus | EnumConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConnectionStatusFilter<$PrismaModel> | $Enums.ConnectionStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ConnectionUserIdProviderCompoundUniqueInput = {
    userId: string
    provider: string
  }

  export type ConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessTokenEnc?: SortOrder
    refreshTokenEnc?: SortOrder
    expiresAt?: SortOrder
    scopes?: SortOrder
    status?: SortOrder
    lastSyncAt?: SortOrder
    providerUserId?: SortOrder
    providerUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessTokenEnc?: SortOrder
    refreshTokenEnc?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    lastSyncAt?: SortOrder
    providerUserId?: SortOrder
    providerUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    accessTokenEnc?: SortOrder
    refreshTokenEnc?: SortOrder
    expiresAt?: SortOrder
    status?: SortOrder
    lastSyncAt?: SortOrder
    providerUserId?: SortOrder
    providerUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConnectionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionStatus | EnumConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConnectionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConnectionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConnectionStatusFilter<$PrismaModel>
    _max?: NestedEnumConnectionStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LayoutPanelListRelationFilter = {
    every?: LayoutPanelWhereInput
    some?: LayoutPanelWhereInput
    none?: LayoutPanelWhereInput
  }

  export type LayoutPanelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LayoutCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    theme?: SortOrder
    gridSpecJson?: SortOrder
    isDefault?: SortOrder
    isPublic?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LayoutAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type LayoutMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    theme?: SortOrder
    isDefault?: SortOrder
    isPublic?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LayoutMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    theme?: SortOrder
    isDefault?: SortOrder
    isPublic?: SortOrder
    description?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LayoutSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumPanelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PanelType | EnumPanelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPanelTypeFilter<$PrismaModel> | $Enums.PanelType
  }

  export type PanelCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    propsJson?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    isBuiltIn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PanelAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type PanelMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isBuiltIn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PanelMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isBuiltIn?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PanelSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EnumPanelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PanelType | EnumPanelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPanelTypeWithAggregatesFilter<$PrismaModel> | $Enums.PanelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPanelTypeFilter<$PrismaModel>
    _max?: NestedEnumPanelTypeFilter<$PrismaModel>
  }

  export type LayoutScalarRelationFilter = {
    is?: LayoutWhereInput
    isNot?: LayoutWhereInput
  }

  export type PanelScalarRelationFilter = {
    is?: PanelWhereInput
    isNot?: PanelWhereInput
  }

  export type LayoutPanelLayoutIdPanelIdCompoundUniqueInput = {
    layoutId: string
    panelId: string
  }

  export type LayoutPanelCountOrderByAggregateInput = {
    id?: SortOrder
    layoutId?: SortOrder
    panelId?: SortOrder
    propsJson?: SortOrder
    gridX?: SortOrder
    gridY?: SortOrder
    gridWidth?: SortOrder
    gridHeight?: SortOrder
    isVisible?: SortOrder
    zIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LayoutPanelAvgOrderByAggregateInput = {
    gridX?: SortOrder
    gridY?: SortOrder
    gridWidth?: SortOrder
    gridHeight?: SortOrder
    zIndex?: SortOrder
  }

  export type LayoutPanelMaxOrderByAggregateInput = {
    id?: SortOrder
    layoutId?: SortOrder
    panelId?: SortOrder
    gridX?: SortOrder
    gridY?: SortOrder
    gridWidth?: SortOrder
    gridHeight?: SortOrder
    isVisible?: SortOrder
    zIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LayoutPanelMinOrderByAggregateInput = {
    id?: SortOrder
    layoutId?: SortOrder
    panelId?: SortOrder
    gridX?: SortOrder
    gridY?: SortOrder
    gridWidth?: SortOrder
    gridHeight?: SortOrder
    isVisible?: SortOrder
    zIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LayoutPanelSumOrderByAggregateInput = {
    gridX?: SortOrder
    gridY?: SortOrder
    gridWidth?: SortOrder
    gridHeight?: SortOrder
    zIndex?: SortOrder
  }

  export type EnumListTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ListType | EnumListTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListTypeFilter<$PrismaModel> | $Enums.ListType
  }

  export type ListItemListRelationFilter = {
    every?: ListItemWhereInput
    some?: ListItemWhereInput
    none?: ListItemWhereInput
  }

  export type ListItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ListCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    rulesJson?: SortOrder
    tags?: SortOrder
    thumbnail?: SortOrder
    itemCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncAt?: SortOrder
  }

  export type ListAvgOrderByAggregateInput = {
    itemCount?: SortOrder
  }

  export type ListMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    thumbnail?: SortOrder
    itemCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncAt?: SortOrder
  }

  export type ListMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    isPublic?: SortOrder
    thumbnail?: SortOrder
    itemCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSyncAt?: SortOrder
  }

  export type ListSumOrderByAggregateInput = {
    itemCount?: SortOrder
  }

  export type EnumListTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListType | EnumListTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListTypeWithAggregatesFilter<$PrismaModel> | $Enums.ListType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListTypeFilter<$PrismaModel>
    _max?: NestedEnumListTypeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ListScalarRelationFilter = {
    is?: ListWhereInput
    isNot?: ListWhereInput
  }

  export type ListItemListIdPlatformIdPlatformCompoundUniqueInput = {
    listId: string
    platformId: string
    platform: string
  }

  export type ListItemCountOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    duration?: SortOrder
    publishedAt?: SortOrder
    position?: SortOrder
    addedAt?: SortOrder
    notes?: SortOrder
    watchProgress?: SortOrder
    rating?: SortOrder
    isFavorite?: SortOrder
  }

  export type ListItemAvgOrderByAggregateInput = {
    duration?: SortOrder
    position?: SortOrder
    watchProgress?: SortOrder
    rating?: SortOrder
  }

  export type ListItemMaxOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    duration?: SortOrder
    publishedAt?: SortOrder
    position?: SortOrder
    addedAt?: SortOrder
    notes?: SortOrder
    watchProgress?: SortOrder
    rating?: SortOrder
    isFavorite?: SortOrder
  }

  export type ListItemMinOrderByAggregateInput = {
    id?: SortOrder
    listId?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    contentType?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnailUrl?: SortOrder
    duration?: SortOrder
    publishedAt?: SortOrder
    position?: SortOrder
    addedAt?: SortOrder
    notes?: SortOrder
    watchProgress?: SortOrder
    rating?: SortOrder
    isFavorite?: SortOrder
  }

  export type ListItemSumOrderByAggregateInput = {
    duration?: SortOrder
    position?: SortOrder
    watchProgress?: SortOrder
    rating?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type PreferenceUserIdKeyCompoundUniqueInput = {
    userId: string
    key: string
  }

  export type PreferenceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    valueJson?: SortOrder
    category?: SortOrder
    description?: SortOrder
    isUserSet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PreferenceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    category?: SortOrder
    description?: SortOrder
    isUserSet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PreferenceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    key?: SortOrder
    category?: SortOrder
    description?: SortOrder
    isUserSet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MigrationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    executedAt?: SortOrder
    checksum?: SortOrder
  }

  export type MigrationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    executedAt?: SortOrder
    checksum?: SortOrder
  }

  export type MigrationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    executedAt?: SortOrder
    checksum?: SortOrder
  }

  export type SystemConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    description?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEmbeddingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingStatus | EnumEmbeddingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingStatusFilter<$PrismaModel> | $Enums.EmbeddingStatus
  }

  export type VideoEmbeddingPlatformIdPlatformCompoundUniqueInput = {
    platformId: string
    platform: string
  }

  export type VideoEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    category?: SortOrder
    duration?: SortOrder
    publishedAt?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastProcessedAt?: SortOrder
  }

  export type VideoEmbeddingAvgOrderByAggregateInput = {
    duration?: SortOrder
    qualityScore?: SortOrder
  }

  export type VideoEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    duration?: SortOrder
    publishedAt?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastProcessedAt?: SortOrder
  }

  export type VideoEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    duration?: SortOrder
    publishedAt?: SortOrder
    channelId?: SortOrder
    channelName?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    qualityScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastProcessedAt?: SortOrder
  }

  export type VideoEmbeddingSumOrderByAggregateInput = {
    duration?: SortOrder
    qualityScore?: SortOrder
  }

  export type EnumEmbeddingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingStatus | EnumEmbeddingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmbeddingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmbeddingStatusFilter<$PrismaModel>
    _max?: NestedEnumEmbeddingStatusFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    confidenceScore?: SortOrder
    interactionCount?: SortOrder
    lastUpdateThreshold?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastCalculatedAt?: SortOrder
  }

  export type UserEmbeddingAvgOrderByAggregateInput = {
    confidenceScore?: SortOrder
    interactionCount?: SortOrder
    lastUpdateThreshold?: SortOrder
  }

  export type UserEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    confidenceScore?: SortOrder
    interactionCount?: SortOrder
    lastUpdateThreshold?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastCalculatedAt?: SortOrder
  }

  export type UserEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    confidenceScore?: SortOrder
    interactionCount?: SortOrder
    lastUpdateThreshold?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastCalculatedAt?: SortOrder
  }

  export type UserEmbeddingSumOrderByAggregateInput = {
    confidenceScore?: SortOrder
    interactionCount?: SortOrder
    lastUpdateThreshold?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type CommentEmbeddingPlatformIdPlatformCompoundUniqueInput = {
    platformId: string
    platform: string
  }

  export type CommentEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    videoId?: SortOrder
    content?: SortOrder
    authorName?: SortOrder
    publishedAt?: SortOrder
    toxicityScore?: SortOrder
    relevanceScore?: SortOrder
    sentimentScore?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentEmbeddingAvgOrderByAggregateInput = {
    toxicityScore?: SortOrder
    relevanceScore?: SortOrder
    sentimentScore?: SortOrder
  }

  export type CommentEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    videoId?: SortOrder
    content?: SortOrder
    authorName?: SortOrder
    publishedAt?: SortOrder
    toxicityScore?: SortOrder
    relevanceScore?: SortOrder
    sentimentScore?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    platformId?: SortOrder
    platform?: SortOrder
    videoId?: SortOrder
    content?: SortOrder
    authorName?: SortOrder
    publishedAt?: SortOrder
    toxicityScore?: SortOrder
    relevanceScore?: SortOrder
    sentimentScore?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    processingStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentEmbeddingSumOrderByAggregateInput = {
    toxicityScore?: SortOrder
    relevanceScore?: SortOrder
    sentimentScore?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SearchEmbeddingQueryUserIdCompoundUniqueInput = {
    query: string
    userId: string
  }

  export type SearchEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    intent?: SortOrder
    entities?: SortOrder
    searchCount?: SortOrder
    clickThrough?: SortOrder
    avgWatchTime?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSearchedAt?: SortOrder
  }

  export type SearchEmbeddingAvgOrderByAggregateInput = {
    searchCount?: SortOrder
    clickThrough?: SortOrder
    avgWatchTime?: SortOrder
  }

  export type SearchEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    intent?: SortOrder
    searchCount?: SortOrder
    clickThrough?: SortOrder
    avgWatchTime?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSearchedAt?: SortOrder
  }

  export type SearchEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    query?: SortOrder
    intent?: SortOrder
    searchCount?: SortOrder
    clickThrough?: SortOrder
    avgWatchTime?: SortOrder
    embeddingModel?: SortOrder
    embeddingVersion?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastSearchedAt?: SortOrder
  }

  export type SearchEmbeddingSumOrderByAggregateInput = {
    searchCount?: SortOrder
    clickThrough?: SortOrder
    avgWatchTime?: SortOrder
  }

  export type EnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type EmbeddingJobCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    batchSize?: SortOrder
    priority?: SortOrder
    configJson?: SortOrder
    totalItems?: SortOrder
    processedItems?: SortOrder
    failedItems?: SortOrder
    successItems?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    avgProcessingTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmbeddingJobAvgOrderByAggregateInput = {
    batchSize?: SortOrder
    priority?: SortOrder
    totalItems?: SortOrder
    processedItems?: SortOrder
    failedItems?: SortOrder
    successItems?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    avgProcessingTime?: SortOrder
  }

  export type EmbeddingJobMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    batchSize?: SortOrder
    priority?: SortOrder
    totalItems?: SortOrder
    processedItems?: SortOrder
    failedItems?: SortOrder
    successItems?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    avgProcessingTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmbeddingJobMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    batchSize?: SortOrder
    priority?: SortOrder
    totalItems?: SortOrder
    processedItems?: SortOrder
    failedItems?: SortOrder
    successItems?: SortOrder
    errorMessage?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    avgProcessingTime?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmbeddingJobSumOrderByAggregateInput = {
    batchSize?: SortOrder
    priority?: SortOrder
    totalItems?: SortOrder
    processedItems?: SortOrder
    failedItems?: SortOrder
    successItems?: SortOrder
    retryCount?: SortOrder
    maxRetries?: SortOrder
    avgProcessingTime?: SortOrder
  }

  export type EnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type ConnectionCreateNestedManyWithoutUserInput = {
    create?: XOR<ConnectionCreateWithoutUserInput, ConnectionUncheckedCreateWithoutUserInput> | ConnectionCreateWithoutUserInput[] | ConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutUserInput | ConnectionCreateOrConnectWithoutUserInput[]
    createMany?: ConnectionCreateManyUserInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type LayoutCreateNestedManyWithoutUserInput = {
    create?: XOR<LayoutCreateWithoutUserInput, LayoutUncheckedCreateWithoutUserInput> | LayoutCreateWithoutUserInput[] | LayoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LayoutCreateOrConnectWithoutUserInput | LayoutCreateOrConnectWithoutUserInput[]
    createMany?: LayoutCreateManyUserInputEnvelope
    connect?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
  }

  export type ListCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type PreferenceCreateNestedManyWithoutUserInput = {
    create?: XOR<PreferenceCreateWithoutUserInput, PreferenceUncheckedCreateWithoutUserInput> | PreferenceCreateWithoutUserInput[] | PreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutUserInput | PreferenceCreateOrConnectWithoutUserInput[]
    createMany?: PreferenceCreateManyUserInputEnvelope
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
  }

  export type UserEmbeddingCreateNestedOneWithoutUserInput = {
    connect?: UserEmbeddingWhereUniqueInput
  }

  export type SearchEmbeddingCreateNestedManyWithoutUserInput = {
    connect?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
  }

  export type ConnectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConnectionCreateWithoutUserInput, ConnectionUncheckedCreateWithoutUserInput> | ConnectionCreateWithoutUserInput[] | ConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutUserInput | ConnectionCreateOrConnectWithoutUserInput[]
    createMany?: ConnectionCreateManyUserInputEnvelope
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
  }

  export type LayoutUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LayoutCreateWithoutUserInput, LayoutUncheckedCreateWithoutUserInput> | LayoutCreateWithoutUserInput[] | LayoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LayoutCreateOrConnectWithoutUserInput | LayoutCreateOrConnectWithoutUserInput[]
    createMany?: LayoutCreateManyUserInputEnvelope
    connect?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
  }

  export type ListUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
  }

  export type PreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PreferenceCreateWithoutUserInput, PreferenceUncheckedCreateWithoutUserInput> | PreferenceCreateWithoutUserInput[] | PreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutUserInput | PreferenceCreateOrConnectWithoutUserInput[]
    createMany?: PreferenceCreateManyUserInputEnvelope
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
  }

  export type UserEmbeddingUncheckedCreateNestedOneWithoutUserInput = {
    connect?: UserEmbeddingWhereUniqueInput
  }

  export type SearchEmbeddingUncheckedCreateNestedManyWithoutUserInput = {
    connect?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConnectionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConnectionCreateWithoutUserInput, ConnectionUncheckedCreateWithoutUserInput> | ConnectionCreateWithoutUserInput[] | ConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutUserInput | ConnectionCreateOrConnectWithoutUserInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutUserInput | ConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConnectionCreateManyUserInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutUserInput | ConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutUserInput | ConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type LayoutUpdateManyWithoutUserNestedInput = {
    create?: XOR<LayoutCreateWithoutUserInput, LayoutUncheckedCreateWithoutUserInput> | LayoutCreateWithoutUserInput[] | LayoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LayoutCreateOrConnectWithoutUserInput | LayoutCreateOrConnectWithoutUserInput[]
    upsert?: LayoutUpsertWithWhereUniqueWithoutUserInput | LayoutUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LayoutCreateManyUserInputEnvelope
    set?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    disconnect?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    delete?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    connect?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    update?: LayoutUpdateWithWhereUniqueWithoutUserInput | LayoutUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LayoutUpdateManyWithWhereWithoutUserInput | LayoutUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LayoutScalarWhereInput | LayoutScalarWhereInput[]
  }

  export type ListUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type PreferenceUpdateManyWithoutUserNestedInput = {
    create?: XOR<PreferenceCreateWithoutUserInput, PreferenceUncheckedCreateWithoutUserInput> | PreferenceCreateWithoutUserInput[] | PreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutUserInput | PreferenceCreateOrConnectWithoutUserInput[]
    upsert?: PreferenceUpsertWithWhereUniqueWithoutUserInput | PreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PreferenceCreateManyUserInputEnvelope
    set?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    disconnect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    delete?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    update?: PreferenceUpdateWithWhereUniqueWithoutUserInput | PreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PreferenceUpdateManyWithWhereWithoutUserInput | PreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
  }

  export type UserEmbeddingUpdateOneWithoutUserNestedInput = {
    disconnect?: UserEmbeddingWhereInput | boolean
    delete?: UserEmbeddingWhereInput | boolean
    connect?: UserEmbeddingWhereUniqueInput
    update?: XOR<XOR<UserEmbeddingUpdateToOneWithWhereWithoutUserInput, UserEmbeddingUpdateWithoutUserInput>, UserEmbeddingUncheckedUpdateWithoutUserInput>
  }

  export type SearchEmbeddingUpdateManyWithoutUserNestedInput = {
    set?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    disconnect?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    delete?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    connect?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    update?: SearchEmbeddingUpdateWithWhereUniqueWithoutUserInput | SearchEmbeddingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchEmbeddingUpdateManyWithWhereWithoutUserInput | SearchEmbeddingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchEmbeddingScalarWhereInput | SearchEmbeddingScalarWhereInput[]
  }

  export type ConnectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConnectionCreateWithoutUserInput, ConnectionUncheckedCreateWithoutUserInput> | ConnectionCreateWithoutUserInput[] | ConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConnectionCreateOrConnectWithoutUserInput | ConnectionCreateOrConnectWithoutUserInput[]
    upsert?: ConnectionUpsertWithWhereUniqueWithoutUserInput | ConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConnectionCreateManyUserInputEnvelope
    set?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    disconnect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    delete?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    connect?: ConnectionWhereUniqueInput | ConnectionWhereUniqueInput[]
    update?: ConnectionUpdateWithWhereUniqueWithoutUserInput | ConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConnectionUpdateManyWithWhereWithoutUserInput | ConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
  }

  export type LayoutUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LayoutCreateWithoutUserInput, LayoutUncheckedCreateWithoutUserInput> | LayoutCreateWithoutUserInput[] | LayoutUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LayoutCreateOrConnectWithoutUserInput | LayoutCreateOrConnectWithoutUserInput[]
    upsert?: LayoutUpsertWithWhereUniqueWithoutUserInput | LayoutUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LayoutCreateManyUserInputEnvelope
    set?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    disconnect?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    delete?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    connect?: LayoutWhereUniqueInput | LayoutWhereUniqueInput[]
    update?: LayoutUpdateWithWhereUniqueWithoutUserInput | LayoutUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LayoutUpdateManyWithWhereWithoutUserInput | LayoutUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LayoutScalarWhereInput | LayoutScalarWhereInput[]
  }

  export type ListUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput> | ListCreateWithoutUserInput[] | ListUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ListCreateOrConnectWithoutUserInput | ListCreateOrConnectWithoutUserInput[]
    upsert?: ListUpsertWithWhereUniqueWithoutUserInput | ListUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ListCreateManyUserInputEnvelope
    set?: ListWhereUniqueInput | ListWhereUniqueInput[]
    disconnect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    delete?: ListWhereUniqueInput | ListWhereUniqueInput[]
    connect?: ListWhereUniqueInput | ListWhereUniqueInput[]
    update?: ListUpdateWithWhereUniqueWithoutUserInput | ListUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ListUpdateManyWithWhereWithoutUserInput | ListUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ListScalarWhereInput | ListScalarWhereInput[]
  }

  export type PreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PreferenceCreateWithoutUserInput, PreferenceUncheckedCreateWithoutUserInput> | PreferenceCreateWithoutUserInput[] | PreferenceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PreferenceCreateOrConnectWithoutUserInput | PreferenceCreateOrConnectWithoutUserInput[]
    upsert?: PreferenceUpsertWithWhereUniqueWithoutUserInput | PreferenceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PreferenceCreateManyUserInputEnvelope
    set?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    disconnect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    delete?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    connect?: PreferenceWhereUniqueInput | PreferenceWhereUniqueInput[]
    update?: PreferenceUpdateWithWhereUniqueWithoutUserInput | PreferenceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PreferenceUpdateManyWithWhereWithoutUserInput | PreferenceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
  }

  export type UserEmbeddingUncheckedUpdateOneWithoutUserNestedInput = {
    disconnect?: UserEmbeddingWhereInput | boolean
    delete?: UserEmbeddingWhereInput | boolean
    connect?: UserEmbeddingWhereUniqueInput
    update?: XOR<XOR<UserEmbeddingUpdateToOneWithWhereWithoutUserInput, UserEmbeddingUpdateWithoutUserInput>, UserEmbeddingUncheckedUpdateWithoutUserInput>
  }

  export type SearchEmbeddingUncheckedUpdateManyWithoutUserNestedInput = {
    set?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    disconnect?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    delete?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    connect?: SearchEmbeddingWhereUniqueInput | SearchEmbeddingWhereUniqueInput[]
    update?: SearchEmbeddingUpdateWithWhereUniqueWithoutUserInput | SearchEmbeddingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SearchEmbeddingUpdateManyWithWhereWithoutUserInput | SearchEmbeddingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SearchEmbeddingScalarWhereInput | SearchEmbeddingScalarWhereInput[]
  }

  export type ConnectionCreatescopesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutConnectionsInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    connect?: UserWhereUniqueInput
  }

  export type ConnectionUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumConnectionStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConnectionStatus
  }

  export type UserUpdateOneRequiredWithoutConnectionsNestedInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    upsert?: UserUpsertWithoutConnectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConnectionsInput, UserUpdateWithoutConnectionsInput>, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type LayoutCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutLayoutsInput = {
    create?: XOR<UserCreateWithoutLayoutsInput, UserUncheckedCreateWithoutLayoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLayoutsInput
    connect?: UserWhereUniqueInput
  }

  export type LayoutPanelCreateNestedManyWithoutLayoutInput = {
    create?: XOR<LayoutPanelCreateWithoutLayoutInput, LayoutPanelUncheckedCreateWithoutLayoutInput> | LayoutPanelCreateWithoutLayoutInput[] | LayoutPanelUncheckedCreateWithoutLayoutInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutLayoutInput | LayoutPanelCreateOrConnectWithoutLayoutInput[]
    createMany?: LayoutPanelCreateManyLayoutInputEnvelope
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
  }

  export type LayoutPanelUncheckedCreateNestedManyWithoutLayoutInput = {
    create?: XOR<LayoutPanelCreateWithoutLayoutInput, LayoutPanelUncheckedCreateWithoutLayoutInput> | LayoutPanelCreateWithoutLayoutInput[] | LayoutPanelUncheckedCreateWithoutLayoutInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutLayoutInput | LayoutPanelCreateOrConnectWithoutLayoutInput[]
    createMany?: LayoutPanelCreateManyLayoutInputEnvelope
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
  }

  export type LayoutUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutLayoutsNestedInput = {
    create?: XOR<UserCreateWithoutLayoutsInput, UserUncheckedCreateWithoutLayoutsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLayoutsInput
    upsert?: UserUpsertWithoutLayoutsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLayoutsInput, UserUpdateWithoutLayoutsInput>, UserUncheckedUpdateWithoutLayoutsInput>
  }

  export type LayoutPanelUpdateManyWithoutLayoutNestedInput = {
    create?: XOR<LayoutPanelCreateWithoutLayoutInput, LayoutPanelUncheckedCreateWithoutLayoutInput> | LayoutPanelCreateWithoutLayoutInput[] | LayoutPanelUncheckedCreateWithoutLayoutInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutLayoutInput | LayoutPanelCreateOrConnectWithoutLayoutInput[]
    upsert?: LayoutPanelUpsertWithWhereUniqueWithoutLayoutInput | LayoutPanelUpsertWithWhereUniqueWithoutLayoutInput[]
    createMany?: LayoutPanelCreateManyLayoutInputEnvelope
    set?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    disconnect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    delete?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    update?: LayoutPanelUpdateWithWhereUniqueWithoutLayoutInput | LayoutPanelUpdateWithWhereUniqueWithoutLayoutInput[]
    updateMany?: LayoutPanelUpdateManyWithWhereWithoutLayoutInput | LayoutPanelUpdateManyWithWhereWithoutLayoutInput[]
    deleteMany?: LayoutPanelScalarWhereInput | LayoutPanelScalarWhereInput[]
  }

  export type LayoutPanelUncheckedUpdateManyWithoutLayoutNestedInput = {
    create?: XOR<LayoutPanelCreateWithoutLayoutInput, LayoutPanelUncheckedCreateWithoutLayoutInput> | LayoutPanelCreateWithoutLayoutInput[] | LayoutPanelUncheckedCreateWithoutLayoutInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutLayoutInput | LayoutPanelCreateOrConnectWithoutLayoutInput[]
    upsert?: LayoutPanelUpsertWithWhereUniqueWithoutLayoutInput | LayoutPanelUpsertWithWhereUniqueWithoutLayoutInput[]
    createMany?: LayoutPanelCreateManyLayoutInputEnvelope
    set?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    disconnect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    delete?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    update?: LayoutPanelUpdateWithWhereUniqueWithoutLayoutInput | LayoutPanelUpdateWithWhereUniqueWithoutLayoutInput[]
    updateMany?: LayoutPanelUpdateManyWithWhereWithoutLayoutInput | LayoutPanelUpdateManyWithWhereWithoutLayoutInput[]
    deleteMany?: LayoutPanelScalarWhereInput | LayoutPanelScalarWhereInput[]
  }

  export type PanelCreatetagsInput = {
    set: string[]
  }

  export type LayoutPanelCreateNestedManyWithoutPanelInput = {
    create?: XOR<LayoutPanelCreateWithoutPanelInput, LayoutPanelUncheckedCreateWithoutPanelInput> | LayoutPanelCreateWithoutPanelInput[] | LayoutPanelUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutPanelInput | LayoutPanelCreateOrConnectWithoutPanelInput[]
    createMany?: LayoutPanelCreateManyPanelInputEnvelope
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
  }

  export type LayoutPanelUncheckedCreateNestedManyWithoutPanelInput = {
    create?: XOR<LayoutPanelCreateWithoutPanelInput, LayoutPanelUncheckedCreateWithoutPanelInput> | LayoutPanelCreateWithoutPanelInput[] | LayoutPanelUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutPanelInput | LayoutPanelCreateOrConnectWithoutPanelInput[]
    createMany?: LayoutPanelCreateManyPanelInputEnvelope
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
  }

  export type EnumPanelTypeFieldUpdateOperationsInput = {
    set?: $Enums.PanelType
  }

  export type PanelUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type LayoutPanelUpdateManyWithoutPanelNestedInput = {
    create?: XOR<LayoutPanelCreateWithoutPanelInput, LayoutPanelUncheckedCreateWithoutPanelInput> | LayoutPanelCreateWithoutPanelInput[] | LayoutPanelUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutPanelInput | LayoutPanelCreateOrConnectWithoutPanelInput[]
    upsert?: LayoutPanelUpsertWithWhereUniqueWithoutPanelInput | LayoutPanelUpsertWithWhereUniqueWithoutPanelInput[]
    createMany?: LayoutPanelCreateManyPanelInputEnvelope
    set?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    disconnect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    delete?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    update?: LayoutPanelUpdateWithWhereUniqueWithoutPanelInput | LayoutPanelUpdateWithWhereUniqueWithoutPanelInput[]
    updateMany?: LayoutPanelUpdateManyWithWhereWithoutPanelInput | LayoutPanelUpdateManyWithWhereWithoutPanelInput[]
    deleteMany?: LayoutPanelScalarWhereInput | LayoutPanelScalarWhereInput[]
  }

  export type LayoutPanelUncheckedUpdateManyWithoutPanelNestedInput = {
    create?: XOR<LayoutPanelCreateWithoutPanelInput, LayoutPanelUncheckedCreateWithoutPanelInput> | LayoutPanelCreateWithoutPanelInput[] | LayoutPanelUncheckedCreateWithoutPanelInput[]
    connectOrCreate?: LayoutPanelCreateOrConnectWithoutPanelInput | LayoutPanelCreateOrConnectWithoutPanelInput[]
    upsert?: LayoutPanelUpsertWithWhereUniqueWithoutPanelInput | LayoutPanelUpsertWithWhereUniqueWithoutPanelInput[]
    createMany?: LayoutPanelCreateManyPanelInputEnvelope
    set?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    disconnect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    delete?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    connect?: LayoutPanelWhereUniqueInput | LayoutPanelWhereUniqueInput[]
    update?: LayoutPanelUpdateWithWhereUniqueWithoutPanelInput | LayoutPanelUpdateWithWhereUniqueWithoutPanelInput[]
    updateMany?: LayoutPanelUpdateManyWithWhereWithoutPanelInput | LayoutPanelUpdateManyWithWhereWithoutPanelInput[]
    deleteMany?: LayoutPanelScalarWhereInput | LayoutPanelScalarWhereInput[]
  }

  export type LayoutCreateNestedOneWithoutLayoutPanelsInput = {
    create?: XOR<LayoutCreateWithoutLayoutPanelsInput, LayoutUncheckedCreateWithoutLayoutPanelsInput>
    connectOrCreate?: LayoutCreateOrConnectWithoutLayoutPanelsInput
    connect?: LayoutWhereUniqueInput
  }

  export type PanelCreateNestedOneWithoutLayoutPanelsInput = {
    create?: XOR<PanelCreateWithoutLayoutPanelsInput, PanelUncheckedCreateWithoutLayoutPanelsInput>
    connectOrCreate?: PanelCreateOrConnectWithoutLayoutPanelsInput
    connect?: PanelWhereUniqueInput
  }

  export type LayoutUpdateOneRequiredWithoutLayoutPanelsNestedInput = {
    create?: XOR<LayoutCreateWithoutLayoutPanelsInput, LayoutUncheckedCreateWithoutLayoutPanelsInput>
    connectOrCreate?: LayoutCreateOrConnectWithoutLayoutPanelsInput
    upsert?: LayoutUpsertWithoutLayoutPanelsInput
    connect?: LayoutWhereUniqueInput
    update?: XOR<XOR<LayoutUpdateToOneWithWhereWithoutLayoutPanelsInput, LayoutUpdateWithoutLayoutPanelsInput>, LayoutUncheckedUpdateWithoutLayoutPanelsInput>
  }

  export type PanelUpdateOneRequiredWithoutLayoutPanelsNestedInput = {
    create?: XOR<PanelCreateWithoutLayoutPanelsInput, PanelUncheckedCreateWithoutLayoutPanelsInput>
    connectOrCreate?: PanelCreateOrConnectWithoutLayoutPanelsInput
    upsert?: PanelUpsertWithoutLayoutPanelsInput
    connect?: PanelWhereUniqueInput
    update?: XOR<XOR<PanelUpdateToOneWithWhereWithoutLayoutPanelsInput, PanelUpdateWithoutLayoutPanelsInput>, PanelUncheckedUpdateWithoutLayoutPanelsInput>
  }

  export type ListCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutListsInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    connect?: UserWhereUniqueInput
  }

  export type ListItemCreateNestedManyWithoutListInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
  }

  export type ListItemUncheckedCreateNestedManyWithoutListInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
  }

  export type EnumListTypeFieldUpdateOperationsInput = {
    set?: $Enums.ListType
  }

  export type ListUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutListsNestedInput = {
    create?: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListsInput
    upsert?: UserUpsertWithoutListsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListsInput, UserUpdateWithoutListsInput>, UserUncheckedUpdateWithoutListsInput>
  }

  export type ListItemUpdateManyWithoutListNestedInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    upsert?: ListItemUpsertWithWhereUniqueWithoutListInput | ListItemUpsertWithWhereUniqueWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    set?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    disconnect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    delete?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    update?: ListItemUpdateWithWhereUniqueWithoutListInput | ListItemUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: ListItemUpdateManyWithWhereWithoutListInput | ListItemUpdateManyWithWhereWithoutListInput[]
    deleteMany?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
  }

  export type ListItemUncheckedUpdateManyWithoutListNestedInput = {
    create?: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput> | ListItemCreateWithoutListInput[] | ListItemUncheckedCreateWithoutListInput[]
    connectOrCreate?: ListItemCreateOrConnectWithoutListInput | ListItemCreateOrConnectWithoutListInput[]
    upsert?: ListItemUpsertWithWhereUniqueWithoutListInput | ListItemUpsertWithWhereUniqueWithoutListInput[]
    createMany?: ListItemCreateManyListInputEnvelope
    set?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    disconnect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    delete?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    connect?: ListItemWhereUniqueInput | ListItemWhereUniqueInput[]
    update?: ListItemUpdateWithWhereUniqueWithoutListInput | ListItemUpdateWithWhereUniqueWithoutListInput[]
    updateMany?: ListItemUpdateManyWithWhereWithoutListInput | ListItemUpdateManyWithWhereWithoutListInput[]
    deleteMany?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
  }

  export type ListCreateNestedOneWithoutListItemsInput = {
    create?: XOR<ListCreateWithoutListItemsInput, ListUncheckedCreateWithoutListItemsInput>
    connectOrCreate?: ListCreateOrConnectWithoutListItemsInput
    connect?: ListWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ListUpdateOneRequiredWithoutListItemsNestedInput = {
    create?: XOR<ListCreateWithoutListItemsInput, ListUncheckedCreateWithoutListItemsInput>
    connectOrCreate?: ListCreateOrConnectWithoutListItemsInput
    upsert?: ListUpsertWithoutListItemsInput
    connect?: ListWhereUniqueInput
    update?: XOR<XOR<ListUpdateToOneWithWhereWithoutListItemsInput, ListUpdateWithoutListItemsInput>, ListUncheckedUpdateWithoutListItemsInput>
  }

  export type UserCreateNestedOneWithoutPreferencesInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPreferencesInput
    upsert?: UserUpsertWithoutPreferencesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPreferencesInput, UserUpdateWithoutPreferencesInput>, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type VideoEmbeddingUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumEmbeddingStatusFieldUpdateOperationsInput = {
    set?: $Enums.EmbeddingStatus
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutUserEmbeddingNestedInput = {
    create?: XOR<UserCreateWithoutUserEmbeddingInput, UserUncheckedCreateWithoutUserEmbeddingInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserEmbeddingInput
    upsert?: UserUpsertWithoutUserEmbeddingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserEmbeddingInput, UserUpdateWithoutUserEmbeddingInput>, UserUncheckedUpdateWithoutUserEmbeddingInput>
  }

  export type SearchEmbeddingUpdateentitiesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneWithoutSearchEmbeddingsNestedInput = {
    create?: XOR<UserCreateWithoutSearchEmbeddingsInput, UserUncheckedCreateWithoutSearchEmbeddingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSearchEmbeddingsInput
    upsert?: UserUpsertWithoutSearchEmbeddingsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSearchEmbeddingsInput, UserUpdateWithoutSearchEmbeddingsInput>, UserUncheckedUpdateWithoutSearchEmbeddingsInput>
  }

  export type EnumJobTypeFieldUpdateOperationsInput = {
    set?: $Enums.JobType
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumConnectionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionStatus | EnumConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConnectionStatusFilter<$PrismaModel> | $Enums.ConnectionStatus
  }

  export type NestedEnumConnectionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConnectionStatus | EnumConnectionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConnectionStatus[] | ListEnumConnectionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConnectionStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConnectionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConnectionStatusFilter<$PrismaModel>
    _max?: NestedEnumConnectionStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumPanelTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PanelType | EnumPanelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPanelTypeFilter<$PrismaModel> | $Enums.PanelType
  }

  export type NestedEnumPanelTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PanelType | EnumPanelTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PanelType[] | ListEnumPanelTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPanelTypeWithAggregatesFilter<$PrismaModel> | $Enums.PanelType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPanelTypeFilter<$PrismaModel>
    _max?: NestedEnumPanelTypeFilter<$PrismaModel>
  }

  export type NestedEnumListTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ListType | EnumListTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListTypeFilter<$PrismaModel> | $Enums.ListType
  }

  export type NestedEnumListTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ListType | EnumListTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ListType[] | ListEnumListTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumListTypeWithAggregatesFilter<$PrismaModel> | $Enums.ListType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumListTypeFilter<$PrismaModel>
    _max?: NestedEnumListTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumEmbeddingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingStatus | EnumEmbeddingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingStatusFilter<$PrismaModel> | $Enums.EmbeddingStatus
  }

  export type NestedEnumEmbeddingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmbeddingStatus | EnumEmbeddingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmbeddingStatus[] | ListEnumEmbeddingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEmbeddingStatusWithAggregatesFilter<$PrismaModel> | $Enums.EmbeddingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmbeddingStatusFilter<$PrismaModel>
    _max?: NestedEnumEmbeddingStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumJobTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeFilter<$PrismaModel> | $Enums.JobType
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedEnumJobTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobType | EnumJobTypeFieldRefInput<$PrismaModel>
    in?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobType[] | ListEnumJobTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumJobTypeWithAggregatesFilter<$PrismaModel> | $Enums.JobType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobTypeFilter<$PrismaModel>
    _max?: NestedEnumJobTypeFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type ConnectionCreateWithoutUserInput = {
    id?: string
    provider: string
    accessTokenEnc: string
    refreshTokenEnc?: string | null
    expiresAt?: Date | string | null
    scopes?: ConnectionCreatescopesInput | string[]
    status?: $Enums.ConnectionStatus
    lastSyncAt?: Date | string | null
    providerUserId?: string | null
    providerUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    accessTokenEnc: string
    refreshTokenEnc?: string | null
    expiresAt?: Date | string | null
    scopes?: ConnectionCreatescopesInput | string[]
    status?: $Enums.ConnectionStatus
    lastSyncAt?: Date | string | null
    providerUserId?: string | null
    providerUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionCreateOrConnectWithoutUserInput = {
    where: ConnectionWhereUniqueInput
    create: XOR<ConnectionCreateWithoutUserInput, ConnectionUncheckedCreateWithoutUserInput>
  }

  export type ConnectionCreateManyUserInputEnvelope = {
    data: ConnectionCreateManyUserInput | ConnectionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LayoutCreateWithoutUserInput = {
    id?: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    layoutPanels?: LayoutPanelCreateNestedManyWithoutLayoutInput
  }

  export type LayoutUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    layoutPanels?: LayoutPanelUncheckedCreateNestedManyWithoutLayoutInput
  }

  export type LayoutCreateOrConnectWithoutUserInput = {
    where: LayoutWhereUniqueInput
    create: XOR<LayoutCreateWithoutUserInput, LayoutUncheckedCreateWithoutUserInput>
  }

  export type LayoutCreateManyUserInputEnvelope = {
    data: LayoutCreateManyUserInput | LayoutCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ListCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
    listItems?: ListItemCreateNestedManyWithoutListInput
  }

  export type ListUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
    listItems?: ListItemUncheckedCreateNestedManyWithoutListInput
  }

  export type ListCreateOrConnectWithoutUserInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListCreateManyUserInputEnvelope = {
    data: ListCreateManyUserInput | ListCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PreferenceCreateWithoutUserInput = {
    id?: string
    key: string
    valueJson: JsonNullValueInput | InputJsonValue
    category?: string | null
    description?: string | null
    isUserSet?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreferenceUncheckedCreateWithoutUserInput = {
    id?: string
    key: string
    valueJson: JsonNullValueInput | InputJsonValue
    category?: string | null
    description?: string | null
    isUserSet?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreferenceCreateOrConnectWithoutUserInput = {
    where: PreferenceWhereUniqueInput
    create: XOR<PreferenceCreateWithoutUserInput, PreferenceUncheckedCreateWithoutUserInput>
  }

  export type PreferenceCreateManyUserInputEnvelope = {
    data: PreferenceCreateManyUserInput | PreferenceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConnectionUpsertWithWhereUniqueWithoutUserInput = {
    where: ConnectionWhereUniqueInput
    update: XOR<ConnectionUpdateWithoutUserInput, ConnectionUncheckedUpdateWithoutUserInput>
    create: XOR<ConnectionCreateWithoutUserInput, ConnectionUncheckedCreateWithoutUserInput>
  }

  export type ConnectionUpdateWithWhereUniqueWithoutUserInput = {
    where: ConnectionWhereUniqueInput
    data: XOR<ConnectionUpdateWithoutUserInput, ConnectionUncheckedUpdateWithoutUserInput>
  }

  export type ConnectionUpdateManyWithWhereWithoutUserInput = {
    where: ConnectionScalarWhereInput
    data: XOR<ConnectionUpdateManyMutationInput, ConnectionUncheckedUpdateManyWithoutUserInput>
  }

  export type ConnectionScalarWhereInput = {
    AND?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    OR?: ConnectionScalarWhereInput[]
    NOT?: ConnectionScalarWhereInput | ConnectionScalarWhereInput[]
    id?: StringFilter<"Connection"> | string
    userId?: StringFilter<"Connection"> | string
    provider?: StringFilter<"Connection"> | string
    accessTokenEnc?: StringFilter<"Connection"> | string
    refreshTokenEnc?: StringNullableFilter<"Connection"> | string | null
    expiresAt?: DateTimeNullableFilter<"Connection"> | Date | string | null
    scopes?: StringNullableListFilter<"Connection">
    status?: EnumConnectionStatusFilter<"Connection"> | $Enums.ConnectionStatus
    lastSyncAt?: DateTimeNullableFilter<"Connection"> | Date | string | null
    providerUserId?: StringNullableFilter<"Connection"> | string | null
    providerUsername?: StringNullableFilter<"Connection"> | string | null
    createdAt?: DateTimeFilter<"Connection"> | Date | string
    updatedAt?: DateTimeFilter<"Connection"> | Date | string
  }

  export type LayoutUpsertWithWhereUniqueWithoutUserInput = {
    where: LayoutWhereUniqueInput
    update: XOR<LayoutUpdateWithoutUserInput, LayoutUncheckedUpdateWithoutUserInput>
    create: XOR<LayoutCreateWithoutUserInput, LayoutUncheckedCreateWithoutUserInput>
  }

  export type LayoutUpdateWithWhereUniqueWithoutUserInput = {
    where: LayoutWhereUniqueInput
    data: XOR<LayoutUpdateWithoutUserInput, LayoutUncheckedUpdateWithoutUserInput>
  }

  export type LayoutUpdateManyWithWhereWithoutUserInput = {
    where: LayoutScalarWhereInput
    data: XOR<LayoutUpdateManyMutationInput, LayoutUncheckedUpdateManyWithoutUserInput>
  }

  export type LayoutScalarWhereInput = {
    AND?: LayoutScalarWhereInput | LayoutScalarWhereInput[]
    OR?: LayoutScalarWhereInput[]
    NOT?: LayoutScalarWhereInput | LayoutScalarWhereInput[]
    id?: StringFilter<"Layout"> | string
    userId?: StringFilter<"Layout"> | string
    name?: StringFilter<"Layout"> | string
    theme?: StringNullableFilter<"Layout"> | string | null
    gridSpecJson?: JsonFilter<"Layout">
    isDefault?: BoolFilter<"Layout"> | boolean
    isPublic?: BoolFilter<"Layout"> | boolean
    description?: StringNullableFilter<"Layout"> | string | null
    tags?: StringNullableListFilter<"Layout">
    version?: IntFilter<"Layout"> | number
    createdAt?: DateTimeFilter<"Layout"> | Date | string
    updatedAt?: DateTimeFilter<"Layout"> | Date | string
  }

  export type ListUpsertWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    update: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
    create: XOR<ListCreateWithoutUserInput, ListUncheckedCreateWithoutUserInput>
  }

  export type ListUpdateWithWhereUniqueWithoutUserInput = {
    where: ListWhereUniqueInput
    data: XOR<ListUpdateWithoutUserInput, ListUncheckedUpdateWithoutUserInput>
  }

  export type ListUpdateManyWithWhereWithoutUserInput = {
    where: ListScalarWhereInput
    data: XOR<ListUpdateManyMutationInput, ListUncheckedUpdateManyWithoutUserInput>
  }

  export type ListScalarWhereInput = {
    AND?: ListScalarWhereInput | ListScalarWhereInput[]
    OR?: ListScalarWhereInput[]
    NOT?: ListScalarWhereInput | ListScalarWhereInput[]
    id?: StringFilter<"List"> | string
    userId?: StringFilter<"List"> | string
    name?: StringFilter<"List"> | string
    type?: EnumListTypeFilter<"List"> | $Enums.ListType
    description?: StringNullableFilter<"List"> | string | null
    isPublic?: BoolFilter<"List"> | boolean
    rulesJson?: JsonFilter<"List">
    tags?: StringNullableListFilter<"List">
    thumbnail?: StringNullableFilter<"List"> | string | null
    itemCount?: IntFilter<"List"> | number
    createdAt?: DateTimeFilter<"List"> | Date | string
    updatedAt?: DateTimeFilter<"List"> | Date | string
    lastSyncAt?: DateTimeNullableFilter<"List"> | Date | string | null
  }

  export type PreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: PreferenceWhereUniqueInput
    update: XOR<PreferenceUpdateWithoutUserInput, PreferenceUncheckedUpdateWithoutUserInput>
    create: XOR<PreferenceCreateWithoutUserInput, PreferenceUncheckedCreateWithoutUserInput>
  }

  export type PreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: PreferenceWhereUniqueInput
    data: XOR<PreferenceUpdateWithoutUserInput, PreferenceUncheckedUpdateWithoutUserInput>
  }

  export type PreferenceUpdateManyWithWhereWithoutUserInput = {
    where: PreferenceScalarWhereInput
    data: XOR<PreferenceUpdateManyMutationInput, PreferenceUncheckedUpdateManyWithoutUserInput>
  }

  export type PreferenceScalarWhereInput = {
    AND?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
    OR?: PreferenceScalarWhereInput[]
    NOT?: PreferenceScalarWhereInput | PreferenceScalarWhereInput[]
    id?: StringFilter<"Preference"> | string
    userId?: StringFilter<"Preference"> | string
    key?: StringFilter<"Preference"> | string
    valueJson?: JsonFilter<"Preference">
    category?: StringNullableFilter<"Preference"> | string | null
    description?: StringNullableFilter<"Preference"> | string | null
    isUserSet?: BoolFilter<"Preference"> | boolean
    createdAt?: DateTimeFilter<"Preference"> | Date | string
    updatedAt?: DateTimeFilter<"Preference"> | Date | string
  }

  export type UserEmbeddingUpdateToOneWithWhereWithoutUserInput = {
    where?: UserEmbeddingWhereInput
    data: XOR<UserEmbeddingUpdateWithoutUserInput, UserEmbeddingUncheckedUpdateWithoutUserInput>
  }

  export type UserEmbeddingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    interactionCount?: IntFieldUpdateOperationsInput | number
    lastUpdateThreshold?: IntFieldUpdateOperationsInput | number
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserEmbeddingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    confidenceScore?: FloatFieldUpdateOperationsInput | number
    interactionCount?: IntFieldUpdateOperationsInput | number
    lastUpdateThreshold?: IntFieldUpdateOperationsInput | number
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    processingStatus?: EnumEmbeddingStatusFieldUpdateOperationsInput | $Enums.EmbeddingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastCalculatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SearchEmbeddingUpdateWithWhereUniqueWithoutUserInput = {
    where: SearchEmbeddingWhereUniqueInput
    data: XOR<SearchEmbeddingUpdateWithoutUserInput, SearchEmbeddingUncheckedUpdateWithoutUserInput>
  }

  export type SearchEmbeddingUpdateManyWithWhereWithoutUserInput = {
    where: SearchEmbeddingScalarWhereInput
    data: XOR<SearchEmbeddingUpdateManyMutationInput, SearchEmbeddingUncheckedUpdateManyWithoutUserInput>
  }

  export type SearchEmbeddingScalarWhereInput = {
    AND?: SearchEmbeddingScalarWhereInput | SearchEmbeddingScalarWhereInput[]
    OR?: SearchEmbeddingScalarWhereInput[]
    NOT?: SearchEmbeddingScalarWhereInput | SearchEmbeddingScalarWhereInput[]
    id?: StringFilter<"SearchEmbedding"> | string
    userId?: StringNullableFilter<"SearchEmbedding"> | string | null
    query?: StringFilter<"SearchEmbedding"> | string
    intent?: StringNullableFilter<"SearchEmbedding"> | string | null
    entities?: StringNullableListFilter<"SearchEmbedding">
    searchCount?: IntFilter<"SearchEmbedding"> | number
    clickThrough?: FloatFilter<"SearchEmbedding"> | number
    avgWatchTime?: FloatNullableFilter<"SearchEmbedding"> | number | null
    embeddingModel?: StringFilter<"SearchEmbedding"> | string
    embeddingVersion?: StringFilter<"SearchEmbedding"> | string
    createdAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    updatedAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
    lastSearchedAt?: DateTimeFilter<"SearchEmbedding"> | Date | string
  }

  export type UserCreateWithoutConnectionsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    layouts?: LayoutCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    preferences?: PreferenceCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConnectionsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    layouts?: LayoutUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    preferences?: PreferenceUncheckedCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingUncheckedCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConnectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
  }

  export type UserUpsertWithoutConnectionsInput = {
    update: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConnectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type UserUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    layouts?: LayoutUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    layouts?: LayoutUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUncheckedUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUncheckedUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLayoutsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    preferences?: PreferenceCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLayoutsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    preferences?: PreferenceUncheckedCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingUncheckedCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLayoutsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLayoutsInput, UserUncheckedCreateWithoutLayoutsInput>
  }

  export type LayoutPanelCreateWithoutLayoutInput = {
    id?: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    panel: PanelCreateNestedOneWithoutLayoutPanelsInput
  }

  export type LayoutPanelUncheckedCreateWithoutLayoutInput = {
    id?: string
    panelId: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutPanelCreateOrConnectWithoutLayoutInput = {
    where: LayoutPanelWhereUniqueInput
    create: XOR<LayoutPanelCreateWithoutLayoutInput, LayoutPanelUncheckedCreateWithoutLayoutInput>
  }

  export type LayoutPanelCreateManyLayoutInputEnvelope = {
    data: LayoutPanelCreateManyLayoutInput | LayoutPanelCreateManyLayoutInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutLayoutsInput = {
    update: XOR<UserUpdateWithoutLayoutsInput, UserUncheckedUpdateWithoutLayoutsInput>
    create: XOR<UserCreateWithoutLayoutsInput, UserUncheckedCreateWithoutLayoutsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLayoutsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLayoutsInput, UserUncheckedUpdateWithoutLayoutsInput>
  }

  export type UserUpdateWithoutLayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLayoutsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUncheckedUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUncheckedUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LayoutPanelUpsertWithWhereUniqueWithoutLayoutInput = {
    where: LayoutPanelWhereUniqueInput
    update: XOR<LayoutPanelUpdateWithoutLayoutInput, LayoutPanelUncheckedUpdateWithoutLayoutInput>
    create: XOR<LayoutPanelCreateWithoutLayoutInput, LayoutPanelUncheckedCreateWithoutLayoutInput>
  }

  export type LayoutPanelUpdateWithWhereUniqueWithoutLayoutInput = {
    where: LayoutPanelWhereUniqueInput
    data: XOR<LayoutPanelUpdateWithoutLayoutInput, LayoutPanelUncheckedUpdateWithoutLayoutInput>
  }

  export type LayoutPanelUpdateManyWithWhereWithoutLayoutInput = {
    where: LayoutPanelScalarWhereInput
    data: XOR<LayoutPanelUpdateManyMutationInput, LayoutPanelUncheckedUpdateManyWithoutLayoutInput>
  }

  export type LayoutPanelScalarWhereInput = {
    AND?: LayoutPanelScalarWhereInput | LayoutPanelScalarWhereInput[]
    OR?: LayoutPanelScalarWhereInput[]
    NOT?: LayoutPanelScalarWhereInput | LayoutPanelScalarWhereInput[]
    id?: StringFilter<"LayoutPanel"> | string
    layoutId?: StringFilter<"LayoutPanel"> | string
    panelId?: StringFilter<"LayoutPanel"> | string
    propsJson?: JsonFilter<"LayoutPanel">
    gridX?: IntFilter<"LayoutPanel"> | number
    gridY?: IntFilter<"LayoutPanel"> | number
    gridWidth?: IntFilter<"LayoutPanel"> | number
    gridHeight?: IntFilter<"LayoutPanel"> | number
    isVisible?: BoolFilter<"LayoutPanel"> | boolean
    zIndex?: IntFilter<"LayoutPanel"> | number
    createdAt?: DateTimeFilter<"LayoutPanel"> | Date | string
    updatedAt?: DateTimeFilter<"LayoutPanel"> | Date | string
  }

  export type LayoutPanelCreateWithoutPanelInput = {
    id?: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    layout: LayoutCreateNestedOneWithoutLayoutPanelsInput
  }

  export type LayoutPanelUncheckedCreateWithoutPanelInput = {
    id?: string
    layoutId: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutPanelCreateOrConnectWithoutPanelInput = {
    where: LayoutPanelWhereUniqueInput
    create: XOR<LayoutPanelCreateWithoutPanelInput, LayoutPanelUncheckedCreateWithoutPanelInput>
  }

  export type LayoutPanelCreateManyPanelInputEnvelope = {
    data: LayoutPanelCreateManyPanelInput | LayoutPanelCreateManyPanelInput[]
    skipDuplicates?: boolean
  }

  export type LayoutPanelUpsertWithWhereUniqueWithoutPanelInput = {
    where: LayoutPanelWhereUniqueInput
    update: XOR<LayoutPanelUpdateWithoutPanelInput, LayoutPanelUncheckedUpdateWithoutPanelInput>
    create: XOR<LayoutPanelCreateWithoutPanelInput, LayoutPanelUncheckedCreateWithoutPanelInput>
  }

  export type LayoutPanelUpdateWithWhereUniqueWithoutPanelInput = {
    where: LayoutPanelWhereUniqueInput
    data: XOR<LayoutPanelUpdateWithoutPanelInput, LayoutPanelUncheckedUpdateWithoutPanelInput>
  }

  export type LayoutPanelUpdateManyWithWhereWithoutPanelInput = {
    where: LayoutPanelScalarWhereInput
    data: XOR<LayoutPanelUpdateManyMutationInput, LayoutPanelUncheckedUpdateManyWithoutPanelInput>
  }

  export type LayoutCreateWithoutLayoutPanelsInput = {
    id?: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLayoutsInput
  }

  export type LayoutUncheckedCreateWithoutLayoutPanelsInput = {
    id?: string
    userId: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutCreateOrConnectWithoutLayoutPanelsInput = {
    where: LayoutWhereUniqueInput
    create: XOR<LayoutCreateWithoutLayoutPanelsInput, LayoutUncheckedCreateWithoutLayoutPanelsInput>
  }

  export type PanelCreateWithoutLayoutPanelsInput = {
    id?: string
    type: $Enums.PanelType
    name: string
    description?: string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: string | null
    tags?: PanelCreatetagsInput | string[]
    isBuiltIn?: boolean
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PanelUncheckedCreateWithoutLayoutPanelsInput = {
    id?: string
    type: $Enums.PanelType
    name: string
    description?: string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: string | null
    tags?: PanelCreatetagsInput | string[]
    isBuiltIn?: boolean
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PanelCreateOrConnectWithoutLayoutPanelsInput = {
    where: PanelWhereUniqueInput
    create: XOR<PanelCreateWithoutLayoutPanelsInput, PanelUncheckedCreateWithoutLayoutPanelsInput>
  }

  export type LayoutUpsertWithoutLayoutPanelsInput = {
    update: XOR<LayoutUpdateWithoutLayoutPanelsInput, LayoutUncheckedUpdateWithoutLayoutPanelsInput>
    create: XOR<LayoutCreateWithoutLayoutPanelsInput, LayoutUncheckedCreateWithoutLayoutPanelsInput>
    where?: LayoutWhereInput
  }

  export type LayoutUpdateToOneWithWhereWithoutLayoutPanelsInput = {
    where?: LayoutWhereInput
    data: XOR<LayoutUpdateWithoutLayoutPanelsInput, LayoutUncheckedUpdateWithoutLayoutPanelsInput>
  }

  export type LayoutUpdateWithoutLayoutPanelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLayoutsNestedInput
  }

  export type LayoutUncheckedUpdateWithoutLayoutPanelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PanelUpsertWithoutLayoutPanelsInput = {
    update: XOR<PanelUpdateWithoutLayoutPanelsInput, PanelUncheckedUpdateWithoutLayoutPanelsInput>
    create: XOR<PanelCreateWithoutLayoutPanelsInput, PanelUncheckedCreateWithoutLayoutPanelsInput>
    where?: PanelWhereInput
  }

  export type PanelUpdateToOneWithWhereWithoutLayoutPanelsInput = {
    where?: PanelWhereInput
    data: XOR<PanelUpdateWithoutLayoutPanelsInput, PanelUncheckedUpdateWithoutLayoutPanelsInput>
  }

  export type PanelUpdateWithoutLayoutPanelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPanelTypeFieldUpdateOperationsInput | $Enums.PanelType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PanelUpdatetagsInput | string[]
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PanelUncheckedUpdateWithoutLayoutPanelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumPanelTypeFieldUpdateOperationsInput | $Enums.PanelType
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    propsJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: PanelUpdatetagsInput | string[]
    isBuiltIn?: BoolFieldUpdateOperationsInput | boolean
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutListsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionCreateNestedManyWithoutUserInput
    layouts?: LayoutCreateNestedManyWithoutUserInput
    preferences?: PreferenceCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
    layouts?: LayoutUncheckedCreateNestedManyWithoutUserInput
    preferences?: PreferenceUncheckedCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingUncheckedCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
  }

  export type ListItemCreateWithoutListInput = {
    id?: string
    platformId: string
    platform: string
    contentType?: string
    title?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    publishedAt?: Date | string | null
    position?: number
    addedAt?: Date | string
    notes?: string | null
    watchProgress?: number | null
    rating?: number | null
    isFavorite?: boolean
  }

  export type ListItemUncheckedCreateWithoutListInput = {
    id?: string
    platformId: string
    platform: string
    contentType?: string
    title?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    publishedAt?: Date | string | null
    position?: number
    addedAt?: Date | string
    notes?: string | null
    watchProgress?: number | null
    rating?: number | null
    isFavorite?: boolean
  }

  export type ListItemCreateOrConnectWithoutListInput = {
    where: ListItemWhereUniqueInput
    create: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput>
  }

  export type ListItemCreateManyListInputEnvelope = {
    data: ListItemCreateManyListInput | ListItemCreateManyListInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutListsInput = {
    update: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
    create: XOR<UserCreateWithoutListsInput, UserUncheckedCreateWithoutListsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListsInput, UserUncheckedUpdateWithoutListsInput>
  }

  export type UserUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUpdateManyWithoutUserNestedInput
    layouts?: LayoutUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
    layouts?: LayoutUncheckedUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUncheckedUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUncheckedUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ListItemUpsertWithWhereUniqueWithoutListInput = {
    where: ListItemWhereUniqueInput
    update: XOR<ListItemUpdateWithoutListInput, ListItemUncheckedUpdateWithoutListInput>
    create: XOR<ListItemCreateWithoutListInput, ListItemUncheckedCreateWithoutListInput>
  }

  export type ListItemUpdateWithWhereUniqueWithoutListInput = {
    where: ListItemWhereUniqueInput
    data: XOR<ListItemUpdateWithoutListInput, ListItemUncheckedUpdateWithoutListInput>
  }

  export type ListItemUpdateManyWithWhereWithoutListInput = {
    where: ListItemScalarWhereInput
    data: XOR<ListItemUpdateManyMutationInput, ListItemUncheckedUpdateManyWithoutListInput>
  }

  export type ListItemScalarWhereInput = {
    AND?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
    OR?: ListItemScalarWhereInput[]
    NOT?: ListItemScalarWhereInput | ListItemScalarWhereInput[]
    id?: StringFilter<"ListItem"> | string
    listId?: StringFilter<"ListItem"> | string
    platformId?: StringFilter<"ListItem"> | string
    platform?: StringFilter<"ListItem"> | string
    contentType?: StringFilter<"ListItem"> | string
    title?: StringNullableFilter<"ListItem"> | string | null
    description?: StringNullableFilter<"ListItem"> | string | null
    thumbnailUrl?: StringNullableFilter<"ListItem"> | string | null
    duration?: IntNullableFilter<"ListItem"> | number | null
    publishedAt?: DateTimeNullableFilter<"ListItem"> | Date | string | null
    position?: IntFilter<"ListItem"> | number
    addedAt?: DateTimeFilter<"ListItem"> | Date | string
    notes?: StringNullableFilter<"ListItem"> | string | null
    watchProgress?: FloatNullableFilter<"ListItem"> | number | null
    rating?: IntNullableFilter<"ListItem"> | number | null
    isFavorite?: BoolFilter<"ListItem"> | boolean
  }

  export type ListCreateWithoutListItemsInput = {
    id?: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
    user: UserCreateNestedOneWithoutListsInput
  }

  export type ListUncheckedCreateWithoutListItemsInput = {
    id?: string
    userId: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
  }

  export type ListCreateOrConnectWithoutListItemsInput = {
    where: ListWhereUniqueInput
    create: XOR<ListCreateWithoutListItemsInput, ListUncheckedCreateWithoutListItemsInput>
  }

  export type ListUpsertWithoutListItemsInput = {
    update: XOR<ListUpdateWithoutListItemsInput, ListUncheckedUpdateWithoutListItemsInput>
    create: XOR<ListCreateWithoutListItemsInput, ListUncheckedCreateWithoutListItemsInput>
    where?: ListWhereInput
  }

  export type ListUpdateToOneWithWhereWithoutListItemsInput = {
    where?: ListWhereInput
    data: XOR<ListUpdateWithoutListItemsInput, ListUncheckedUpdateWithoutListItemsInput>
  }

  export type ListUpdateWithoutListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutListsNestedInput
  }

  export type ListUncheckedUpdateWithoutListItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserCreateWithoutPreferencesInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionCreateNestedManyWithoutUserInput
    layouts?: LayoutCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPreferencesInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
    layouts?: LayoutUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingUncheckedCreateNestedOneWithoutUserInput
    searchEmbeddings?: SearchEmbeddingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPreferencesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
  }

  export type UserUpsertWithoutPreferencesInput = {
    update: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
    create: XOR<UserCreateWithoutPreferencesInput, UserUncheckedCreateWithoutPreferencesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPreferencesInput, UserUncheckedUpdateWithoutPreferencesInput>
  }

  export type UserUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUpdateManyWithoutUserNestedInput
    layouts?: LayoutUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPreferencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
    layouts?: LayoutUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUncheckedUpdateOneWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutUserEmbeddingInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionCreateNestedManyWithoutUserInput
    layouts?: LayoutCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    preferences?: PreferenceCreateNestedManyWithoutUserInput
    searchEmbeddings?: SearchEmbeddingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserEmbeddingInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
    layouts?: LayoutUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    preferences?: PreferenceUncheckedCreateNestedManyWithoutUserInput
    searchEmbeddings?: SearchEmbeddingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserEmbeddingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserEmbeddingInput, UserUncheckedCreateWithoutUserEmbeddingInput>
  }

  export type UserUpsertWithoutUserEmbeddingInput = {
    update: XOR<UserUpdateWithoutUserEmbeddingInput, UserUncheckedUpdateWithoutUserEmbeddingInput>
    create: XOR<UserCreateWithoutUserEmbeddingInput, UserUncheckedCreateWithoutUserEmbeddingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserEmbeddingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserEmbeddingInput, UserUncheckedUpdateWithoutUserEmbeddingInput>
  }

  export type UserUpdateWithoutUserEmbeddingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUpdateManyWithoutUserNestedInput
    layouts?: LayoutUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUpdateManyWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserEmbeddingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
    layouts?: LayoutUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUncheckedUpdateManyWithoutUserNestedInput
    searchEmbeddings?: SearchEmbeddingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSearchEmbeddingsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionCreateNestedManyWithoutUserInput
    layouts?: LayoutCreateNestedManyWithoutUserInput
    lists?: ListCreateNestedManyWithoutUserInput
    preferences?: PreferenceCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSearchEmbeddingsInput = {
    id?: string
    email: string
    clerkId?: string | null
    username?: string | null
    displayName?: string | null
    avatar?: string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    isActive?: boolean
    isVerified?: boolean
    connections?: ConnectionUncheckedCreateNestedManyWithoutUserInput
    layouts?: LayoutUncheckedCreateNestedManyWithoutUserInput
    lists?: ListUncheckedCreateNestedManyWithoutUserInput
    preferences?: PreferenceUncheckedCreateNestedManyWithoutUserInput
    userEmbedding?: UserEmbeddingUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSearchEmbeddingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSearchEmbeddingsInput, UserUncheckedCreateWithoutSearchEmbeddingsInput>
  }

  export type UserUpsertWithoutSearchEmbeddingsInput = {
    update: XOR<UserUpdateWithoutSearchEmbeddingsInput, UserUncheckedUpdateWithoutSearchEmbeddingsInput>
    create: XOR<UserCreateWithoutSearchEmbeddingsInput, UserUncheckedCreateWithoutSearchEmbeddingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSearchEmbeddingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSearchEmbeddingsInput, UserUncheckedUpdateWithoutSearchEmbeddingsInput>
  }

  export type UserUpdateWithoutSearchEmbeddingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUpdateManyWithoutUserNestedInput
    layouts?: LayoutUpdateManyWithoutUserNestedInput
    lists?: ListUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSearchEmbeddingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    settingsJson?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    connections?: ConnectionUncheckedUpdateManyWithoutUserNestedInput
    layouts?: LayoutUncheckedUpdateManyWithoutUserNestedInput
    lists?: ListUncheckedUpdateManyWithoutUserNestedInput
    preferences?: PreferenceUncheckedUpdateManyWithoutUserNestedInput
    userEmbedding?: UserEmbeddingUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ConnectionCreateManyUserInput = {
    id?: string
    provider: string
    accessTokenEnc: string
    refreshTokenEnc?: string | null
    expiresAt?: Date | string | null
    scopes?: ConnectionCreatescopesInput | string[]
    status?: $Enums.ConnectionStatus
    lastSyncAt?: Date | string | null
    providerUserId?: string | null
    providerUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutCreateManyUserInput = {
    id?: string
    name: string
    theme?: string | null
    gridSpecJson: JsonNullValueInput | InputJsonValue
    isDefault?: boolean
    isPublic?: boolean
    description?: string | null
    tags?: LayoutCreatetagsInput | string[]
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ListCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.ListType
    description?: string | null
    isPublic?: boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListCreatetagsInput | string[]
    thumbnail?: string | null
    itemCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSyncAt?: Date | string | null
  }

  export type PreferenceCreateManyUserInput = {
    id?: string
    key: string
    valueJson: JsonNullValueInput | InputJsonValue
    category?: string | null
    description?: string | null
    isUserSet?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConnectionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessTokenEnc?: StringFieldUpdateOperationsInput | string
    refreshTokenEnc?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ConnectionUpdatescopesInput | string[]
    status?: EnumConnectionStatusFieldUpdateOperationsInput | $Enums.ConnectionStatus
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    providerUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessTokenEnc?: StringFieldUpdateOperationsInput | string
    refreshTokenEnc?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ConnectionUpdatescopesInput | string[]
    status?: EnumConnectionStatusFieldUpdateOperationsInput | $Enums.ConnectionStatus
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    providerUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConnectionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    accessTokenEnc?: StringFieldUpdateOperationsInput | string
    refreshTokenEnc?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ConnectionUpdatescopesInput | string[]
    status?: EnumConnectionStatusFieldUpdateOperationsInput | $Enums.ConnectionStatus
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    providerUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    layoutPanels?: LayoutPanelUpdateManyWithoutLayoutNestedInput
  }

  export type LayoutUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    layoutPanels?: LayoutPanelUncheckedUpdateManyWithoutLayoutNestedInput
  }

  export type LayoutUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    gridSpecJson?: JsonNullValueInput | InputJsonValue
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LayoutUpdatetagsInput | string[]
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listItems?: ListItemUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    listItems?: ListItemUncheckedUpdateManyWithoutListNestedInput
  }

  export type ListUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumListTypeFieldUpdateOperationsInput | $Enums.ListType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    rulesJson?: JsonNullValueInput | InputJsonValue
    tags?: ListUpdatetagsInput | string[]
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    itemCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PreferenceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    valueJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSet?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    valueJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSet?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreferenceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    valueJson?: JsonNullValueInput | InputJsonValue
    category?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isUserSet?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEmbeddingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: SearchEmbeddingUpdateentitiesInput | string[]
    searchCount?: IntFieldUpdateOperationsInput | number
    clickThrough?: FloatFieldUpdateOperationsInput | number
    avgWatchTime?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSearchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEmbeddingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: SearchEmbeddingUpdateentitiesInput | string[]
    searchCount?: IntFieldUpdateOperationsInput | number
    clickThrough?: FloatFieldUpdateOperationsInput | number
    avgWatchTime?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSearchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SearchEmbeddingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    intent?: NullableStringFieldUpdateOperationsInput | string | null
    entities?: SearchEmbeddingUpdateentitiesInput | string[]
    searchCount?: IntFieldUpdateOperationsInput | number
    clickThrough?: FloatFieldUpdateOperationsInput | number
    avgWatchTime?: NullableFloatFieldUpdateOperationsInput | number | null
    embeddingModel?: StringFieldUpdateOperationsInput | string
    embeddingVersion?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSearchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutPanelCreateManyLayoutInput = {
    id?: string
    panelId: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutPanelUpdateWithoutLayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    panel?: PanelUpdateOneRequiredWithoutLayoutPanelsNestedInput
  }

  export type LayoutPanelUncheckedUpdateWithoutLayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    panelId?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutPanelUncheckedUpdateManyWithoutLayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    panelId?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutPanelCreateManyPanelInput = {
    id?: string
    layoutId: string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX: number
    gridY: number
    gridWidth: number
    gridHeight: number
    isVisible?: boolean
    zIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LayoutPanelUpdateWithoutPanelInput = {
    id?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    layout?: LayoutUpdateOneRequiredWithoutLayoutPanelsNestedInput
  }

  export type LayoutPanelUncheckedUpdateWithoutPanelInput = {
    id?: StringFieldUpdateOperationsInput | string
    layoutId?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LayoutPanelUncheckedUpdateManyWithoutPanelInput = {
    id?: StringFieldUpdateOperationsInput | string
    layoutId?: StringFieldUpdateOperationsInput | string
    propsJson?: JsonNullValueInput | InputJsonValue
    gridX?: IntFieldUpdateOperationsInput | number
    gridY?: IntFieldUpdateOperationsInput | number
    gridWidth?: IntFieldUpdateOperationsInput | number
    gridHeight?: IntFieldUpdateOperationsInput | number
    isVisible?: BoolFieldUpdateOperationsInput | boolean
    zIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ListItemCreateManyListInput = {
    id?: string
    platformId: string
    platform: string
    contentType?: string
    title?: string | null
    description?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    publishedAt?: Date | string | null
    position?: number
    addedAt?: Date | string
    notes?: string | null
    watchProgress?: number | null
    rating?: number | null
    isFavorite?: boolean
  }

  export type ListItemUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    watchProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListItemUncheckedUpdateWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    watchProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ListItemUncheckedUpdateManyWithoutListInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    position?: IntFieldUpdateOperationsInput | number
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    watchProgress?: NullableFloatFieldUpdateOperationsInput | number | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}