import t from "tcomb";
import { compose } from "ramda";
import cleanData from "../helper";

const Location = t.struct({
    latitude: t.String,
    longitude: t.String
});

const Item = t.struct({
    id: t.String,
    amount: t.Integer
});

const Survivor = t.struct({
    id: t.maybe(t.String),
    name: t.String,
    age: t.Integer,
    gender: t.String,
    lastLocation: Location,
    items: t.list(Item),
    createdAt: t.maybe(t.Date),
    updatedAt: t.maybe(t.Date)
});

export default compose(cleanData, Survivor);