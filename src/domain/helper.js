import { complement, compose, isNil, pickBy } from "ramda";

const notNull = compose(complement(isNil));

const cleanData = entity => pickBy(notNull, entity);

export default cleanData;