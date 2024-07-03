export const modulesDictionaries = {
  ACCOUNT: {
    LIST_ALL: {
      rolAllowed: ["ADMIN"],
      nameAction: "LIST_ALL"
    },
    SEARCH: {
      rolAllowed: ["ADMIN"],
      nameAction: "SEARCH"
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
    }
  },
  COURSE: {
    LIST_ALL: {
      rolAllowed: ["ADMIN", "TEACHER"],
      nameAction: "LIST_ALL"
    },
    SEARCH: {
      rolAllowed: ["ADMIN", "STUDENT"],
      nameAction: "SEARCH"
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
    }
  },
  STUDENT: {
    LIST_ALL: {
      rolAllowed: ["ADMIN"],
      nameAction: "LIST_ALL"
    },
    CREATE: {
      rolAllowed: ["ADMIN"],
      nameAction: "CREATE"
    },
    SEARCH: {
      rolAllowed: ["ADMIN"],
      nameAction: "SEARCH"
    },
    REGISTER_IN_COURSE: {
      rolAllowed: ["ADMIN"],
      nameAction: "REGISTER_IN_COURSE"
    },
    REMOVE_IN_COURSE: {
      rolAllowed: ["ADMIN"],
      nameAction: "REMOVE_IN_COURSE"
    },
  },
  ACTIVITY: {
    LIST_ALL: {
      rolAllowed: ["ADMIN"],
      nameAction: "LIST_ALL"
    },
    CREATE: {
      rolAllowed: ["ADMIN"],
      nameAction: "CREATE"
    },
    SEARCH: {
      rolAllowed: ["ADMIN"],
      nameAction: "SEARCH"
    },
  },
  ACTIVITY_COURSE: {
    LIST_ALL: {
      rolAllowed: ["ADMIN", "TEACHER"],
      nameAction: "LIST_ALL"
    },
    SEARCH: {
      rolAllowed: ["ADMIN"],
      nameAction: "SEARCH"
    },
    REGISTER: {
      rolAllowed: ["ADMIN"],
      nameAction: "REGISTER"
    },
    REMOVE: {
      rolAllowed: ["ADMIN"],
      nameAction: "REMOVE"
    },
  },
  ACTIVITY_COURSE_STUDENT: {
    LIST_ALL: {
      rolAllowed: ["ADMIN", "TEACHER"],
      nameAction: "LIST_ALL"
    },
    SEARCH: {
      rolAllowed: ["ADMIN", "STUDENT", "TEACHER"],
      nameAction: "SEARCH"
    },
    ACTIVITY_BY_STUDENT_COURSE: {
      rolAllowed: ["ADMIN"],
      nameAction: "ACTIVITY_BY_STUDENT_COURSE"
    },
    MY_ACTIVITY_COURSE: {
      rolAllowed: ["STUDENT"],
      nameAction: "MY_ACTIVITY_COURSE"
    },
  }
};