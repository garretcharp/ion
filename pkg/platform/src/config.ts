/**
 * The `sst.config.ts` file is used to configure your SST app and its resources.
 *
 * ```ts
 * $config(input: Config): Config
 * ```
 *
 * You specify it using the `$config` function. This takes an object of type [`Config`](#config).
 *
 * ```ts title="sst.config.ts"
 * /// <reference path="./.sst/platform/src/global.d.ts" />
 *
 * export default $config({
 *   app(input) {
 *     return {
 *       name: "my-sst-app",
 *       providers: {
 *         aws: {}
 *       }
 *     };
 *   },
 *   async run() {
 *     new sst.aws.Bucket("MyBucket");
 *   }
 * });
 * ```
 *
 * The `Config` object takes two functions: [`app`](#app-2) and [`run`](#run).
 *
 * The `app` function is evaluated right when your app loads. It's used to define the app config and its providers.
 *
 * :::note
 * You can Pulumi code in the `run` function not the `app` function.
 * :::
 *
 * While the `run` function is for your stacks code. This is where you define your resources using SST or Pulumi's components.
 *
 * :::tip
 * The [Global](/docs/reference/global/) library can help you with your stacks code.
 * :::
 *
 * The run function also has access to a list of [Global](/docs/reference/global/) `$` variables and functions. These serve as the context for your stacks code.
 *
 * @packageDocumentation
 */

export interface App {
  /**
   * The name of the app. This is used to prefix the names of the resources in your app.
   *
   * :::caution
   * If you change the name of your app, it'll redeploy your app with new resources. The old resources will be orphaned.
   * :::
   *
   * This means that you don't want to change the name of your app without removing the old resources first.
   *
   * @example
   *
   * ```ts
   * {
   *   name: "my-sst-app"
   * }
   * ```
   */
  name: string;
  /**
   * Configure how your resources are handled on `sst remove`:
   *
   * - `remove`: Remove all your resources on remove.
   * - `retain`: Retains S3 buckets and DynamoDB tables, and remove all other resources.
   * - `retain-all`: Retains all your resources on remove.
   *
   * :::tip
   * It's a good idea to use `retain` for your production stage.
   * :::
   *
   * @default `"retain"`
   * @example
   * Retain resources if it's the _production_ stage, otherwise remove all resources.
   * ```ts
   * {
   *   removalPolicy: input.stage === "production" ? "retain" : "remove"
   * }
   * ```
   */
  removalPolicy?: "remove" | "retain" | "retain-all";
  /**
   * The providers to use in this app and their config. SST supports all [Pulumi's providers](https://www.pulumi.com/registry/).
   *
   * :::tip
   * SST supports all Pulumi's providers.
   * :::
   *
   * To add a new provider you need to:
   * 1. Add the config for it in the `providers` object. The key is the name of the provider.
   * 2. Install the provider using `sst install`.
   *
   * :::tip
   * If you are using one of our quick starts with the `sst init` command, it'll automatically install the right provider for you.
   * :::
   *
   * You can check out the config of a provider over on Pulumi's docs. For example, here's the config for some common providers:
   * - [AWS](https://www.pulumi.com/registry/packages/aws/api-docs/provider/#inputs)
   * - [Cloudflare](https://www.pulumi.com/registry/packages/cloudflare/api-docs/provider/#inputs)
   *
   * In most cases you don't need to pass in a config for the provider.
   *
   * @example
   *
   * Using the AWS provider. The credentials are handled by default by thw AWS SDK.
   *
   * ```ts
   * {
   *   providers: {
   *     aws: {}
   *   }
   * }
   * ```
   *
   * Adding the Cloudflare provider.
   *
   * ```ts
   * {
   *   providers: {
   *     aws: {},
   *     cloudflare: { }
   *   }
   * }
   * ```
   */
  providers?: Record<string, any>;
}

export interface AppInput {
  /**
   * The stage this app is running on. This is a string that can be passed in through the CLI.
   *
   * If not passed in, it'll use the username of your local machine, or prompt you for it.
   */
  stage: string;
}

export interface Config {
  /**
   * The config for your app. It needs to return an object of type [`App`](#app-1).
   *
   * :::tip
   * The `app` function is evaluated when your app loads.
   * :::
   *
   * @example
   *
   * ```ts
   * app(input) {
   *   return {
   *     name: "my-sst-app",
   *     providers: {
   *       aws: {},
   *       cloudflare: {
   *         accountId: "6fef9ed9089bb15de3e4198618385de2"
   *       }
   *     },
   *     removalPolicy: input.stage === "production" ? "retain" : "remove"
   *   };
   * },
   * ```
   */
  app(input: AppInput): App;
  /**
   * An async function that lets you define the resources in your app.
   *
   * :::note
   * You can use SST and Pulumi components only in the `run` function.
   * :::
   *
   * You can optionally return an object that'll be displayed as the output in the CLI.
   *
   * @example
   *
   * This'll create an S3 Bucket and display its name.
   *
   * ```ts
   * async run() {
   *   const bucket = new sst.aws.Bucket("MyBucket");
   *
   *   return {
   *     bucketName: bucket.name
   *   };
   * }
   * ```
   */
  run(): Promise<Record<string, any> | void>;
}

/** @internal */
export function $config(input: Config): Config {
  return input;
}
