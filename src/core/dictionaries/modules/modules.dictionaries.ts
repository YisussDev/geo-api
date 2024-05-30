export const modulesDictionaries = {
  ACCOUNT: {
    LIST_ALL: {
      rolAllowed: ["ADMIN"],
      nameAction: "LIST_ALL"
    },
    CREATE: {
      rolAllowed: ["ADMIN"],
      nameAction: "CREATE"
    },
    CREATE_ADMIN: {
      rolAllowed: ["ADMIN"],
      nameAction: "CREATE"
    },
    CREATE_STUDENT: {
      rolAllowed: ["ADMIN", "STUDENT"],
      nameAction: "CREATE_STUDENT"
    },
    UPDATE_ACCOUNT: {
      rolAllowed: ["ADMIN"],
      nameAction: "UPDATE_ACCOUNT"
    },
    DELETE: {
      rolAllowed: ["ADMIN"],
      nameAction: "DELETE"
    },
    VALIDATE_REGISTER: {
      rolAllowed: ["ADMIN"],
      nameAction: "VALIDATE_REGISTER"
    },
    ACTIVE_OR_INACTIVE: {
      rolAllowed: ["ADMIN"],
      nameAction: "ACTIVE_OR_INACTIVE"
    },
  },
  COURSE: {
    LIST_ALL: {
      rolAllowed: ["ADMIN"],
      nameAction: "LIST_ALL"
    },
    CREATE: {
      rolAllowed: ["ADMIN"],
      nameAction: "CREATE"
    },
    UPDATE: {
      rolAllowed: ["ADMIN"],
      nameAction: "UPDATE"
    },
    DELETE: {
      rolAllowed: ["ADMIN"],
      nameAction: "DELETE"
    },
    ACTIVE_OR_INACTIVE: {
      rolAllowed: ["ADMIN"],
      nameAction: "ACTIVE_OR_INACTIVE"
    },
  },
  AUDIT: {
    ACTIONS: {}
  },
  STUDENT: {
    ACTIONS: {
      CREATE: "CREATE",
      UPDATE: "UPDATE",
      DELETE: "DELETE"
    }
  }
};