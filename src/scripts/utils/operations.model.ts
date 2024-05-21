import * as fs from "fs";

export class OperationsModel {
  protected static convertNamePath(name: string): string {
    name = name.trim();
    const indSpace: number = name.indexOf(' ');

    if (indSpace == -1) {

      const indGuion: number = name.indexOf('-');
      const positions: number[] = this.findPositionsGuion(name);
      name = name.replace(/-/g, "").toLowerCase();
      let nameArray: string[] = name.split('');
      if (positions.length > 0) {
        for (let i = 0; i < positions.length; i++) {
          nameArray[positions[i] - i] = nameArray[positions[i] - i].toUpperCase();
        }
      }

      return nameArray.toString().replace(/,/g, "");
    } else {
      return '';
    }

  }

  protected static convertNameFile(name: string): string {
    let nameArray: string[] = name.split('');
    nameArray[0] = nameArray[0].toUpperCase();
    return nameArray.toString().replace(/,/g, "");
  }

  protected static replaceNamesInFile(textFile: string, namePrincipalModule: string, nameSecondModule: string, nameModule: string): string {

    textFile = textFile.replace(/{{nameModule}}/g, nameModule);
    textFile = textFile.replace(/{{namePrincipalModule}}/g, namePrincipalModule);
    textFile = textFile.replace(/{{nameSecondModule}}/g, nameSecondModule);

    return textFile;
  }

  protected static createFolder(path: string, nameFolder: string, nameSecondModule?: string): void {
    if (!fs.existsSync(path + `/${nameFolder}`)) fs.mkdirSync(path + `/${nameFolder}`);
    if (nameSecondModule) {
      if ((!fs.existsSync(path + `/${nameFolder}/${nameSecondModule}`))) fs.mkdirSync(path + `/${nameFolder}/${nameSecondModule}`);
    }
  }

  private static findPositionsGuion(text: string) {
    let positions = [];
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === '-') {
        positions.push(i);
      }
    }
    return positions;
  }
}
