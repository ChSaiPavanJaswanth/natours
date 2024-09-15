class APIFeatures {
  constructor(query, queryString) {
    // query is the mongoose query that we add methods upon,
    // query string is the object we get from the req.query field in the request object.

    this.query = query;
    this.queryString = queryString;
  }

  filter = () => {
    // FILTERING
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => {
      delete queryObj[el];
    });
    // console.log(this.queryString, queryObj);

    // ADVANCED FILTERING

    //{difficulty: 'easy', duration: {$gte: 5}}    //we want it this way
    //{difficulty: 'easy', duration: {gte:  '5'}}  //but it is present like this

    //THE ONES THAT NEED TO BE REPLACED ARE GTE,GT,LT,LTE
    let queryStr = JSON.stringify(queryObj);
    // console.log(queryStr);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  };

  sort = () => {
    if (this.queryString.sort) {
      let sortVal = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortVal);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  };

  fieldLimit = () => {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      // query = query.select('name duration price');     THE VALUE INSIDE THE SELECT KEYWORK MUST BE IN THAT FORMAT
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  };

  paginate = () => {
    const page = this.queryString.page * 1 || 1; //TO CONVERT THE STRING INTO NUMBER, WE KEPT OR (||) BECAUSE 1 WILL BE THE DEFAULT VALUE
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    //page=2&limit=10, 1-10, page-1 , 11-20, page-2, 21-30, page-3
    this.query = this.query.skip(skip).limit(limit);

    return this;
  };
}

module.exports = APIFeatures;
