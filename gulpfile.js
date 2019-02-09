const gulp = require("gulp");
const fs = require("fs-extra");
const node_path = require("path");
const babel_core = require("@babel/core");
const ts = require("gulp-typescript");
const webpack = require('webpack-stream');

gulp.task("compile-ts", () =>
{
    return gulp.src("./src/**/*.ts")
        .pipe(ts.createProject("tsconfig.json")())
        .js.pipe(gulp.dest("./build"));
});

gulp.task("watch", () =>
{
    gulp.watch("./src/**/*.ts", gulp.series("compile-ts"));
});


const examples = [
];

fs.readdirSync(node_path.relative(__dirname, "./example")).forEach(file =>
{
    examples.push(file.replace(".jsx", ""));
});

gulp.task("compile-jsx", (done) =>
{
    const result = babel_core.transformFileSync(`./test/common/component/raw-component.jsx`).code;
    fs.outputFileSync(node_path.resolve(__dirname, `./test/common/component/component.ts`), result, "utf8");

    done();
});

for (const e of examples)
{
    gulp.task(`build-${e}`, () =>
    {
        const result = babel_core.transformFileSync(`./example/${e}.jsx`).code;
        fs.outputFileSync(node_path.resolve(__dirname, `./build/example/${e}.js`), result, "utf8");

        return gulp.src(`./build/example/${e}.js`)
            .pipe(webpack({
                output: {
                    filename: "index.js",
                },
            }))
            .pipe(gulp.dest(`./public/${e}`));
    });
}

gulp.task("clean", (done) =>
{
    fs.removeSync(node_path.resolve(__dirname, "./build"));
    done();
});

gulp.task("compile", gulp.series("compile-ts", "compile-jsx"));
gulp.task("build", gulp.series("compile", ...examples.map(e => `build-${e}`)));