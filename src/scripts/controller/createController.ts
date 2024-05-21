import * as fs from "fs";
import * as buffer from "buffer";
import { OperationsModel } from "../utils/operations.model";

export class CreateController extends OperationsModel {

  constructor() {
    super();
  }

  static constructController(pathEntities: string, pathEntitiesExample: string) {
    const namePrincipalModule: string = process.argv[2].toLowerCase(); // Example: test
    const nameSecondModule: string = process.argv[3].toLowerCase().trim(); //Example: hello-world
    const nameModule: string = this.convertNamePath(nameSecondModule); // Example: HelloWorld;
    const nameFileClass: string = this.convertNameFile(nameModule);
    this.createFolder(pathEntities, namePrincipalModule);
    this.createFileController(pathEntities, pathEntitiesExample, namePrincipalModule, nameSecondModule, nameFileClass);
  }

  private static createFileController(
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
        if (!fs.existsSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}`)) {
          fs.mkdirSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}`);
        }
        if (!fs.existsSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}/${nameSecondModule}.controller.ts`)) {
          fs.writeFileSync(`${pathEntities}/${namePrincipalModule}/${nameSecondModule}/${nameSecondModule}.controller.ts`, data);
        }
      }
    );
  }

}
