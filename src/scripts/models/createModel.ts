import * as fs from 'fs';
import * as buffer from 'buffer';
import {OperationsModel} from "../utils/operations.model";

export class CreateModel extends OperationsModel {

  constructor() {
    super();
  }

  static constructModel(pathEntities: string, pathEntitiesExample: string) {
    const namePrincipalModule: string = process.argv[2].toLowerCase(); // Example: test
    const nameSecondModule: string = process.argv[3].toLowerCase().trim(); //Example: hello-world
    const nameModule: string = this.convertNamePath(nameSecondModule) // Example: HelloWorld;
    const nameFileClass: string = this.convertNameFile(nameModule);// Example: HelloWorld;
    this.createFolder(pathEntities, namePrincipalModule);
    this.createFileModel(pathEntities, pathEntitiesExample, namePrincipalModule, nameSecondModule, nameFileClass);
  }

  private static createFileModel(
    pathEntities: string,
    pathEntityExample: string,
    namePrincipalModule: string,
    nameSecondModule: string,
    nameFileClass: string
  ) {
    fs.readFile(
      pathEntityExample,
      "utf8",
      (err: any, text: string) => {
        const data = new Uint8Array(buffer.Buffer.from(this.replaceNamesInFile(text, namePrincipalModule, nameSecondModule, nameFileClass)));
        if (!fs.existsSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}.model.ts`)) fs.writeFileSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}-api.model.ts`, data);
      }
    );
  }

}
