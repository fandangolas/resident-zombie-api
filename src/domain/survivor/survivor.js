import t from "tcomb";
import { compose } from "ramda";
import cleanData from "../helper";

const Location = t.struct({
    latitude: t.String,
    longitude: t.String
});

const Item = t.struct({
    item: t.String,
    amount: t.Integer
});

const Survivor = t.struct({
    name: t.String,
    age: t.Integer,
    gender: t.String,
    lastLocation: t.Object(Location),
    items: t.list(Item)
});

export default compose(cleanData, Survivor);