export const modulesDictionaries = {
  ACCOUNT: {
    ACTIONS: {
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
      UPDATE: {
        rolAllowed: ["ADMIN"],
        nameAction: "UPDATE"
      },
      DELETE: {
        rolAllowed: ["ADMIN"],
        nameAction: "DELETE"
      }
    }
  },
  COURSE: {
    ACTIONS: {
      CREATE: "CREATE",
      UPDATE: "UPDATE",
      DELETE: "DELETE"
    }
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