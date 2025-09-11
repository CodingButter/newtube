
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
 * Model ConversationSession
 * Conversational AI tour sessions for onboarding and interaction
 */
export type ConversationSession = $Result.DefaultSelection<Prisma.$ConversationSessionPayload>
/**
 * Model ConversationLog
 * Individual messages/interactions within a conversation
 */
export type ConversationLog = $Result.DefaultSelection<Prisma.$ConversationLogPayload>
/**
 * Model TourInteraction
 * Specific tour interactions and user actions
 */
export type TourInteraction = $Result.DefaultSelection<Prisma.$TourInteractionPayload>
/**
 * Model LocalStorageSync
 * Temporary storage for unregistered user data before account creation
 */
export type LocalStorageSync = $Result.DefaultSelection<Prisma.$LocalStorageSyncPayload>
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


export const TourStep: {
  WELCOME: 'WELCOME',
  INTRODUCTION: 'INTRODUCTION',
  INTERESTS: 'INTERESTS',
  VIDEO_RATING: 'VIDEO_RATING',
  LAYOUT_BUILDING: 'LAYOUT_BUILDING',
  REGISTRATION: 'REGISTRATION',
  COMPLETED: 'COMPLETED'
};

export type TourStep = (typeof TourStep)[keyof typeof TourStep]


export const MessageRole: {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
  SYSTEM: 'SYSTEM'
};

export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole]

}

export type ConnectionStatus = $Enums.ConnectionStatus

export const ConnectionStatus: typeof $Enums.ConnectionStatus

export type PanelType = $Enums.PanelType

export const PanelType: typeof $Enums.PanelType

export type ListType = $Enums.ListType

export const ListType: typeof $Enums.ListType

export type TourStep = $Enums.TourStep

export const TourStep: typeof $Enums.TourStep

export type MessageRole = $Enums.MessageRole

export const MessageRole: typeof $Enums.MessageRole

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
   * `prisma.conversationSession`: Exposes CRUD operations for the **ConversationSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConversationSessions
    * const conversationSessions = await prisma.conversationSession.findMany()
    * ```
    */
  get conversationSession(): Prisma.ConversationSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversationLog`: Exposes CRUD operations for the **ConversationLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConversationLogs
    * const conversationLogs = await prisma.conversationLog.findMany()
    * ```
    */
  get conversationLog(): Prisma.ConversationLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tourInteraction`: Exposes CRUD operations for the **TourInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TourInteractions
    * const tourInteractions = await prisma.tourInteraction.findMany()
    * ```
    */
  get tourInteraction(): Prisma.TourInteractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.localStorageSync`: Exposes CRUD operations for the **LocalStorageSync** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LocalStorageSyncs
    * const localStorageSyncs = await prisma.localStorageSync.findMany()
    * ```
    */
  get localStorageSync(): Prisma.LocalStorageSyncDelegate<ExtArgs, ClientOptions>;

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
    ConversationSession: 'ConversationSession',
    ConversationLog: 'ConversationLog',
    TourInteraction: 'TourInteraction',
    LocalStorageSync: 'LocalStorageSync',
    Migration: 'Migration',
    SystemConfig: 'SystemConfig'
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
      modelProps: "user" | "connection" | "layout" | "panel" | "layoutPanel" | "list" | "listItem" | "preference" | "conversationSession" | "conversationLog" | "tourInteraction" | "localStorageSync" | "migration" | "systemConfig"
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
      ConversationSession: {
        payload: Prisma.$ConversationSessionPayload<ExtArgs>
        fields: Prisma.ConversationSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>
          }
          findFirst: {
            args: Prisma.ConversationSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>
          }
          findMany: {
            args: Prisma.ConversationSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>[]
          }
          create: {
            args: Prisma.ConversationSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>
          }
          createMany: {
            args: Prisma.ConversationSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>[]
          }
          delete: {
            args: Prisma.ConversationSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>
          }
          update: {
            args: Prisma.ConversationSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>
          }
          deleteMany: {
            args: Prisma.ConversationSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>[]
          }
          upsert: {
            args: Prisma.ConversationSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationSessionPayload>
          }
          aggregate: {
            args: Prisma.ConversationSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversationSession>
          }
          groupBy: {
            args: Prisma.ConversationSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationSessionCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationSessionCountAggregateOutputType> | number
          }
        }
      }
      ConversationLog: {
        payload: Prisma.$ConversationLogPayload<ExtArgs>
        fields: Prisma.ConversationLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>
          }
          findFirst: {
            args: Prisma.ConversationLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>
          }
          findMany: {
            args: Prisma.ConversationLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>[]
          }
          create: {
            args: Prisma.ConversationLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>
          }
          createMany: {
            args: Prisma.ConversationLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>[]
          }
          delete: {
            args: Prisma.ConversationLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>
          }
          update: {
            args: Prisma.ConversationLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>
          }
          deleteMany: {
            args: Prisma.ConversationLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>[]
          }
          upsert: {
            args: Prisma.ConversationLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationLogPayload>
          }
          aggregate: {
            args: Prisma.ConversationLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversationLog>
          }
          groupBy: {
            args: Prisma.ConversationLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationLogCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationLogCountAggregateOutputType> | number
          }
        }
      }
      TourInteraction: {
        payload: Prisma.$TourInteractionPayload<ExtArgs>
        fields: Prisma.TourInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TourInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TourInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>
          }
          findFirst: {
            args: Prisma.TourInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TourInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>
          }
          findMany: {
            args: Prisma.TourInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>[]
          }
          create: {
            args: Prisma.TourInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>
          }
          createMany: {
            args: Prisma.TourInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TourInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>[]
          }
          delete: {
            args: Prisma.TourInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>
          }
          update: {
            args: Prisma.TourInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>
          }
          deleteMany: {
            args: Prisma.TourInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TourInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TourInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>[]
          }
          upsert: {
            args: Prisma.TourInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TourInteractionPayload>
          }
          aggregate: {
            args: Prisma.TourInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTourInteraction>
          }
          groupBy: {
            args: Prisma.TourInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TourInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TourInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<TourInteractionCountAggregateOutputType> | number
          }
        }
      }
      LocalStorageSync: {
        payload: Prisma.$LocalStorageSyncPayload<ExtArgs>
        fields: Prisma.LocalStorageSyncFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocalStorageSyncFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocalStorageSyncFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>
          }
          findFirst: {
            args: Prisma.LocalStorageSyncFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocalStorageSyncFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>
          }
          findMany: {
            args: Prisma.LocalStorageSyncFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>[]
          }
          create: {
            args: Prisma.LocalStorageSyncCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>
          }
          createMany: {
            args: Prisma.LocalStorageSyncCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocalStorageSyncCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>[]
          }
          delete: {
            args: Prisma.LocalStorageSyncDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>
          }
          update: {
            args: Prisma.LocalStorageSyncUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>
          }
          deleteMany: {
            args: Prisma.LocalStorageSyncDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocalStorageSyncUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocalStorageSyncUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>[]
          }
          upsert: {
            args: Prisma.LocalStorageSyncUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocalStorageSyncPayload>
          }
          aggregate: {
            args: Prisma.LocalStorageSyncAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocalStorageSync>
          }
          groupBy: {
            args: Prisma.LocalStorageSyncGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocalStorageSyncGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocalStorageSyncCountArgs<ExtArgs>
            result: $Utils.Optional<LocalStorageSyncCountAggregateOutputType> | number
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
    conversationSession?: ConversationSessionOmit
    conversationLog?: ConversationLogOmit
    tourInteraction?: TourInteractionOmit
    localStorageSync?: LocalStorageSyncOmit
    migration?: MigrationOmit
    systemConfig?: SystemConfigOmit
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
    conversationSessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connections?: boolean | UserCountOutputTypeCountConnectionsArgs
    layouts?: boolean | UserCountOutputTypeCountLayoutsArgs
    lists?: boolean | UserCountOutputTypeCountListsArgs
    preferences?: boolean | UserCountOutputTypeCountPreferencesArgs
    conversationSessions?: boolean | UserCountOutputTypeCountConversationSessionsArgs
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
  export type UserCountOutputTypeCountConversationSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationSessionWhereInput
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
   * Count Type ConversationSessionCountOutputType
   */

  export type ConversationSessionCountOutputType = {
    conversationLogs: number
    tourInteractions: number
  }

  export type ConversationSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversationLogs?: boolean | ConversationSessionCountOutputTypeCountConversationLogsArgs
    tourInteractions?: boolean | ConversationSessionCountOutputTypeCountTourInteractionsArgs
  }

  // Custom InputTypes
  /**
   * ConversationSessionCountOutputType without action
   */
  export type ConversationSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSessionCountOutputType
     */
    select?: ConversationSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationSessionCountOutputType without action
   */
  export type ConversationSessionCountOutputTypeCountConversationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationLogWhereInput
  }

  /**
   * ConversationSessionCountOutputType without action
   */
  export type ConversationSessionCountOutputTypeCountTourInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TourInteractionWhereInput
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
    conversationSessions?: boolean | User$conversationSessionsArgs<ExtArgs>
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
    conversationSessions?: boolean | User$conversationSessionsArgs<ExtArgs>
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
      conversationSessions: Prisma.$ConversationSessionPayload<ExtArgs>[]
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
    conversationSessions<T extends User$conversationSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.conversationSessions
   */
  export type User$conversationSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    where?: ConversationSessionWhereInput
    orderBy?: ConversationSessionOrderByWithRelationInput | ConversationSessionOrderByWithRelationInput[]
    cursor?: ConversationSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationSessionScalarFieldEnum | ConversationSessionScalarFieldEnum[]
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
   * Model ConversationSession
   */

  export type AggregateConversationSession = {
    _count: ConversationSessionCountAggregateOutputType | null
    _min: ConversationSessionMinAggregateOutputType | null
    _max: ConversationSessionMaxAggregateOutputType | null
  }

  export type ConversationSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionId: string | null
    currentStep: $Enums.TourStep | null
    isCompleted: boolean | null
    isVoiceMode: boolean | null
    llmProvider: string | null
    llmApiKey: string | null
    conversationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastActiveAt: Date | null
    completedAt: Date | null
  }

  export type ConversationSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionId: string | null
    currentStep: $Enums.TourStep | null
    isCompleted: boolean | null
    isVoiceMode: boolean | null
    llmProvider: string | null
    llmApiKey: string | null
    conversationId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastActiveAt: Date | null
    completedAt: Date | null
  }

  export type ConversationSessionCountAggregateOutputType = {
    id: number
    userId: number
    sessionId: number
    currentStep: number
    isCompleted: number
    isVoiceMode: number
    selectedInterests: number
    videoRatings: number
    layoutPreferences: number
    llmProvider: number
    llmApiKey: number
    conversationId: number
    stepProgress: number
    completedSteps: number
    createdAt: number
    updatedAt: number
    lastActiveAt: number
    completedAt: number
    _all: number
  }


  export type ConversationSessionMinAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    currentStep?: true
    isCompleted?: true
    isVoiceMode?: true
    llmProvider?: true
    llmApiKey?: true
    conversationId?: true
    createdAt?: true
    updatedAt?: true
    lastActiveAt?: true
    completedAt?: true
  }

  export type ConversationSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    currentStep?: true
    isCompleted?: true
    isVoiceMode?: true
    llmProvider?: true
    llmApiKey?: true
    conversationId?: true
    createdAt?: true
    updatedAt?: true
    lastActiveAt?: true
    completedAt?: true
  }

  export type ConversationSessionCountAggregateInputType = {
    id?: true
    userId?: true
    sessionId?: true
    currentStep?: true
    isCompleted?: true
    isVoiceMode?: true
    selectedInterests?: true
    videoRatings?: true
    layoutPreferences?: true
    llmProvider?: true
    llmApiKey?: true
    conversationId?: true
    stepProgress?: true
    completedSteps?: true
    createdAt?: true
    updatedAt?: true
    lastActiveAt?: true
    completedAt?: true
    _all?: true
  }

  export type ConversationSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationSession to aggregate.
     */
    where?: ConversationSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationSessions to fetch.
     */
    orderBy?: ConversationSessionOrderByWithRelationInput | ConversationSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConversationSessions
    **/
    _count?: true | ConversationSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationSessionMaxAggregateInputType
  }

  export type GetConversationSessionAggregateType<T extends ConversationSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateConversationSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversationSession[P]>
      : GetScalarType<T[P], AggregateConversationSession[P]>
  }




  export type ConversationSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationSessionWhereInput
    orderBy?: ConversationSessionOrderByWithAggregationInput | ConversationSessionOrderByWithAggregationInput[]
    by: ConversationSessionScalarFieldEnum[] | ConversationSessionScalarFieldEnum
    having?: ConversationSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationSessionCountAggregateInputType | true
    _min?: ConversationSessionMinAggregateInputType
    _max?: ConversationSessionMaxAggregateInputType
  }

  export type ConversationSessionGroupByOutputType = {
    id: string
    userId: string | null
    sessionId: string
    currentStep: $Enums.TourStep
    isCompleted: boolean
    isVoiceMode: boolean
    selectedInterests: string[]
    videoRatings: JsonValue
    layoutPreferences: JsonValue
    llmProvider: string | null
    llmApiKey: string | null
    conversationId: string | null
    stepProgress: JsonValue
    completedSteps: string[]
    createdAt: Date
    updatedAt: Date
    lastActiveAt: Date
    completedAt: Date | null
    _count: ConversationSessionCountAggregateOutputType | null
    _min: ConversationSessionMinAggregateOutputType | null
    _max: ConversationSessionMaxAggregateOutputType | null
  }

  type GetConversationSessionGroupByPayload<T extends ConversationSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationSessionGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: boolean
    videoRatings?: boolean
    layoutPreferences?: boolean
    llmProvider?: boolean
    llmApiKey?: boolean
    conversationId?: boolean
    stepProgress?: boolean
    completedSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
    completedAt?: boolean
    user?: boolean | ConversationSession$userArgs<ExtArgs>
    conversationLogs?: boolean | ConversationSession$conversationLogsArgs<ExtArgs>
    tourInteractions?: boolean | ConversationSession$tourInteractionsArgs<ExtArgs>
    _count?: boolean | ConversationSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationSession"]>

  export type ConversationSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: boolean
    videoRatings?: boolean
    layoutPreferences?: boolean
    llmProvider?: boolean
    llmApiKey?: boolean
    conversationId?: boolean
    stepProgress?: boolean
    completedSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
    completedAt?: boolean
    user?: boolean | ConversationSession$userArgs<ExtArgs>
  }, ExtArgs["result"]["conversationSession"]>

  export type ConversationSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: boolean
    videoRatings?: boolean
    layoutPreferences?: boolean
    llmProvider?: boolean
    llmApiKey?: boolean
    conversationId?: boolean
    stepProgress?: boolean
    completedSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
    completedAt?: boolean
    user?: boolean | ConversationSession$userArgs<ExtArgs>
  }, ExtArgs["result"]["conversationSession"]>

  export type ConversationSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    sessionId?: boolean
    currentStep?: boolean
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: boolean
    videoRatings?: boolean
    layoutPreferences?: boolean
    llmProvider?: boolean
    llmApiKey?: boolean
    conversationId?: boolean
    stepProgress?: boolean
    completedSteps?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastActiveAt?: boolean
    completedAt?: boolean
  }

  export type ConversationSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sessionId" | "currentStep" | "isCompleted" | "isVoiceMode" | "selectedInterests" | "videoRatings" | "layoutPreferences" | "llmProvider" | "llmApiKey" | "conversationId" | "stepProgress" | "completedSteps" | "createdAt" | "updatedAt" | "lastActiveAt" | "completedAt", ExtArgs["result"]["conversationSession"]>
  export type ConversationSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ConversationSession$userArgs<ExtArgs>
    conversationLogs?: boolean | ConversationSession$conversationLogsArgs<ExtArgs>
    tourInteractions?: boolean | ConversationSession$tourInteractionsArgs<ExtArgs>
    _count?: boolean | ConversationSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ConversationSession$userArgs<ExtArgs>
  }
  export type ConversationSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ConversationSession$userArgs<ExtArgs>
  }

  export type $ConversationSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConversationSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      conversationLogs: Prisma.$ConversationLogPayload<ExtArgs>[]
      tourInteractions: Prisma.$TourInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      sessionId: string
      currentStep: $Enums.TourStep
      isCompleted: boolean
      isVoiceMode: boolean
      selectedInterests: string[]
      videoRatings: Prisma.JsonValue
      layoutPreferences: Prisma.JsonValue
      llmProvider: string | null
      llmApiKey: string | null
      conversationId: string | null
      stepProgress: Prisma.JsonValue
      completedSteps: string[]
      createdAt: Date
      updatedAt: Date
      lastActiveAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["conversationSession"]>
    composites: {}
  }

  type ConversationSessionGetPayload<S extends boolean | null | undefined | ConversationSessionDefaultArgs> = $Result.GetResult<Prisma.$ConversationSessionPayload, S>

  type ConversationSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationSessionCountAggregateInputType | true
    }

  export interface ConversationSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConversationSession'], meta: { name: 'ConversationSession' } }
    /**
     * Find zero or one ConversationSession that matches the filter.
     * @param {ConversationSessionFindUniqueArgs} args - Arguments to find a ConversationSession
     * @example
     * // Get one ConversationSession
     * const conversationSession = await prisma.conversationSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationSessionFindUniqueArgs>(args: SelectSubset<T, ConversationSessionFindUniqueArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConversationSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationSessionFindUniqueOrThrowArgs} args - Arguments to find a ConversationSession
     * @example
     * // Get one ConversationSession
     * const conversationSession = await prisma.conversationSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationSessionFindFirstArgs} args - Arguments to find a ConversationSession
     * @example
     * // Get one ConversationSession
     * const conversationSession = await prisma.conversationSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationSessionFindFirstArgs>(args?: SelectSubset<T, ConversationSessionFindFirstArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationSessionFindFirstOrThrowArgs} args - Arguments to find a ConversationSession
     * @example
     * // Get one ConversationSession
     * const conversationSession = await prisma.conversationSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConversationSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConversationSessions
     * const conversationSessions = await prisma.conversationSession.findMany()
     * 
     * // Get first 10 ConversationSessions
     * const conversationSessions = await prisma.conversationSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationSessionWithIdOnly = await prisma.conversationSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationSessionFindManyArgs>(args?: SelectSubset<T, ConversationSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConversationSession.
     * @param {ConversationSessionCreateArgs} args - Arguments to create a ConversationSession.
     * @example
     * // Create one ConversationSession
     * const ConversationSession = await prisma.conversationSession.create({
     *   data: {
     *     // ... data to create a ConversationSession
     *   }
     * })
     * 
     */
    create<T extends ConversationSessionCreateArgs>(args: SelectSubset<T, ConversationSessionCreateArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConversationSessions.
     * @param {ConversationSessionCreateManyArgs} args - Arguments to create many ConversationSessions.
     * @example
     * // Create many ConversationSessions
     * const conversationSession = await prisma.conversationSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationSessionCreateManyArgs>(args?: SelectSubset<T, ConversationSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConversationSessions and returns the data saved in the database.
     * @param {ConversationSessionCreateManyAndReturnArgs} args - Arguments to create many ConversationSessions.
     * @example
     * // Create many ConversationSessions
     * const conversationSession = await prisma.conversationSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConversationSessions and only return the `id`
     * const conversationSessionWithIdOnly = await prisma.conversationSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConversationSession.
     * @param {ConversationSessionDeleteArgs} args - Arguments to delete one ConversationSession.
     * @example
     * // Delete one ConversationSession
     * const ConversationSession = await prisma.conversationSession.delete({
     *   where: {
     *     // ... filter to delete one ConversationSession
     *   }
     * })
     * 
     */
    delete<T extends ConversationSessionDeleteArgs>(args: SelectSubset<T, ConversationSessionDeleteArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConversationSession.
     * @param {ConversationSessionUpdateArgs} args - Arguments to update one ConversationSession.
     * @example
     * // Update one ConversationSession
     * const conversationSession = await prisma.conversationSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationSessionUpdateArgs>(args: SelectSubset<T, ConversationSessionUpdateArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConversationSessions.
     * @param {ConversationSessionDeleteManyArgs} args - Arguments to filter ConversationSessions to delete.
     * @example
     * // Delete a few ConversationSessions
     * const { count } = await prisma.conversationSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationSessionDeleteManyArgs>(args?: SelectSubset<T, ConversationSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConversationSessions
     * const conversationSession = await prisma.conversationSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationSessionUpdateManyArgs>(args: SelectSubset<T, ConversationSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationSessions and returns the data updated in the database.
     * @param {ConversationSessionUpdateManyAndReturnArgs} args - Arguments to update many ConversationSessions.
     * @example
     * // Update many ConversationSessions
     * const conversationSession = await prisma.conversationSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConversationSessions and only return the `id`
     * const conversationSessionWithIdOnly = await prisma.conversationSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConversationSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConversationSession.
     * @param {ConversationSessionUpsertArgs} args - Arguments to update or create a ConversationSession.
     * @example
     * // Update or create a ConversationSession
     * const conversationSession = await prisma.conversationSession.upsert({
     *   create: {
     *     // ... data to create a ConversationSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConversationSession we want to update
     *   }
     * })
     */
    upsert<T extends ConversationSessionUpsertArgs>(args: SelectSubset<T, ConversationSessionUpsertArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConversationSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationSessionCountArgs} args - Arguments to filter ConversationSessions to count.
     * @example
     * // Count the number of ConversationSessions
     * const count = await prisma.conversationSession.count({
     *   where: {
     *     // ... the filter for the ConversationSessions we want to count
     *   }
     * })
    **/
    count<T extends ConversationSessionCountArgs>(
      args?: Subset<T, ConversationSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConversationSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationSessionAggregateArgs>(args: Subset<T, ConversationSessionAggregateArgs>): Prisma.PrismaPromise<GetConversationSessionAggregateType<T>>

    /**
     * Group by ConversationSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationSessionGroupByArgs} args - Group by arguments.
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
      T extends ConversationSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationSessionGroupByArgs['orderBy'] }
        : { orderBy?: ConversationSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConversationSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConversationSession model
   */
  readonly fields: ConversationSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConversationSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ConversationSession$userArgs<ExtArgs> = {}>(args?: Subset<T, ConversationSession$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    conversationLogs<T extends ConversationSession$conversationLogsArgs<ExtArgs> = {}>(args?: Subset<T, ConversationSession$conversationLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tourInteractions<T extends ConversationSession$tourInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, ConversationSession$tourInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ConversationSession model
   */
  interface ConversationSessionFieldRefs {
    readonly id: FieldRef<"ConversationSession", 'String'>
    readonly userId: FieldRef<"ConversationSession", 'String'>
    readonly sessionId: FieldRef<"ConversationSession", 'String'>
    readonly currentStep: FieldRef<"ConversationSession", 'TourStep'>
    readonly isCompleted: FieldRef<"ConversationSession", 'Boolean'>
    readonly isVoiceMode: FieldRef<"ConversationSession", 'Boolean'>
    readonly selectedInterests: FieldRef<"ConversationSession", 'String[]'>
    readonly videoRatings: FieldRef<"ConversationSession", 'Json'>
    readonly layoutPreferences: FieldRef<"ConversationSession", 'Json'>
    readonly llmProvider: FieldRef<"ConversationSession", 'String'>
    readonly llmApiKey: FieldRef<"ConversationSession", 'String'>
    readonly conversationId: FieldRef<"ConversationSession", 'String'>
    readonly stepProgress: FieldRef<"ConversationSession", 'Json'>
    readonly completedSteps: FieldRef<"ConversationSession", 'String[]'>
    readonly createdAt: FieldRef<"ConversationSession", 'DateTime'>
    readonly updatedAt: FieldRef<"ConversationSession", 'DateTime'>
    readonly lastActiveAt: FieldRef<"ConversationSession", 'DateTime'>
    readonly completedAt: FieldRef<"ConversationSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConversationSession findUnique
   */
  export type ConversationSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * Filter, which ConversationSession to fetch.
     */
    where: ConversationSessionWhereUniqueInput
  }

  /**
   * ConversationSession findUniqueOrThrow
   */
  export type ConversationSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * Filter, which ConversationSession to fetch.
     */
    where: ConversationSessionWhereUniqueInput
  }

  /**
   * ConversationSession findFirst
   */
  export type ConversationSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * Filter, which ConversationSession to fetch.
     */
    where?: ConversationSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationSessions to fetch.
     */
    orderBy?: ConversationSessionOrderByWithRelationInput | ConversationSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationSessions.
     */
    cursor?: ConversationSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationSessions.
     */
    distinct?: ConversationSessionScalarFieldEnum | ConversationSessionScalarFieldEnum[]
  }

  /**
   * ConversationSession findFirstOrThrow
   */
  export type ConversationSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * Filter, which ConversationSession to fetch.
     */
    where?: ConversationSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationSessions to fetch.
     */
    orderBy?: ConversationSessionOrderByWithRelationInput | ConversationSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationSessions.
     */
    cursor?: ConversationSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationSessions.
     */
    distinct?: ConversationSessionScalarFieldEnum | ConversationSessionScalarFieldEnum[]
  }

  /**
   * ConversationSession findMany
   */
  export type ConversationSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * Filter, which ConversationSessions to fetch.
     */
    where?: ConversationSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationSessions to fetch.
     */
    orderBy?: ConversationSessionOrderByWithRelationInput | ConversationSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConversationSessions.
     */
    cursor?: ConversationSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationSessions.
     */
    skip?: number
    distinct?: ConversationSessionScalarFieldEnum | ConversationSessionScalarFieldEnum[]
  }

  /**
   * ConversationSession create
   */
  export type ConversationSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ConversationSession.
     */
    data: XOR<ConversationSessionCreateInput, ConversationSessionUncheckedCreateInput>
  }

  /**
   * ConversationSession createMany
   */
  export type ConversationSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConversationSessions.
     */
    data: ConversationSessionCreateManyInput | ConversationSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConversationSession createManyAndReturn
   */
  export type ConversationSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * The data used to create many ConversationSessions.
     */
    data: ConversationSessionCreateManyInput | ConversationSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConversationSession update
   */
  export type ConversationSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ConversationSession.
     */
    data: XOR<ConversationSessionUpdateInput, ConversationSessionUncheckedUpdateInput>
    /**
     * Choose, which ConversationSession to update.
     */
    where: ConversationSessionWhereUniqueInput
  }

  /**
   * ConversationSession updateMany
   */
  export type ConversationSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConversationSessions.
     */
    data: XOR<ConversationSessionUpdateManyMutationInput, ConversationSessionUncheckedUpdateManyInput>
    /**
     * Filter which ConversationSessions to update
     */
    where?: ConversationSessionWhereInput
    /**
     * Limit how many ConversationSessions to update.
     */
    limit?: number
  }

  /**
   * ConversationSession updateManyAndReturn
   */
  export type ConversationSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * The data used to update ConversationSessions.
     */
    data: XOR<ConversationSessionUpdateManyMutationInput, ConversationSessionUncheckedUpdateManyInput>
    /**
     * Filter which ConversationSessions to update
     */
    where?: ConversationSessionWhereInput
    /**
     * Limit how many ConversationSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConversationSession upsert
   */
  export type ConversationSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ConversationSession to update in case it exists.
     */
    where: ConversationSessionWhereUniqueInput
    /**
     * In case the ConversationSession found by the `where` argument doesn't exist, create a new ConversationSession with this data.
     */
    create: XOR<ConversationSessionCreateInput, ConversationSessionUncheckedCreateInput>
    /**
     * In case the ConversationSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationSessionUpdateInput, ConversationSessionUncheckedUpdateInput>
  }

  /**
   * ConversationSession delete
   */
  export type ConversationSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
    /**
     * Filter which ConversationSession to delete.
     */
    where: ConversationSessionWhereUniqueInput
  }

  /**
   * ConversationSession deleteMany
   */
  export type ConversationSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationSessions to delete
     */
    where?: ConversationSessionWhereInput
    /**
     * Limit how many ConversationSessions to delete.
     */
    limit?: number
  }

  /**
   * ConversationSession.user
   */
  export type ConversationSession$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * ConversationSession.conversationLogs
   */
  export type ConversationSession$conversationLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    where?: ConversationLogWhereInput
    orderBy?: ConversationLogOrderByWithRelationInput | ConversationLogOrderByWithRelationInput[]
    cursor?: ConversationLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationLogScalarFieldEnum | ConversationLogScalarFieldEnum[]
  }

  /**
   * ConversationSession.tourInteractions
   */
  export type ConversationSession$tourInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    where?: TourInteractionWhereInput
    orderBy?: TourInteractionOrderByWithRelationInput | TourInteractionOrderByWithRelationInput[]
    cursor?: TourInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TourInteractionScalarFieldEnum | TourInteractionScalarFieldEnum[]
  }

  /**
   * ConversationSession without action
   */
  export type ConversationSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationSession
     */
    select?: ConversationSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationSession
     */
    omit?: ConversationSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationSessionInclude<ExtArgs> | null
  }


  /**
   * Model ConversationLog
   */

  export type AggregateConversationLog = {
    _count: ConversationLogCountAggregateOutputType | null
    _avg: ConversationLogAvgAggregateOutputType | null
    _sum: ConversationLogSumAggregateOutputType | null
    _min: ConversationLogMinAggregateOutputType | null
    _max: ConversationLogMaxAggregateOutputType | null
  }

  export type ConversationLogAvgAggregateOutputType = {
    tokensUsed: number | null
    responseTimeMs: number | null
  }

  export type ConversationLogSumAggregateOutputType = {
    tokensUsed: number | null
    responseTimeMs: number | null
  }

  export type ConversationLogMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    role: $Enums.MessageRole | null
    content: string | null
    messageId: string | null
    tourStep: $Enums.TourStep | null
    actionType: string | null
    tokensUsed: number | null
    responseTimeMs: number | null
    llmProvider: string | null
    createdAt: Date | null
  }

  export type ConversationLogMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    role: $Enums.MessageRole | null
    content: string | null
    messageId: string | null
    tourStep: $Enums.TourStep | null
    actionType: string | null
    tokensUsed: number | null
    responseTimeMs: number | null
    llmProvider: string | null
    createdAt: Date | null
  }

  export type ConversationLogCountAggregateOutputType = {
    id: number
    sessionId: number
    role: number
    content: number
    messageId: number
    tourStep: number
    actionType: number
    metadata: number
    tokensUsed: number
    responseTimeMs: number
    llmProvider: number
    createdAt: number
    _all: number
  }


  export type ConversationLogAvgAggregateInputType = {
    tokensUsed?: true
    responseTimeMs?: true
  }

  export type ConversationLogSumAggregateInputType = {
    tokensUsed?: true
    responseTimeMs?: true
  }

  export type ConversationLogMinAggregateInputType = {
    id?: true
    sessionId?: true
    role?: true
    content?: true
    messageId?: true
    tourStep?: true
    actionType?: true
    tokensUsed?: true
    responseTimeMs?: true
    llmProvider?: true
    createdAt?: true
  }

  export type ConversationLogMaxAggregateInputType = {
    id?: true
    sessionId?: true
    role?: true
    content?: true
    messageId?: true
    tourStep?: true
    actionType?: true
    tokensUsed?: true
    responseTimeMs?: true
    llmProvider?: true
    createdAt?: true
  }

  export type ConversationLogCountAggregateInputType = {
    id?: true
    sessionId?: true
    role?: true
    content?: true
    messageId?: true
    tourStep?: true
    actionType?: true
    metadata?: true
    tokensUsed?: true
    responseTimeMs?: true
    llmProvider?: true
    createdAt?: true
    _all?: true
  }

  export type ConversationLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationLog to aggregate.
     */
    where?: ConversationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationLogs to fetch.
     */
    orderBy?: ConversationLogOrderByWithRelationInput | ConversationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConversationLogs
    **/
    _count?: true | ConversationLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConversationLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConversationLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationLogMaxAggregateInputType
  }

  export type GetConversationLogAggregateType<T extends ConversationLogAggregateArgs> = {
        [P in keyof T & keyof AggregateConversationLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversationLog[P]>
      : GetScalarType<T[P], AggregateConversationLog[P]>
  }




  export type ConversationLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationLogWhereInput
    orderBy?: ConversationLogOrderByWithAggregationInput | ConversationLogOrderByWithAggregationInput[]
    by: ConversationLogScalarFieldEnum[] | ConversationLogScalarFieldEnum
    having?: ConversationLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationLogCountAggregateInputType | true
    _avg?: ConversationLogAvgAggregateInputType
    _sum?: ConversationLogSumAggregateInputType
    _min?: ConversationLogMinAggregateInputType
    _max?: ConversationLogMaxAggregateInputType
  }

  export type ConversationLogGroupByOutputType = {
    id: string
    sessionId: string
    role: $Enums.MessageRole
    content: string
    messageId: string | null
    tourStep: $Enums.TourStep | null
    actionType: string | null
    metadata: JsonValue
    tokensUsed: number | null
    responseTimeMs: number | null
    llmProvider: string | null
    createdAt: Date
    _count: ConversationLogCountAggregateOutputType | null
    _avg: ConversationLogAvgAggregateOutputType | null
    _sum: ConversationLogSumAggregateOutputType | null
    _min: ConversationLogMinAggregateOutputType | null
    _max: ConversationLogMaxAggregateOutputType | null
  }

  type GetConversationLogGroupByPayload<T extends ConversationLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationLogGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationLogGroupByOutputType[P]>
        }
      >
    >


  export type ConversationLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    role?: boolean
    content?: boolean
    messageId?: boolean
    tourStep?: boolean
    actionType?: boolean
    metadata?: boolean
    tokensUsed?: boolean
    responseTimeMs?: boolean
    llmProvider?: boolean
    createdAt?: boolean
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationLog"]>

  export type ConversationLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    role?: boolean
    content?: boolean
    messageId?: boolean
    tourStep?: boolean
    actionType?: boolean
    metadata?: boolean
    tokensUsed?: boolean
    responseTimeMs?: boolean
    llmProvider?: boolean
    createdAt?: boolean
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationLog"]>

  export type ConversationLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    role?: boolean
    content?: boolean
    messageId?: boolean
    tourStep?: boolean
    actionType?: boolean
    metadata?: boolean
    tokensUsed?: boolean
    responseTimeMs?: boolean
    llmProvider?: boolean
    createdAt?: boolean
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversationLog"]>

  export type ConversationLogSelectScalar = {
    id?: boolean
    sessionId?: boolean
    role?: boolean
    content?: boolean
    messageId?: boolean
    tourStep?: boolean
    actionType?: boolean
    metadata?: boolean
    tokensUsed?: boolean
    responseTimeMs?: boolean
    llmProvider?: boolean
    createdAt?: boolean
  }

  export type ConversationLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "role" | "content" | "messageId" | "tourStep" | "actionType" | "metadata" | "tokensUsed" | "responseTimeMs" | "llmProvider" | "createdAt", ExtArgs["result"]["conversationLog"]>
  export type ConversationLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }
  export type ConversationLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }
  export type ConversationLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }

  export type $ConversationLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConversationLog"
    objects: {
      session: Prisma.$ConversationSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      role: $Enums.MessageRole
      content: string
      messageId: string | null
      tourStep: $Enums.TourStep | null
      actionType: string | null
      metadata: Prisma.JsonValue
      tokensUsed: number | null
      responseTimeMs: number | null
      llmProvider: string | null
      createdAt: Date
    }, ExtArgs["result"]["conversationLog"]>
    composites: {}
  }

  type ConversationLogGetPayload<S extends boolean | null | undefined | ConversationLogDefaultArgs> = $Result.GetResult<Prisma.$ConversationLogPayload, S>

  type ConversationLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationLogCountAggregateInputType | true
    }

  export interface ConversationLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConversationLog'], meta: { name: 'ConversationLog' } }
    /**
     * Find zero or one ConversationLog that matches the filter.
     * @param {ConversationLogFindUniqueArgs} args - Arguments to find a ConversationLog
     * @example
     * // Get one ConversationLog
     * const conversationLog = await prisma.conversationLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationLogFindUniqueArgs>(args: SelectSubset<T, ConversationLogFindUniqueArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConversationLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationLogFindUniqueOrThrowArgs} args - Arguments to find a ConversationLog
     * @example
     * // Get one ConversationLog
     * const conversationLog = await prisma.conversationLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogFindFirstArgs} args - Arguments to find a ConversationLog
     * @example
     * // Get one ConversationLog
     * const conversationLog = await prisma.conversationLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationLogFindFirstArgs>(args?: SelectSubset<T, ConversationLogFindFirstArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConversationLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogFindFirstOrThrowArgs} args - Arguments to find a ConversationLog
     * @example
     * // Get one ConversationLog
     * const conversationLog = await prisma.conversationLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConversationLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConversationLogs
     * const conversationLogs = await prisma.conversationLog.findMany()
     * 
     * // Get first 10 ConversationLogs
     * const conversationLogs = await prisma.conversationLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationLogWithIdOnly = await prisma.conversationLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationLogFindManyArgs>(args?: SelectSubset<T, ConversationLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConversationLog.
     * @param {ConversationLogCreateArgs} args - Arguments to create a ConversationLog.
     * @example
     * // Create one ConversationLog
     * const ConversationLog = await prisma.conversationLog.create({
     *   data: {
     *     // ... data to create a ConversationLog
     *   }
     * })
     * 
     */
    create<T extends ConversationLogCreateArgs>(args: SelectSubset<T, ConversationLogCreateArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConversationLogs.
     * @param {ConversationLogCreateManyArgs} args - Arguments to create many ConversationLogs.
     * @example
     * // Create many ConversationLogs
     * const conversationLog = await prisma.conversationLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationLogCreateManyArgs>(args?: SelectSubset<T, ConversationLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConversationLogs and returns the data saved in the database.
     * @param {ConversationLogCreateManyAndReturnArgs} args - Arguments to create many ConversationLogs.
     * @example
     * // Create many ConversationLogs
     * const conversationLog = await prisma.conversationLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConversationLogs and only return the `id`
     * const conversationLogWithIdOnly = await prisma.conversationLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConversationLog.
     * @param {ConversationLogDeleteArgs} args - Arguments to delete one ConversationLog.
     * @example
     * // Delete one ConversationLog
     * const ConversationLog = await prisma.conversationLog.delete({
     *   where: {
     *     // ... filter to delete one ConversationLog
     *   }
     * })
     * 
     */
    delete<T extends ConversationLogDeleteArgs>(args: SelectSubset<T, ConversationLogDeleteArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConversationLog.
     * @param {ConversationLogUpdateArgs} args - Arguments to update one ConversationLog.
     * @example
     * // Update one ConversationLog
     * const conversationLog = await prisma.conversationLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationLogUpdateArgs>(args: SelectSubset<T, ConversationLogUpdateArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConversationLogs.
     * @param {ConversationLogDeleteManyArgs} args - Arguments to filter ConversationLogs to delete.
     * @example
     * // Delete a few ConversationLogs
     * const { count } = await prisma.conversationLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationLogDeleteManyArgs>(args?: SelectSubset<T, ConversationLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConversationLogs
     * const conversationLog = await prisma.conversationLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationLogUpdateManyArgs>(args: SelectSubset<T, ConversationLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConversationLogs and returns the data updated in the database.
     * @param {ConversationLogUpdateManyAndReturnArgs} args - Arguments to update many ConversationLogs.
     * @example
     * // Update many ConversationLogs
     * const conversationLog = await prisma.conversationLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConversationLogs and only return the `id`
     * const conversationLogWithIdOnly = await prisma.conversationLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConversationLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConversationLog.
     * @param {ConversationLogUpsertArgs} args - Arguments to update or create a ConversationLog.
     * @example
     * // Update or create a ConversationLog
     * const conversationLog = await prisma.conversationLog.upsert({
     *   create: {
     *     // ... data to create a ConversationLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConversationLog we want to update
     *   }
     * })
     */
    upsert<T extends ConversationLogUpsertArgs>(args: SelectSubset<T, ConversationLogUpsertArgs<ExtArgs>>): Prisma__ConversationLogClient<$Result.GetResult<Prisma.$ConversationLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConversationLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogCountArgs} args - Arguments to filter ConversationLogs to count.
     * @example
     * // Count the number of ConversationLogs
     * const count = await prisma.conversationLog.count({
     *   where: {
     *     // ... the filter for the ConversationLogs we want to count
     *   }
     * })
    **/
    count<T extends ConversationLogCountArgs>(
      args?: Subset<T, ConversationLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConversationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationLogAggregateArgs>(args: Subset<T, ConversationLogAggregateArgs>): Prisma.PrismaPromise<GetConversationLogAggregateType<T>>

    /**
     * Group by ConversationLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationLogGroupByArgs} args - Group by arguments.
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
      T extends ConversationLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationLogGroupByArgs['orderBy'] }
        : { orderBy?: ConversationLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConversationLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConversationLog model
   */
  readonly fields: ConversationLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConversationLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends ConversationSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationSessionDefaultArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ConversationLog model
   */
  interface ConversationLogFieldRefs {
    readonly id: FieldRef<"ConversationLog", 'String'>
    readonly sessionId: FieldRef<"ConversationLog", 'String'>
    readonly role: FieldRef<"ConversationLog", 'MessageRole'>
    readonly content: FieldRef<"ConversationLog", 'String'>
    readonly messageId: FieldRef<"ConversationLog", 'String'>
    readonly tourStep: FieldRef<"ConversationLog", 'TourStep'>
    readonly actionType: FieldRef<"ConversationLog", 'String'>
    readonly metadata: FieldRef<"ConversationLog", 'Json'>
    readonly tokensUsed: FieldRef<"ConversationLog", 'Int'>
    readonly responseTimeMs: FieldRef<"ConversationLog", 'Int'>
    readonly llmProvider: FieldRef<"ConversationLog", 'String'>
    readonly createdAt: FieldRef<"ConversationLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConversationLog findUnique
   */
  export type ConversationLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * Filter, which ConversationLog to fetch.
     */
    where: ConversationLogWhereUniqueInput
  }

  /**
   * ConversationLog findUniqueOrThrow
   */
  export type ConversationLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * Filter, which ConversationLog to fetch.
     */
    where: ConversationLogWhereUniqueInput
  }

  /**
   * ConversationLog findFirst
   */
  export type ConversationLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * Filter, which ConversationLog to fetch.
     */
    where?: ConversationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationLogs to fetch.
     */
    orderBy?: ConversationLogOrderByWithRelationInput | ConversationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationLogs.
     */
    cursor?: ConversationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationLogs.
     */
    distinct?: ConversationLogScalarFieldEnum | ConversationLogScalarFieldEnum[]
  }

  /**
   * ConversationLog findFirstOrThrow
   */
  export type ConversationLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * Filter, which ConversationLog to fetch.
     */
    where?: ConversationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationLogs to fetch.
     */
    orderBy?: ConversationLogOrderByWithRelationInput | ConversationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConversationLogs.
     */
    cursor?: ConversationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConversationLogs.
     */
    distinct?: ConversationLogScalarFieldEnum | ConversationLogScalarFieldEnum[]
  }

  /**
   * ConversationLog findMany
   */
  export type ConversationLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * Filter, which ConversationLogs to fetch.
     */
    where?: ConversationLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConversationLogs to fetch.
     */
    orderBy?: ConversationLogOrderByWithRelationInput | ConversationLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConversationLogs.
     */
    cursor?: ConversationLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConversationLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConversationLogs.
     */
    skip?: number
    distinct?: ConversationLogScalarFieldEnum | ConversationLogScalarFieldEnum[]
  }

  /**
   * ConversationLog create
   */
  export type ConversationLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ConversationLog.
     */
    data: XOR<ConversationLogCreateInput, ConversationLogUncheckedCreateInput>
  }

  /**
   * ConversationLog createMany
   */
  export type ConversationLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConversationLogs.
     */
    data: ConversationLogCreateManyInput | ConversationLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConversationLog createManyAndReturn
   */
  export type ConversationLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * The data used to create many ConversationLogs.
     */
    data: ConversationLogCreateManyInput | ConversationLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConversationLog update
   */
  export type ConversationLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ConversationLog.
     */
    data: XOR<ConversationLogUpdateInput, ConversationLogUncheckedUpdateInput>
    /**
     * Choose, which ConversationLog to update.
     */
    where: ConversationLogWhereUniqueInput
  }

  /**
   * ConversationLog updateMany
   */
  export type ConversationLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConversationLogs.
     */
    data: XOR<ConversationLogUpdateManyMutationInput, ConversationLogUncheckedUpdateManyInput>
    /**
     * Filter which ConversationLogs to update
     */
    where?: ConversationLogWhereInput
    /**
     * Limit how many ConversationLogs to update.
     */
    limit?: number
  }

  /**
   * ConversationLog updateManyAndReturn
   */
  export type ConversationLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * The data used to update ConversationLogs.
     */
    data: XOR<ConversationLogUpdateManyMutationInput, ConversationLogUncheckedUpdateManyInput>
    /**
     * Filter which ConversationLogs to update
     */
    where?: ConversationLogWhereInput
    /**
     * Limit how many ConversationLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ConversationLog upsert
   */
  export type ConversationLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ConversationLog to update in case it exists.
     */
    where: ConversationLogWhereUniqueInput
    /**
     * In case the ConversationLog found by the `where` argument doesn't exist, create a new ConversationLog with this data.
     */
    create: XOR<ConversationLogCreateInput, ConversationLogUncheckedCreateInput>
    /**
     * In case the ConversationLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationLogUpdateInput, ConversationLogUncheckedUpdateInput>
  }

  /**
   * ConversationLog delete
   */
  export type ConversationLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
    /**
     * Filter which ConversationLog to delete.
     */
    where: ConversationLogWhereUniqueInput
  }

  /**
   * ConversationLog deleteMany
   */
  export type ConversationLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConversationLogs to delete
     */
    where?: ConversationLogWhereInput
    /**
     * Limit how many ConversationLogs to delete.
     */
    limit?: number
  }

  /**
   * ConversationLog without action
   */
  export type ConversationLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationLog
     */
    select?: ConversationLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConversationLog
     */
    omit?: ConversationLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationLogInclude<ExtArgs> | null
  }


  /**
   * Model TourInteraction
   */

  export type AggregateTourInteraction = {
    _count: TourInteractionCountAggregateOutputType | null
    _avg: TourInteractionAvgAggregateOutputType | null
    _sum: TourInteractionSumAggregateOutputType | null
    _min: TourInteractionMinAggregateOutputType | null
    _max: TourInteractionMaxAggregateOutputType | null
  }

  export type TourInteractionAvgAggregateOutputType = {
    timeSpentMs: number | null
    satisfaction: number | null
  }

  export type TourInteractionSumAggregateOutputType = {
    timeSpentMs: number | null
    satisfaction: number | null
  }

  export type TourInteractionMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    tourStep: $Enums.TourStep | null
    actionType: string | null
    timeSpentMs: number | null
    wasSkipped: boolean | null
    satisfaction: number | null
    createdAt: Date | null
  }

  export type TourInteractionMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    tourStep: $Enums.TourStep | null
    actionType: string | null
    timeSpentMs: number | null
    wasSkipped: boolean | null
    satisfaction: number | null
    createdAt: Date | null
  }

  export type TourInteractionCountAggregateOutputType = {
    id: number
    sessionId: number
    tourStep: number
    actionType: number
    actionData: number
    timeSpentMs: number
    wasSkipped: number
    satisfaction: number
    createdAt: number
    _all: number
  }


  export type TourInteractionAvgAggregateInputType = {
    timeSpentMs?: true
    satisfaction?: true
  }

  export type TourInteractionSumAggregateInputType = {
    timeSpentMs?: true
    satisfaction?: true
  }

  export type TourInteractionMinAggregateInputType = {
    id?: true
    sessionId?: true
    tourStep?: true
    actionType?: true
    timeSpentMs?: true
    wasSkipped?: true
    satisfaction?: true
    createdAt?: true
  }

  export type TourInteractionMaxAggregateInputType = {
    id?: true
    sessionId?: true
    tourStep?: true
    actionType?: true
    timeSpentMs?: true
    wasSkipped?: true
    satisfaction?: true
    createdAt?: true
  }

  export type TourInteractionCountAggregateInputType = {
    id?: true
    sessionId?: true
    tourStep?: true
    actionType?: true
    actionData?: true
    timeSpentMs?: true
    wasSkipped?: true
    satisfaction?: true
    createdAt?: true
    _all?: true
  }

  export type TourInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TourInteraction to aggregate.
     */
    where?: TourInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourInteractions to fetch.
     */
    orderBy?: TourInteractionOrderByWithRelationInput | TourInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TourInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TourInteractions
    **/
    _count?: true | TourInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TourInteractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TourInteractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TourInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TourInteractionMaxAggregateInputType
  }

  export type GetTourInteractionAggregateType<T extends TourInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateTourInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTourInteraction[P]>
      : GetScalarType<T[P], AggregateTourInteraction[P]>
  }




  export type TourInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TourInteractionWhereInput
    orderBy?: TourInteractionOrderByWithAggregationInput | TourInteractionOrderByWithAggregationInput[]
    by: TourInteractionScalarFieldEnum[] | TourInteractionScalarFieldEnum
    having?: TourInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TourInteractionCountAggregateInputType | true
    _avg?: TourInteractionAvgAggregateInputType
    _sum?: TourInteractionSumAggregateInputType
    _min?: TourInteractionMinAggregateInputType
    _max?: TourInteractionMaxAggregateInputType
  }

  export type TourInteractionGroupByOutputType = {
    id: string
    sessionId: string
    tourStep: $Enums.TourStep
    actionType: string
    actionData: JsonValue
    timeSpentMs: number | null
    wasSkipped: boolean
    satisfaction: number | null
    createdAt: Date
    _count: TourInteractionCountAggregateOutputType | null
    _avg: TourInteractionAvgAggregateOutputType | null
    _sum: TourInteractionSumAggregateOutputType | null
    _min: TourInteractionMinAggregateOutputType | null
    _max: TourInteractionMaxAggregateOutputType | null
  }

  type GetTourInteractionGroupByPayload<T extends TourInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TourInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TourInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TourInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], TourInteractionGroupByOutputType[P]>
        }
      >
    >


  export type TourInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    tourStep?: boolean
    actionType?: boolean
    actionData?: boolean
    timeSpentMs?: boolean
    wasSkipped?: boolean
    satisfaction?: boolean
    createdAt?: boolean
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tourInteraction"]>

  export type TourInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    tourStep?: boolean
    actionType?: boolean
    actionData?: boolean
    timeSpentMs?: boolean
    wasSkipped?: boolean
    satisfaction?: boolean
    createdAt?: boolean
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tourInteraction"]>

  export type TourInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    tourStep?: boolean
    actionType?: boolean
    actionData?: boolean
    timeSpentMs?: boolean
    wasSkipped?: boolean
    satisfaction?: boolean
    createdAt?: boolean
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tourInteraction"]>

  export type TourInteractionSelectScalar = {
    id?: boolean
    sessionId?: boolean
    tourStep?: boolean
    actionType?: boolean
    actionData?: boolean
    timeSpentMs?: boolean
    wasSkipped?: boolean
    satisfaction?: boolean
    createdAt?: boolean
  }

  export type TourInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "tourStep" | "actionType" | "actionData" | "timeSpentMs" | "wasSkipped" | "satisfaction" | "createdAt", ExtArgs["result"]["tourInteraction"]>
  export type TourInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }
  export type TourInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }
  export type TourInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | ConversationSessionDefaultArgs<ExtArgs>
  }

  export type $TourInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TourInteraction"
    objects: {
      session: Prisma.$ConversationSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      tourStep: $Enums.TourStep
      actionType: string
      actionData: Prisma.JsonValue
      timeSpentMs: number | null
      wasSkipped: boolean
      satisfaction: number | null
      createdAt: Date
    }, ExtArgs["result"]["tourInteraction"]>
    composites: {}
  }

  type TourInteractionGetPayload<S extends boolean | null | undefined | TourInteractionDefaultArgs> = $Result.GetResult<Prisma.$TourInteractionPayload, S>

  type TourInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TourInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TourInteractionCountAggregateInputType | true
    }

  export interface TourInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TourInteraction'], meta: { name: 'TourInteraction' } }
    /**
     * Find zero or one TourInteraction that matches the filter.
     * @param {TourInteractionFindUniqueArgs} args - Arguments to find a TourInteraction
     * @example
     * // Get one TourInteraction
     * const tourInteraction = await prisma.tourInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TourInteractionFindUniqueArgs>(args: SelectSubset<T, TourInteractionFindUniqueArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TourInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TourInteractionFindUniqueOrThrowArgs} args - Arguments to find a TourInteraction
     * @example
     * // Get one TourInteraction
     * const tourInteraction = await prisma.tourInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TourInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, TourInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TourInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourInteractionFindFirstArgs} args - Arguments to find a TourInteraction
     * @example
     * // Get one TourInteraction
     * const tourInteraction = await prisma.tourInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TourInteractionFindFirstArgs>(args?: SelectSubset<T, TourInteractionFindFirstArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TourInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourInteractionFindFirstOrThrowArgs} args - Arguments to find a TourInteraction
     * @example
     * // Get one TourInteraction
     * const tourInteraction = await prisma.tourInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TourInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, TourInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TourInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TourInteractions
     * const tourInteractions = await prisma.tourInteraction.findMany()
     * 
     * // Get first 10 TourInteractions
     * const tourInteractions = await prisma.tourInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tourInteractionWithIdOnly = await prisma.tourInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TourInteractionFindManyArgs>(args?: SelectSubset<T, TourInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TourInteraction.
     * @param {TourInteractionCreateArgs} args - Arguments to create a TourInteraction.
     * @example
     * // Create one TourInteraction
     * const TourInteraction = await prisma.tourInteraction.create({
     *   data: {
     *     // ... data to create a TourInteraction
     *   }
     * })
     * 
     */
    create<T extends TourInteractionCreateArgs>(args: SelectSubset<T, TourInteractionCreateArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TourInteractions.
     * @param {TourInteractionCreateManyArgs} args - Arguments to create many TourInteractions.
     * @example
     * // Create many TourInteractions
     * const tourInteraction = await prisma.tourInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TourInteractionCreateManyArgs>(args?: SelectSubset<T, TourInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TourInteractions and returns the data saved in the database.
     * @param {TourInteractionCreateManyAndReturnArgs} args - Arguments to create many TourInteractions.
     * @example
     * // Create many TourInteractions
     * const tourInteraction = await prisma.tourInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TourInteractions and only return the `id`
     * const tourInteractionWithIdOnly = await prisma.tourInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TourInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, TourInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TourInteraction.
     * @param {TourInteractionDeleteArgs} args - Arguments to delete one TourInteraction.
     * @example
     * // Delete one TourInteraction
     * const TourInteraction = await prisma.tourInteraction.delete({
     *   where: {
     *     // ... filter to delete one TourInteraction
     *   }
     * })
     * 
     */
    delete<T extends TourInteractionDeleteArgs>(args: SelectSubset<T, TourInteractionDeleteArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TourInteraction.
     * @param {TourInteractionUpdateArgs} args - Arguments to update one TourInteraction.
     * @example
     * // Update one TourInteraction
     * const tourInteraction = await prisma.tourInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TourInteractionUpdateArgs>(args: SelectSubset<T, TourInteractionUpdateArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TourInteractions.
     * @param {TourInteractionDeleteManyArgs} args - Arguments to filter TourInteractions to delete.
     * @example
     * // Delete a few TourInteractions
     * const { count } = await prisma.tourInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TourInteractionDeleteManyArgs>(args?: SelectSubset<T, TourInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TourInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TourInteractions
     * const tourInteraction = await prisma.tourInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TourInteractionUpdateManyArgs>(args: SelectSubset<T, TourInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TourInteractions and returns the data updated in the database.
     * @param {TourInteractionUpdateManyAndReturnArgs} args - Arguments to update many TourInteractions.
     * @example
     * // Update many TourInteractions
     * const tourInteraction = await prisma.tourInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TourInteractions and only return the `id`
     * const tourInteractionWithIdOnly = await prisma.tourInteraction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TourInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, TourInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TourInteraction.
     * @param {TourInteractionUpsertArgs} args - Arguments to update or create a TourInteraction.
     * @example
     * // Update or create a TourInteraction
     * const tourInteraction = await prisma.tourInteraction.upsert({
     *   create: {
     *     // ... data to create a TourInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TourInteraction we want to update
     *   }
     * })
     */
    upsert<T extends TourInteractionUpsertArgs>(args: SelectSubset<T, TourInteractionUpsertArgs<ExtArgs>>): Prisma__TourInteractionClient<$Result.GetResult<Prisma.$TourInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TourInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourInteractionCountArgs} args - Arguments to filter TourInteractions to count.
     * @example
     * // Count the number of TourInteractions
     * const count = await prisma.tourInteraction.count({
     *   where: {
     *     // ... the filter for the TourInteractions we want to count
     *   }
     * })
    **/
    count<T extends TourInteractionCountArgs>(
      args?: Subset<T, TourInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TourInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TourInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TourInteractionAggregateArgs>(args: Subset<T, TourInteractionAggregateArgs>): Prisma.PrismaPromise<GetTourInteractionAggregateType<T>>

    /**
     * Group by TourInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TourInteractionGroupByArgs} args - Group by arguments.
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
      T extends TourInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TourInteractionGroupByArgs['orderBy'] }
        : { orderBy?: TourInteractionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TourInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTourInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TourInteraction model
   */
  readonly fields: TourInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TourInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TourInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends ConversationSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationSessionDefaultArgs<ExtArgs>>): Prisma__ConversationSessionClient<$Result.GetResult<Prisma.$ConversationSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TourInteraction model
   */
  interface TourInteractionFieldRefs {
    readonly id: FieldRef<"TourInteraction", 'String'>
    readonly sessionId: FieldRef<"TourInteraction", 'String'>
    readonly tourStep: FieldRef<"TourInteraction", 'TourStep'>
    readonly actionType: FieldRef<"TourInteraction", 'String'>
    readonly actionData: FieldRef<"TourInteraction", 'Json'>
    readonly timeSpentMs: FieldRef<"TourInteraction", 'Int'>
    readonly wasSkipped: FieldRef<"TourInteraction", 'Boolean'>
    readonly satisfaction: FieldRef<"TourInteraction", 'Int'>
    readonly createdAt: FieldRef<"TourInteraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TourInteraction findUnique
   */
  export type TourInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * Filter, which TourInteraction to fetch.
     */
    where: TourInteractionWhereUniqueInput
  }

  /**
   * TourInteraction findUniqueOrThrow
   */
  export type TourInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * Filter, which TourInteraction to fetch.
     */
    where: TourInteractionWhereUniqueInput
  }

  /**
   * TourInteraction findFirst
   */
  export type TourInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * Filter, which TourInteraction to fetch.
     */
    where?: TourInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourInteractions to fetch.
     */
    orderBy?: TourInteractionOrderByWithRelationInput | TourInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TourInteractions.
     */
    cursor?: TourInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TourInteractions.
     */
    distinct?: TourInteractionScalarFieldEnum | TourInteractionScalarFieldEnum[]
  }

  /**
   * TourInteraction findFirstOrThrow
   */
  export type TourInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * Filter, which TourInteraction to fetch.
     */
    where?: TourInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourInteractions to fetch.
     */
    orderBy?: TourInteractionOrderByWithRelationInput | TourInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TourInteractions.
     */
    cursor?: TourInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TourInteractions.
     */
    distinct?: TourInteractionScalarFieldEnum | TourInteractionScalarFieldEnum[]
  }

  /**
   * TourInteraction findMany
   */
  export type TourInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * Filter, which TourInteractions to fetch.
     */
    where?: TourInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TourInteractions to fetch.
     */
    orderBy?: TourInteractionOrderByWithRelationInput | TourInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TourInteractions.
     */
    cursor?: TourInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TourInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TourInteractions.
     */
    skip?: number
    distinct?: TourInteractionScalarFieldEnum | TourInteractionScalarFieldEnum[]
  }

  /**
   * TourInteraction create
   */
  export type TourInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a TourInteraction.
     */
    data: XOR<TourInteractionCreateInput, TourInteractionUncheckedCreateInput>
  }

  /**
   * TourInteraction createMany
   */
  export type TourInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TourInteractions.
     */
    data: TourInteractionCreateManyInput | TourInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TourInteraction createManyAndReturn
   */
  export type TourInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many TourInteractions.
     */
    data: TourInteractionCreateManyInput | TourInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TourInteraction update
   */
  export type TourInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a TourInteraction.
     */
    data: XOR<TourInteractionUpdateInput, TourInteractionUncheckedUpdateInput>
    /**
     * Choose, which TourInteraction to update.
     */
    where: TourInteractionWhereUniqueInput
  }

  /**
   * TourInteraction updateMany
   */
  export type TourInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TourInteractions.
     */
    data: XOR<TourInteractionUpdateManyMutationInput, TourInteractionUncheckedUpdateManyInput>
    /**
     * Filter which TourInteractions to update
     */
    where?: TourInteractionWhereInput
    /**
     * Limit how many TourInteractions to update.
     */
    limit?: number
  }

  /**
   * TourInteraction updateManyAndReturn
   */
  export type TourInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * The data used to update TourInteractions.
     */
    data: XOR<TourInteractionUpdateManyMutationInput, TourInteractionUncheckedUpdateManyInput>
    /**
     * Filter which TourInteractions to update
     */
    where?: TourInteractionWhereInput
    /**
     * Limit how many TourInteractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TourInteraction upsert
   */
  export type TourInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the TourInteraction to update in case it exists.
     */
    where: TourInteractionWhereUniqueInput
    /**
     * In case the TourInteraction found by the `where` argument doesn't exist, create a new TourInteraction with this data.
     */
    create: XOR<TourInteractionCreateInput, TourInteractionUncheckedCreateInput>
    /**
     * In case the TourInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TourInteractionUpdateInput, TourInteractionUncheckedUpdateInput>
  }

  /**
   * TourInteraction delete
   */
  export type TourInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
    /**
     * Filter which TourInteraction to delete.
     */
    where: TourInteractionWhereUniqueInput
  }

  /**
   * TourInteraction deleteMany
   */
  export type TourInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TourInteractions to delete
     */
    where?: TourInteractionWhereInput
    /**
     * Limit how many TourInteractions to delete.
     */
    limit?: number
  }

  /**
   * TourInteraction without action
   */
  export type TourInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TourInteraction
     */
    select?: TourInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TourInteraction
     */
    omit?: TourInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TourInteractionInclude<ExtArgs> | null
  }


  /**
   * Model LocalStorageSync
   */

  export type AggregateLocalStorageSync = {
    _count: LocalStorageSyncCountAggregateOutputType | null
    _min: LocalStorageSyncMinAggregateOutputType | null
    _max: LocalStorageSyncMaxAggregateOutputType | null
  }

  export type LocalStorageSyncMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    onboardingStep: string | null
    isRegistered: boolean | null
    userId: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type LocalStorageSyncMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    onboardingStep: string | null
    isRegistered: boolean | null
    userId: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    expiresAt: Date | null
  }

  export type LocalStorageSyncCountAggregateOutputType = {
    id: number
    sessionId: number
    interests: number
    videoRatings: number
    onboardingStep: number
    layoutData: number
    isRegistered: number
    userId: number
    syncedAt: number
    createdAt: number
    updatedAt: number
    expiresAt: number
    _all: number
  }


  export type LocalStorageSyncMinAggregateInputType = {
    id?: true
    sessionId?: true
    onboardingStep?: true
    isRegistered?: true
    userId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type LocalStorageSyncMaxAggregateInputType = {
    id?: true
    sessionId?: true
    onboardingStep?: true
    isRegistered?: true
    userId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
  }

  export type LocalStorageSyncCountAggregateInputType = {
    id?: true
    sessionId?: true
    interests?: true
    videoRatings?: true
    onboardingStep?: true
    layoutData?: true
    isRegistered?: true
    userId?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type LocalStorageSyncAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocalStorageSync to aggregate.
     */
    where?: LocalStorageSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalStorageSyncs to fetch.
     */
    orderBy?: LocalStorageSyncOrderByWithRelationInput | LocalStorageSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocalStorageSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalStorageSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalStorageSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LocalStorageSyncs
    **/
    _count?: true | LocalStorageSyncCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocalStorageSyncMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocalStorageSyncMaxAggregateInputType
  }

  export type GetLocalStorageSyncAggregateType<T extends LocalStorageSyncAggregateArgs> = {
        [P in keyof T & keyof AggregateLocalStorageSync]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocalStorageSync[P]>
      : GetScalarType<T[P], AggregateLocalStorageSync[P]>
  }




  export type LocalStorageSyncGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocalStorageSyncWhereInput
    orderBy?: LocalStorageSyncOrderByWithAggregationInput | LocalStorageSyncOrderByWithAggregationInput[]
    by: LocalStorageSyncScalarFieldEnum[] | LocalStorageSyncScalarFieldEnum
    having?: LocalStorageSyncScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocalStorageSyncCountAggregateInputType | true
    _min?: LocalStorageSyncMinAggregateInputType
    _max?: LocalStorageSyncMaxAggregateInputType
  }

  export type LocalStorageSyncGroupByOutputType = {
    id: string
    sessionId: string
    interests: string[]
    videoRatings: JsonValue
    onboardingStep: string | null
    layoutData: JsonValue
    isRegistered: boolean
    userId: string | null
    syncedAt: Date | null
    createdAt: Date
    updatedAt: Date
    expiresAt: Date
    _count: LocalStorageSyncCountAggregateOutputType | null
    _min: LocalStorageSyncMinAggregateOutputType | null
    _max: LocalStorageSyncMaxAggregateOutputType | null
  }

  type GetLocalStorageSyncGroupByPayload<T extends LocalStorageSyncGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocalStorageSyncGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocalStorageSyncGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocalStorageSyncGroupByOutputType[P]>
            : GetScalarType<T[P], LocalStorageSyncGroupByOutputType[P]>
        }
      >
    >


  export type LocalStorageSyncSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    interests?: boolean
    videoRatings?: boolean
    onboardingStep?: boolean
    layoutData?: boolean
    isRegistered?: boolean
    userId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["localStorageSync"]>

  export type LocalStorageSyncSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    interests?: boolean
    videoRatings?: boolean
    onboardingStep?: boolean
    layoutData?: boolean
    isRegistered?: boolean
    userId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["localStorageSync"]>

  export type LocalStorageSyncSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    interests?: boolean
    videoRatings?: boolean
    onboardingStep?: boolean
    layoutData?: boolean
    isRegistered?: boolean
    userId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["localStorageSync"]>

  export type LocalStorageSyncSelectScalar = {
    id?: boolean
    sessionId?: boolean
    interests?: boolean
    videoRatings?: boolean
    onboardingStep?: boolean
    layoutData?: boolean
    isRegistered?: boolean
    userId?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    expiresAt?: boolean
  }

  export type LocalStorageSyncOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "interests" | "videoRatings" | "onboardingStep" | "layoutData" | "isRegistered" | "userId" | "syncedAt" | "createdAt" | "updatedAt" | "expiresAt", ExtArgs["result"]["localStorageSync"]>

  export type $LocalStorageSyncPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LocalStorageSync"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      interests: string[]
      videoRatings: Prisma.JsonValue
      onboardingStep: string | null
      layoutData: Prisma.JsonValue
      isRegistered: boolean
      userId: string | null
      syncedAt: Date | null
      createdAt: Date
      updatedAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["localStorageSync"]>
    composites: {}
  }

  type LocalStorageSyncGetPayload<S extends boolean | null | undefined | LocalStorageSyncDefaultArgs> = $Result.GetResult<Prisma.$LocalStorageSyncPayload, S>

  type LocalStorageSyncCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocalStorageSyncFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocalStorageSyncCountAggregateInputType | true
    }

  export interface LocalStorageSyncDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LocalStorageSync'], meta: { name: 'LocalStorageSync' } }
    /**
     * Find zero or one LocalStorageSync that matches the filter.
     * @param {LocalStorageSyncFindUniqueArgs} args - Arguments to find a LocalStorageSync
     * @example
     * // Get one LocalStorageSync
     * const localStorageSync = await prisma.localStorageSync.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocalStorageSyncFindUniqueArgs>(args: SelectSubset<T, LocalStorageSyncFindUniqueArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LocalStorageSync that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocalStorageSyncFindUniqueOrThrowArgs} args - Arguments to find a LocalStorageSync
     * @example
     * // Get one LocalStorageSync
     * const localStorageSync = await prisma.localStorageSync.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocalStorageSyncFindUniqueOrThrowArgs>(args: SelectSubset<T, LocalStorageSyncFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocalStorageSync that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalStorageSyncFindFirstArgs} args - Arguments to find a LocalStorageSync
     * @example
     * // Get one LocalStorageSync
     * const localStorageSync = await prisma.localStorageSync.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocalStorageSyncFindFirstArgs>(args?: SelectSubset<T, LocalStorageSyncFindFirstArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LocalStorageSync that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalStorageSyncFindFirstOrThrowArgs} args - Arguments to find a LocalStorageSync
     * @example
     * // Get one LocalStorageSync
     * const localStorageSync = await prisma.localStorageSync.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocalStorageSyncFindFirstOrThrowArgs>(args?: SelectSubset<T, LocalStorageSyncFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LocalStorageSyncs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalStorageSyncFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LocalStorageSyncs
     * const localStorageSyncs = await prisma.localStorageSync.findMany()
     * 
     * // Get first 10 LocalStorageSyncs
     * const localStorageSyncs = await prisma.localStorageSync.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const localStorageSyncWithIdOnly = await prisma.localStorageSync.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocalStorageSyncFindManyArgs>(args?: SelectSubset<T, LocalStorageSyncFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LocalStorageSync.
     * @param {LocalStorageSyncCreateArgs} args - Arguments to create a LocalStorageSync.
     * @example
     * // Create one LocalStorageSync
     * const LocalStorageSync = await prisma.localStorageSync.create({
     *   data: {
     *     // ... data to create a LocalStorageSync
     *   }
     * })
     * 
     */
    create<T extends LocalStorageSyncCreateArgs>(args: SelectSubset<T, LocalStorageSyncCreateArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LocalStorageSyncs.
     * @param {LocalStorageSyncCreateManyArgs} args - Arguments to create many LocalStorageSyncs.
     * @example
     * // Create many LocalStorageSyncs
     * const localStorageSync = await prisma.localStorageSync.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocalStorageSyncCreateManyArgs>(args?: SelectSubset<T, LocalStorageSyncCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LocalStorageSyncs and returns the data saved in the database.
     * @param {LocalStorageSyncCreateManyAndReturnArgs} args - Arguments to create many LocalStorageSyncs.
     * @example
     * // Create many LocalStorageSyncs
     * const localStorageSync = await prisma.localStorageSync.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LocalStorageSyncs and only return the `id`
     * const localStorageSyncWithIdOnly = await prisma.localStorageSync.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocalStorageSyncCreateManyAndReturnArgs>(args?: SelectSubset<T, LocalStorageSyncCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LocalStorageSync.
     * @param {LocalStorageSyncDeleteArgs} args - Arguments to delete one LocalStorageSync.
     * @example
     * // Delete one LocalStorageSync
     * const LocalStorageSync = await prisma.localStorageSync.delete({
     *   where: {
     *     // ... filter to delete one LocalStorageSync
     *   }
     * })
     * 
     */
    delete<T extends LocalStorageSyncDeleteArgs>(args: SelectSubset<T, LocalStorageSyncDeleteArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LocalStorageSync.
     * @param {LocalStorageSyncUpdateArgs} args - Arguments to update one LocalStorageSync.
     * @example
     * // Update one LocalStorageSync
     * const localStorageSync = await prisma.localStorageSync.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocalStorageSyncUpdateArgs>(args: SelectSubset<T, LocalStorageSyncUpdateArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LocalStorageSyncs.
     * @param {LocalStorageSyncDeleteManyArgs} args - Arguments to filter LocalStorageSyncs to delete.
     * @example
     * // Delete a few LocalStorageSyncs
     * const { count } = await prisma.localStorageSync.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocalStorageSyncDeleteManyArgs>(args?: SelectSubset<T, LocalStorageSyncDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocalStorageSyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalStorageSyncUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LocalStorageSyncs
     * const localStorageSync = await prisma.localStorageSync.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocalStorageSyncUpdateManyArgs>(args: SelectSubset<T, LocalStorageSyncUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LocalStorageSyncs and returns the data updated in the database.
     * @param {LocalStorageSyncUpdateManyAndReturnArgs} args - Arguments to update many LocalStorageSyncs.
     * @example
     * // Update many LocalStorageSyncs
     * const localStorageSync = await prisma.localStorageSync.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LocalStorageSyncs and only return the `id`
     * const localStorageSyncWithIdOnly = await prisma.localStorageSync.updateManyAndReturn({
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
    updateManyAndReturn<T extends LocalStorageSyncUpdateManyAndReturnArgs>(args: SelectSubset<T, LocalStorageSyncUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LocalStorageSync.
     * @param {LocalStorageSyncUpsertArgs} args - Arguments to update or create a LocalStorageSync.
     * @example
     * // Update or create a LocalStorageSync
     * const localStorageSync = await prisma.localStorageSync.upsert({
     *   create: {
     *     // ... data to create a LocalStorageSync
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LocalStorageSync we want to update
     *   }
     * })
     */
    upsert<T extends LocalStorageSyncUpsertArgs>(args: SelectSubset<T, LocalStorageSyncUpsertArgs<ExtArgs>>): Prisma__LocalStorageSyncClient<$Result.GetResult<Prisma.$LocalStorageSyncPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LocalStorageSyncs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalStorageSyncCountArgs} args - Arguments to filter LocalStorageSyncs to count.
     * @example
     * // Count the number of LocalStorageSyncs
     * const count = await prisma.localStorageSync.count({
     *   where: {
     *     // ... the filter for the LocalStorageSyncs we want to count
     *   }
     * })
    **/
    count<T extends LocalStorageSyncCountArgs>(
      args?: Subset<T, LocalStorageSyncCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocalStorageSyncCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LocalStorageSync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalStorageSyncAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocalStorageSyncAggregateArgs>(args: Subset<T, LocalStorageSyncAggregateArgs>): Prisma.PrismaPromise<GetLocalStorageSyncAggregateType<T>>

    /**
     * Group by LocalStorageSync.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocalStorageSyncGroupByArgs} args - Group by arguments.
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
      T extends LocalStorageSyncGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocalStorageSyncGroupByArgs['orderBy'] }
        : { orderBy?: LocalStorageSyncGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LocalStorageSyncGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocalStorageSyncGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LocalStorageSync model
   */
  readonly fields: LocalStorageSyncFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LocalStorageSync.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocalStorageSyncClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the LocalStorageSync model
   */
  interface LocalStorageSyncFieldRefs {
    readonly id: FieldRef<"LocalStorageSync", 'String'>
    readonly sessionId: FieldRef<"LocalStorageSync", 'String'>
    readonly interests: FieldRef<"LocalStorageSync", 'String[]'>
    readonly videoRatings: FieldRef<"LocalStorageSync", 'Json'>
    readonly onboardingStep: FieldRef<"LocalStorageSync", 'String'>
    readonly layoutData: FieldRef<"LocalStorageSync", 'Json'>
    readonly isRegistered: FieldRef<"LocalStorageSync", 'Boolean'>
    readonly userId: FieldRef<"LocalStorageSync", 'String'>
    readonly syncedAt: FieldRef<"LocalStorageSync", 'DateTime'>
    readonly createdAt: FieldRef<"LocalStorageSync", 'DateTime'>
    readonly updatedAt: FieldRef<"LocalStorageSync", 'DateTime'>
    readonly expiresAt: FieldRef<"LocalStorageSync", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LocalStorageSync findUnique
   */
  export type LocalStorageSyncFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * Filter, which LocalStorageSync to fetch.
     */
    where: LocalStorageSyncWhereUniqueInput
  }

  /**
   * LocalStorageSync findUniqueOrThrow
   */
  export type LocalStorageSyncFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * Filter, which LocalStorageSync to fetch.
     */
    where: LocalStorageSyncWhereUniqueInput
  }

  /**
   * LocalStorageSync findFirst
   */
  export type LocalStorageSyncFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * Filter, which LocalStorageSync to fetch.
     */
    where?: LocalStorageSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalStorageSyncs to fetch.
     */
    orderBy?: LocalStorageSyncOrderByWithRelationInput | LocalStorageSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocalStorageSyncs.
     */
    cursor?: LocalStorageSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalStorageSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalStorageSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocalStorageSyncs.
     */
    distinct?: LocalStorageSyncScalarFieldEnum | LocalStorageSyncScalarFieldEnum[]
  }

  /**
   * LocalStorageSync findFirstOrThrow
   */
  export type LocalStorageSyncFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * Filter, which LocalStorageSync to fetch.
     */
    where?: LocalStorageSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalStorageSyncs to fetch.
     */
    orderBy?: LocalStorageSyncOrderByWithRelationInput | LocalStorageSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LocalStorageSyncs.
     */
    cursor?: LocalStorageSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalStorageSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalStorageSyncs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LocalStorageSyncs.
     */
    distinct?: LocalStorageSyncScalarFieldEnum | LocalStorageSyncScalarFieldEnum[]
  }

  /**
   * LocalStorageSync findMany
   */
  export type LocalStorageSyncFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * Filter, which LocalStorageSyncs to fetch.
     */
    where?: LocalStorageSyncWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LocalStorageSyncs to fetch.
     */
    orderBy?: LocalStorageSyncOrderByWithRelationInput | LocalStorageSyncOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LocalStorageSyncs.
     */
    cursor?: LocalStorageSyncWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LocalStorageSyncs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LocalStorageSyncs.
     */
    skip?: number
    distinct?: LocalStorageSyncScalarFieldEnum | LocalStorageSyncScalarFieldEnum[]
  }

  /**
   * LocalStorageSync create
   */
  export type LocalStorageSyncCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * The data needed to create a LocalStorageSync.
     */
    data: XOR<LocalStorageSyncCreateInput, LocalStorageSyncUncheckedCreateInput>
  }

  /**
   * LocalStorageSync createMany
   */
  export type LocalStorageSyncCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LocalStorageSyncs.
     */
    data: LocalStorageSyncCreateManyInput | LocalStorageSyncCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocalStorageSync createManyAndReturn
   */
  export type LocalStorageSyncCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * The data used to create many LocalStorageSyncs.
     */
    data: LocalStorageSyncCreateManyInput | LocalStorageSyncCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LocalStorageSync update
   */
  export type LocalStorageSyncUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * The data needed to update a LocalStorageSync.
     */
    data: XOR<LocalStorageSyncUpdateInput, LocalStorageSyncUncheckedUpdateInput>
    /**
     * Choose, which LocalStorageSync to update.
     */
    where: LocalStorageSyncWhereUniqueInput
  }

  /**
   * LocalStorageSync updateMany
   */
  export type LocalStorageSyncUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LocalStorageSyncs.
     */
    data: XOR<LocalStorageSyncUpdateManyMutationInput, LocalStorageSyncUncheckedUpdateManyInput>
    /**
     * Filter which LocalStorageSyncs to update
     */
    where?: LocalStorageSyncWhereInput
    /**
     * Limit how many LocalStorageSyncs to update.
     */
    limit?: number
  }

  /**
   * LocalStorageSync updateManyAndReturn
   */
  export type LocalStorageSyncUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * The data used to update LocalStorageSyncs.
     */
    data: XOR<LocalStorageSyncUpdateManyMutationInput, LocalStorageSyncUncheckedUpdateManyInput>
    /**
     * Filter which LocalStorageSyncs to update
     */
    where?: LocalStorageSyncWhereInput
    /**
     * Limit how many LocalStorageSyncs to update.
     */
    limit?: number
  }

  /**
   * LocalStorageSync upsert
   */
  export type LocalStorageSyncUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * The filter to search for the LocalStorageSync to update in case it exists.
     */
    where: LocalStorageSyncWhereUniqueInput
    /**
     * In case the LocalStorageSync found by the `where` argument doesn't exist, create a new LocalStorageSync with this data.
     */
    create: XOR<LocalStorageSyncCreateInput, LocalStorageSyncUncheckedCreateInput>
    /**
     * In case the LocalStorageSync was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocalStorageSyncUpdateInput, LocalStorageSyncUncheckedUpdateInput>
  }

  /**
   * LocalStorageSync delete
   */
  export type LocalStorageSyncDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
    /**
     * Filter which LocalStorageSync to delete.
     */
    where: LocalStorageSyncWhereUniqueInput
  }

  /**
   * LocalStorageSync deleteMany
   */
  export type LocalStorageSyncDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LocalStorageSyncs to delete
     */
    where?: LocalStorageSyncWhereInput
    /**
     * Limit how many LocalStorageSyncs to delete.
     */
    limit?: number
  }

  /**
   * LocalStorageSync without action
   */
  export type LocalStorageSyncDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocalStorageSync
     */
    select?: LocalStorageSyncSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LocalStorageSync
     */
    omit?: LocalStorageSyncOmit<ExtArgs> | null
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


  export const ConversationSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sessionId: 'sessionId',
    currentStep: 'currentStep',
    isCompleted: 'isCompleted',
    isVoiceMode: 'isVoiceMode',
    selectedInterests: 'selectedInterests',
    videoRatings: 'videoRatings',
    layoutPreferences: 'layoutPreferences',
    llmProvider: 'llmProvider',
    llmApiKey: 'llmApiKey',
    conversationId: 'conversationId',
    stepProgress: 'stepProgress',
    completedSteps: 'completedSteps',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastActiveAt: 'lastActiveAt',
    completedAt: 'completedAt'
  };

  export type ConversationSessionScalarFieldEnum = (typeof ConversationSessionScalarFieldEnum)[keyof typeof ConversationSessionScalarFieldEnum]


  export const ConversationLogScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    role: 'role',
    content: 'content',
    messageId: 'messageId',
    tourStep: 'tourStep',
    actionType: 'actionType',
    metadata: 'metadata',
    tokensUsed: 'tokensUsed',
    responseTimeMs: 'responseTimeMs',
    llmProvider: 'llmProvider',
    createdAt: 'createdAt'
  };

  export type ConversationLogScalarFieldEnum = (typeof ConversationLogScalarFieldEnum)[keyof typeof ConversationLogScalarFieldEnum]


  export const TourInteractionScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    tourStep: 'tourStep',
    actionType: 'actionType',
    actionData: 'actionData',
    timeSpentMs: 'timeSpentMs',
    wasSkipped: 'wasSkipped',
    satisfaction: 'satisfaction',
    createdAt: 'createdAt'
  };

  export type TourInteractionScalarFieldEnum = (typeof TourInteractionScalarFieldEnum)[keyof typeof TourInteractionScalarFieldEnum]


  export const LocalStorageSyncScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    interests: 'interests',
    videoRatings: 'videoRatings',
    onboardingStep: 'onboardingStep',
    layoutData: 'layoutData',
    isRegistered: 'isRegistered',
    userId: 'userId',
    syncedAt: 'syncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    expiresAt: 'expiresAt'
  };

  export type LocalStorageSyncScalarFieldEnum = (typeof LocalStorageSyncScalarFieldEnum)[keyof typeof LocalStorageSyncScalarFieldEnum]


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
   * Reference to a field of type 'TourStep'
   */
  export type EnumTourStepFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TourStep'>
    


  /**
   * Reference to a field of type 'TourStep[]'
   */
  export type ListEnumTourStepFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TourStep[]'>
    


  /**
   * Reference to a field of type 'MessageRole'
   */
  export type EnumMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageRole'>
    


  /**
   * Reference to a field of type 'MessageRole[]'
   */
  export type ListEnumMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageRole[]'>
    
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
    conversationSessions?: ConversationSessionListRelationFilter
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
    conversationSessions?: ConversationSessionOrderByRelationAggregateInput
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
    conversationSessions?: ConversationSessionListRelationFilter
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

  export type ConversationSessionWhereInput = {
    AND?: ConversationSessionWhereInput | ConversationSessionWhereInput[]
    OR?: ConversationSessionWhereInput[]
    NOT?: ConversationSessionWhereInput | ConversationSessionWhereInput[]
    id?: StringFilter<"ConversationSession"> | string
    userId?: StringNullableFilter<"ConversationSession"> | string | null
    sessionId?: StringFilter<"ConversationSession"> | string
    currentStep?: EnumTourStepFilter<"ConversationSession"> | $Enums.TourStep
    isCompleted?: BoolFilter<"ConversationSession"> | boolean
    isVoiceMode?: BoolFilter<"ConversationSession"> | boolean
    selectedInterests?: StringNullableListFilter<"ConversationSession">
    videoRatings?: JsonFilter<"ConversationSession">
    layoutPreferences?: JsonFilter<"ConversationSession">
    llmProvider?: StringNullableFilter<"ConversationSession"> | string | null
    llmApiKey?: StringNullableFilter<"ConversationSession"> | string | null
    conversationId?: StringNullableFilter<"ConversationSession"> | string | null
    stepProgress?: JsonFilter<"ConversationSession">
    completedSteps?: StringNullableListFilter<"ConversationSession">
    createdAt?: DateTimeFilter<"ConversationSession"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationSession"> | Date | string
    lastActiveAt?: DateTimeFilter<"ConversationSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"ConversationSession"> | Date | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    conversationLogs?: ConversationLogListRelationFilter
    tourInteractions?: TourInteractionListRelationFilter
  }

  export type ConversationSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    isVoiceMode?: SortOrder
    selectedInterests?: SortOrder
    videoRatings?: SortOrder
    layoutPreferences?: SortOrder
    llmProvider?: SortOrderInput | SortOrder
    llmApiKey?: SortOrderInput | SortOrder
    conversationId?: SortOrderInput | SortOrder
    stepProgress?: SortOrder
    completedSteps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    conversationLogs?: ConversationLogOrderByRelationAggregateInput
    tourInteractions?: TourInteractionOrderByRelationAggregateInput
  }

  export type ConversationSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: ConversationSessionWhereInput | ConversationSessionWhereInput[]
    OR?: ConversationSessionWhereInput[]
    NOT?: ConversationSessionWhereInput | ConversationSessionWhereInput[]
    userId?: StringNullableFilter<"ConversationSession"> | string | null
    currentStep?: EnumTourStepFilter<"ConversationSession"> | $Enums.TourStep
    isCompleted?: BoolFilter<"ConversationSession"> | boolean
    isVoiceMode?: BoolFilter<"ConversationSession"> | boolean
    selectedInterests?: StringNullableListFilter<"ConversationSession">
    videoRatings?: JsonFilter<"ConversationSession">
    layoutPreferences?: JsonFilter<"ConversationSession">
    llmProvider?: StringNullableFilter<"ConversationSession"> | string | null
    llmApiKey?: StringNullableFilter<"ConversationSession"> | string | null
    conversationId?: StringNullableFilter<"ConversationSession"> | string | null
    stepProgress?: JsonFilter<"ConversationSession">
    completedSteps?: StringNullableListFilter<"ConversationSession">
    createdAt?: DateTimeFilter<"ConversationSession"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationSession"> | Date | string
    lastActiveAt?: DateTimeFilter<"ConversationSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"ConversationSession"> | Date | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    conversationLogs?: ConversationLogListRelationFilter
    tourInteractions?: TourInteractionListRelationFilter
  }, "id" | "sessionId">

  export type ConversationSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    isVoiceMode?: SortOrder
    selectedInterests?: SortOrder
    videoRatings?: SortOrder
    layoutPreferences?: SortOrder
    llmProvider?: SortOrderInput | SortOrder
    llmApiKey?: SortOrderInput | SortOrder
    conversationId?: SortOrderInput | SortOrder
    stepProgress?: SortOrder
    completedSteps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: ConversationSessionCountOrderByAggregateInput
    _max?: ConversationSessionMaxOrderByAggregateInput
    _min?: ConversationSessionMinOrderByAggregateInput
  }

  export type ConversationSessionScalarWhereWithAggregatesInput = {
    AND?: ConversationSessionScalarWhereWithAggregatesInput | ConversationSessionScalarWhereWithAggregatesInput[]
    OR?: ConversationSessionScalarWhereWithAggregatesInput[]
    NOT?: ConversationSessionScalarWhereWithAggregatesInput | ConversationSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConversationSession"> | string
    userId?: StringNullableWithAggregatesFilter<"ConversationSession"> | string | null
    sessionId?: StringWithAggregatesFilter<"ConversationSession"> | string
    currentStep?: EnumTourStepWithAggregatesFilter<"ConversationSession"> | $Enums.TourStep
    isCompleted?: BoolWithAggregatesFilter<"ConversationSession"> | boolean
    isVoiceMode?: BoolWithAggregatesFilter<"ConversationSession"> | boolean
    selectedInterests?: StringNullableListFilter<"ConversationSession">
    videoRatings?: JsonWithAggregatesFilter<"ConversationSession">
    layoutPreferences?: JsonWithAggregatesFilter<"ConversationSession">
    llmProvider?: StringNullableWithAggregatesFilter<"ConversationSession"> | string | null
    llmApiKey?: StringNullableWithAggregatesFilter<"ConversationSession"> | string | null
    conversationId?: StringNullableWithAggregatesFilter<"ConversationSession"> | string | null
    stepProgress?: JsonWithAggregatesFilter<"ConversationSession">
    completedSteps?: StringNullableListFilter<"ConversationSession">
    createdAt?: DateTimeWithAggregatesFilter<"ConversationSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ConversationSession"> | Date | string
    lastActiveAt?: DateTimeWithAggregatesFilter<"ConversationSession"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ConversationSession"> | Date | string | null
  }

  export type ConversationLogWhereInput = {
    AND?: ConversationLogWhereInput | ConversationLogWhereInput[]
    OR?: ConversationLogWhereInput[]
    NOT?: ConversationLogWhereInput | ConversationLogWhereInput[]
    id?: StringFilter<"ConversationLog"> | string
    sessionId?: StringFilter<"ConversationLog"> | string
    role?: EnumMessageRoleFilter<"ConversationLog"> | $Enums.MessageRole
    content?: StringFilter<"ConversationLog"> | string
    messageId?: StringNullableFilter<"ConversationLog"> | string | null
    tourStep?: EnumTourStepNullableFilter<"ConversationLog"> | $Enums.TourStep | null
    actionType?: StringNullableFilter<"ConversationLog"> | string | null
    metadata?: JsonFilter<"ConversationLog">
    tokensUsed?: IntNullableFilter<"ConversationLog"> | number | null
    responseTimeMs?: IntNullableFilter<"ConversationLog"> | number | null
    llmProvider?: StringNullableFilter<"ConversationLog"> | string | null
    createdAt?: DateTimeFilter<"ConversationLog"> | Date | string
    session?: XOR<ConversationSessionScalarRelationFilter, ConversationSessionWhereInput>
  }

  export type ConversationLogOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    messageId?: SortOrderInput | SortOrder
    tourStep?: SortOrderInput | SortOrder
    actionType?: SortOrderInput | SortOrder
    metadata?: SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    responseTimeMs?: SortOrderInput | SortOrder
    llmProvider?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: ConversationSessionOrderByWithRelationInput
  }

  export type ConversationLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationLogWhereInput | ConversationLogWhereInput[]
    OR?: ConversationLogWhereInput[]
    NOT?: ConversationLogWhereInput | ConversationLogWhereInput[]
    sessionId?: StringFilter<"ConversationLog"> | string
    role?: EnumMessageRoleFilter<"ConversationLog"> | $Enums.MessageRole
    content?: StringFilter<"ConversationLog"> | string
    messageId?: StringNullableFilter<"ConversationLog"> | string | null
    tourStep?: EnumTourStepNullableFilter<"ConversationLog"> | $Enums.TourStep | null
    actionType?: StringNullableFilter<"ConversationLog"> | string | null
    metadata?: JsonFilter<"ConversationLog">
    tokensUsed?: IntNullableFilter<"ConversationLog"> | number | null
    responseTimeMs?: IntNullableFilter<"ConversationLog"> | number | null
    llmProvider?: StringNullableFilter<"ConversationLog"> | string | null
    createdAt?: DateTimeFilter<"ConversationLog"> | Date | string
    session?: XOR<ConversationSessionScalarRelationFilter, ConversationSessionWhereInput>
  }, "id">

  export type ConversationLogOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    messageId?: SortOrderInput | SortOrder
    tourStep?: SortOrderInput | SortOrder
    actionType?: SortOrderInput | SortOrder
    metadata?: SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    responseTimeMs?: SortOrderInput | SortOrder
    llmProvider?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ConversationLogCountOrderByAggregateInput
    _avg?: ConversationLogAvgOrderByAggregateInput
    _max?: ConversationLogMaxOrderByAggregateInput
    _min?: ConversationLogMinOrderByAggregateInput
    _sum?: ConversationLogSumOrderByAggregateInput
  }

  export type ConversationLogScalarWhereWithAggregatesInput = {
    AND?: ConversationLogScalarWhereWithAggregatesInput | ConversationLogScalarWhereWithAggregatesInput[]
    OR?: ConversationLogScalarWhereWithAggregatesInput[]
    NOT?: ConversationLogScalarWhereWithAggregatesInput | ConversationLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConversationLog"> | string
    sessionId?: StringWithAggregatesFilter<"ConversationLog"> | string
    role?: EnumMessageRoleWithAggregatesFilter<"ConversationLog"> | $Enums.MessageRole
    content?: StringWithAggregatesFilter<"ConversationLog"> | string
    messageId?: StringNullableWithAggregatesFilter<"ConversationLog"> | string | null
    tourStep?: EnumTourStepNullableWithAggregatesFilter<"ConversationLog"> | $Enums.TourStep | null
    actionType?: StringNullableWithAggregatesFilter<"ConversationLog"> | string | null
    metadata?: JsonWithAggregatesFilter<"ConversationLog">
    tokensUsed?: IntNullableWithAggregatesFilter<"ConversationLog"> | number | null
    responseTimeMs?: IntNullableWithAggregatesFilter<"ConversationLog"> | number | null
    llmProvider?: StringNullableWithAggregatesFilter<"ConversationLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ConversationLog"> | Date | string
  }

  export type TourInteractionWhereInput = {
    AND?: TourInteractionWhereInput | TourInteractionWhereInput[]
    OR?: TourInteractionWhereInput[]
    NOT?: TourInteractionWhereInput | TourInteractionWhereInput[]
    id?: StringFilter<"TourInteraction"> | string
    sessionId?: StringFilter<"TourInteraction"> | string
    tourStep?: EnumTourStepFilter<"TourInteraction"> | $Enums.TourStep
    actionType?: StringFilter<"TourInteraction"> | string
    actionData?: JsonFilter<"TourInteraction">
    timeSpentMs?: IntNullableFilter<"TourInteraction"> | number | null
    wasSkipped?: BoolFilter<"TourInteraction"> | boolean
    satisfaction?: IntNullableFilter<"TourInteraction"> | number | null
    createdAt?: DateTimeFilter<"TourInteraction"> | Date | string
    session?: XOR<ConversationSessionScalarRelationFilter, ConversationSessionWhereInput>
  }

  export type TourInteractionOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    timeSpentMs?: SortOrderInput | SortOrder
    wasSkipped?: SortOrder
    satisfaction?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: ConversationSessionOrderByWithRelationInput
  }

  export type TourInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TourInteractionWhereInput | TourInteractionWhereInput[]
    OR?: TourInteractionWhereInput[]
    NOT?: TourInteractionWhereInput | TourInteractionWhereInput[]
    sessionId?: StringFilter<"TourInteraction"> | string
    tourStep?: EnumTourStepFilter<"TourInteraction"> | $Enums.TourStep
    actionType?: StringFilter<"TourInteraction"> | string
    actionData?: JsonFilter<"TourInteraction">
    timeSpentMs?: IntNullableFilter<"TourInteraction"> | number | null
    wasSkipped?: BoolFilter<"TourInteraction"> | boolean
    satisfaction?: IntNullableFilter<"TourInteraction"> | number | null
    createdAt?: DateTimeFilter<"TourInteraction"> | Date | string
    session?: XOR<ConversationSessionScalarRelationFilter, ConversationSessionWhereInput>
  }, "id">

  export type TourInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    timeSpentMs?: SortOrderInput | SortOrder
    wasSkipped?: SortOrder
    satisfaction?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TourInteractionCountOrderByAggregateInput
    _avg?: TourInteractionAvgOrderByAggregateInput
    _max?: TourInteractionMaxOrderByAggregateInput
    _min?: TourInteractionMinOrderByAggregateInput
    _sum?: TourInteractionSumOrderByAggregateInput
  }

  export type TourInteractionScalarWhereWithAggregatesInput = {
    AND?: TourInteractionScalarWhereWithAggregatesInput | TourInteractionScalarWhereWithAggregatesInput[]
    OR?: TourInteractionScalarWhereWithAggregatesInput[]
    NOT?: TourInteractionScalarWhereWithAggregatesInput | TourInteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TourInteraction"> | string
    sessionId?: StringWithAggregatesFilter<"TourInteraction"> | string
    tourStep?: EnumTourStepWithAggregatesFilter<"TourInteraction"> | $Enums.TourStep
    actionType?: StringWithAggregatesFilter<"TourInteraction"> | string
    actionData?: JsonWithAggregatesFilter<"TourInteraction">
    timeSpentMs?: IntNullableWithAggregatesFilter<"TourInteraction"> | number | null
    wasSkipped?: BoolWithAggregatesFilter<"TourInteraction"> | boolean
    satisfaction?: IntNullableWithAggregatesFilter<"TourInteraction"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"TourInteraction"> | Date | string
  }

  export type LocalStorageSyncWhereInput = {
    AND?: LocalStorageSyncWhereInput | LocalStorageSyncWhereInput[]
    OR?: LocalStorageSyncWhereInput[]
    NOT?: LocalStorageSyncWhereInput | LocalStorageSyncWhereInput[]
    id?: StringFilter<"LocalStorageSync"> | string
    sessionId?: StringFilter<"LocalStorageSync"> | string
    interests?: StringNullableListFilter<"LocalStorageSync">
    videoRatings?: JsonFilter<"LocalStorageSync">
    onboardingStep?: StringNullableFilter<"LocalStorageSync"> | string | null
    layoutData?: JsonFilter<"LocalStorageSync">
    isRegistered?: BoolFilter<"LocalStorageSync"> | boolean
    userId?: StringNullableFilter<"LocalStorageSync"> | string | null
    syncedAt?: DateTimeNullableFilter<"LocalStorageSync"> | Date | string | null
    createdAt?: DateTimeFilter<"LocalStorageSync"> | Date | string
    updatedAt?: DateTimeFilter<"LocalStorageSync"> | Date | string
    expiresAt?: DateTimeFilter<"LocalStorageSync"> | Date | string
  }

  export type LocalStorageSyncOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    interests?: SortOrder
    videoRatings?: SortOrder
    onboardingStep?: SortOrderInput | SortOrder
    layoutData?: SortOrder
    isRegistered?: SortOrder
    userId?: SortOrderInput | SortOrder
    syncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type LocalStorageSyncWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionId?: string
    AND?: LocalStorageSyncWhereInput | LocalStorageSyncWhereInput[]
    OR?: LocalStorageSyncWhereInput[]
    NOT?: LocalStorageSyncWhereInput | LocalStorageSyncWhereInput[]
    interests?: StringNullableListFilter<"LocalStorageSync">
    videoRatings?: JsonFilter<"LocalStorageSync">
    onboardingStep?: StringNullableFilter<"LocalStorageSync"> | string | null
    layoutData?: JsonFilter<"LocalStorageSync">
    isRegistered?: BoolFilter<"LocalStorageSync"> | boolean
    userId?: StringNullableFilter<"LocalStorageSync"> | string | null
    syncedAt?: DateTimeNullableFilter<"LocalStorageSync"> | Date | string | null
    createdAt?: DateTimeFilter<"LocalStorageSync"> | Date | string
    updatedAt?: DateTimeFilter<"LocalStorageSync"> | Date | string
    expiresAt?: DateTimeFilter<"LocalStorageSync"> | Date | string
  }, "id" | "sessionId">

  export type LocalStorageSyncOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    interests?: SortOrder
    videoRatings?: SortOrder
    onboardingStep?: SortOrderInput | SortOrder
    layoutData?: SortOrder
    isRegistered?: SortOrder
    userId?: SortOrderInput | SortOrder
    syncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
    _count?: LocalStorageSyncCountOrderByAggregateInput
    _max?: LocalStorageSyncMaxOrderByAggregateInput
    _min?: LocalStorageSyncMinOrderByAggregateInput
  }

  export type LocalStorageSyncScalarWhereWithAggregatesInput = {
    AND?: LocalStorageSyncScalarWhereWithAggregatesInput | LocalStorageSyncScalarWhereWithAggregatesInput[]
    OR?: LocalStorageSyncScalarWhereWithAggregatesInput[]
    NOT?: LocalStorageSyncScalarWhereWithAggregatesInput | LocalStorageSyncScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LocalStorageSync"> | string
    sessionId?: StringWithAggregatesFilter<"LocalStorageSync"> | string
    interests?: StringNullableListFilter<"LocalStorageSync">
    videoRatings?: JsonWithAggregatesFilter<"LocalStorageSync">
    onboardingStep?: StringNullableWithAggregatesFilter<"LocalStorageSync"> | string | null
    layoutData?: JsonWithAggregatesFilter<"LocalStorageSync">
    isRegistered?: BoolWithAggregatesFilter<"LocalStorageSync"> | boolean
    userId?: StringNullableWithAggregatesFilter<"LocalStorageSync"> | string | null
    syncedAt?: DateTimeNullableWithAggregatesFilter<"LocalStorageSync"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LocalStorageSync"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LocalStorageSync"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"LocalStorageSync"> | Date | string
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
    conversationSessions?: ConversationSessionCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUncheckedCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionUncheckedUpdateManyWithoutUserNestedInput
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

  export type ConversationSessionCreateInput = {
    id?: string
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutConversationSessionsInput
    conversationLogs?: ConversationLogCreateNestedManyWithoutSessionInput
    tourInteractions?: TourInteractionCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionUncheckedCreateInput = {
    id?: string
    userId?: string | null
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    conversationLogs?: ConversationLogUncheckedCreateNestedManyWithoutSessionInput
    tourInteractions?: TourInteractionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutConversationSessionsNestedInput
    conversationLogs?: ConversationLogUpdateManyWithoutSessionNestedInput
    tourInteractions?: TourInteractionUpdateManyWithoutSessionNestedInput
  }

  export type ConversationSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversationLogs?: ConversationLogUncheckedUpdateManyWithoutSessionNestedInput
    tourInteractions?: TourInteractionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ConversationSessionCreateManyInput = {
    id?: string
    userId?: string | null
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ConversationSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConversationSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ConversationLogCreateInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    messageId?: string | null
    tourStep?: $Enums.TourStep | null
    actionType?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: number | null
    responseTimeMs?: number | null
    llmProvider?: string | null
    createdAt?: Date | string
    session: ConversationSessionCreateNestedOneWithoutConversationLogsInput
  }

  export type ConversationLogUncheckedCreateInput = {
    id?: string
    sessionId: string
    role: $Enums.MessageRole
    content: string
    messageId?: string | null
    tourStep?: $Enums.TourStep | null
    actionType?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: number | null
    responseTimeMs?: number | null
    llmProvider?: string | null
    createdAt?: Date | string
  }

  export type ConversationLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    tourStep?: NullableEnumTourStepFieldUpdateOperationsInput | $Enums.TourStep | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    responseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: ConversationSessionUpdateOneRequiredWithoutConversationLogsNestedInput
  }

  export type ConversationLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    tourStep?: NullableEnumTourStepFieldUpdateOperationsInput | $Enums.TourStep | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    responseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationLogCreateManyInput = {
    id?: string
    sessionId: string
    role: $Enums.MessageRole
    content: string
    messageId?: string | null
    tourStep?: $Enums.TourStep | null
    actionType?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: number | null
    responseTimeMs?: number | null
    llmProvider?: string | null
    createdAt?: Date | string
  }

  export type ConversationLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    tourStep?: NullableEnumTourStepFieldUpdateOperationsInput | $Enums.TourStep | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    responseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    tourStep?: NullableEnumTourStepFieldUpdateOperationsInput | $Enums.TourStep | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    responseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourInteractionCreateInput = {
    id?: string
    tourStep: $Enums.TourStep
    actionType: string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: number | null
    wasSkipped?: boolean
    satisfaction?: number | null
    createdAt?: Date | string
    session: ConversationSessionCreateNestedOneWithoutTourInteractionsInput
  }

  export type TourInteractionUncheckedCreateInput = {
    id?: string
    sessionId: string
    tourStep: $Enums.TourStep
    actionType: string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: number | null
    wasSkipped?: boolean
    satisfaction?: number | null
    createdAt?: Date | string
  }

  export type TourInteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: NullableIntFieldUpdateOperationsInput | number | null
    wasSkipped?: BoolFieldUpdateOperationsInput | boolean
    satisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: ConversationSessionUpdateOneRequiredWithoutTourInteractionsNestedInput
  }

  export type TourInteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    tourStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: NullableIntFieldUpdateOperationsInput | number | null
    wasSkipped?: BoolFieldUpdateOperationsInput | boolean
    satisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourInteractionCreateManyInput = {
    id?: string
    sessionId: string
    tourStep: $Enums.TourStep
    actionType: string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: number | null
    wasSkipped?: boolean
    satisfaction?: number | null
    createdAt?: Date | string
  }

  export type TourInteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: NullableIntFieldUpdateOperationsInput | number | null
    wasSkipped?: BoolFieldUpdateOperationsInput | boolean
    satisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourInteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    tourStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: NullableIntFieldUpdateOperationsInput | number | null
    wasSkipped?: BoolFieldUpdateOperationsInput | boolean
    satisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalStorageSyncCreateInput = {
    id?: string
    sessionId: string
    interests?: LocalStorageSyncCreateinterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    onboardingStep?: string | null
    layoutData?: JsonNullValueInput | InputJsonValue
    isRegistered?: boolean
    userId?: string | null
    syncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
  }

  export type LocalStorageSyncUncheckedCreateInput = {
    id?: string
    sessionId: string
    interests?: LocalStorageSyncCreateinterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    onboardingStep?: string | null
    layoutData?: JsonNullValueInput | InputJsonValue
    isRegistered?: boolean
    userId?: string | null
    syncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
  }

  export type LocalStorageSyncUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    interests?: LocalStorageSyncUpdateinterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    onboardingStep?: NullableStringFieldUpdateOperationsInput | string | null
    layoutData?: JsonNullValueInput | InputJsonValue
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalStorageSyncUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    interests?: LocalStorageSyncUpdateinterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    onboardingStep?: NullableStringFieldUpdateOperationsInput | string | null
    layoutData?: JsonNullValueInput | InputJsonValue
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalStorageSyncCreateManyInput = {
    id?: string
    sessionId: string
    interests?: LocalStorageSyncCreateinterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    onboardingStep?: string | null
    layoutData?: JsonNullValueInput | InputJsonValue
    isRegistered?: boolean
    userId?: string | null
    syncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    expiresAt: Date | string
  }

  export type LocalStorageSyncUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    interests?: LocalStorageSyncUpdateinterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    onboardingStep?: NullableStringFieldUpdateOperationsInput | string | null
    layoutData?: JsonNullValueInput | InputJsonValue
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocalStorageSyncUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    interests?: LocalStorageSyncUpdateinterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    onboardingStep?: NullableStringFieldUpdateOperationsInput | string | null
    layoutData?: JsonNullValueInput | InputJsonValue
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ConversationSessionListRelationFilter = {
    every?: ConversationSessionWhereInput
    some?: ConversationSessionWhereInput
    none?: ConversationSessionWhereInput
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

  export type ConversationSessionOrderByRelationAggregateInput = {
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

  export type EnumTourStepFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel>
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStepFilter<$PrismaModel> | $Enums.TourStep
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ConversationLogListRelationFilter = {
    every?: ConversationLogWhereInput
    some?: ConversationLogWhereInput
    none?: ConversationLogWhereInput
  }

  export type TourInteractionListRelationFilter = {
    every?: TourInteractionWhereInput
    some?: TourInteractionWhereInput
    none?: TourInteractionWhereInput
  }

  export type ConversationLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TourInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    isVoiceMode?: SortOrder
    selectedInterests?: SortOrder
    videoRatings?: SortOrder
    layoutPreferences?: SortOrder
    llmProvider?: SortOrder
    llmApiKey?: SortOrder
    conversationId?: SortOrder
    stepProgress?: SortOrder
    completedSteps?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ConversationSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    isVoiceMode?: SortOrder
    llmProvider?: SortOrder
    llmApiKey?: SortOrder
    conversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ConversationSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionId?: SortOrder
    currentStep?: SortOrder
    isCompleted?: SortOrder
    isVoiceMode?: SortOrder
    llmProvider?: SortOrder
    llmApiKey?: SortOrder
    conversationId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastActiveAt?: SortOrder
    completedAt?: SortOrder
  }

  export type EnumTourStepWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel>
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStepWithAggregatesFilter<$PrismaModel> | $Enums.TourStep
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTourStepFilter<$PrismaModel>
    _max?: NestedEnumTourStepFilter<$PrismaModel>
  }

  export type EnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole
  }

  export type EnumTourStepNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTourStepNullableFilter<$PrismaModel> | $Enums.TourStep | null
  }

  export type ConversationSessionScalarRelationFilter = {
    is?: ConversationSessionWhereInput
    isNot?: ConversationSessionWhereInput
  }

  export type ConversationLogCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    metadata?: SortOrder
    tokensUsed?: SortOrder
    responseTimeMs?: SortOrder
    llmProvider?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversationLogAvgOrderByAggregateInput = {
    tokensUsed?: SortOrder
    responseTimeMs?: SortOrder
  }

  export type ConversationLogMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    tokensUsed?: SortOrder
    responseTimeMs?: SortOrder
    llmProvider?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversationLogMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    tokensUsed?: SortOrder
    responseTimeMs?: SortOrder
    llmProvider?: SortOrder
    createdAt?: SortOrder
  }

  export type ConversationLogSumOrderByAggregateInput = {
    tokensUsed?: SortOrder
    responseTimeMs?: SortOrder
  }

  export type EnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumMessageRoleFilter<$PrismaModel>
  }

  export type EnumTourStepNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTourStepNullableWithAggregatesFilter<$PrismaModel> | $Enums.TourStep | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTourStepNullableFilter<$PrismaModel>
    _max?: NestedEnumTourStepNullableFilter<$PrismaModel>
  }

  export type TourInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    actionData?: SortOrder
    timeSpentMs?: SortOrder
    wasSkipped?: SortOrder
    satisfaction?: SortOrder
    createdAt?: SortOrder
  }

  export type TourInteractionAvgOrderByAggregateInput = {
    timeSpentMs?: SortOrder
    satisfaction?: SortOrder
  }

  export type TourInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    timeSpentMs?: SortOrder
    wasSkipped?: SortOrder
    satisfaction?: SortOrder
    createdAt?: SortOrder
  }

  export type TourInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    tourStep?: SortOrder
    actionType?: SortOrder
    timeSpentMs?: SortOrder
    wasSkipped?: SortOrder
    satisfaction?: SortOrder
    createdAt?: SortOrder
  }

  export type TourInteractionSumOrderByAggregateInput = {
    timeSpentMs?: SortOrder
    satisfaction?: SortOrder
  }

  export type LocalStorageSyncCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    interests?: SortOrder
    videoRatings?: SortOrder
    onboardingStep?: SortOrder
    layoutData?: SortOrder
    isRegistered?: SortOrder
    userId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type LocalStorageSyncMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    onboardingStep?: SortOrder
    isRegistered?: SortOrder
    userId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type LocalStorageSyncMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    onboardingStep?: SortOrder
    isRegistered?: SortOrder
    userId?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    expiresAt?: SortOrder
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

  export type ConversationSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationSessionCreateWithoutUserInput, ConversationSessionUncheckedCreateWithoutUserInput> | ConversationSessionCreateWithoutUserInput[] | ConversationSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutUserInput | ConversationSessionCreateOrConnectWithoutUserInput[]
    createMany?: ConversationSessionCreateManyUserInputEnvelope
    connect?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
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

  export type ConversationSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationSessionCreateWithoutUserInput, ConversationSessionUncheckedCreateWithoutUserInput> | ConversationSessionCreateWithoutUserInput[] | ConversationSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutUserInput | ConversationSessionCreateOrConnectWithoutUserInput[]
    createMany?: ConversationSessionCreateManyUserInputEnvelope
    connect?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
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

  export type ConversationSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationSessionCreateWithoutUserInput, ConversationSessionUncheckedCreateWithoutUserInput> | ConversationSessionCreateWithoutUserInput[] | ConversationSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutUserInput | ConversationSessionCreateOrConnectWithoutUserInput[]
    upsert?: ConversationSessionUpsertWithWhereUniqueWithoutUserInput | ConversationSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationSessionCreateManyUserInputEnvelope
    set?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    disconnect?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    delete?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    connect?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    update?: ConversationSessionUpdateWithWhereUniqueWithoutUserInput | ConversationSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationSessionUpdateManyWithWhereWithoutUserInput | ConversationSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationSessionScalarWhereInput | ConversationSessionScalarWhereInput[]
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

  export type ConversationSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationSessionCreateWithoutUserInput, ConversationSessionUncheckedCreateWithoutUserInput> | ConversationSessionCreateWithoutUserInput[] | ConversationSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutUserInput | ConversationSessionCreateOrConnectWithoutUserInput[]
    upsert?: ConversationSessionUpsertWithWhereUniqueWithoutUserInput | ConversationSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationSessionCreateManyUserInputEnvelope
    set?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    disconnect?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    delete?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    connect?: ConversationSessionWhereUniqueInput | ConversationSessionWhereUniqueInput[]
    update?: ConversationSessionUpdateWithWhereUniqueWithoutUserInput | ConversationSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationSessionUpdateManyWithWhereWithoutUserInput | ConversationSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationSessionScalarWhereInput | ConversationSessionScalarWhereInput[]
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

  export type ConversationSessionCreateselectedInterestsInput = {
    set: string[]
  }

  export type ConversationSessionCreatecompletedStepsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutConversationSessionsInput = {
    create?: XOR<UserCreateWithoutConversationSessionsInput, UserUncheckedCreateWithoutConversationSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type ConversationLogCreateNestedManyWithoutSessionInput = {
    create?: XOR<ConversationLogCreateWithoutSessionInput, ConversationLogUncheckedCreateWithoutSessionInput> | ConversationLogCreateWithoutSessionInput[] | ConversationLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ConversationLogCreateOrConnectWithoutSessionInput | ConversationLogCreateOrConnectWithoutSessionInput[]
    createMany?: ConversationLogCreateManySessionInputEnvelope
    connect?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
  }

  export type TourInteractionCreateNestedManyWithoutSessionInput = {
    create?: XOR<TourInteractionCreateWithoutSessionInput, TourInteractionUncheckedCreateWithoutSessionInput> | TourInteractionCreateWithoutSessionInput[] | TourInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TourInteractionCreateOrConnectWithoutSessionInput | TourInteractionCreateOrConnectWithoutSessionInput[]
    createMany?: TourInteractionCreateManySessionInputEnvelope
    connect?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
  }

  export type ConversationLogUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<ConversationLogCreateWithoutSessionInput, ConversationLogUncheckedCreateWithoutSessionInput> | ConversationLogCreateWithoutSessionInput[] | ConversationLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ConversationLogCreateOrConnectWithoutSessionInput | ConversationLogCreateOrConnectWithoutSessionInput[]
    createMany?: ConversationLogCreateManySessionInputEnvelope
    connect?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
  }

  export type TourInteractionUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<TourInteractionCreateWithoutSessionInput, TourInteractionUncheckedCreateWithoutSessionInput> | TourInteractionCreateWithoutSessionInput[] | TourInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TourInteractionCreateOrConnectWithoutSessionInput | TourInteractionCreateOrConnectWithoutSessionInput[]
    createMany?: TourInteractionCreateManySessionInputEnvelope
    connect?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
  }

  export type EnumTourStepFieldUpdateOperationsInput = {
    set?: $Enums.TourStep
  }

  export type ConversationSessionUpdateselectedInterestsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConversationSessionUpdatecompletedStepsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneWithoutConversationSessionsNestedInput = {
    create?: XOR<UserCreateWithoutConversationSessionsInput, UserUncheckedCreateWithoutConversationSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationSessionsInput
    upsert?: UserUpsertWithoutConversationSessionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationSessionsInput, UserUpdateWithoutConversationSessionsInput>, UserUncheckedUpdateWithoutConversationSessionsInput>
  }

  export type ConversationLogUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ConversationLogCreateWithoutSessionInput, ConversationLogUncheckedCreateWithoutSessionInput> | ConversationLogCreateWithoutSessionInput[] | ConversationLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ConversationLogCreateOrConnectWithoutSessionInput | ConversationLogCreateOrConnectWithoutSessionInput[]
    upsert?: ConversationLogUpsertWithWhereUniqueWithoutSessionInput | ConversationLogUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ConversationLogCreateManySessionInputEnvelope
    set?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    disconnect?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    delete?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    connect?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    update?: ConversationLogUpdateWithWhereUniqueWithoutSessionInput | ConversationLogUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ConversationLogUpdateManyWithWhereWithoutSessionInput | ConversationLogUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ConversationLogScalarWhereInput | ConversationLogScalarWhereInput[]
  }

  export type TourInteractionUpdateManyWithoutSessionNestedInput = {
    create?: XOR<TourInteractionCreateWithoutSessionInput, TourInteractionUncheckedCreateWithoutSessionInput> | TourInteractionCreateWithoutSessionInput[] | TourInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TourInteractionCreateOrConnectWithoutSessionInput | TourInteractionCreateOrConnectWithoutSessionInput[]
    upsert?: TourInteractionUpsertWithWhereUniqueWithoutSessionInput | TourInteractionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: TourInteractionCreateManySessionInputEnvelope
    set?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    disconnect?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    delete?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    connect?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    update?: TourInteractionUpdateWithWhereUniqueWithoutSessionInput | TourInteractionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: TourInteractionUpdateManyWithWhereWithoutSessionInput | TourInteractionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: TourInteractionScalarWhereInput | TourInteractionScalarWhereInput[]
  }

  export type ConversationLogUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ConversationLogCreateWithoutSessionInput, ConversationLogUncheckedCreateWithoutSessionInput> | ConversationLogCreateWithoutSessionInput[] | ConversationLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ConversationLogCreateOrConnectWithoutSessionInput | ConversationLogCreateOrConnectWithoutSessionInput[]
    upsert?: ConversationLogUpsertWithWhereUniqueWithoutSessionInput | ConversationLogUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ConversationLogCreateManySessionInputEnvelope
    set?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    disconnect?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    delete?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    connect?: ConversationLogWhereUniqueInput | ConversationLogWhereUniqueInput[]
    update?: ConversationLogUpdateWithWhereUniqueWithoutSessionInput | ConversationLogUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ConversationLogUpdateManyWithWhereWithoutSessionInput | ConversationLogUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ConversationLogScalarWhereInput | ConversationLogScalarWhereInput[]
  }

  export type TourInteractionUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<TourInteractionCreateWithoutSessionInput, TourInteractionUncheckedCreateWithoutSessionInput> | TourInteractionCreateWithoutSessionInput[] | TourInteractionUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: TourInteractionCreateOrConnectWithoutSessionInput | TourInteractionCreateOrConnectWithoutSessionInput[]
    upsert?: TourInteractionUpsertWithWhereUniqueWithoutSessionInput | TourInteractionUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: TourInteractionCreateManySessionInputEnvelope
    set?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    disconnect?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    delete?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    connect?: TourInteractionWhereUniqueInput | TourInteractionWhereUniqueInput[]
    update?: TourInteractionUpdateWithWhereUniqueWithoutSessionInput | TourInteractionUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: TourInteractionUpdateManyWithWhereWithoutSessionInput | TourInteractionUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: TourInteractionScalarWhereInput | TourInteractionScalarWhereInput[]
  }

  export type ConversationSessionCreateNestedOneWithoutConversationLogsInput = {
    create?: XOR<ConversationSessionCreateWithoutConversationLogsInput, ConversationSessionUncheckedCreateWithoutConversationLogsInput>
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutConversationLogsInput
    connect?: ConversationSessionWhereUniqueInput
  }

  export type EnumMessageRoleFieldUpdateOperationsInput = {
    set?: $Enums.MessageRole
  }

  export type NullableEnumTourStepFieldUpdateOperationsInput = {
    set?: $Enums.TourStep | null
  }

  export type ConversationSessionUpdateOneRequiredWithoutConversationLogsNestedInput = {
    create?: XOR<ConversationSessionCreateWithoutConversationLogsInput, ConversationSessionUncheckedCreateWithoutConversationLogsInput>
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutConversationLogsInput
    upsert?: ConversationSessionUpsertWithoutConversationLogsInput
    connect?: ConversationSessionWhereUniqueInput
    update?: XOR<XOR<ConversationSessionUpdateToOneWithWhereWithoutConversationLogsInput, ConversationSessionUpdateWithoutConversationLogsInput>, ConversationSessionUncheckedUpdateWithoutConversationLogsInput>
  }

  export type ConversationSessionCreateNestedOneWithoutTourInteractionsInput = {
    create?: XOR<ConversationSessionCreateWithoutTourInteractionsInput, ConversationSessionUncheckedCreateWithoutTourInteractionsInput>
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutTourInteractionsInput
    connect?: ConversationSessionWhereUniqueInput
  }

  export type ConversationSessionUpdateOneRequiredWithoutTourInteractionsNestedInput = {
    create?: XOR<ConversationSessionCreateWithoutTourInteractionsInput, ConversationSessionUncheckedCreateWithoutTourInteractionsInput>
    connectOrCreate?: ConversationSessionCreateOrConnectWithoutTourInteractionsInput
    upsert?: ConversationSessionUpsertWithoutTourInteractionsInput
    connect?: ConversationSessionWhereUniqueInput
    update?: XOR<XOR<ConversationSessionUpdateToOneWithWhereWithoutTourInteractionsInput, ConversationSessionUpdateWithoutTourInteractionsInput>, ConversationSessionUncheckedUpdateWithoutTourInteractionsInput>
  }

  export type LocalStorageSyncCreateinterestsInput = {
    set: string[]
  }

  export type LocalStorageSyncUpdateinterestsInput = {
    set?: string[]
    push?: string | string[]
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

  export type NestedEnumTourStepFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel>
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStepFilter<$PrismaModel> | $Enums.TourStep
  }

  export type NestedEnumTourStepWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel>
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel>
    not?: NestedEnumTourStepWithAggregatesFilter<$PrismaModel> | $Enums.TourStep
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTourStepFilter<$PrismaModel>
    _max?: NestedEnumTourStepFilter<$PrismaModel>
  }

  export type NestedEnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole
  }

  export type NestedEnumTourStepNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTourStepNullableFilter<$PrismaModel> | $Enums.TourStep | null
  }

  export type NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumMessageRoleFilter<$PrismaModel>
  }

  export type NestedEnumTourStepNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TourStep | EnumTourStepFieldRefInput<$PrismaModel> | null
    in?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.TourStep[] | ListEnumTourStepFieldRefInput<$PrismaModel> | null
    not?: NestedEnumTourStepNullableWithAggregatesFilter<$PrismaModel> | $Enums.TourStep | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumTourStepNullableFilter<$PrismaModel>
    _max?: NestedEnumTourStepNullableFilter<$PrismaModel>
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

  export type ConversationSessionCreateWithoutUserInput = {
    id?: string
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    conversationLogs?: ConversationLogCreateNestedManyWithoutSessionInput
    tourInteractions?: TourInteractionCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    conversationLogs?: ConversationLogUncheckedCreateNestedManyWithoutSessionInput
    tourInteractions?: TourInteractionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionCreateOrConnectWithoutUserInput = {
    where: ConversationSessionWhereUniqueInput
    create: XOR<ConversationSessionCreateWithoutUserInput, ConversationSessionUncheckedCreateWithoutUserInput>
  }

  export type ConversationSessionCreateManyUserInputEnvelope = {
    data: ConversationSessionCreateManyUserInput | ConversationSessionCreateManyUserInput[]
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

  export type ConversationSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationSessionWhereUniqueInput
    update: XOR<ConversationSessionUpdateWithoutUserInput, ConversationSessionUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationSessionCreateWithoutUserInput, ConversationSessionUncheckedCreateWithoutUserInput>
  }

  export type ConversationSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationSessionWhereUniqueInput
    data: XOR<ConversationSessionUpdateWithoutUserInput, ConversationSessionUncheckedUpdateWithoutUserInput>
  }

  export type ConversationSessionUpdateManyWithWhereWithoutUserInput = {
    where: ConversationSessionScalarWhereInput
    data: XOR<ConversationSessionUpdateManyMutationInput, ConversationSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationSessionScalarWhereInput = {
    AND?: ConversationSessionScalarWhereInput | ConversationSessionScalarWhereInput[]
    OR?: ConversationSessionScalarWhereInput[]
    NOT?: ConversationSessionScalarWhereInput | ConversationSessionScalarWhereInput[]
    id?: StringFilter<"ConversationSession"> | string
    userId?: StringNullableFilter<"ConversationSession"> | string | null
    sessionId?: StringFilter<"ConversationSession"> | string
    currentStep?: EnumTourStepFilter<"ConversationSession"> | $Enums.TourStep
    isCompleted?: BoolFilter<"ConversationSession"> | boolean
    isVoiceMode?: BoolFilter<"ConversationSession"> | boolean
    selectedInterests?: StringNullableListFilter<"ConversationSession">
    videoRatings?: JsonFilter<"ConversationSession">
    layoutPreferences?: JsonFilter<"ConversationSession">
    llmProvider?: StringNullableFilter<"ConversationSession"> | string | null
    llmApiKey?: StringNullableFilter<"ConversationSession"> | string | null
    conversationId?: StringNullableFilter<"ConversationSession"> | string | null
    stepProgress?: JsonFilter<"ConversationSession">
    completedSteps?: StringNullableListFilter<"ConversationSession">
    createdAt?: DateTimeFilter<"ConversationSession"> | Date | string
    updatedAt?: DateTimeFilter<"ConversationSession"> | Date | string
    lastActiveAt?: DateTimeFilter<"ConversationSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"ConversationSession"> | Date | string | null
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
    conversationSessions?: ConversationSessionCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUncheckedCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionUncheckedUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUncheckedCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionUncheckedUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUncheckedCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionUncheckedUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUncheckedCreateNestedManyWithoutUserInput
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
    conversationSessions?: ConversationSessionUpdateManyWithoutUserNestedInput
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
    conversationSessions?: ConversationSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutConversationSessionsInput = {
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
  }

  export type UserUncheckedCreateWithoutConversationSessionsInput = {
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
  }

  export type UserCreateOrConnectWithoutConversationSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationSessionsInput, UserUncheckedCreateWithoutConversationSessionsInput>
  }

  export type ConversationLogCreateWithoutSessionInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    messageId?: string | null
    tourStep?: $Enums.TourStep | null
    actionType?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: number | null
    responseTimeMs?: number | null
    llmProvider?: string | null
    createdAt?: Date | string
  }

  export type ConversationLogUncheckedCreateWithoutSessionInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    messageId?: string | null
    tourStep?: $Enums.TourStep | null
    actionType?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: number | null
    responseTimeMs?: number | null
    llmProvider?: string | null
    createdAt?: Date | string
  }

  export type ConversationLogCreateOrConnectWithoutSessionInput = {
    where: ConversationLogWhereUniqueInput
    create: XOR<ConversationLogCreateWithoutSessionInput, ConversationLogUncheckedCreateWithoutSessionInput>
  }

  export type ConversationLogCreateManySessionInputEnvelope = {
    data: ConversationLogCreateManySessionInput | ConversationLogCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type TourInteractionCreateWithoutSessionInput = {
    id?: string
    tourStep: $Enums.TourStep
    actionType: string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: number | null
    wasSkipped?: boolean
    satisfaction?: number | null
    createdAt?: Date | string
  }

  export type TourInteractionUncheckedCreateWithoutSessionInput = {
    id?: string
    tourStep: $Enums.TourStep
    actionType: string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: number | null
    wasSkipped?: boolean
    satisfaction?: number | null
    createdAt?: Date | string
  }

  export type TourInteractionCreateOrConnectWithoutSessionInput = {
    where: TourInteractionWhereUniqueInput
    create: XOR<TourInteractionCreateWithoutSessionInput, TourInteractionUncheckedCreateWithoutSessionInput>
  }

  export type TourInteractionCreateManySessionInputEnvelope = {
    data: TourInteractionCreateManySessionInput | TourInteractionCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationSessionsInput = {
    update: XOR<UserUpdateWithoutConversationSessionsInput, UserUncheckedUpdateWithoutConversationSessionsInput>
    create: XOR<UserCreateWithoutConversationSessionsInput, UserUncheckedCreateWithoutConversationSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationSessionsInput, UserUncheckedUpdateWithoutConversationSessionsInput>
  }

  export type UserUpdateWithoutConversationSessionsInput = {
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
  }

  export type UserUncheckedUpdateWithoutConversationSessionsInput = {
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
  }

  export type ConversationLogUpsertWithWhereUniqueWithoutSessionInput = {
    where: ConversationLogWhereUniqueInput
    update: XOR<ConversationLogUpdateWithoutSessionInput, ConversationLogUncheckedUpdateWithoutSessionInput>
    create: XOR<ConversationLogCreateWithoutSessionInput, ConversationLogUncheckedCreateWithoutSessionInput>
  }

  export type ConversationLogUpdateWithWhereUniqueWithoutSessionInput = {
    where: ConversationLogWhereUniqueInput
    data: XOR<ConversationLogUpdateWithoutSessionInput, ConversationLogUncheckedUpdateWithoutSessionInput>
  }

  export type ConversationLogUpdateManyWithWhereWithoutSessionInput = {
    where: ConversationLogScalarWhereInput
    data: XOR<ConversationLogUpdateManyMutationInput, ConversationLogUncheckedUpdateManyWithoutSessionInput>
  }

  export type ConversationLogScalarWhereInput = {
    AND?: ConversationLogScalarWhereInput | ConversationLogScalarWhereInput[]
    OR?: ConversationLogScalarWhereInput[]
    NOT?: ConversationLogScalarWhereInput | ConversationLogScalarWhereInput[]
    id?: StringFilter<"ConversationLog"> | string
    sessionId?: StringFilter<"ConversationLog"> | string
    role?: EnumMessageRoleFilter<"ConversationLog"> | $Enums.MessageRole
    content?: StringFilter<"ConversationLog"> | string
    messageId?: StringNullableFilter<"ConversationLog"> | string | null
    tourStep?: EnumTourStepNullableFilter<"ConversationLog"> | $Enums.TourStep | null
    actionType?: StringNullableFilter<"ConversationLog"> | string | null
    metadata?: JsonFilter<"ConversationLog">
    tokensUsed?: IntNullableFilter<"ConversationLog"> | number | null
    responseTimeMs?: IntNullableFilter<"ConversationLog"> | number | null
    llmProvider?: StringNullableFilter<"ConversationLog"> | string | null
    createdAt?: DateTimeFilter<"ConversationLog"> | Date | string
  }

  export type TourInteractionUpsertWithWhereUniqueWithoutSessionInput = {
    where: TourInteractionWhereUniqueInput
    update: XOR<TourInteractionUpdateWithoutSessionInput, TourInteractionUncheckedUpdateWithoutSessionInput>
    create: XOR<TourInteractionCreateWithoutSessionInput, TourInteractionUncheckedCreateWithoutSessionInput>
  }

  export type TourInteractionUpdateWithWhereUniqueWithoutSessionInput = {
    where: TourInteractionWhereUniqueInput
    data: XOR<TourInteractionUpdateWithoutSessionInput, TourInteractionUncheckedUpdateWithoutSessionInput>
  }

  export type TourInteractionUpdateManyWithWhereWithoutSessionInput = {
    where: TourInteractionScalarWhereInput
    data: XOR<TourInteractionUpdateManyMutationInput, TourInteractionUncheckedUpdateManyWithoutSessionInput>
  }

  export type TourInteractionScalarWhereInput = {
    AND?: TourInteractionScalarWhereInput | TourInteractionScalarWhereInput[]
    OR?: TourInteractionScalarWhereInput[]
    NOT?: TourInteractionScalarWhereInput | TourInteractionScalarWhereInput[]
    id?: StringFilter<"TourInteraction"> | string
    sessionId?: StringFilter<"TourInteraction"> | string
    tourStep?: EnumTourStepFilter<"TourInteraction"> | $Enums.TourStep
    actionType?: StringFilter<"TourInteraction"> | string
    actionData?: JsonFilter<"TourInteraction">
    timeSpentMs?: IntNullableFilter<"TourInteraction"> | number | null
    wasSkipped?: BoolFilter<"TourInteraction"> | boolean
    satisfaction?: IntNullableFilter<"TourInteraction"> | number | null
    createdAt?: DateTimeFilter<"TourInteraction"> | Date | string
  }

  export type ConversationSessionCreateWithoutConversationLogsInput = {
    id?: string
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutConversationSessionsInput
    tourInteractions?: TourInteractionCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionUncheckedCreateWithoutConversationLogsInput = {
    id?: string
    userId?: string | null
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    tourInteractions?: TourInteractionUncheckedCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionCreateOrConnectWithoutConversationLogsInput = {
    where: ConversationSessionWhereUniqueInput
    create: XOR<ConversationSessionCreateWithoutConversationLogsInput, ConversationSessionUncheckedCreateWithoutConversationLogsInput>
  }

  export type ConversationSessionUpsertWithoutConversationLogsInput = {
    update: XOR<ConversationSessionUpdateWithoutConversationLogsInput, ConversationSessionUncheckedUpdateWithoutConversationLogsInput>
    create: XOR<ConversationSessionCreateWithoutConversationLogsInput, ConversationSessionUncheckedCreateWithoutConversationLogsInput>
    where?: ConversationSessionWhereInput
  }

  export type ConversationSessionUpdateToOneWithWhereWithoutConversationLogsInput = {
    where?: ConversationSessionWhereInput
    data: XOR<ConversationSessionUpdateWithoutConversationLogsInput, ConversationSessionUncheckedUpdateWithoutConversationLogsInput>
  }

  export type ConversationSessionUpdateWithoutConversationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutConversationSessionsNestedInput
    tourInteractions?: TourInteractionUpdateManyWithoutSessionNestedInput
  }

  export type ConversationSessionUncheckedUpdateWithoutConversationLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tourInteractions?: TourInteractionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ConversationSessionCreateWithoutTourInteractionsInput = {
    id?: string
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    user?: UserCreateNestedOneWithoutConversationSessionsInput
    conversationLogs?: ConversationLogCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionUncheckedCreateWithoutTourInteractionsInput = {
    id?: string
    userId?: string | null
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
    conversationLogs?: ConversationLogUncheckedCreateNestedManyWithoutSessionInput
  }

  export type ConversationSessionCreateOrConnectWithoutTourInteractionsInput = {
    where: ConversationSessionWhereUniqueInput
    create: XOR<ConversationSessionCreateWithoutTourInteractionsInput, ConversationSessionUncheckedCreateWithoutTourInteractionsInput>
  }

  export type ConversationSessionUpsertWithoutTourInteractionsInput = {
    update: XOR<ConversationSessionUpdateWithoutTourInteractionsInput, ConversationSessionUncheckedUpdateWithoutTourInteractionsInput>
    create: XOR<ConversationSessionCreateWithoutTourInteractionsInput, ConversationSessionUncheckedCreateWithoutTourInteractionsInput>
    where?: ConversationSessionWhereInput
  }

  export type ConversationSessionUpdateToOneWithWhereWithoutTourInteractionsInput = {
    where?: ConversationSessionWhereInput
    data: XOR<ConversationSessionUpdateWithoutTourInteractionsInput, ConversationSessionUncheckedUpdateWithoutTourInteractionsInput>
  }

  export type ConversationSessionUpdateWithoutTourInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneWithoutConversationSessionsNestedInput
    conversationLogs?: ConversationLogUpdateManyWithoutSessionNestedInput
  }

  export type ConversationSessionUncheckedUpdateWithoutTourInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversationLogs?: ConversationLogUncheckedUpdateManyWithoutSessionNestedInput
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

  export type ConversationSessionCreateManyUserInput = {
    id?: string
    sessionId: string
    currentStep?: $Enums.TourStep
    isCompleted?: boolean
    isVoiceMode?: boolean
    selectedInterests?: ConversationSessionCreateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: string | null
    llmApiKey?: string | null
    conversationId?: string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionCreatecompletedStepsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastActiveAt?: Date | string
    completedAt?: Date | string | null
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

  export type ConversationSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversationLogs?: ConversationLogUpdateManyWithoutSessionNestedInput
    tourInteractions?: TourInteractionUpdateManyWithoutSessionNestedInput
  }

  export type ConversationSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversationLogs?: ConversationLogUncheckedUpdateManyWithoutSessionNestedInput
    tourInteractions?: TourInteractionUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type ConversationSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    currentStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isVoiceMode?: BoolFieldUpdateOperationsInput | boolean
    selectedInterests?: ConversationSessionUpdateselectedInterestsInput | string[]
    videoRatings?: JsonNullValueInput | InputJsonValue
    layoutPreferences?: JsonNullValueInput | InputJsonValue
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    llmApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    stepProgress?: JsonNullValueInput | InputJsonValue
    completedSteps?: ConversationSessionUpdatecompletedStepsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type ConversationLogCreateManySessionInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    messageId?: string | null
    tourStep?: $Enums.TourStep | null
    actionType?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: number | null
    responseTimeMs?: number | null
    llmProvider?: string | null
    createdAt?: Date | string
  }

  export type TourInteractionCreateManySessionInput = {
    id?: string
    tourStep: $Enums.TourStep
    actionType: string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: number | null
    wasSkipped?: boolean
    satisfaction?: number | null
    createdAt?: Date | string
  }

  export type ConversationLogUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    tourStep?: NullableEnumTourStepFieldUpdateOperationsInput | $Enums.TourStep | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    responseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationLogUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    tourStep?: NullableEnumTourStepFieldUpdateOperationsInput | $Enums.TourStep | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    responseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationLogUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    messageId?: NullableStringFieldUpdateOperationsInput | string | null
    tourStep?: NullableEnumTourStepFieldUpdateOperationsInput | $Enums.TourStep | null
    actionType?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    responseTimeMs?: NullableIntFieldUpdateOperationsInput | number | null
    llmProvider?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourInteractionUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: NullableIntFieldUpdateOperationsInput | number | null
    wasSkipped?: BoolFieldUpdateOperationsInput | boolean
    satisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourInteractionUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: NullableIntFieldUpdateOperationsInput | number | null
    wasSkipped?: BoolFieldUpdateOperationsInput | boolean
    satisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TourInteractionUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    tourStep?: EnumTourStepFieldUpdateOperationsInput | $Enums.TourStep
    actionType?: StringFieldUpdateOperationsInput | string
    actionData?: JsonNullValueInput | InputJsonValue
    timeSpentMs?: NullableIntFieldUpdateOperationsInput | number | null
    wasSkipped?: BoolFieldUpdateOperationsInput | boolean
    satisfaction?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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