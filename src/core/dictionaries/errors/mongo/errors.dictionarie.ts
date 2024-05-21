export const errorsDictionarie = {
  2: {
    message: 'BadValue',
    description: 'Something was wrong with the value provided.',
  },
  3: {
    message: 'OBSOLETE_DuplicateKey',
    description: 'Duplicate key error.',
  },
  4: {
    message: 'NoSuchKey',
    description: 'The key does not exist in the document.',
  },
  5: {
    message: 'GraphContainsCycle',
    description: 'The graph contains a cycle and cannot be processed.',
  },
  6: {
    message: 'HostUnreachable',
    description: 'The specified host is unreachable.',
  },
  7: {
    message: 'HostNotFound',
    description: 'The specified host was not found.',
  },
  8: {
    message: 'UnknownError',
    description: 'An unknown error occurred.',
  },
  9: {
    message: 'FailedToParse',
    description: 'Failed to parse the provided data.',
  },
  10: {
    message: 'CannotMutateObject',
    description: 'Attempted to modify an immutable object.',
  },
  11: {
    message: 'UserNotFound',
    description: 'The specified user was not found.',
  },
  12: {
    message: 'UnsupportedFormat',
    description: 'The format of the provided data is not supported.',
  },
  13: {
    message: 'Unauthorized',
    description: 'Unauthorized operation.',
  },
  14: {
    message: 'TypeMismatch',
    description: 'A type mismatch occurred.',
  },
  15: {
    message: 'Overflow',
    description: 'The value exceeds the allowed range.',
  },
  16: {
    message: 'InvalidLength',
    description: 'The specified length is invalid.',
  },
  17: {
    message: 'ProtocolError',
    description: 'A protocol error occurred.',
  },
  18: {
    message: 'AuthenticationFailed',
    description: 'Authentication failed.',
  },
  19: {
    message: 'CannotReuseObject',
    description: 'An attempt was made to reuse an object that cannot be reused.',
  },
  20: {
    message: 'IllegalOperation',
    description: 'The operation is not allowed.',
  },
  21: {
    message: 'EmptyArrayOperation',
    description: 'The operation cannot be performed on an empty array.',
  },
  22: {
    message: 'InvalidBSON',
    description: 'The provided BSON is invalid.',
  },
  23: {
    message: 'AlreadyInitialized',
    description: 'The operation was attempted on an already initialized object.',
  },
  24: {
    message: 'LockTimeout',
    description: 'A lock could not be acquired within the specified timeout.',
  },
  25: {
    message: 'RemoteValidationError',
    description: 'A validation error occurred on a remote host.',
  },
  26: {
    message: 'NamespaceNotFound',
    description: 'The specified namespace was not found.',
  },
  27: {
    message: 'IndexNotFound',
    description: 'The specified index was not found.',
  },
  28: {
    message: 'PathNotViable',
    description: 'The specified path is not viable.',
  },
  29: {
    message: 'NonExistentPath',
    description: 'The specified path does not exist.',
  },
  30: {
    message: 'InvalidPath',
    description: 'The specified path is invalid.',
  },
  31: {
    message: 'RoleNotFound',
    description: 'The specified role was not found.',
  },
  32: {
    message: 'RolesNotRelated',
    description: 'The specified roles are not related.',
  },
  33: {
    message: 'PrivilegeNotFound',
    description: 'The specified privilege was not found.',
  },
  34: {
    message: 'CannotBackfillArray',
    description: 'An array could not be backfilled.',
  },
  35: {
    message: 'UserModificationFailed',
    description: 'User modification failed.',
  },
  36: {
    message: 'RemoteChangeDetected',
    description: 'A remote change was detected.',
  },
  37: {
    message: 'FileOpenFailed',
    description: 'The specified file could not be opened.',
  },
  38: {
    message: 'ZoneStillInUse',
    description: 'The specified zone is still in use.',
  },
  39: {
    message: 'RangeOverlapConflict',
    description: 'A range overlap conflict occurred.',
  },
  40: {
    message: 'PreparedTransactionInProgress',
    description: 'A prepared transaction is in progress.',
  },
  41: {
    message: 'RetryChangeStream',
    description: 'The change stream should be retried.',
  },
  42: {
    message: 'InternalError',
    description: 'An internal error occurred.',
  },
  43: {
    message: 'ForTestingErrorExtraInfo',
    description: 'A testing error with extra info occurred.',
  },
  44: {
    message: 'CursorKilled',
    description: 'The cursor was killed.',
  },
  45: {
    message: 'ExecutionStatsUnavailable',
    description: 'Execution stats are unavailable.',
  },
  46: {
    message: 'NodeNotElectable',
    description: 'The node is not electable.',
  },
  47: {
    message: 'SnapshotTooOld',
    description: 'The snapshot is too old.',
  },
  48: {
    message: 'DNSHostNotFound',
    description: 'The DNS host was not found.',
  },
  49: {
    message: 'DNSProtocolError',
    description: 'A DNS protocol error occurred.',
  },
  50: {
    message: 'MaxTimeMSExpired',
    description: 'The maximum execution time expired.',
  },
  51: {
    message: 'NonRetryableWriteConcernError',
    description: 'A non-retryable write concern error occurred.',
  },
  52: {
    message: 'BadChangeStreamSpecification',
    description: 'The change stream specification is invalid.',
  },
  53: {
    message: 'UnknownReplWriteConcern',
    description: 'The replica set write concern is unknown.',
  },
  54: {
    message: 'RetryableWriteError',
    description: 'A retryable write error occurred.',
  },
  55: {
    message: 'UnsupportedFormat',
    description: 'The provided format is not supported.',
  },
  56: {
    message: 'ShutdownInProgress',
    description: 'The shutdown is in progress.',
  },
  57: {
    message: 'SecondaryAheadOfPrimary',
    description: 'The secondary is ahead of the primary.',
  },
  58: {
    message: 'WrongToken',
    description: 'The provided token is incorrect.',
  },
  59: {
    message: 'InvalidSignature',
    description: 'The provided signature is invalid.',
  },
  60: {
    message: 'MustDowngrade',
    description: 'A downgrade is required.',
  },
  61: {
    message: 'NetworkInterfaceExceededTimeLimit',
    description: 'The network interface exceeded the time limit.',
  },
  62: {
    message: 'ShardingStateNotInitialized',
    description: 'The sharding state is not initialized.',
  },
  63: {
    message: 'TimeProofMismatch',
    description: 'The time proof does not match.',
  },
  64: {
    message: 'ClusterTimeFailsRateLimiter',
    description: 'The cluster time fails the rate limiter.',
  },
  65: {
    message: 'CannotApplyOplogWhilePrimary',
    description: 'Cannot apply oplog while primary.',
  },
  66: {
    message: 'Obsolete_WriteBacksQueued',
    description: 'Obsolete: Write backs are queued.',
  },
  67: {
    message: 'OutOfDiskSpace',
    description: 'Out of disk space.',
  },
  68: {
    message: 'KeyTooLong',
    description: 'The key is too long.',
  },
  69: {
    message: 'InvalidDDLTarget',
    description: 'The DDL target is invalid.',
  },
  70: {
    message: 'ShardKeyNotFound',
    description: 'The shard key was not found.',
  },
  71: {
    message: 'OplogOperationUnsupported',
    description: 'The oplog operation is unsupported.',
  },
  72: {
    message: 'StaleChunkHistory',
    description: 'The chunk history is stale.',
  },
  73: {
    message: 'AlreadyFrozen',
    description: 'The operation was attempted on an already frozen state.',
  },
  11000: {
    message: 'DuplicateKey',
    description: 'A duplicate key error occurred.',
  },
  11001: {
    message: 'DuplicateKey',
    description: 'A duplicate key error occurred.',
  },
  11600: {
    message: 'InterruptedAtShutdown',
    description: 'The operation was interrupted at shutdown.',
  },
  11601: {
    message: 'Interrupted',
    description: 'The operation was interrupted.',
  },
  11602: {
    message: 'InterruptedDueToReplStateChange',
    description: 'The operation was interrupted due to a replication state change.',
  },
  11603: {
    message: 'BackgroundOperationInProgressForDatabase',
    description: 'A background operation is in progress for the database.',
  },
  11604: {
    message: 'BackgroundOperationInProgressForNamespace',
    description: 'A background operation is in progress for the namespace.',
  },
  11605: {
    message: 'ShardKeyTooBig',
    description: 'The shard key is too big.',
  },
  11606: {
    message: 'StaleConfig',
    description: 'The configuration is stale.',
  },
  11607: {
    message: 'CannotGrowDocumentInCappedNamespace',
    description: 'Cannot grow document in capped namespace.',
  },
  11608: {
    message: 'CannotCreateIndex',
    description: 'Cannot create index.',
  },
  11609: {
    message: 'CannotDropIndex',
    description: 'Cannot drop index.',
  },
  11610: {
    message: 'CannotRenameCollection',
    description: 'Cannot rename collection.',
  },
  11611: {
    message: 'NamespaceExists',
    description: 'The namespace already exists.',
  },
  11612: {
    message: 'IndexOptionsConflict',
    description: 'The index options conflict with an existing index.',
  },
  11613: {
    message: 'BackgroundOperationInProgress',
    description: 'A background operation is in progress.',
  },
  11614: {
    message: 'PrepareConfigsFailed',
    description: 'Failed to prepare configs.',
  },
  11615: {
    message: 'CloseChangeStream',
    description: 'The change stream is closed.',
  },
  11616: {
    message: 'ForTestingErrorExtraInfo',
    description: 'A testing error with extra info occurred.',
  },
};