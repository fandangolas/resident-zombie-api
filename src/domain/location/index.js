import t from "tcomb";
import { compose } from "ramda";
import cleanData from "../helper";

const Location = t.struct({
    id: t.maybe(t.String),
    latitude: t.String,
    longitude: t.String
});

export default compose(cleanData, Location);