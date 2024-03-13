import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";

export class LambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const indexFn = new NodejsFunction(this, 'LambdaIndex', {
            entry: "lambda/index.ts",
            handler: "handler",
            runtime: lambda.Runtime.NODEJS_LATEST,
        });

        new apigw.LambdaRestApi(this, "HonoApi", {
            handler: indexFn,
        })
    }
}
