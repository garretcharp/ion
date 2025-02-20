/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "playground",
      removalPolicy: input?.stage === "production" ? "retain" : "remove",
      providers: {
        aws: {},
        cloudflare: {
          accountId: "24beb0945bae6b37c2b147db108c6ec8",
        },
      },
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      public: true,
      transform: {
        bucket: (args) => {
          args.tags = { foo: "bar" };
        },
      },
    });

    //    const app = new sst.aws.Function("MyApp", {
    //      handler: "functions/handler-example/index.handler",
    //      link: [bucket],
    //      url: true,
    //    });

    return {
      bucket: bucket.name,
      //      app: app.url,
    };
  },
});
