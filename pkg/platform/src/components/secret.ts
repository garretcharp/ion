import { VisibleError } from "./error";
import { output, secret } from "@pulumi/pulumi";
import { Link } from "./link";
import { Component, Prettify } from "./component";

export class SecretMissingError extends VisibleError {
  constructor(public readonly secretName: string) {
    super(
      `Set a value for ${secretName} with \`sst secrets set ${secretName} <value>\``,
    );
  }
}

/**
 * The `Secret` component lets you create secrets in your stacks code.
 *
 * :::note
 * Secrets are encrypted when they are stored in your state file or in a function package.
 * :::
 *
 * Secrets are encrypted and stored in an S3 Bucket in your AWS account. If used in your stacks code, they'll be encrypted in your state file as well. Similarly, if used in your function code, they'll be encrypted in your function package and decrypted at runtime.
 *
 * @example
 *
 * #### Create a secret
 * ```ts
 * const mySecret = new sst.Secret("MySecret");
 * ```
 *
 * #### Set a placeholder
 *
 * You can optionally set a `placeholder`.
 *
 * :::tip
 * Useful for cases where you might use a secret for values that aren't sensitive, so you can just set them in code.
 * :::
 *
 * ```ts
 * const mySecret = new sst.Secret("MySecret", "my-secret-placeholder-value");
 * ```
 *
 * #### Set the value of the secret
 *
 * You can then set the value of a secret using the [CLI](/docs/reference/cli/).
 *
 * ```sh title="Terminal"
 * sst secrets set MySecret my-secret-value
 * ```
 *
 * #### Use the secret in your stacks code
 *
 * You can now use the secret in your stacks code.
 *
 * ```ts title="sst.config.ts"
 * console.log(mySecret.value);
 * ```
 *
 * #### Link the secret to a resource
 *
 * You can link the secret to other resources, like a function or your Next.js app.
 *
 * ```ts
 * new sst.aws.Nextjs("MyWeb", {
 *   link: [mySecret]
 * });
 * ```
 *
 * Once linked, you can use the secret in your function code.
 *
 * ```ts title="app/page.tsx"
 * import { Resource } from "sst";
 *
 * console.log(Resource.MySecret.value);
 * ```
 */
export class Secret extends Component implements Link.Linkable {
  private _value: string;
  private _name: string;
  private _placeholder?: string;

  /**
   * @param placeholder A placeholder value of the secret. This can be useful for cases where you might not be storing sensitive values.

   */
  constructor(name: string, placeholder?: string) {
    super(
      "sst:sst:Secret",
      name,
      {
        placeholder,
      },
      {},
    );
    this._name = name;
    this._placeholder = placeholder;
    const value = process.env["SST_SECRET_" + this._name] ?? this._placeholder;
    if (!value) {
      throw new SecretMissingError(this._name);
    }
    this._value = value;
  }

  /**
   * The name of the secret.
   */
  public get name() {
    return output(this._name);
  }

  /**
   * The value of the secret. It'll be `undefined` if the secret has not been set through the CLI or if the `placeholder` hasn't been set.
   */
  public get value() {
    return secret(this._value);
  }

  /**
   * The placeholder value of the secret.
   */
  public get placeholder() {
    return output(this._placeholder);
  }

  /** @internal */
  public getSSTLink() {
    return {
      properties: {
        value: this.value,
      },
    };
  }
}
