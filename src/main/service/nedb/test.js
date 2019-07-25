const Db = require('./index');

(async () => {
  const db = new Db();
  console.log(db.collections.get('system').asyncFindOne({}));
  // db.collections
  //   .get('system')
  //   .remove({ _id: 'ZsYsnWNN5Y5iZRJz' }, {}, function(err, numRemoved) {
  //     // numRemoved = 1
  //   });
  // console.log(db);
  // db.collections.get('system').insert({ a: 1, b: 3, index: 1 });
  const result = await db.collections
    .get('system')
    .asyncFindOne({}, [['sort', { name: -1 }]]);
  console.log(result);
  await db.collections.get('system').asyncRemove({ _id: result._id });
})();
