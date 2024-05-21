import * as fs from 'fs';
import * as buffer from 'buffer';
import {OperationsModel} from "../utils/operations.model";

export class CreateRepository extends OperationsModel {

  constructor() {
    super();
  }

  static constructRepository(pathGeneral: string, pathExample: string) {
    const namePrincipalModule: string = process.argv[2].toLowerCase(); // Example: test
    const nameSecondModule: string = process.argv[3].toLowerCase().trim(); //Example: hello-world
    const nameModule: string = this.convertNamePath(nameSecondModule) // Example: HelloWorld;
    const nameFileClass: string = this.convertNameFile(nameModule); // Example: HelloWorld
    this.createFolder(pathGeneral, namePrincipalModule);
    this.createFileRepository(pathGeneral, pathExample, namePrincipalModule, nameSecondModule, nameFileClass);
  }

  private static createFileRepository(pathEntities: string, pathEntityExample: string, namePrincipalModule: string, nameSecondModule: string, nameFileClass: string) {
    fs.readFile(
      pathEntityExample,
      "utf8",
      (err: any, text: string) => {
        const data = new Uint8Array(buffer.Buffer.from(this.replaceNamesInFile(text, namePrincipalModule, nameSecondModule, nameFileClass)));
        if (!fs.existsSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}/${nameSecondModule}.repository.ts`)) fs.writeFileSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}.repository.ts`, data);
      }
    );
  }

}
