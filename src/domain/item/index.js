import t from "tcomb";
import { compose } from "ramda";
import cleanData from "../helper";

const Item = t.struct({
    item: t.String,
    amount: t.Integer
});

export default compose(cleanData, Item);