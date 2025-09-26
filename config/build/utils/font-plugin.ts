import fs from "fs";
import path from "path";

interface FontInfo {
    fontName: string;
    fontFileName: string;
    fontWeight: string;
    fontExt: string[];
}

type NoParamCallback = (err: NodeJS.ErrnoException | null) => void;

export function fontPlugIn(fontPath: string, cssFontPath: string) {
    let fontsFile = cssFontPath;
    fs.readdir(fontPath, function (err, fontsFiles) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }

        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, "", cb);
                let newFileOnly;
                let fontsInfo = [];

                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split(".")[0];
                    let fontFileExt = path.extname(fontsFiles[i]).slice(1);

                    if (newFileOnly !== fontFileName) {
                        fontsInfo.push({} as FontInfo);
                        fontsInfo[fontsInfo.length - 1].fontExt = [];
                        fontsInfo[fontsInfo.length - 1].fontFileName =
                            fontFileName;

                        let fontName = fontFileName.split("-")[0]
                            ? fontFileName.split("-")[0]
                            : fontFileName;
                        fontsInfo[fontsInfo.length - 1].fontName = fontName;

                        let fontWeight = fontFileName.split("-")[1]
                            ? fontFileName.split("-")[1]
                            : fontFileName;
                        if (fontWeight.toLowerCase() === "thin") {
                            fontWeight = "100";
                        } else if (fontWeight.toLowerCase() === "extralight") {
                            fontWeight = "200";
                        } else if (fontWeight.toLowerCase() === "light") {
                            fontWeight = "300";
                        } else if (fontWeight.toLowerCase() === "medium") {
                            fontWeight = "500";
                        } else if (fontWeight.toLowerCase() === "semibold") {
                            fontWeight = "600";
                        } else if (fontWeight.toLowerCase() === "bold") {
                            fontWeight = "700";
                        } else if (
                            fontWeight.toLowerCase() === "extrabold" ||
                            fontWeight.toLowerCase() === "heavy"
                        ) {
                            fontWeight = "800";
                        } else if (fontWeight.toLowerCase() === "black") {
                            fontWeight = "900";
                        } else {
                            fontWeight = "400";
                        }
                        fontsInfo[fontsInfo.length - 1].fontWeight = fontWeight;

                        newFileOnly = fontFileName;
                    }

                    fontsInfo[fontsInfo.length - 1].fontExt.push(fontFileExt);
                }

                setFonts(fontsFile, fontsInfo, cb);
            } else {
                console.log(
                    "Файл scss/fonts.scss уже существует, для обновления удалите его!"
                );
            }
        }
    });

    function cb(err: Error) {
        console.log(err);
    }

    function setFonts(
        fontsFile: string,
        fontInfo: FontInfo[],
        cb: NoParamCallback
    ) {
        let finalString = "";

        fontInfo.forEach((el) => {
            finalString += `@font-face {\n\tfont-family: ${el.fontName};\n\tfont-display: swap;\n\tsrc: `;
            el.fontExt.reverse();

            for (let i = 0; i < el.fontExt.length; i++) {
                finalString += `url("../fonts/${el.fontFileName}.${el.fontExt[i]}") format(${el.fontExt[i]})`;

                if (i + 1 === el.fontExt.length) {
                    finalString += ";";
                } else {
                    finalString += ", ";
                }
            }

            finalString += `\n\tfont-weight: ${el.fontWeight};\n\tfont-style: normal;\n}\r\n`;
        });

        fs.appendFile(fontsFile, finalString, cb);
    }
}
