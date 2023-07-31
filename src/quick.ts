// ** Core Imports
import * as fs from "node:fs";
import * as path from "node:path";

// ** Utils Imports
import { rimrafSync } from "rimraf";
import sharp from "sharp";
import isImage from "is-image";

const main = async (): Promise<void> => {
  /* Config */
  const originDir = path.resolve(__dirname, "../", "processing");
  const outputDir = path.resolve(__dirname, "../", "output");
  const OUTPUT_IMAGE_PREFIX = "bench_dumbbell_case_2023_07_04_batch_08";

  /* Delete `output` folder */
  rimrafSync(path.resolve(outputDir, "*"), {
    glob: true,
    filter: (filename) => (filename === ".gitkeep" ? false : true),
  });

  /* Processing images */
  fs.readdirSync(originDir).forEach(async (filename, flag) => {
    if (isImage(path.resolve(originDir, filename))) {
      let image = await sharp(path.resolve(originDir, filename));
      // const originMetadata = await image.metadata();

      await image
        .rotate(90)
        .resize({
          width: 810,
        })
        .toFile(
          path.resolve(
            outputDir,
            `${OUTPUT_IMAGE_PREFIX}_${String(flag).padStart(6, "0")}.jpg`
          )
        );
    }
  });
};
main();
