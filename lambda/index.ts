import {Hono} from "hono";
import type {LambdaContext, LambdaEvent} from 'hono/aws-lambda';
import {handle} from "hono/aws-lambda";

type Bindings = {
    event: LambdaEvent
    context: LambdaContext
}

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.get('/info', (c) => {
    console.log("event");
    console.log(c.env.event);
    console.log("context");
    console.log(c.env.context);

    return c.json({
        event: c.env.event,
        context: c.env.context,
    })
});

app.get("/posts/:post_id/comments/:comment_id", (c) => {
    const {post_id, comment_id} = c.req.param();

    return c.json({
        post_id,
        comment_id,
    })
});

app.get("/posts/:date{[0-9]+}/:title{[a-z]+}", (c) => {
    const {date, title} = c.req.param();

    return c.json({
        date,
        title,
    })
});

export const handler = handle(app);