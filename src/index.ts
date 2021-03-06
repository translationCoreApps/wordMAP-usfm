import * as fs from "fs-extra";
import {alignUSFM} from "./Injector";

/**
 * Reads data from files and writes the aligned USFM to a file.
 * @param {string} alignmentsFile - path to the alignments file
 * @param {string} usfmFile - path to the usfm file
 * @param {string} outputFile - path to the output usfm file
 * @param {boolean} alignUnverified - includes machine alignments
 */
module.exports.alignFiles = (alignmentsFile: string, usfmFile: string, outputFile: string, alignUnverified: boolean = false) => {
    if (alignUnverified) {
        console.log("aligning unverified stuff");
    }
    const alignments = fs.readFileSync(alignmentsFile).toString();
    const usfm = fs.readFileSync(usfmFile).toString();
    const alignmentsJson = JSON.parse(alignments);
    const alignedUSFM = alignUSFM(alignmentsJson, usfm, alignUnverified);
    fs.writeFileSync(outputFile, alignedUSFM);
};

/**
 * Aligns USFM and returns the result
 * @param {string} alignments - the raw alignment data
 * @param {string} usfm
 * @param {boolean} alignUnverified - includes machine alignments
 * @return {string}
 */
module.exports.align = (alignments: string, usfm: string, alignUnverified: boolean = false) => {
    return alignUSFM(JSON.parse(alignments), usfm, alignUnverified);
};
