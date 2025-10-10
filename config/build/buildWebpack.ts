import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { buildOptimization } from "./buildOptimization";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === "development";

    return {
        mode: mode ?? "development",
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true,
        },
        plugins: buildPlugins(options),
        optimization: buildOptimization(options),
        module: {
            rules: buildLoaders(options),
        },
        performance: {
            maxEntrypointSize: 612000,
            maxAssetSize: 612000,
        },
        resolve: buildResolvers(options),
        devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
        devServer: isDev ? buildDevServer(options) : undefined,
        stats: {
            children: true,
        },
    };
}
